// ┌─────────────────────────────────────────────────────────────┐
// │  EDIT THIS FILE to make the site yours.                       │
// │  All text, projects, links and skills live here.              │
// │                                                               │
// │  CONTACT INFO comes from env vars (.env.local, gitignored)    │
// │  so your real number/email never enter the GitHub repo.       │
// │  See .env.example for the required variables.                 │
// └─────────────────────────────────────────────────────────────┘

// Read contact details from environment with safe fallbacks.
// NEXT_PUBLIC_* vars are inlined at build time into the client bundle.
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@sarojswadithya.com";
const WHATSAPP_MESSAGE =
  process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ??
  "Hi Saroj! I saw your portfolio and I'd love to chat about a project.";

// Build the wa.me link (only if a number is configured)
const whatsappLink = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
  : "";

export const contact = {
  email: CONTACT_EMAIL,
  whatsapp: whatsappLink,
  // show the WhatsApp button only if a number is configured in env
  hasWhatsApp: Boolean(WHATSAPP_NUMBER),
};

export const profile = {
  firstName: "Saroj",
  lastName: "Swadithya",
  role: "Software Developer",
  // Short line shown under the big name
  intro:
    "Recent Computer Science graduate and aspiring freelance developer. I build clean, reliable web apps for local businesses — and I'm currently learning AI to bring smarter features into the work I do.",
  location: "Tamilnadu, India · Open to work",
  email: CONTACT_EMAIL,
  // Shown as a green "available" pill when true
  available: true,
};

export const socials = [
  { label: "GitHub", href: "https://github.com/sarojswadithya", handle: "@sarojswadithya" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sarojswadithyam/",
    handle: "in/sarojswadithya",
  },
];

export const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const stats = [
  { value: "2026", label: "CS Graduate" },
  { value: "8.03", label: "CGPA · Distinction" },
  { value: "Open", label: "To work" },
];

export const about = {
  heading: "Fresh graduate, hungry to build.",
  paragraphs: [
    "I'm a Computer Science graduate from Karunya University with a love for turning ideas into real, working software. Right now I build web apps for local cafes, shops, and small businesses helping them get online and run more smoothly.",
    "I'm also learning AI and keeping up with where the industry is heading, so I can eventually bring intelligent features into the products I build. I'm looking for freelance work and opportunities to grow as a developer.",
  ],
  focus: [
    "Web applications",
    "Local business websites",
    "Learning AI & ML",
    "Clean, maintainable code",
  ],
};

// ── Experience & Education ──────────────────────────────────────
export const experiences = [
  {
    role: "Software Engineer Intern",
    org: "Gogaga Entertainment Pvt. Ltd.",
    period: "Jan 2025 — Apr 2025",
    type: "Internship",
    points: [
      "Built an internal OTT streaming application for use within the organization.",
      "Worked across the stack from UI to backend APIs, shipping features end to end.",
      "Collaborated with a team and learned what it takes to ship real software.",
    ],
  },
  {
    role: "Treasurer",
    org: "MATRIX — Student Association",
    period: "Aug 2025 — Apr 2026",
    type: "Leadership",
    points: [
      "Handled over 15+ events in a single academic year, managing budgets and finances for each.",
      "Coordinated with teams to plan and execute technical and cultural events.",
      "Built organization and communication skills that carry into my dev work.",
    ],
  },
];

export const education = [
  {
    degree: "B.Tech, Computer Science & Engineering (Artificial Intelligence)",
    org: "Karunya University, Coimbatore",
    period: "Aug 2022 — May 2026",
    detail: "CGPA: 8.03 · First Class with Distinction",
  },
];

export const works = [
  {
    title: "All Tech Daily",
    category: "AI SaaS Platform",
    year: "2025",
    description:
      "A full-stack AI SaaS application that automates technology news aggregation and content creation. It scrapes leading tech publications and generates concise bullet-point summaries in English and Tamil using Llama 3.1. Includes a premium Creator Tier with secure Stripe integration, AI-powered social media script generation, downloadable PDF digests, and studio-quality audio podcasts powered by the Sarvam API.",
    tags: ["Next.js", "Llama 3.1", "Stripe", "Sarvam API"],
    href: "https://all-tech-daily.vercel.app/",
    banner: "/banners/all-tech-daily.svg",
    accent: "#c7f24a",
    // taller image (1.54:1) — keep full height, crop sides
    position: "center center",
  },
  {
    title: "The Tangy Leaf",
    category: "Cafe Website · MERN",
    year: "2024",
    description:
      "A dynamic cafe web application built using the MERN stack. Users can browse menus, locate nearby cafes, and place orders with real-time tracking. The platform integrates secure online payments through Razorpay, includes an AI-powered chatbot for customer assistance, and provides access to the companion mobile application.",
    tags: ["MERN", "Razorpay", "AI Chatbot", "Real-time"],
    href: "https://the-tangy-leaf.onrender.com/",
    banner: "/banners/the-tangy-leaf.svg",
    accent: "#f59e0b",
    // wide screenshot — show from top (nav) down
    position: "top center",
  },
  {
    title: "E-Commerce App",
    category: "E-commerce",
    year: "2024",
    description:
      "A simple and modern e-commerce web application focused on responsive design and smooth user interactions. Features include order placement, shopping cart management, wishlist functionality, and a clean shopping experience.",
    tags: ["React", "Responsive", "Cart", "Wishlist"],
    href: "https://github.com/Saroj-Swadithya/E-Commerce-website",
    banner: "/banners/ecommerce.svg",
    accent: "#60a5fa",
    // wide screenshot with browser chrome — show from top
    position: "top center",
  },
];

export const services = [
  {
    no: "01",
    title: "Websites for Local Businesses",
    desc: "Modern, fast websites for cafes, shops, and small businesses — get online and look professional.",
  },
  {
    no: "02",
    title: "Web Apps",
    desc: "Custom web applications built with modern frameworks — booking systems, dashboards, admin panels.",
  },
  {
    no: "03",
    title: "Frontend Development",
    desc: "Clean, responsive interfaces that work great on every device and are a pleasure to use.",
  },
  {
    no: "04",
    title: "AI-Enhanced Features",
    desc: "Exploring how AI can make your app smarter — chatbots, recommendations, automation. (Learning & growing here!)",
  },
];

// Scrolling marquee of skills / tools
export const skills = [
  "Java",
  "Python",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "MongoDB",
  "SQL",
  "Git",
  "REST APIs",
];
