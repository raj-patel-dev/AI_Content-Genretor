import axios from 'axios';

export const Chatgpt = async (userPrompt) => {
  try {
    const response = await axios.post("http://localhost:5000/api/v1/ai/generate-content",
        {
            prompt :userPrompt,
        },
         {
            withCredentials:true
        }
    );

    return response.data;

  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}
