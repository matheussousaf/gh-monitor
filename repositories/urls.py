from django.urls import path

from .views import RepositoryView, CommitView, StatisticsView

app_name = 'repositories'

COMMIT_URL = "api/commits/"
REPOSITORY_URL = "api/repositories/"
STATISTICS_URL = "api/statistics"

urlpatterns = [
    path(COMMIT_URL, CommitView.as_view(), name='commits-list'),
    path(REPOSITORY_URL, RepositoryView.as_view(), name='repositories-create'),
    path(STATISTICS_URL, StatisticsView.as_view(), name='statistics-commits')
]
