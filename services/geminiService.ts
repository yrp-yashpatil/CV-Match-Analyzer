import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    overallScore: {
      type: Type.NUMBER,
      description: "Overall match score from 0 to 100 based on ATS criteria.",
    },
    summary: {
      type: Type.STRING,
      description: "A concise summary of the match analysis.",
    },
    strengths: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 3-5 key strengths found in the CV relevant to the JD.",
    },
    requirements: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          requirement: { type: Type.STRING, description: "The specific core requirement from the JD." },
          evidence: { type: Type.STRING, description: "Evidence found in the CV (or 'None' if missing)." },
          rating: { type: Type.INTEGER, description: "Match rating from 1 (No match) to 5 (Perfect match)." },
          gapNotes: { type: Type.STRING, description: "Explanation of what is missing or weak." },
          actionToImprove: { type: Type.STRING, description: "Specific action to close the gap." },
        },
        required: ["requirement", "evidence", "rating", "gapNotes", "actionToImprove"],
      },
      description: "Analysis of 8-12 core requirements.",
    },
    missingKeywords: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of important ATS keywords found in JD but missing in CV.",
    },
    nextSteps: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Prioritized list of 3-5 steps to improve the application.",
    },
  },
  required: ["overallScore", "summary", "strengths", "requirements", "missingKeywords", "nextSteps"],
};

export const analyzeCV = async (cvText: string, jdText: string): Promise<AnalysisResult> => {
  const model = "gemini-3-pro-preview";

  const prompt = `
    You are an expert ATS (Applicant Tracking System) consultant and Senior Technical Recruiter.
    Analyze the following Candidate CV against the Job Description.

    Perform a deep semantic analysis (e.g., understand that "Led a team" implies "Management").
    Be strict but fair. Focus on actionable insights.

    Task:
    1. Extract 8-12 core requirements (Technical, Soft Skills, Experience, Education, Domain).
    2. Rate each requirement match from 1-5.
    3. Identify missing keywords that an ATS would scan for.
    4. Provide specific actions to improve the CV.

    Candidate CV:
    ${cvText}

    Job Description:
    ${jdText}
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.4, // Lower temperature for more analytical/consistent results
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response received from Gemini.");
    }

    return JSON.parse(text) as AnalysisResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};