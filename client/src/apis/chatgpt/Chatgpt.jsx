import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const Chatgpt = async (userPrompt) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.post(
      `${BASE_URL}/api/v1/ai/generate-content`,
      {
        prompt: userPrompt,
      },
      {
        withCredentials: true,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};
