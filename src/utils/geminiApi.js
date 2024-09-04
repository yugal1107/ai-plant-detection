import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

export async function analyzePlantWithGemini(plantDetails, imageFile) {
  try {
    // For text-and-image input, use the gemini-pro-vision model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro	" });

    const prompt = `
    Analyze the following plant details and image (if provided), and provide:
    1. A summary of the plant's characteristics
    2. Any potential diseases based on the description and image
    3. Recommended treatments for the identified diseases

    Respond with a JSON object with keys: details, diseases (as an array), and treatment.
    Do not include any markdown formatting or code blocks in your response.
    `;

    let content = [prompt, plantDetails];

    if (imageFile) {
      const imageData = await fileToGenerativePart(imageFile);
      content.push(imageData);
    }

    const result = await model.generateContent(content);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Unable to extract JSON from the response");
    }

    const jsonString = jsonMatch[0];

    // Parse the JSON response
    const analysisResult = JSON.parse(jsonString);

    return analysisResult;
  } catch (error) {
    console.error("Error analyzing plant with Gemini:", error);
    throw error;
  }
}

async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]);
    reader.readAsDataURL(file);
  });

  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}
