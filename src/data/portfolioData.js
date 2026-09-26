/**
 * Central Portfolio Data Model for Pavan Kumar Verma
 * All content is strictly authentic and data-driven.
 * Consumed by 3D digital studio world and accessible DOM layers.
 */

export const PERSONAL_INFO = {
  name: "Pavan Kumar Verma",
  role: "AI/ML Engineer • Data Science Enthusiast • Full-Stack Developer",
  headline: "AI Engineer in the Making • Building Intelligent Systems",
  subheading:
    "Engineering practical, real-world AI solutions, computer vision pipelines, predictive models, and high-performance full-stack web platforms.",
  institution: "AKS University, Satna",
  degree: "B.Tech CSE — Artificial Intelligence & Data Science",
  expectedGraduation: "2027",
  primaryStrength: "Python",
  location: "Satna, Madhya Pradesh, India",
  email: "vermapavan9078@gmail.com",
  github: "https://github.com/PavanvermaAKSU",
  linkedin: "https://linkedin.com/in/pavan-kumar-verma-19a42127",
  portfolio: "https://my-portfolio-one-fawn-20.vercel.app/",
  careerDirections: [
    "AI Engineer",
    "ML Engineer",
    "Data Scientist",
    "AI/LLM Application Developer",
    "Full-Stack AI Developer",
  ],
  openingStatements: {
    heroKicker: "AI ENGINEER IN THE MAKING.",
    heroTagline: "I BUILD INTELLIGENT SYSTEMS.",
    welcome: "Welcome to my digital workspace.",
  },
  summary:
    "I am Pavan Kumar Verma, a B.Tech Computer Science Engineering (AI & Data Science) undergraduate at AKS University, Satna (Class of 2027). My primary programming strength is Python, and I am focused on building practical, real-world AI solutions, computer vision systems, and robust full-stack applications. My work spans predictive modeling for sales forecasting, real-time face mask detection with YOLO, automated civic intelligence systems, and production client platforms.",
  education: [
    {
      institution: "AKS University, Satna (M.P.)",
      degree: "B.Tech CSE — Artificial Intelligence & Data Science",
      duration: "September 2023 — June 2027 (Expected)",
      details:
        "Rigorous coursework in Machine Learning, Deep Learning, Data Science, Computer Vision, Algorithms, and Software Architecture.",
    },
    {
      institution: "Govt. Gyanodaya Vidyalaya, Rewa (M.P.)",
      degree: "Higher Secondary Certificate (PCM)",
      duration: "2019 — 2023",
      details: "Strong academic foundations in Mathematics, Physics, and Analytical Problem Solving.",
    },
  ],
  interests: [
    "AI / Machine Learning",
    "Large Language Models (LLMs)",
    "Retrieval-Augmented Generation (RAG)",
    "Autonomous AI Agents",
    "Computer Vision & YOLO",
    "Data Science & Analytics",
    "Backend & REST API Engineering",
    "Full-Stack Web Development",
    "Workflow Automation",
  ],
};

export const SERVICES = [
  {
    number: "01",
    title: "AI & Machine Learning",
    description: "Practical predictive models, computer vision systems, and data-driven automation designed around real use cases.",
  },
  {
    number: "02",
    title: "Data Intelligence & Pipelines",
    description: "From raw telemetry and multi-source web scrapers to forecasting, vector search, and clear decision engines.",
  },
  {
    number: "03",
    title: "Full-Stack AI Products",
    description: "Thoughtful React interfaces and FastAPI asynchronous backends with Docker containerization and relational databases.",
  },
];

export const METRICS = [
  { value: "05", label: "Industry Internships", detail: "XYlofy AI, Future Interns, CODTECH, MPOnline, TCS iON" },
  { value: "06+", label: "Featured AI/Web Systems", detail: "Sales Forecast, YOLO Vision, Smart LMS, Samarveer, Jansetu AI, n8n" },
  { value: "03+", label: "Verified Credentials", detail: "Microsoft Azure AI & Power BI Professional Certifications" },
  { value: "2027", label: "Target Graduation", detail: "B.Tech CSE AI & DS at AKS University, Satna" },
];

export const PROJECTS = [
  {
    id: "sales-forecast",
    number: "01",
    title: "End-to-End Sales Forecasting",
    category: "Machine Learning & Forecasting",
    roomLabel: "Data Visualization & Forecasting Screen",
    tagline: "Predictive retail forecasting engine for dynamic inventory optimization and demand curves.",
    description:
      "A comprehensive machine learning pipeline designed to forecast commercial retail sales and dynamic customer demand curves. Features time series trend decomposition, historical velocity feature engineering, automated outlier handling, and an interactive KPI dashboard for inventory planning.",
    tech: ["Python", "Machine Learning", "Time Series", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
    metrics: { accuracy: "High Accuracy Metric", impact: "Minimized Stock-outs", latency: "<100ms Model Query" },
    accent: "#00f0ff",
    github: "https://github.com/PavanvermaAKSU",
    features: [
      "Time series trend decomposition and seasonal pattern analysis",
      "Feature engineering on sales velocity and price elasticity",
      "Automated outlier handling and data normalization pipelines",
      "Interactive data dashboard for stakeholder revenue forecasting",
    ],
  },
  {
    id: "face-mask-detection",
    number: "02",
    title: "Face Mask Detection",
    category: "Computer Vision & YOLO",
    roomLabel: "Interactive Computer-Vision Scanner Installation",
    tagline: "Real-time edge vision system classifying mask compliance into 3 distinct target classes.",
    description:
      "Engineered a high-speed computer vision detection system utilizing custom YOLO architectures with FastAPI and React. Accurately detects and classifies faces into with_mask, without_mask, and incorrect_mask across real-time video streams under variable lighting and occlusions.",
    tech: ["YOLO", "FastAPI", "React", "SQLite", "Computer Vision", "Python", "OpenCV"],
    classes: ["with_mask", "without_mask", "incorrect_mask"],
    metrics: { speed: "Real-time 60 FPS", classes: "3 Target Classes", precision: "High mAP50 Score" },
    accent: "#10b981",
    github: "https://github.com/PavanvermaAKSU",
    features: [
      "Real-time bounding box detection with 3-class spatial classification",
      "Trained to detect: with_mask, without_mask, and incorrect_mask",
      "FastAPI asynchronous backend with lightweight SQLite logging",
      "Optimized model weights for efficient CPU/GPU edge inference",
    ],
  },
  {
    id: "smart-study-planner",
    number: "03",
    title: "Smart Study Planner LMS",
    category: "Full-Stack & EdTech",
    roomLabel: "Modern Digital Classroom Workstation",
    tagline: "Student/teacher learning management platform with dynamic schedule algorithms and progress analytics.",
    description:
      "A modern, full-stack learning management platform connecting students and educators. Features automated study timetable generators based on commitments, structured course resource hubs, progress tracking charts, and containerized deployment with Docker.",
    tech: ["React", "FastAPI", "MySQL", "Docker", "Python", "REST APIs"],
    metrics: { architecture: "Dockerized Containers", responseTime: "<90ms API Latency", db: "Optimized MySQL Relational" },
    accent: "#f59e0b",
    github: "https://github.com/PavanvermaAKSU/Smart-study-planner-LMS-",
    features: [
      "Dynamic study plan generation based on student workload commitments",
      "FastAPI backend with high-performance asynchronous endpoints",
      "Normalized relational database schema with MySQL",
      "Modern React interface with responsive navigation and analytics",
    ],
  },
  {
    id: "samarveer-auto",
    number: "04",
    title: "Samarveer Auto Parts & Lubs",
    category: "Commercial Client Platform",
    roomLabel: "Commercial Enterprise Product Suite",
    tagline: "Real-world automotive parts enterprise platform with RBAC, Razorpay payments, and AI business assistant.",
    description:
      "A commercial-grade enterprise platform engineered for a real-world client business. Includes comprehensive Role-Based Access Control (RBAC), JWT security, product inventory management, Razorpay payment gateway integration, and an intelligent AI chatbot for customer inquiries.",
    tech: ["React", "FastAPI", "MySQL", "JWT", "RBAC", "Docker", "Razorpay", "AI Chatbot"],
    metrics: { security: "JWT & RBAC Protected", checkout: "Razorpay Integrated", scale: "Production Docker Setup" },
    accent: "#e11d48",
    github: "https://github.com/PavanvermaAKSU",
    features: [
      "Role-Based Access Control (RBAC) for administrators, staff, and customers",
      "Secure JWT-based session and authentication management",
      "Automotive parts catalog with stock tracking and search filters",
      "Integrated Razorpay payment workflow and automated invoice generation",
      "AI-powered business chatbot for customer assistance and order queries",
    ],
  },
  {
    id: "jansetu-ai",
    number: "05",
    title: "Jansetu AI / Vindhya Jansetu AI",
    category: "Civic Intelligence & AI Governance",
    roomLabel: "Futuristic Civic Intelligence Room",
    tagline: "AI-powered governance concept for Smart Rewa 2030 transforming citizen voice/text into structured cases.",
    description:
      "A visionary civic intelligence platform concept tailored for the Smart Rewa 2030 initiative. Processes citizen inputs through multi-lingual voice/text processing, extracts semantics, classifies issues into government departments, prioritizes emergencies, detects duplicate or systemic community problems, and formats structured cases for administrative resolution.",
    tech: ["Python", "FastAPI", "NLP & LLM", "Voice Processing", "Semantic Classification", "React", "Vector Search"],
    pipeline: [
      "Citizen Voice/Text Input",
      "AI Understanding & NLP",
      "Department Classification",
      "Intelligent Routing",
      "Urgency Prioritization",
      "Duplicate & Systemic Issue Detection",
      "Structured Governance Cases",
    ],
    metrics: { vision: "Smart Rewa 2030", ingestion: "Voice & Text Ingestion", dispatch: "Automated Routing" },
    accent: "#a855f7",
    github: "https://github.com/PavanvermaAKSU",
    features: [
      "Multi-modal citizen voice and text ingestion with dialect adaptability",
      "Automated NLP classification across municipal, road, water, and power departments",
      "Intelligent duplicate detection clustering regional civic pain points",
      "Administrative triage console for tracking resolution velocity",
    ],
  },
  {
    id: "n8n-workflow",
    number: "06",
    title: "n8n Workflow Popularity System",
    category: "Data Pipelines & Automation",
    roomLabel: "Automation & Data Pipeline Installation",
    tagline: "Production-oriented automation engine discovering, scraping, and ranking trending n8n workflows.",
    description:
      "An automated data intelligence and workflow ranking pipeline that continuously monitors and evaluates n8n automation workflows across multiple channels: YouTube, the official n8n Forum, and Google Search Trends. Ranks templates by adoption velocity and complexity metrics.",
    tech: ["Python", "n8n", "Data Pipelines", "Web Scraping", "FastAPI", "Automation", "REST APIs"],
    sources: ["YouTube API", "n8n Community Forum", "Google Search & Trends"],
    metrics: { sources: "Multi-Platform Aggregation", scoring: "Trend Velocity Ranking", cadence: "Automated Execution" },
    accent: "#06b6d4",
    github: "https://github.com/PavanvermaAKSU",
    features: [
      "Multi-source web scraping and API connectors for YouTube, Forums, and Search Trends",
      "Normalized scoring algorithm measuring workflow popularity velocity",
      "Automated data pipeline running scheduled n8n workflow triggers",
      "Interactive rankings dashboard for discovering high-impact automation blueprints",
    ],
  },
];

export const TECH_SKILLS = {
  core: {
    title: "Core Engineering",
    description: "Foundational programming languages, frameworks, and web architectures.",
    skills: ["Python", "JavaScript", "React", "FastAPI", "MySQL", "SQLite", "Docker", "Git", "GitHub"],
  },
  ai_ml: {
    title: "AI / Machine Learning & Vision",
    description: "Predictive algorithms, deep learning vision models, LLMs, and agentic workflows.",
    skills: ["Machine Learning", "Computer Vision", "YOLO", "LLMs", "RAG", "AI Agents", "Data Science"],
  },
  cloud_tools: {
    title: "Cloud & Automation Tools",
    description: "Enterprise cloud services, workflow orchestration, and automated execution.",
    skills: ["AWS", "AWS Bedrock", "n8n", "UiPath", "REST APIs"],
  },
};

export const SKILL_CATEGORIES = Object.values(TECH_SKILLS);

export const TECH_SKILLS_FLAT = [
  { name: "Python", category: "core", level: "Primary Strength" },
  { name: "FastAPI", category: "core", level: "Backend & APIs" },
  { name: "React", category: "core", level: "Frontend Architecture" },
  { name: "Docker", category: "core", level: "Containerization" },
  { name: "MySQL", category: "core", level: "Relational Databases" },
  { name: "Git & GitHub", category: "core", level: "Version Control" },
  { name: "YOLO (Vision)", category: "ai_ml", level: "Object Detection" },
  { name: "Machine Learning", category: "ai_ml", level: "Supervised & Time Series" },
  { name: "LLMs & RAG", category: "ai_ml", level: "Language Models" },
  { name: "AI Agents", category: "ai_ml", level: "Autonomous Workflows" },
  { name: "Data Science", category: "ai_ml", level: "Pandas & Scikit-Learn" },
  { name: "AWS Bedrock", category: "cloud_tools", level: "Generative AI" },
  { name: "n8n", category: "cloud_tools", level: "Workflow Automation" },
  { name: "UiPath", category: "cloud_tools", level: "RPA Automation" },
  { name: "REST APIs", category: "cloud_tools", level: "Asynchronous Design" },
];

export const JOURNEY_STAGES = [
  {
    step: "01",
    title: "Academic Foundations",
    focus: "B.Tech CSE in Artificial Intelligence & Data Science at AKS University, Satna.",
    detail: "Building rigorous mathematical foundations in linear algebra, statistics, calculus, and algorithms.",
  },
  {
    step: "02",
    title: "Python & Core Programming",
    focus: "Mastering Python as primary engineering weapon alongside object-oriented design.",
    detail: "Developed high-proficiency coding habits, data structures mastery, and clean code principles.",
  },
  {
    step: "03",
    title: "Machine Learning & Data Science",
    focus: "Exploratory data analysis, feature engineering, and predictive modeling.",
    detail: "Engineered time series sales forecasting algorithms and employee attrition classification pipelines.",
  },
  {
    step: "04",
    title: "Full-Stack System Architecture",
    focus: "Bridging mathematical backends with modern React and FastAPI interfaces.",
    detail: "Constructed containerized web platforms with Docker, normalized MySQL databases, and secure JWT auth.",
  },
  {
    step: "05",
    title: "Real-World Commercial Delivery",
    focus: "Shipping production systems for real clients and users.",
    detail: "Delivered Samarveer Auto Parts & Lubs with RBAC and Razorpay, plus the Smart Study Planner LMS.",
  },
  {
    step: "06",
    title: "AI, LLMs & Computer Vision",
    focus: "Edge computer vision with YOLO and generative intelligence with LLMs / RAG.",
    detail: "Trained 3-class face mask detectors and architected the Vindhya Jansetu AI governance blueprint.",
  },
  {
    step: "07",
    title: "Automation & Autonomous Agents",
    focus: "Connecting workflows with n8n, AWS Bedrock, and intelligent agents.",
    detail: "Built the n8n popularity discovery system and dynamic workflow pipelines for automated operations.",
  },
  {
    step: "08",
    title: "Professional AI Engineering",
    focus: "Delivering scalable, ethical, and high-impact artificial intelligence systems.",
    detail: "Actively seeking industry opportunities to deploy transformative AI and machine learning solutions.",
  },
];

export const INTERNSHIPS = [
  {
    company: "XYlofy AI",
    role: "AI & Data Science Intern",
    period: "June 2026 — July 2026",
    duration: "2 months",
    status: "Internship",
    description:
      "Solving real-world data challenges involving Sales Forecasting, Time Series Analysis, Machine Learning model training, and building interactive dashboards for commercial stakeholders.",
    highlights: [
      "Sales Forecasting & Time Series Analysis modeling",
      "Data preprocessing, exploratory analysis, and feature optimization",
      "Developing interactive analytical dashboards for business stakeholders",
    ],
  },
  {
    company: "Future Interns",
    role: "Data Science & Analytics Intern",
    period: "May 2026 — June 2026",
    duration: "2 months",
    status: "Fellowship Program",
    description:
      "Selected under the competitive Fellowship Program. Focused on skill development, algorithm implementation, and practical application of data science concepts in collaborative real-world environments.",
    highlights: [
      "Mastery of Data Science fundamentals & analytical methodologies",
      "Practical project-based learning and hands-on algorithm implementation",
      "Real-world data problem solving and collaborative technical delivery",
    ],
  },
  {
    company: "CODTECH IT SOLUTION",
    role: "Artificial Intelligence Intern",
    period: "May 2026 — June 2026",
    duration: "2 months",
    status: "Internship",
    description:
      "Comprehensive training and development program focused on artificial intelligence and machine learning concepts. Collaborated to develop practical solutions that enhance applied AI competency.",
    highlights: [
      "Hands-on experience in practical AI and computer vision applications",
      "Collaborative development of predictive and classification pipelines",
      "Applied machine learning methodologies to innovative industry projects",
    ],
  },
  {
    company: "MPOnline Limited",
    role: "SDE Intern",
    period: "December 2025 — May 2026",
    duration: "6 months",
    location: "Satna",
    status: "Internship",
    description:
      "Direct practical exposure to industry-level enterprise workflows, collaborative software engineering practices, and real-world database implementations.",
    highlights: [
      "Industry-level software engineering workflows and code reviews",
      "Hands-on web and database implementation in enterprise environment",
      "Professional team communication and collaborative delivery",
    ],
  },
  {
    company: "TCS iON",
    role: "GET - IT Program Intern",
    period: "December 2025 — May 2026",
    duration: "6 months",
    location: "Satna",
    status: "Industry Program",
    description:
      "Hands-on experience in software development lifecycle (SDLC) discipline, web technologies, database management, and project-based engineering simulations through the TCS iON GET–IT Program.",
    highlights: [
      "Software development lifecycle (SDLC) discipline and industry standards",
      "Web technologies and modern database management practices",
      "Practical, project-based engineering simulations and assessments",
    ],
  },
];

export const CERTIFICATIONS = [
  {
    title: "Microsoft Azure AI Essentials: Workloads and Machine Learning on Azure",
    issuer: "Microsoft",
    tag: "Cloud AI",
    date: "Verified",
  },
  {
    title: "Microsoft Azure AI Essential Professional Certificate",
    issuer: "Microsoft & LinkedIn",
    tag: "Professional AI",
    date: "Verified",
  },
  {
    title: "Data to Dashboard in Power BI",
    issuer: "Live Workshop (3 Hours)",
    tag: "Business Intelligence",
    date: "Verified",
  },
];
