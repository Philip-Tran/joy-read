from django.urls import path
from .views import VideoTranscriptAPIView, ExtractPDFTextAPIView

urlpatterns = [
    path('get-transcript/',  VideoTranscriptAPIView.as_view(), name='video-transcript'),
    path('extract-pdf/', ExtractPDFTextAPIView.as_view(), name='extract_pdf_text'),
]
