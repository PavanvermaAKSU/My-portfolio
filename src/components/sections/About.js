import React from "react";
import { motion } from "framer-motion";
import { PERSONAL_INFO } from "../../data/portfolioData";
import { GraduationCap, Code2, Brain, Database } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="bq-chapter">
      <div className="bq-chapter__shell">
        <div className="bq-chapter__header">
          <span className="bq-chapter__num">02 /</span>
          <span className="bq-chapter__label">About</span>
          <h2 className="bq-chapter__title">
            The <em>engineer</em> behind
            <br />
            the models.
          </h2>
        </div>

        <div className="bq-about__grid">
          {/* Main Bio Column */}
          <motion.div
            className="bq-about__bio"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="bq-about__paragraph-lead">
              Hi, I'm <strong>{PERSONAL_INFO.name}</strong>, a B.Tech Artificial Intelligence &amp; Data Science engineer focused on building practical, real-world AI solutions, high-precision machine learning models, and high-performance web systems.
            </p>
            <p className="bq-about__paragraph">
              My engineering work spans end-to-end predictive pipelines (such as Sales Forecasting &amp; Demand Optimization, Employee Turnover Prediction) and real-time computer vision systems (including Face Mask Detection using YOLOv8 with OpenCV).
            </p>
            <p className="bq-about__paragraph">
              I bridge complex mathematical algorithms and statistical models with clean, responsive React frontends and scalable FastAPI architectures.
            </p>

            <div className="bq-about__skills-highlight">
              <div className="bq-skill-pill">
                <Brain size={14} /> AI & Machine Learning
              </div>
              <div className="bq-skill-pill">
                <Database size={14} /> Data Intelligence & Analytics
              </div>
              <div className="bq-skill-pill">
                <Code2 size={14} /> Full-Stack Development
              </div>
            </div>
          </motion.div>

          {/* Aside Column: Education & Foundations */}
          <motion.div
            className="bq-about__aside"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bq-about__block">
              <span className="bq-about__block-label">
                <GraduationCap size={15} /> Academic Foundations
              </span>
              <div className="bq-edu-list">
                {PERSONAL_INFO.education.map((edu, idx) => (
                  <div key={idx} className="bq-edu-item">
                    <div className="bq-edu-degree">{edu.degree}</div>
                    <div className="bq-edu-institution">{edu.institution}</div>
                    <div className="bq-edu-duration">{edu.duration}</div>
                    <div className="bq-edu-details">{edu.details}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bq-about__block">
              <span className="bq-about__block-label">Core Competencies</span>
              <ul className="bq-about__list">
                {PERSONAL_INFO.topSkills.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
                <li>Predictive Modeling &amp; Time Series</li>
                <li>Computer Vision (YOLOv8, OpenCV)</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
