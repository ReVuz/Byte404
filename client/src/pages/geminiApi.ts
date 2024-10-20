import axios from 'axios'

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API

//const GEMINI_API_KEY = 'AIzaSyAVgLffG2ccu4RadgI1msYqudEZSaD8sXs' // Replace with your actual API key
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string
      }[]
    }
  }[]
}

export async function getCoordinatesFromGemini(placeName: string, customPrompt: string): Promise<{ lat: number, lng: number }> {
  try {
    const prompt = `Given the place name:- "${placeName}" and the prompt description :- "${customPrompt}", provide the latitude and longitude coordinates in decimal format, accurate to 2 decimal places based on the . Return only the numbers in the format: latitude,longitude`
 
    const response = await axios.post<GeminiResponse>(
      GEMINI_API_URL,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        params: { key: GEMINI_API_KEY },
        headers: { 'Content-Type': 'application/json' },
      }
    )

    const generatedText = response.data.candidates[0].content.parts[0].text
    const [lat, lng] = generatedText.split(',').map(Number)

    if (isNaN(lat) || isNaN(lng)) {
      throw new Error('Invalid coordinates returned from Gemini API')
    }

    return { lat: parseFloat(lat.toFixed(2)), lng: parseFloat(lng.toFixed(2)) }
  } catch (error) {
    console.error('Error calling Gemini API:', error)
    throw error
  }
}