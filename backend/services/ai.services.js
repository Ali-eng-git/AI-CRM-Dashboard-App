import { GoogleGenAI } from "@google/genai";
import { ApiError } from "../utils/ApiError.js";

let client = null;

const getClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new ApiError(
      503,
      " Gemini API key is not configured. Add GEMINI_API_KEY in .env file",
    );
  }
  if (!client) client = new GoogleGenAI({ apiKey });
  return client;
};

const MODEL = () => process.env.GEMINI_API_KEY || "gemini-2.5-flash";

export const isAIConfigured = () => Boolean(process.env.GEMINI_API_KEY);

const generateJSON = async (prompt, schema) => {
  const ai = getClient();
  try {
    const response = await ai.models.generateContent({
      model: MODEL(),
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.6,
      },
    });
    return JSON.parse(response.text);
  } catch (err) {
    console.error("Gemini JSON error:", err?.message || err);
    throw new ApiError(502, "AI request failed.Please try again in a moment");
  }
};

const generateText= async(prompt, temperature=0.7)=>{
    const ai = getClient()
    try {
        const response = await ai.models.generateContent({
            model:MODEL(),
            contents:prompt,
            config:{temperature},
        })
        return response.text.trim()
    } catch (err) {
            console.error("Gemini JSON error:", err?.message || err);
    throw new ApiError(502, "AI request failed.Please try again in a moment");
    }
}

export const generateLeadSummary = async(lead)=>{
    const prompt=`You are an expert B2B sales analyst for a CRM called TTP CRM.
    Analyse the following sales lead and produce a concise assessment.

    Lead details:
    -Name: ${lead.name || "N/A"}
    -Company: ${lead.company || "N/A"}
    -Email: ${lead.email || "N/A"}
    -Current pipeline stage: ${lead.status || "New"}
    -Potential deal value: ${lead.value || 0}
    -Source: ${lead.source || "Unknown"}
    -Notes: ${lead.notes || "Nonw"}

    Return JSON only.`

    const schema ={
        type:"object",
        properties:{
            summanry:{
                type:"string",
                descritption:"2-3 sentence executive summaary of the lead",
            },
            riskScore:{
                type:"integer",
                description:"Risk of losing this deal, 0 (safe) to 100 (high risk)",
            },
            suggestedPriority:{
                type:"string",
                enum:["Low","Medium","High"],
            },
            nextBestAction:{
                type:"string",
                description:"One concrete recommended next step",
            }
        },
        required:["summary","riskScore","suggestedPriority","nextBestAction"]

    }
    return generateJSON(prompt, schema)
}

export const generateEmail = async({lead, purpose,tone,sender})=>{
    const prompt =`You are a senior sales rep writing onn behalf of ${
        sender?.name || "Our team"
    }${sender?.company ? `at ${sender.company}` : ""}.
    
    Write a professional sales email.
    Purpose: ${purpose || "follow-up"}
    Desired tone: ${tone || "friendly and professional"}

    Recipient (lead) details:
    -Name: ${lead?.name || "there"}
    -Company: ${lead?.company || "N/A"}
    -pipeline status: ${lead?.status || "New"}
    -Context / notes: ${lead?.notes || "None"}
    
    Return JSON only with a compelling subject line and a complete email body.
    Use line breaks {\\n} in the body.Keep it under 180 words. Sign of as
    ${sender?.name || "the TTP CRM team"}
    `

    const schema = {
        type:"object",
        properties:{
            subject:{ type:"string"},
            body:{type:string},
        },
        required:["subject","body"]
    }
    return generateJSON(prompt, schema)
}


export const generateLeadInsight= async(pipelineStats)=>{
    const prompt =` You are a revenue-operations advisor.Given this snapshot of this 
    sales pipeline. Identify what is working, what is at risk, and concrete actions to improve 
    conversion.
    
    Pipeline snapshot (JSON):
    ${JSON.stringify(pipelineStats,null,2)}

    Return JSON only. `

    const schema = {
        type:"object",
        properties:{
            headline:{
                 type:"string",
                 description:"One-sentence summaty of pipeline health"
                },
             insights:{
                 type:"string",
                 description:"3-5 specific, data-driven observations",
                 items:{type:"string"}
                },
             recommendations:{
                 type:"array",
                 description:"3-5 prioritized, actionable recommendations",
                 items:{type:"string"}
                },    
             healthScore:{
                 type:"integer",
                 description:"Overall pipeline health,0-100",
                },    
        },
        required:["headline","insights","recommendations","healthScore"]
    }

    return generateJSON(prompt,schema)
} 

export {generateText}