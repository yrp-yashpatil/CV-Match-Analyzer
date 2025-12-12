# CV Match Analyzer: Breaking Through the ATS Black Box
by *Yash Patil*

This is my first AI Agent.

*As a person who wants to switch career form Aeronautics AME and MBA Aviation Management to work as an Analyst, Data Analyst, Business Analyst, Strategy Analyst, Management Consultant and have been actively enhancing my skill set in SQL, Python, Data Analysis, Visualization tools, AI & ML, Cloud Platforms (GCP / Oracle); I have faced a lot of rejections and this CV Match Analyzer is result of this struggle to get past and land interviews.*

## The Problem
Over 75% of resumes never reach human recruiters, they are filtered out by Applicant Tracking Systems (ATS) before anyone reads them. Job seekers face a major problem / hurdle they don't know why they're rejected or how to improve. This disproportionately impacts career changers, international candidates, and people from non-traditional backgrounds who have the skills but don't speak the "ATS language."

## The Solution
CV Match Analyzer uses Gemini 3 Pro's advanced reasoning and multi-modal capabilities to decode the ATS black box. It provides candidates with exactly what recruiters see: a detailed match matrix showing which requirements they meet, which they don't, and most importantly what specific actions will improve their chances.

## How It Works

**Input**
Candidates paste their CV and target job description.
Gemini 3 Pro Analysis:

Extracts 8-12 core requirements from the JD (technical skills, tools, experience, education, soft skills)
Performs semantic matching understanding that "Led team of 5" matches "Management experience"
Generates evidence-based ratings (1-5) for each requirement
Identifies top 10 missing ATS keywords
Provides prioritized, actionable improvement steps (quick wins first)

**Output**
Interactive dashboard with match matrix table, gap analysis, missing keywords, and specific action steps. Downloadable markdown report included.

**Technical Implementation**
Built entirely in Google AI Studio using Gemini 3 Pro's:
Advanced reasoning for semantic understanding beyond keyword matching
Structured output for consistent, actionable results
Context handling to analyze lengthy CVs and job descriptions simultaneously

*The app demonstrates real-world AI application with immediate, practical value turning an opaque, frustrating process into a clear, actionable roadmap.
Impact.*

**This tool democratizes job search success by**
Giving candidates transparency into ATS decision-making
Reducing application rejection rates through targeted improvements
Helping underrepresented candidates navigate opaque hiring systems
Saving hours of guesswork and frustration

**Real-world potential**
Reduces time-to-interview, increases application success rates, and helps millions navigate the modern job market with confidence instead of confusion.

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1_rHOTtF3TccvAt96u2k_BdTW5CBWR2Vv

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
