
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`

function buildEnhancedPrompt(transcript: string, participants: string, docs: string, meetingType: string): string {
  return `You are an AI assistant specialized in summarizing meetings.
Based on the following meeting transcript, participants, and referenced documents, please generate a concise recap.
The meeting type was "${meetingType}". Please tailor the output accordingly.

**Meeting Transcript:**
${transcript}

**Participants:**
${participants}

**Referenced Google Docs:**
${docs}

Please provide the output in a structured JSON object format with the following keys: "summary", "actionItems", "docEdits", "email".
- "summary": A brief summary of the key discussion points and decisions.
- "actionItems": An array of strings, where each string is an action item assigned to a person (e.g., "John: Follow up with marketing team.").
- "docEdits": A string describing suggested edits for the referenced Google Docs.
- "email": A formatted follow-up email text summarizing the meeting for all participants.
The response MUST be a valid JSON object. Do not include any text before or after the JSON object. Do not use markdown backticks for the JSON.
`
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set in project secrets.');
    }

    const { transcript, participants, docs, meetingType } = await req.json()

    if (!transcript) {
      return new Response(JSON.stringify({ error: 'Transcript is required' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    const prompt = buildEnhancedPrompt(transcript, participants, docs, meetingType)

    const geminiResponse = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
          responseMimeType: "application/json",
        },
      }),
    })

    if (!geminiResponse.ok) {
      const errorBody = await geminiResponse.text()
      console.error('Gemini API error:', errorBody)
      throw new Error(`Gemini API request failed with status ${geminiResponse.status}. Check Edge Function logs for details.`)
    }

    const geminiData = await geminiResponse.json()
    const textResponse = geminiData.candidates[0].content.parts[0].text;
    const parsedData = JSON.parse(textResponse);

    return new Response(JSON.stringify(parsedData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
