import React from "react";
import { motion } from "framer-motion";
import { PERSONAL_INFO } from "../../data/portfolioData";
import { GraduationCap, Code2, Brain, Database, Terminal, Sparkles } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="bq-chapter">
      <div className="bq-chapter__shell">
        <div className="bq-chapter__header">
          <span className="bq-chapter__num">02 /</span>
          <span className="bq-chapter__label">Identity &amp; Profile Lounge</span>
          <h2 className="bq-chapter__title">
            The <em>engineer</em> behind
            <br />
            the intelligence.
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
              Hi, I'm <strong>{PERSONAL_INFO.name}</strong>, a B.Tech Computer Science Engineering (Artificial Intelligence &amp; Data Science) undergraduate at AKS University, Satna (Class of {PERSONAL_INFO.expectedGraduation}).
            </p>
            <p className="bq-about__paragraph">
              My strongest programming language is <strong>Python</strong>. I am focused on building practical, real-world AI solutions, machine learning models, and high-performance full-stack web applications.
            </p>
            <p className="bq-about__paragraph">
              My engineering experience includes end-to-end sales forecasting pipelines, real-time edge computer vision using YOLO with FastAPI and React, and automated civic intelligence systems designed for Smart Rewa 2030.
            </p>

            <div className="bq-about__skills-highlight">
              <div className="bq-skill-pill">
                <Brain size={14} /> AI &amp; Machine Learning
              </div>
              <div className="bq-skill-pill">
                <Terminal size={14} /> Python (Primary Strength)
              </div>
              <div className="bq-skill-pill">
                <Database size={14} /> Data Intelligence &amp; Time Series
              </div>
              <div className="bq-skill-pill">
                <Code2 size={14} /> Full-Stack (FastAPI + React)
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
              <span className="bq-about__block-label">
                <Sparkles size={15} /> Technical Focus &amp; Interests
              </span>
              <ul className="bq-about__list">
                {(PERSONAL_INFO.interests || []).map((interest, idx) => (
                  <li key={idx}>{interest}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
