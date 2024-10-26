// this is a content script that runs in the current site's context (may or may not be needed)

// Basically remove all of this (later)

/*
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// Fetch your API_KEY
const API_KEY = "AIzaSyDP6A3XAgxNgauQkAGWgRalnS4VZQ3WMhQ";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

console.log("ProjectT loaded");

// Get the URL of the current site
const currentURL = window.location.href;

// Print the URL to the console
console.log("Current URL:", currentURL);

// Provide safety report (put into sidebar)
async function safetyReport(url) {
    const urlPrompt = `Is there something suspicious about the URL: ${url}? Is the site possibly questionable based on just the link? You should respond with a clear, concise report with bullet points describing reasoning - start with "Safety report: "`;
    const result = await model.generateContent(urlPrompt);
    const responseText = await result.response.text();
    return responseText;
}

// Call the safetyReport function and log its output
safetyReport(currentURL).then(report => {
    console.log(report);
});
*/