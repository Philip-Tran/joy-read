from django.urls import path
from .views import VideoTranscriptAPIView

urlpatterns = [
    path('get-transcript/', VideoTranscriptAPIView.as_view(), name='get-transcript'),
]
