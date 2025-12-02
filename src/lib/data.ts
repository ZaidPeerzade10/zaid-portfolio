import {
  Code,
  Github,
  Linkedin,
  Mail,
  Briefcase,
  GraduationCap,
  Award,
  Database,
  BrainCircuit,
  Bot,
  FileText,
  Layers,
  Server,
  Wrench,
  GitMerge,
  TerminalSquare,
  Cpu,
} from 'lucide-react';
import { ReactNode } from 'react';

type Skill = {
  name: string;
  level: number;
  icon: ReactNode;
};

export const personalData = {
  name: "Zaid Peerzade",
  roles: ["AI Engineer", "Software Engineer", "Data Scientist", "Full Stack Developer"],
  tagline: "Building intelligent systems, automation agents, and AI-powered solutions with Python and modern technologies.",
  location: "Pune, India",
  email: "eng.zpeerzade@gmail.com",
  social: {
    linkedin: "https://www.linkedin.com/in/zaid-peerzade-945829262/",
    github: "https://github.com/ZaidPeerzade10",
  },
  resumeUrl: "/resume.pdf"
};

export const aboutData = {
  title: "About Me",
  description: "I am a final-year Computer Engineering student at SPPU Pune with a strong focus on AI engineering, automation systems, and full-stack development. With hands-on experience in real-world AI deployment and system design, I have a passion for building scalable, intelligent tools that solve complex problems. As a goal-oriented developer, I am continuously honing my skills and preparing to make a significant impact in the global tech industry.",
};

export const experiences = [
  {
    title: "Junior AI Engineer",
    company: "Maxnet Technologies",
    location: "Pune",
    duration: "June 2025 – Present",
    description: [
      "Designed and implemented AI-powered chatbots and automation agents.",
      "Developed complex workflows using Python and LangChain.",
      "Integrated Large Language Models (LLMs) into existing web systems.",
      "Specialized in prompt engineering and optimization for performance.",
      "Conducted rigorous testing and debugging of production AI pipelines.",
      "Contributed to large-scale business process automation projects.",
    ],
    icon: Briefcase,
  },
  {
    title: "Software Developer Intern",
    company: "L.D. Infotech Pvt. Ltd.",
    duration: "July 2022 – Aug 2022",
    description: [
      "Performed data analysis and created visualization dashboards using Python.",
      "Utilized Pandas and NumPy for data manipulation and cleaning.",
      "Generated insightful reports from complex datasets.",
    ],
    icon: Briefcase,
  },
  {
    title: "Software Engineering Virtual Intern",
    company: "JPMorgan Chase & Co.",
    duration: "Nov 2022 – Dec 2022",
    description: [
      "Debugged and maintained TypeScript-based financial systems.",
      "Resolved issues with broken data feeds to ensure data integrity.",
      "Improved code reliability and refactored application logic for better performance.",
    ],
    icon: Briefcase,
  },
];

export const skills: { [key: string]: Skill[] } = {
  "Programming Languages": [
    { name: "Python", level: 95, icon: <Cpu /> },
    { name: "JavaScript", level: 85, icon: <Code /> },
    { name: "SQL", level: 80, icon: <Database /> },
    { name: "TypeScript", level: 75, icon: <Code /> },
  ],
  "Frameworks & Tools": [
    { name: "Flask & FastAPI", level: 90, icon: <Server /> },
    { name: "React", level: 80, icon: <Code /> },
    { name: "LangChain", level: 95, icon: <Layers /> },
    { name: "Git & GitHub", level: 90, icon: <GitMerge /> },
    { name: "SQL Server & Firebase", level: 85, icon: <Database /> },
    { name: "REST APIs", level: 90, icon: <Wrench /> },
    { name: "VS Code & UiPath", level: 85, icon: <TerminalSquare /> },
  ],
  "AI, Data & Automation": [
    { name: "Pandas & NumPy", level: 95, icon: <FileText /> },
    { name: "Scikit-Learn", level: 85, icon: <BrainCircuit /> },
    { name: "OpenAI API & AutoGen", level: 90, icon: <Bot /> },
    { name: "Prompt Engineering & RAG", level: 95, icon: <BrainCircuit /> },
    { name: "Vector Databases", level: 90, icon: <Database /> },
    { name: "LLM Optimization", level: 85, icon: <Cpu /> },
    { name: "AI Agents & Workflow Automation", level: 95, icon: <Bot /> },
  ],
};

export const projects = [
  {
    title: "AI-Powered Multi-Agent Database Chatbot (AiBase)",
    description: "A sophisticated system that dynamically builds multiple AI agents to understand database schemas, convert natural language questions into SQL queries, execute them, and provide human-readable answers.",
    technologies: ["Python", "LangChain", "SQL", "LLMs"],
    icon: Database,
  },
  {
    title: "Queue-Based Bot Execution System (UiPath Automation)",
    description: "An intelligent, sequential bot execution system designed for business automation, featuring a pause/resume mechanism, an integrated AI chatbot for control, and a business intelligence dashboard.",
    technologies: ["Python", "UiPath", "LangChain", "LLM Integration"],
    icon: Bot,
  },
  {
    title: "AI Document Search & Summarization System (Doc Agent)",
    description: "A powerful document intelligence engine capable of understanding PDF content, performing semantic search, and providing RAG-based AI responses for efficient information retrieval and summarization.",
    technologies: ["Python", "LangChain", "Embeddings", "Vector DB"],
    icon: FileText,
  },
];

export const education = {
  university: "Savitribai Phule Pune University (SPPU)",
  degree: "Bachelor of Computer Engineering",
  graduationYear: 2026,
  icon: GraduationCap,
};

export const certifications = [
  { name: "Python Programming", provider: "Udemy", icon: Award },
  { name: "Google IT Automation with Python", provider: "Coursera", icon: Award },
  { name: "Crash Course on Python", provider: "Coursera", icon: Award },
  { name: "Introduction to Git and GitHub", provider: "Coursera", icon: Award },
  { name: "Troubleshooting and Debugging", provider: "Coursera", icon: Award },
  { name: "Configuration Management and the Cloud", provider: "Coursera", icon: Award },
  { name: "Using Python to Interact with the OS", provider: "Coursera", icon: Award },
  { name: "Automating Real World Tasks with Python", provider: "Coursera", icon: Award },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];
