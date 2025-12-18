import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { resumeText, action } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    let userPrompt = "";

    if (action === "parse") {
      systemPrompt = `You are an expert resume parser and career advisor. Analyze the resume and extract key information. Return a JSON object with the following structure:
{
  "name": "candidate name",
  "email": "email if found",
  "phone": "phone if found",
  "skills": ["list", "of", "skills"],
  "experience": [{"title": "job title", "company": "company", "duration": "duration", "description": "brief description"}],
  "education": [{"degree": "degree", "institution": "school", "year": "year"}],
  "summary": "brief professional summary",
  "strengths": ["key", "strengths"],
  "areasToImprove": ["areas", "to", "improve"]
}`;
      userPrompt = `Parse this resume and extract information:\n\n${resumeText}`;
    } else if (action === "recommend") {
      systemPrompt = `You are an expert career advisor. Based on the resume provided, suggest real, current job opportunities that match the candidate's skills and experience. Focus on:
1. Entry-level to mid-level positions appropriate for the candidate
2. Companies that are actually hiring (mention well-known companies in tech, consulting, finance)
3. Remote and on-site opportunities
4. Internships if the candidate seems to be a student

Return a JSON array with this structure:
[
  {
    "title": "Job Title",
    "company": "Company Name",
    "location": "Location or Remote",
    "type": "Full-time/Part-time/Internship",
    "matchScore": 85,
    "matchReasons": ["reason1", "reason2"],
    "applyUrl": "https://careers.company.com or similar realistic URL",
    "salary": "estimated salary range if applicable",
    "skills": ["required", "skills"]
  }
]
Provide 5-8 relevant job recommendations.`;
      userPrompt = `Based on this resume, recommend suitable job opportunities:\n\n${resumeText}`;
    } else if (action === "careerPath") {
      systemPrompt = `You are an expert career advisor. Based on the resume, create a personalized career roadmap. Return a JSON object:
{
  "currentLevel": "Junior/Mid/Senior level assessment",
  "targetRoles": ["list of potential target roles in 2-5 years"],
  "immediateActions": ["actions to take in next 3 months"],
  "skillsToLearn": [{"skill": "skill name", "priority": "high/medium/low", "resources": ["list of resources"]}],
  "certifications": ["recommended certifications"],
  "timeline": [{"month": "Month 1-3", "goals": ["goals"]}, {"month": "Month 4-6", "goals": ["goals"]}],
  "industryTrends": ["relevant industry trends to be aware of"]
}`;
      userPrompt = `Create a personalized career roadmap based on this resume:\n\n${resumeText}`;
    }

    console.log(`Processing ${action} request`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    // Try to parse JSON from the response
    let result;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      const jsonStr = jsonMatch ? jsonMatch[1].trim() : content.trim();
      result = JSON.parse(jsonStr);
    } catch {
      console.log("Could not parse as JSON, returning raw content");
      result = { rawContent: content };
    }

    return new Response(JSON.stringify({ result, action }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error: unknown) {
    console.error("Error in resume-parser:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
