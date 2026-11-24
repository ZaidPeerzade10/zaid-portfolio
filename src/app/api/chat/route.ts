import { NextResponse } from "next/server";
import { chatFacts, personalData } from "@/lib/data";

type Msg = { role: "user" | "assistant"; text: string };

const SYSTEM = `You are the assistant on Zaid Peerzade's portfolio website. Visitors are usually recruiters, founders or engineers.
Answer questions about Zaid using ONLY the facts below. Speak about him in the third person, warmly and briefly (2-4 sentences, plain text, no markdown headings).
If something isn't covered by the facts, say you don't know and suggest emailing him at ${personalData.email}. Never invent numbers, employers, dates or projects.
If asked something unrelated to Zaid, steer back politely in one sentence.

FACTS:
${chatFacts}`;

// very small in-memory rate limit per instance
const hits = new Map<string, { n: number; t: number }>();
function limited(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > 60_000) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  h.n += 1;
  return h.n > 12;
}

export async function POST(req: Request) {
  let messages: Msg[] = [];
  try {
    const body = await req.json();
    messages = (Array.isArray(body?.messages) ? body.messages : [])
      .filter((m: Msg) => (m?.role === "user" || m?.role === "assistant") && typeof m.text === "string")
      .slice(-10)
      .map((m: Msg) => ({ role: m.role, text: m.text.slice(0, 600) }));
  } catch {
    return NextResponse.json({ reply: "That request wasn't readable. Try asking again." }, { status: 400 });
  }
  const last = [...messages].reverse().find((m) => m.role === "user");
  if (!last) return NextResponse.json({ reply: "Ask me anything about Zaid's work." });

  const ip = req.headers.get("x-nf-client-connection-ip") || req.headers.get("x-forwarded-for") || "anon";
  if (limited(ip)) return NextResponse.json({ reply: "That's a lot of questions at once. Give it a minute, or email Zaid directly." }, { status: 429 });

  const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (key) {
    try {
      const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": key },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM }] },
          contents: messages.map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.text }] })),
          generationConfig: { temperature: 0.4, maxOutputTokens: 400 },
        }),
        signal: AbortSignal.timeout(15_000),
      });
      if (res.ok) {
        const data = await res.json();
        const text: string | undefined = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("").trim();
        if (text) return NextResponse.json({ reply: text });
      } else {
        console.error("Gemini error", res.status, await res.text());
      }
    } catch (e) {
      console.error("Gemini request failed", e);
    }
  }
  return NextResponse.json({ reply: fallback(last.text) });
}

/** Keyword answers so the assistant still works without an API key. */
function fallback(q: string): string {
  const t = q.toLowerCase();
  const has = (...w: string[]) => w.some((x) => t.includes(x));
  if (has("contact", "email", "hire", "reach", "linkedin", "call"))
    return `Email him at ${personalData.email}, or find him on LinkedIn. The contact form at the bottom of this page works too.`;
  if (has("maxnet", "job", "work at", "current", "role", "lead", "doing now"))
    return "Zaid is a Lead AI Engineer at Maxnet Technologies in Pune. He joined in June 2025 and leads the design and delivery of AI chatbots and automation agents built with Python and LangChain, wiring LLMs into existing systems and keeping those pipelines reliable in production.";
  if (has("project", "built", "portfolio", "first", "best"))
    return "Start with AiBase, a multi-agent chatbot that turns plain-English questions into SQL and explains the answer. Doc Agent (RAG over PDFs) and Bot Queue (UiPath automation with an AI controller) are close behind. For code you can read, micrograd-from-scratch and AI Daily Lab are on his GitHub.";
  if (has("stack", "skill", "tech", "language", "framework", "tools", "python", "langchain"))
    return "His core is Python with LangChain, the OpenAI API, AutoGen, RAG and vector databases. On the engineering side: FastAPI, Flask, React, TypeScript and SQL. For data and ops: Pandas, NumPy, scikit-learn, SQL Server, Firebase, UiPath and GitHub Actions.";
  if (has("study", "education", "degree", "college", "cgpa", "gpa", "university", "graduat"))
    return "He graduated with a B.E. in Computer Engineering from Savitribai Phule Pune University with a CGPA of 8.02, after a Diploma in Computer Engineering from MSBTE, Pune.";
  if (has("experience", "intern", "jpmorgan", "career", "background"))
    return "Before Maxnet he did a software engineering virtual internship at JPMorgan Chase (fixing data feeds in a TypeScript dashboard) and a developer internship at L.D. Infotech (data analysis with Pandas and NumPy).";
  if (has("resume", "cv"))
    return "His resume is linked in the footer, or open /resume.pdf on this site.";
  if (has("rag", "agent", "llm", "ai"))
    return "Zaid builds agents and retrieval systems: multi-agent SQL chatbots, RAG over documents and AI-controlled automation queues, mostly with Python and LangChain.";
  return `I can tell you about Zaid's work at Maxnet, his projects, his stack or his education. For anything else, email him at ${personalData.email}.`;
}
