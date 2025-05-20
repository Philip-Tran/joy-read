from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import fitz  # PyMuPDF
from django.core.files.uploadedfile import InMemoryUploadedFile

class ExtractPDFTextAPIView(APIView):
    def post(self, request):
        pdf_file = request.FILES.get('file')

        if not pdf_file or not isinstance(pdf_file, InMemoryUploadedFile):
            return Response({"error": "No valid PDF file provided."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            text = ""
            with fitz.open(stream=pdf_file.read(), filetype="pdf") as doc:
                for page in doc:
                    text += page.get_text()

            print(text)    
            return Response({"text": text}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": f"Failed to extract text: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
