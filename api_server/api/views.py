from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import TranscriptsDisabled, NoTranscriptFound
import re


class VideoTranscriptAPIView(APIView):
    @staticmethod
    def extract_video_id(video_link):
        """
        Extract the video ID from a YouTube URL using regex.
        """
        match = re.search(r'(?:v=|\/)([0-9A-Za-z_-]{11})', video_link)
        return match.group(1) if match else None

    def post(self, request):
        video_link = request.data.get('videoLink')
        lang = request.data.get('lang')

        if not video_link or not lang:
            return Response(
                {"error": "Both 'videoLink' and 'lang' fields are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        video_id = self.extract_video_id(video_link)
        if not video_id:
            return Response(
                {"error": "Invalid YouTube video link."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # Get the list of available transcripts
            transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
            transcript_data = None
            is_translated = False
            available_languages = []

            # Iterate through the transcripts to find matching or translatable ones
            for transcript in transcript_list:
                original_language_code = transcript.language_code
                # Extract available translation languages
                available_languages = [lang_info["language_code"] for lang_info in transcript.translation_languages]
                
                # if the original language match the language received from the request
                if original_language_code == lang:
                    transcript_data = transcript.fetch()
                    is_translated = False
                    break

                if lang in available_languages:
                    # Translate the transcript if the desired language is available
                    transcript_data = transcript.translate(lang).fetch()
                    is_translated = True
                    break

            # if transcript_data is None:
            #     # If no translated transcript is found, fetch the original transcript
            #     transcript_data = transcript.fetch()
            #     is_translated = False

            # Return the transcript and metadata
            return Response(
                {
                    "transcript": transcript_data,
                    "is_translated": is_translated,
                    "available_languages": available_languages,
                },
                status=status.HTTP_200_OK,
            )

        except TranscriptsDisabled:
            return Response(
                {"error": "Transcripts are disabled for this video."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except NoTranscriptFound:
            return Response(
                {"error": f"No transcript found for the video in '{lang}' language."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


