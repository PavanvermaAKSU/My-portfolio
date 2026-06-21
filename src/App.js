import "./App.css";

const projects = [
  {
    title: "Learning Platform with Smart Study Planner",
    type: "Full Stack Project",
    description:
      "A web-based LMS where students and teachers can manage learning resources, schedules, dashboards, and smart study planning features.",
    tech: ["React", "FastAPI", "MySQL", "Docker"],
    link: "https://github.com/PavanvermaAKSU/Smart-study-planner-LMS-",
  },
  {
    title: "Campus Pulse Satisfaction Dashboard",
    type: "TCS iON Industry Project",
    description:
      "A dashboard system to collect, analyze, and visualize student feedback for better campus decision-making and satisfaction tracking.",
    tech: ["React", "FastAPI", "MySQL", "Charts"],
    link: "https://github.com/PavanvermaAKSU/Campus-pulse-satisfaction-dashboard",
  },
  {
    title: "Online Signature Detection",
    type: "AI/ML Project",
    description:
      "An AI-based signature verification system that analyzes movement, speed, pressure, and stroke patterns to detect genuine or forged signatures.",
    tech: ["Python", "Flask", "TensorFlow", "JavaScript"],
  },
  {
    title: "Iris flower classification",
    type: "AI/ML Project",
    description:
      "An AI and data science based finished project for analzye input and according to input predict flower species",
    tech: ["AI","data science","machine learning","model training"],
  },
  {
    title: "Face mask detection",
    type: "AI/ML Project",
    description:
      "An AI based finished project by YOLOv8 model for analzye face mask weared or not or incorrect showes confident",
    tech: ["AI","computer vision","machine learning","model training","YOLOv8"],
  },
  {
    title: "Customer retaintion churn analysis",
    type: "Data science project",
    description: "Advanced customer churn analysis and prediction project using Python, Power BI, and Random Forest to identify churn risk, estimate revenue loss, and recommend retention strategies",
    tech: ["Python", "computer vision", "Data analysis", "Data science", "PowerBI"],
  },
  {
    title:"Business sales analytic dashboard",
    description: "I used Python for data cleaning and exploratory data analysis, and Power BI for creating an interactive dashboard. The project includes revenue trend analysis, top-selling products, category-wise revenue, region-wise sales and profit analysis, and business recommendations.",
    type : "Data science project",
    tech:["Python", "PowerBI", "Data analytics", "Creative innovation", "Consistency"],
  },
  {
    title:"House Price Prediction",
    description:"This project predicts house prices using Machine Learning.",
    type: "AI and ML project",
    tech : ["Python", "Jupyter Notebook", "Model training", "Machine learning"],
  },
  {
    title: "Marketing funnel analytics conversion dashboard",
    description:"Built an advanced Marketing Funnel Analytics Dashboard using Python, Streamlit, Pandas, and Scikit-learn to analyze campaign ROI, conversion rate, ROAS, funnel drop-off, and customer segments using K-Means clustering.",
    type: "Data science project",
    tech:["Python", "Data visualization", "Data science"],
  },
  {
    title: "Movie Recommendation system",
    description : "There is movie recommendation project using for new ai upgrade system with models",
    type:"AI and Ml Project",
    tech:["Python", "Machine learning", "Deep learning", "AI integration"],
    link:  "https://github.com/PavanvermaAKSU/MOVIE-RECOMMENDATION-SYSTEM",
  },
];

const skills = [
  "Project Management",
  "Project Planning",
  "YOLOv8",
  "Smart Using AI",
  "Full-Stack Development",
  "Python",
  "JavaScript",
  "React",
  "FastAPI",
  "Flask",
  "MySQL",
  "Machine Learning",
  "Deep Learning",
  "Git & GitHub",
];

function App() {
  return (
    <div className="app" id="top">
      <header className="header">
        <nav className="navbar">
          <a href="#top" className="logo">
            Pavan Kumar Verma
          </a>

          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-bg">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="hero-content">
            <p className="tag">BTech CSE — AI & Data Science</p>

            <h1>
              Hi, I&apos;m <span>Pavan</span>. I create smart, modern and
              scalable web experiences, and also excited for play with data.
            </h1>

            <p className="typing-text">
              • Data Science • AI/ML Enthusiast • Full-Stack Developer  
            </p>

            <p className="hero-text">
              I am a B.Tech CSE student specializing in Artificial Intelligence
              and Data Science at AKS University, Satna. I build practical
              projects using React, FastAPI, Python, MySQL, PowerBI, MS365 and AI/ML concepts.
            </p>

            <div className="hero-buttons">
              <a href="#projects" className="btn primary-btn">
                View Projects
              </a>
              <a href="#contact" className="btn secondary-btn">
                Contact Me
              </a>
              <a href="/Profile.pdf" download className="btn glass-btn">
                Download Profile
              </a>
            </div>
          </div>

          <div className="profile-3d-wrapper">
            <div className="profile-card profile-3d-card">
              <div className="profile-glow"></div>

              <div className="profile-image-ring">
                <img
                  src="/profile.jpg"
                  alt="Pavan Kumar Verma"
                  className="profile-img"
                />
              </div>

              <h3 className="profile-name">Pavan Kumar Verma</h3>
              <p className="profile-role">AI & Full-Stack Developer</p>

              <div className="profile-info">
                <p>🎓 AKS University, Satna</p>
                <p>💼 Ex. TCS iON GET–IT Program</p>
                <p>🏢 Ex. MPOnline Limited Intern</p>
                <p>📍 Madhya Pradesh, India</p>
                <p>📧 vermapavan9078@gmail.com</p>
              </div>

              <div className="mini-socials">
                <a
                  href="https://github.com/PavanvermaAKSU"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/pavan-kumar-verma-19a42127a"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p>
                    LinkedIn
                  </p>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="container">
            <h2>About Me</h2>
            <p>
              I am focused on becoming a skilled software developer and AI/ML
              engineer. My interests include full-stack development, data
              analysis, machine learning, deep learning, dashboards, and
              real-world problem-solving through technology.
            </p>
          </div>
        </section>

        <section className="stats-section">
          <div className="container stats-grid">
            <div className="stat-card">
              <h3>9+</h3>
              <p>Major Projects</p>
            </div>

            <div className="stat-card">
              <h3>5</h3>
              <p>Internship Experiences</p>
            </div>

            <div className="stat-card">
              <h3>12+</h3>
              <p>Technical Skills</p>
            </div>

            <div className="stat-card">
              <h3>2027</h3>
              <p>Expected Graduation</p>
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container">
            <h2>Featured Projects</h2>
            <p className="section-subtitle">
              Academic, internship, and AI-based project work.
            </p>

            <div className="project-grid">
              {projects.map((project) => (
                <div className="project-card" key={project.title}>
                  <p className="project-type">{project.type}</p>

                  <div className="project-title-row">
                    <h3>{project.title}</h3>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        aria-label={`Open ${project.title}`}
                      >
                        ↗
                      </a>
                    )}
                  </div>

                  <p className="project-desc">{project.description}</p>

                  <div className="tech-list">
                    {project.tech.map((item) => (
                      <span key={`${project.title}-${item}`}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section experience-section">
          <div className="container">
            <h2>Experience</h2>
            <p className="section-subtitle">
              Internship and industry-level learning experience.
            </p>

            <div className="timeline">
              <div className="timeline-item">
                <span className="timeline-dot"></span>
                <div className="timeline-card">
                  <h3>Tata Consultancy Services</h3>
                  <p className="timeline-role">
                    Intern — TCS iON GET–IT Program
                  </p>
                  <p>
                    Gaining hands-on experience in software development, web
                    technologies, database management, and project-based
                    learning through the TCS iON GET–IT Program.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <span className="timeline-dot"></span>
                <div className="timeline-card">
                  <h3>MPOnline Limited</h3>
                  <p className="timeline-role">Intern</p>
                  <p>
                    Gained practical exposure to industry-level workflows,
                    professional communication, project planning, and real-world
                    technical project experience.
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <span className="timeline-dot"></span>
                <div className="timeline-card">
                  <h3>CodeTech IT Solution</h3>
                  <p className="timeline-role">Artificial Intelligence Intern</p>
                  <p>
                    Such as great experience in working on hands-on project internship,
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <span className="timeline-dot"></span>
                <div className="timeline-card">
                  <h3>Future interns</h3>
                  <p className="timeline-role">Data science & analytic Intern</p>
                  <p>
                    Gaining hands-on projects experience in future intern great experience in there,
                    i'm done internship from there with Data science domain.
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <span className="timeline-dot"></span>
                <div className="timeline-card">
                  <h3>Xylofy AI</h3>
                  <p className="timeline-role">AI & DS Intern</p>
                  <p>
                    That internship is running now in this internship i have great experience something update after.....
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section skills-section">
          <div className="container">
            <h2>Skills</h2>

            <div className="skills-grid">
              {skills.map((skill) => (
                <div className="skill-box" key={skill}>
                  {skill}
                </div>
              ))}
            </div>

            <div className="skill-card-grid">
              <div className="skill-card">
                <h3>💻 Frontend</h3>
                <p>React, HTML, CSS, JavaScript</p>
              </div>

              <div className="skill-card">
                <h3>⚙️ Backend</h3>
                <p>FastAPI, Flask, APIs, Authentication</p>
              </div>

              <div className="skill-card">
                <h3>🧠 AI & Data</h3>
                <p>Machine Learning, Deep Learning, MySQL, Data Analysis, PowerBI</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section certification-section">
          <div className="container">
            <h2>Certifications</h2>

            <div className="cert-grid">
              <div className="cert-card">
                <div>
                  <h3>Certificate of Industry Project</h3>
                  <p>TCS iON</p>
                </div>
                <span>🏆</span>
              </div>

              <div className="cert-card">
                <div>
                  <h3>National Profeciency Test</h3>
                  <p>TCS iON </p>
                </div>
                <span>📄</span>
              </div>

              <div className="cert-card">
                <div>
                  <h3>
                    Artificial intelligence intern completion
                  </h3>
                  <p> CodeTech IT Solution</p>
                </div>
              </div>

              <div className="cert-card">
                <div>
                  <h3>
                    Microsoft Azure AI Essential Professional certificate
                  </h3>
                  <p>
                    Microsoft and LinkedIn
                  </p>
                </div>
              </div>

              <div className="cert-card">
                <div>
                  <h3>
                    Microsoft Azure AI Essentials: Workloads and Machine Learning on Azure
                  </h3>
                  <p>
                    LinkedIn
                  </p>
                </div>
              </div>

              <div className="cert-card">
                <div>
                  <h3>
                    Data Analytics for Business Professionals
                  </h3>
                  <p>
                    LinkedIn
                  </p>
                </div>
              </div>

              <div className="cert-card">
                <div>
                  <h3>
                    Career Essentials in Data Analysis
                  </h3>
                  <p>
                    Microsoft
                  </p>
                </div>
              </div>

              <div className="cert-card">
                <div>
                  <h3>
                    Interview Skills
                  </h3>
                  <p>
                    TCS iON
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section education-section">
          <div className="container">
            <h2>Education</h2>

            <div className="education-grid">
              <div className="education-card">
                <h3>AKS University, Satna</h3>
                <p>Bachelor of Technology — Artificial Intelligence</p>
                <span>2023 - 2027</span>
              </div>

              <div className="education-card">
                <h3>Govt. Gyanodaya Vidyalaya, Rewa</h3>
                <p>High School - Higher Secondary, PCM</p>
                <span>2019 - 2023</span>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container">
            <div className="contact-card">
              <h2>Let&apos;s Connect</h2>

              <p>
                I am open to internships, fresher opportunities, project
                collaboration, and learning-focused roles in Data Science, Data Analystics, software
                development, AI/ML, and full-stack development.
              </p>

              <div className="contact-buttons">
                <a
                  href="mailto:vermapavan9078@gmail.com"
                  className="btn primary-btn"
                >
                  Email Me
                </a>

                <a
                  href="https://github.com/PavanvermaAKSU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn secondary-btn"
                >
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/pavan-kumar-verma-19a42127a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn secondary-btn"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>© 2026 Pavan Kumar Verma. Professionnal Portfolio Built with React.</footer>
    </div>
  );
}

export default App;