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
    title: "CrowdGuard AI",
    type: "AI Safety Project",
    description:
      "An intelligent crowd monitoring concept focused on threat detection, false alarm reduction, and real-time crowd safety insights.",
    tech: ["AI", "Computer Vision", "Python", "Dashboard"],
  },
];

const skills = [
  "Python",
  "JavaScript",
  "React",
  "FastAPI",
  "Flask",
  "MySQL",
  "Machine Learning",
  "Deep Learning",
  "Docker",
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
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="tag">BTech CSE — AI & Data Science</p>

            <h1>
              Hi, I&apos;m <span>Pavan</span>. I build AI and full-stack web
              projects.
            </h1>

            <p className="hero-text">
              I am a Computer Science student specializing in Artificial
              Intelligence and Data Science. I work on practical projects using
              React, FastAPI, Python, MySQL, and machine learning.
            </p>

            <div className="hero-buttons">
              <a href="#projects" className="btn primary-btn">
                View Projects
              </a>
              <a href="#contact" className="btn secondary-btn">
                Contact Me
              </a>
            </div>
          </div>

          <div className="profile-card">
            <img src="/profile.jpg" alt="Pavan Kumar Verma" className="profile-img" />

            <div className="profile-info">
              <p>🎓 AKS University, Satna</p>
              <p>💼 TCS iON Graduate Engineer Trainee IT</p>
              <p>📍 Satna, Madhya Pradesh</p>
              <p>📧 vermapavan9078@gmail.com</p>
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
                <p>ML, Deep Learning, MySQL, Data Analysis</p>
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
                collaboration, and learning-focused roles in software
                development, AI/ML, and full-stack development.
              </p>

              <div className="contact-buttons">
                <a href="mailto:vermapavan9078@gmail.com" className="btn primary-btn">
                  Email
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

      <footer>
        © 2026 Pavan Kumar Verma. Built with React.
      </footer>
    </div>
  );
}

export default App;