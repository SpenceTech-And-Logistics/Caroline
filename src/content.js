// All text on the site lives here. Edit this file, rebuild, redeploy.
// Source: Caroline's own CV site. Empty contact fields stay hidden.

export const person = {
  name: "Caroline Wanjiku Mbuthia",
  eyebrow: "Professional profile",
  title: "Finance, Operations & Strategy Specialist",
  focus: ["Lecturer (Business)", "Accounting", "Budgeting", "Supply chain", "Quality assurance"],
  affiliations: "JKUAT | USIU",
  photo: "/images/caroline.jpg",
}

export const contact = {
  email: "",
  phone: "",
  linkedin: "",
  location: "Nairobi, Kenya",
  formspree: "", // optional Formspree form id; leave blank to hide the form
}

export const about = [
  "A versatile professional with over 12 years of experience in operations, finance and strategy across diverse industries.",
  "Passionate about developing people through training and mentorship.",
]

export const stats = [
  { value: "12+", label: "years across operations, finance and strategy" },
  { value: "5", label: "organisations, from healthcare to aviation and manufacturing" },
  { value: "2", label: "degrees: MBA (JKUAT) and BSc (USIU-Africa)" },
]

export const topSkills = ["Program budgeting", "Account administration", "Corporate account management"]

export const experience = [
  {
    org: "Jomo Kenyatta University of Agriculture and Technology (JKUAT)", logo: "/images/jkuat.jpg",
    role: "Lecturer (part-time)", dates: "2024 to present", place: "CBD Campus, Nairobi County · On-site",
    points: ["Teach finance-related courses with a focus on applied business concepts.", "Guide students through practical case studies and financial management simulations.", "Develop engaging course materials that connect theory with real-world practice."],
    skills: ["Training", "Instructional design", "Training course development"],
  },
  {
    org: "Moldplast Kenya Limited", logo: "/images/moldplast.jpg",
    role: "Head of Operations, Product Distribution and Logistics", dates: "May 2020 to Nov 2023 · 3 yrs 7 mos", place: "Mlolongo, Machakos County · Full-time, on-site",
    skills: ["Logistics and supply chain optimization"],
  },
  {
    org: "Travelport | Official Partner | Kenya", logo: "/images/travelport.jpg",
    role: "Finance Associate, Collections Specialist", dates: "Oct 2014 to Sep 2019 · 5 yrs", place: "Nairobi County · Contract, on-site",
  },
  {
    org: "Delta Air Lines Global Services, LLC",
    role: "GSA Business Development Executive (Corporate Accounts)", dates: "2011 to 2014", place: "Nairobi County · Contract, on-site",
  },
  {
    org: "AIDS Healthcare Foundation", logo: "/images/ahf.jpg",
    role: "Program Accountant", dates: "2007 to 2010", place: "Nairobi County · Contract, on-site",
    skills: ["Program budgeting", "Credit control", "Corporate account management"],
  },
]

export const education = [
  { school: "Jomo Kenyatta University of Agriculture and Technology (JKUAT)", logo: "/images/jkuat.jpg", award: "Master of Business Administration (MBA), Finance, General", years: "2024 to 2025", skills: "Financial management and analysis" },
  { school: "United States International University - Africa", logo: "/images/usiu.jpg", award: "Bachelor of Science, International Business Administration, Finance, General", years: "2006", skills: "" },
]

export const skillGroups = [
  { title: "Finance", items: ["Program budgeting", "Financial management and analysis", "Credit control", "Account administration"] },
  { title: "Operations", items: ["Operational planning", "Logistics and supply chain optimization", "Cross-functional team leadership", "Compliance", "Quality assurance"] },
  { title: "Clients and strategy", items: ["Corporate account management", "Contract negotiation", "Client relations"] },
  { title: "Teaching and training", items: ["Training", "Instructional design", "Training course development", "Employee training"] },
]
