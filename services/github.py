import requests
import json
from repositories.serializers import GithubCommitSerializer
from repositories.models import Repository
from social_django.models import UserSocialAuth
import datetime

class GithubService:

    def __init__(self):
        self.BASE_URL = 'https://api.github.com'

    def set_access_token(self, username):
        social_user_data = UserSocialAuth.objects.get(user__username=username)

        self.headers = {
            'Authorization': f'token {social_user_data.extra_data["access_token"]}'
        }


    def get_commits_from_repo(self, user, repo_name):

        self.set_access_token(user)

        last_30_days = datetime.date.today() - datetime.timedelta(30)
        commits = requests.get(
            f"{self.BASE_URL}/repos/{user}/{repo_name}/commits?until={last_30_days.isoformat()}", headers=self.headers).json()

        repo = Repository.objects.get(name=repo_name)

        serialized_commits = []

        for commit in commits:
            serializer = GithubCommitSerializer(data=commit)
            serialized_commit = serializer.data
            serialized_commit.repository = repo
            serialized_commits.append(serializer.data)

        return serialized_commits

    def repo_exists(self, user, repo_name):
        
        self.set_access_token(user)

        return requests.get(f"{self.BASE_URL}/repos/{user}/{repo_name}", headers=self.headers).status_code != 404
