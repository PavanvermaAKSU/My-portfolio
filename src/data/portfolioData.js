export const PERSONAL_INFO = {
  name: "Pavan Kumar Verma",
  headline: "Aspiring Data Science & AI Engineer, Full-Stack Developer",
  subheading: "Focused on building practical, real-world AI solutions, machine learning models, and high-performance web systems.",
  location: "Raghurajnagar, Satna, Madhya Pradesh, India",
  email: "vermapavan9078@gmail.com",
  github: "https://github.com/PavanvermaAKSU",
  linkedin: "https://www.linkedin.com/in/pavan-kumar-verma",
  portfolio: "https://my-portfolio-one-fawn-20.vercel.app/",
  status: "Seeking Industry Experience & Impactful AI Roles",
  summary:
    "Hi, I'm Pavan Kumar Verma, a B.Tech Computer Science Engineering (AI & Data Science) student with a strong interest in Data Science, Machine Learning, Artificial Intelligence, and Full-Stack Development. I enjoy building practical, real-world AI solutions and continuously improving my technical skills through projects and hands-on learning. My experience includes developing machine learning models for End to End Sales Forecast & intelligent demand, Employee Attrition Prediction, and Face Mask Detection using YOLO. My technical skills include Python, SQL, Machine Learning, Data Analysis, Pandas, NumPy, Scikit-learn, Matplotlib, React.js, FastAPI, HTML, CSS, JavaScript, Git, and GitHub. I am passionate about solving real-world problems using data-driven approaches and continuously learning new technologies. Currently seeking opportunities to gain industry experience, collaborate on impactful projects, and grow as a Data Scientist, AI Engineer, or Machine Learning Engineer.",
  education: [
    {
      institution: "AKS University, Satna (M.P.)",
      degree: "Bachelor of Technology, Artificial Intelligence & Data Science",
      duration: "September 2023 — December 2027",
      details: "Comprehensive coursework in Machine Learning, Deep Learning, Data Structures, and Software Design.",
    },
    {
      institution: "Govt. Gyanodaya Vidyalaya, Rewa (M.P.)",
      degree: "High School - Higher Secondary, PCM",
      duration: "2019 — 2023",
      details: "Solid foundations in Mathematics, Physics, and Analytical Problem Solving.",
    },
  ],
  topSkills: [
    "Software Development Life Cycle (SDLC)",
    "Knowledge Engineering",
    "Software Design & Architecture",
  ],
};

export const METRICS = [
  { value: "5", label: "Industry Internships", detail: "XYlofy AI, Future Interns, CODTECH, MPOnline, TCS iON" },
  { value: "10+", label: "Projects Completed", detail: "Sales Forecast, YOLO Vision, Attrition, LMS, Analytics" },
  { value: "3+", label: "Professional Certs", detail: "Microsoft Azure AI & Power BI Verified" },
  { value: "60+", label: "FPS 3D Experience", detail: "GPU-accelerated smooth WebGL rendering" },
];

export const SERVICES = [
  {
    number: "01",
    title: "AI & Machine Learning",
    description: "Practical predictive models, computer vision systems, and data-driven automation designed around real use cases.",
  },
  {
    number: "02",
    title: "Data Intelligence",
    description: "From raw datasets to forecasting, dashboards, and clear decisions that teams can act on.",
  },
  {
    number: "03",
    title: "Full-Stack Products",
    description: "Thoughtful React interfaces and FastAPI backends for fast, dependable digital products.",
  },
];

export const PROJECTS = [
  {
    id: "sales-forecast",
    number: "01",
    title: "End to End Sales Forecast & Intelligent Demand",
    category: "Machine Learning & Time Series",
    tagline: "Predictive retail forecasting engine for dynamic inventory optimization and demand trends.",
    description:
      "Developed an end-to-end sales forecasting pipeline utilizing advanced time series modeling and regression techniques to forecast commercial demand curves, analyze seasonal purchasing patterns, and visualize dynamic KPIs through interactive dashboards.",
    tech: ["Python", "Machine Learning", "Time Series", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
    metrics: { accuracy: "High Forecast Accuracy", impact: "Minimized Stock-outs", latency: "<100ms Inference" },
    accent: "#00f0ff",
    github: "https://github.com/PavanvermaAKSU",
    features: [
      "Time series trend decomposition & seasonality analysis",
      "Feature engineering on historical sales velocity and price elasticity",
      "Automated outlier handling and data normalization",
      "Interactive data dashboard for stakeholder revenue forecasting",
    ],
  },
  {
    id: "face-mask-yolo",
    number: "02",
    title: "Real-time Face Mask Detection using YOLO",
    category: "Computer Vision & Deep Learning",
    tagline: "High-speed multi-target visual detection model for public health safety compliance.",
    description:
      "Engineered an intelligent computer vision system using modern YOLO architectures to detect face mask compliance in real time across video streams, handling varying lighting conditions, motion blur, and spatial occlusions.",
    tech: ["Python", "YOLO", "OpenCV", "PyTorch", "Computer Vision", "Deep Learning"],
    metrics: { speed: "Real-time 60 FPS", precision: "High mAP Score", latency: "Ultra-low Latency" },
    accent: "#10b981",
    github: "https://github.com/PavanvermaAKSU",
    features: [
      "Real-time bounding box detection with multi-class classification",
      "Robust to occlusions, angles, and varied lighting environments",
      "Integrated with OpenCV video capture and processing pipelines",
      "Optimized model weights for efficient CPU/GPU edge inference",
    ],
  },
  {
    id: "employee-attrition",
    number: "03",
    title: "Employee Attrition Prediction Model",
    category: "Predictive Analytics & HR Intelligence",
    tagline: "Machine learning classification model predicting employee turnover risks and key drivers.",
    description:
      "Built a data-driven predictive classification system to identify employee attrition patterns. Conducted extensive exploratory data analysis, correlation studies, and feature importance rankings to help organizations retain top talent proactively.",
    tech: ["Python", "Scikit-learn", "Data Analysis", "Pandas", "Matplotlib", "Seaborn"],
    metrics: { f1Score: "High Precision & Recall", features: "30+ Explored Metrics", impact: "Actionable Retention" },
    accent: "#a855f7",
    github: "https://github.com/PavanvermaAKSU",
    features: [
      "Comprehensive exploratory data analysis identifying key turnover factors",
      "Comparison across multiple ML classifiers (Random Forest, Logistic Regression)",
      "Feature importance ranking for HR intervention strategies",
      "Clean data preprocessing and imbalanced dataset handling",
    ],
  },
  {
    id: "smart-study-planner",
    number: "04",
    title: "Smart Study Planner (LMS Platform)",
    category: "Full-Stack Development",
    tagline: "Intelligent learning platform integrating resources, automated schedules, and progress tracking.",
    description:
      "A modern, full-stack learning management application bringing course resources, dynamic schedule algorithms, progress tracking, and student dashboards into one unified responsive workspace.",
    tech: ["React.js", "FastAPI", "Python", "MySQL", "REST API", "JavaScript", "CSS"],
    metrics: { architecture: "Decoupled REST API", responseTime: "<90ms API", db: "Optimized MySQL" },
    accent: "#f59e0b",
    github: "https://github.com/PavanvermaAKSU/Smart-study-planner-LMS-",
    features: [
      "Dynamic study plan generation based on student commitments",
      "FastAPI backend with high-performance asynchronous endpoints",
      "Normalized relational database schema with MySQL",
      "Modern React interface with responsive navigation and analytics",
    ],
  },
  {
    id: "campus-pulse",
    number: "05",
    title: "Campus Pulse Satisfaction Analytics",
    category: "Data Science & NLP Dashboard",
    tagline: "Student feedback intelligence platform turning feedback into actionable governance decisions.",
    description:
      "Feedback intelligence dashboard that ingests student signals, evaluates sentiment trends, and aggregates departmental satisfaction metrics into clear interactive charts for institutional leadership.",
    tech: ["React.js", "FastAPI", "Python", "Data Analysis", "NLP Sentiment", "Charts"],
    metrics: { feedback: "1,500+ Submissions", sentiment: "Realtime Scoring", ui: "Interactive Visuals" },
    accent: "#06b6d4",
    github: "https://github.com/PavanvermaAKSU/Campus-pulse-satisfaction-dashboard",
    features: [
      "Sentiment classification across multi-department student feedback",
      "Interactive data visualizations and filterable department scorecards",
      "RESTful API service linking frontend visualizations to backend analytics",
      "Actionable reporting for academic administration and facility improvements",
    ],
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
      "An intensive learning journey solving real-world challenges with increasing complexity. Spearheaded advanced projects involving Sales Forecasting, Time Series Analysis, Machine Learning model training, and building Interactive Dashboards.",
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
      "Selected for the Data Science & Analytics Internship under the competitive Fellowship Program. Focused on orientation, skill development, and practical application of data science and analytics concepts in real-world environments.",
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
      "Engaged in a comprehensive training program focused on artificial intelligence and machine learning concepts. Collaborated with team members to develop practical solutions that enhance learning and skill development.",
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
      "Finished a 5-month internship at MPOnline Ltd., gaining direct practical exposure to industry-level workflows, professional communication, and real-world technical project experience as part of academic training.",
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
      "Gained comprehensive hands-on experience in software development, web technologies, database management, and project-based learning through the TCS iON GET–IT Program.",
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

export const TECH_SKILLS = [
  {
    category: "AI & Machine Learning",
    skills: ["Machine Learning", "Deep Learning", "YOLO (Computer Vision)", "Time Series Analysis", "Scikit-learn", "OpenCV", "NLP"],
  },
  {
    category: "Data Science & Analytics",
    skills: ["Python", "SQL", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Data Analysis", "Power BI"],
  },
  {
    category: "Full-Stack Development",
    skills: ["React.js", "FastAPI", "HTML5", "CSS3", "JavaScript", "REST APIs", "MySQL"],
  },
  {
    category: "Engineering & Tools",
    skills: ["Git", "GitHub", "SDLC", "Software Design", "Knowledge Engineering"],
  },
];
