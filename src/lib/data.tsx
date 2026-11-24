export const personalData = {
  name: "Zaid Peerzade",
  role: "Lead AI Engineer",
  location: "Pune, India",
  email: "eng.zpeerzade@gmail.com",
  social: {
    linkedin: "https://www.linkedin.com/in/zaid-peerzade-945829262/",
    github: "https://github.com/ZaidPeerzade10",
  },
  resumeUrl: "/resume.pdf",
};

export const about = {
  statement:
    "I build AI systems that take real work off people's plates: agents that read databases, bots that run business processes, and search tools that actually find the answer.",
  body:
    "I'm a Lead AI Engineer at Maxnet Technologies and a final-year Computer Engineering student at SPPU, Pune. Most of my days are spent wiring LLMs into existing systems with Python and LangChain, then testing them until they hold up in production.",
  facts: [
    { label: "Now", value: "Lead AI Engineer, Maxnet" },
    { label: "Studying", value: "B.E. Computer Engineering, SPPU (2026)" },
    { label: "Based", value: "Pune, India" },
    { label: "Focus", value: "Agents, RAG, automation" },
  ],
};

export type Project = {
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  kind: string;
  href?: string;
};

export const projects: Project[] = [
  {
    title: "AiBase",
    tagline: "Multi-agent database chatbot",
    description:
      "Spins up a team of agents that read a database schema, turn plain-English questions into SQL, run them and explain the result in a sentence.",
    stack: ["Python", "LangChain", "SQL", "LLMs"],
    kind: "Agents",
  },
  {
    title: "Bot Queue",
    tagline: "Queue-based bot execution for UiPath",
    description:
      "Runs business automation bots one after another with pause and resume, an AI chatbot to control the queue, and a dashboard that shows what ran.",
    stack: ["Python", "UiPath", "LangChain", "Dashboards"],
    kind: "Automation",
  },
  {
    title: "Doc Agent",
    tagline: "Document search and summarisation",
    description:
      "Reads PDFs, indexes them with embeddings and answers questions with retrieval-augmented generation, citing the passages it used.",
    stack: ["Python", "LangChain", "Embeddings", "Vector DB"],
    kind: "RAG",
  },
  {
    title: "micrograd-from-scratch",
    tagline: "A tiny autograd engine",
    description:
      "A scalar automatic differentiation engine and small neural-net library in pure Python, built to understand exactly what .backward() does.",
    stack: ["Python", "Autograd", "Neural nets"],
    kind: "Open source",
    href: "https://github.com/ZaidPeerzade10/micrograd-from-scratch",
  },
  {
    title: "AI Daily Lab",
    tagline: "A daily ML practice machine",
    description:
      "Generates a fresh data science task every day with Gemini, avoids repeats, tracks streaks and writes monthly reports, all on GitHub Actions.",
    stack: ["Python", "Gemini API", "GitHub Actions"],
    kind: "Open source",
    href: "https://github.com/ZaidPeerzade10/ai-daily-lab",
  },
];

export const experiences = [
  {
    role: "Lead AI Engineer",
    company: "Maxnet Technologies",
    period: "Jun 2025 — now",
    current: true,
    points: [
      "Lead the design and delivery of AI chatbots and automation agents with Python and LangChain.",
      "Integrate LLMs into existing web systems and tune prompts for cost and accuracy.",
      "Test and debug production AI pipelines for large business-process automation.",
    ],
  },
  {
    role: "Software Engineering Virtual Intern",
    company: "JPMorgan Chase & Co.",
    period: "Nov — Dec 2022",
    current: false,
    points: [
      "Fixed broken data feeds in a TypeScript financial dashboard and refactored its logic.",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "L.D. Infotech",
    period: "Jul — Aug 2022",
    current: false,
    points: [
      "Cleaned and analysed datasets with Pandas and NumPy and built reporting dashboards.",
    ],
  },
];

export const stack = [
  {
    group: "AI & agents",
    items: ["LangChain", "OpenAI API", "AutoGen", "RAG", "Vector databases", "Prompt engineering", "LLM optimisation"],
  },
  {
    group: "Engineering",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "FastAPI", "Flask", "React", "REST APIs"],
  },
  {
    group: "Data & ops",
    items: ["Pandas", "NumPy", "scikit-learn", "SQL Server", "Firebase", "UiPath", "Git & GitHub", "GitHub Actions"],
  },
];

export const education = [
  { school: "Savitribai Phule Pune University (SPPU)", degree: "B.E. Computer Engineering", years: "2023 — 2026" },
  { school: "MSBTE, Pune", degree: "Diploma in Computer Engineering", years: "2020 — 2023" },
];

export const certifications = [
  { name: "Google IT Automation with Python", provider: "Coursera", link: "https://coursera.org/share/98b974192cf052983a4dd903b9aba227" },
  { name: "Crash Course on Python", provider: "Coursera", link: "https://coursera.org/share/98b974192cf052983a4dd903b9aba227" },
  { name: "Using Python to Interact with the OS", provider: "Coursera", link: "https://coursera.org/share/ec5cfccf09d9a667c1e3ec6033289320" },
  { name: "Automating Real World Tasks with Python", provider: "Coursera", link: "https://coursera.org/share/b757a5201d50531c4f423979c20492a2" },
  { name: "Configuration Management and the Cloud", provider: "Coursera", link: "https://coursera.org/share/7fc8e2141e6b92d5c092e4f725870c37" },
  { name: "Troubleshooting and Debugging Techniques", provider: "Coursera", link: "https://coursera.org/share/2c3b6603864f5e9323e4a8fe21a8e0a6" },
  { name: "Introduction to Git and GitHub", provider: "Coursera", link: "https://coursera.org/share/29c5141c3649d01a6613e820537b1de5" },
  { name: "Python Programming", provider: "Udemy", link: "https://www.udemy.com/certificate/UC-4a10cc3e-de34-47fa-b214-7ab833693cb0/" },
];

export const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];
