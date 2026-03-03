"use server"

import OpenAI from "openai"

export async function askAI(query: string) {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        console.error("Missing OPENAI_API_KEY environment variable");
        return "Error: Server configuration missing. Please check API key.";
    }

    const openai = new OpenAI({
        apiKey: apiKey,
        baseURL: process.env.OPENAI_BASE_URL,
        defaultHeaders: {
            "HTTP-Referer": "https://nexus-shield.com", // Optional, for including your app on openrouter.ai rankings.
            "X-Title": "Nexus-Shield", // Optional. Shows in rankings on openrouter.ai.
        },
    });

    try {
        const completion = await openai.chat.completions.create({
            model: "openai/gpt-4o", // Explicitly specify the model provider for OpenRouter
            messages: [
                {
                    role: "system",
                    content: `You are an expert AI Legal Advisor named "Contract Intelligence".
Your role is to assist users in analyzing legal contracts, identifying risks, and explaining complex terms.
You are integrated into a platform called "Nexus-Shield" which uses the Stellar blockchain for audit trails.

Context about the platform:
- "Nexus-Shield" is a Contract Lifecycle Management (CLM) platform.
- It uses Stellar blockchain to "anchor" contract hashes for immutability.
- It supports wallets like Freighter, Albedo, and xBull.

Guidelines:
- Provide clear, concise, and professional legal analysis.
- If asked about the platform or blockchain, explain how Nexus-Shield uses Stellar for security.
- If you don't know something specific about the user's private document (which you can't see right now), give general advice or ask them to copy the relevant clause.
- formatting: Use Markdown for bolding key terms or creating lists.
`
                },
                {
                    role: "user",
                    content: query
                }
            ],
        })

        return completion.choices[0].message.content || "I couldn't generate a response."
    } catch (error: any) {
        console.error("OpenAI API Error:", error)

        if (error?.status === 402) {
            return "Error: Payment Required. Your OpenRouter account needs credits. Please top up your balance at openrouter.ai.";
        }
        if (error?.status === 429) {
            return "Error: Rate Limit Exceeded or Insufficient Quota. Please check your API provider limits.";
        }

        // Return the actual error message if safe, or a fallback
        return `Error: ${error.message || "I'm currently experiencing issues connecting to my knowledge base."}`;
    }
}
