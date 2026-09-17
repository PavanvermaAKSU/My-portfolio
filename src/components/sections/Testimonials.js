import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "XYlofy AI Team",
    role: "AI & Data Science Internship",
    text: "Pavan demonstrated exceptional analytical thinking and delivered high-quality sales forecasting models with clean, production-ready code.",
    stars: 5,
  },
  {
    name: "MPOnline Limited",
    role: "SDE Internship",
    text: "Reliable, technically sharp, and a great communicator. Pavan adapted quickly to enterprise workflows and contributed meaningfully to our projects.",
    stars: 5,
  },
  {
    name: "CODTECH IT Solution",
    role: "AI Internship",
    text: "Impressive depth in computer vision and machine learning. Delivered the face mask detection project ahead of schedule with thorough documentation.",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="content-section">
      <div className="section-shell">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Feedback</span>
          <h2 className="section-heading">What they say</h2>
        </motion.div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={idx}
              className="testimonial-card"
              initial={{ opacity: 0, y: 28, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5, borderColor: "rgba(0,240,255,0.25)", boxShadow: "0 20px 50px rgba(0,240,255,0.07)" }}
            >
              <div className="testimonial-stars">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <span className="testimonial-name">{t.name}</span>
                <span className="testimonial-role">{t.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
