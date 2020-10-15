from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination

from .models import Commit, Repository
from .serializers import CommitSerializer, RepositorySerializer, StatisticsSerializer
from services.github import GithubService
from django.db.models import Count


class StatisticsView(APIView):

    def get(self, request, *args, **kwargs):

        # Repositories, count

        repositories = Repository.objects.annotate(num_commits=Count("commit"))

        data = [{"name": repo.name, "num_commits": repo.num_commits,
                 "repo_id": repo.id} for repo in repositories]

        return Response(data, status=status.HTTP_200_OK)


class RepositoryView(APIView):
    permission_classes = [IsAuthenticated]

    def __init__(self):
        self.github_service = GithubService()

    def get(self, request, *args, **kwargs):
        username = str(request.user)
        repositories = Repository.objects.all().filter(username=username)
        serializer = RepositorySerializer(repositories, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        """
        Creates a new repository to be monitored.
        """
        repo_name = request.data["name"]

        repo_name_already_exists = Repository.objects.filter(name=repo_name)
        repo_does_not_exists_in_github = not self.github_service.repo_exists(
            request.user, repo_name)

        if repo_name_already_exists:
            return Response("Repository already exists.", status=status.HTTP_409_CONFLICT)
        if repo_does_not_exists_in_github:
            return Response("Repository does not exists in Github.", status=status.HTTP_404_NOT_FOUND)

        user_data = {"username": str(request.user)}
        data = {**request.data, **user_data}

        serializer = RepositorySerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        self.github_service.get_commits_from_repo(str(request.user), repo_name)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CommitView(APIView, PageNumberPagination):
    permission_classes = [IsAuthenticated]

    def __init__(self):
        self.github_service = GithubService()

    def get(self, request, *args, **kwargs):
        """
        Get all commits from the user's repositories.
        """

        query_data = request.query_params

        pagination_params = ["page"]

        filters = {v: query_data[v]
                   for v in query_data.keys() if v not in pagination_params}

        commits = Commit.objects.all().filter(**filters)
        paginated_data = self.paginate_queryset(commits, request, view=self)
        serializer = CommitSerializer(paginated_data, many=True)

        response = Response(
            serializer.data,
            content_type="application/json",
            status=status.HTTP_200_OK
        )

        return response
