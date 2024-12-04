import { YoutubeTranscript } from "youtube-transcript";

/**
 * Controller function to get the transcript of a YouTube video
 */
const getVideoTranscript = async (req, res) => {
  try {
    // Extract the videoId from the request query or body
    const { videoId } = req.body; // Assuming videoId is sent in the request body
    if (!videoId) {
      return res.status(400).json({ error: "Video ID is required" });
    }

    // Fetch the transcript
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    console.log(transcript);
    // Send the transcript as a response
    res.status(200).json({ transcript });
  } catch (error) {
    console.error("Error fetching transcript:", error);

    // Handle errors gracefully
    res.status(500).json({
      error: "Failed to fetch video transcript",
      details: error.message,
    });
  }
};

export { getVideoTranscript };
