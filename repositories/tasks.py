from githubmonitor.celery import app
from services.github import GithubService
from .models import Repository, Commit

github_service = GithubService()

@app.task()
def monitor_repositories():

    repositories = Repository.objects.all()
    for repository in repositories:
        print(f"Refreshing Commits for repository: {repository.username}/{repository}")
        commits = github_service.get_commits_from_repo(repository.username, repository)

        try: 
            print(f"Saving Commits for repository: {repository.username}/{repository}")
            Commit.objects.bulk_create(commits)
        except Exception as e:
            print("Error trying to save Commits:", e)
