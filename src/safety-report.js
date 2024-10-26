// This file has the safety report function to generate a safety report based on the URL of the site using AI

// Import the GoogleGenerativeAI module
import { GoogleGenerativeAI } from "https://cdn.jsdelivr.net/npm/@google/generative-ai/+esm";

// Fetch your API_KEY
const API_KEY = "AIzaSyDP6A3XAgxNgauQkAGWgRalnS4VZQ3WMhQ";

async function gen(url) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const urlPrompt = `Is there something suspicious about the URL: ${url}? Is the site possibly questionable based on just the link? You should respond with a clear, concise report with bullet points describing reasoning - start with "Safety report: "`;
    const result = await model.generateContent(urlPrompt);
    const responseText = await result.response.text();
    return responseText;
}

export { gen };