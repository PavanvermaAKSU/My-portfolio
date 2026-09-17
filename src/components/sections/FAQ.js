import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  { q: "What technologies do you specialize in?", a: "Python, Machine Learning (Scikit-learn, YOLO, OpenCV), React.js, FastAPI, SQL, and Power BI — with a focus on AI and data-driven product development." },
  { q: "Are you available for freelance or internship work?", a: "Yes! I'm actively seeking internship roles and open to freelance collaborations in AI, data science, and full-stack development." },
  { q: "What kind of projects do you take on?", a: "ML model development, computer vision systems, data dashboards, REST APIs, and full-stack React/FastAPI applications." },
  { q: "How can I get in touch?", a: "Use the contact form above, email me directly at vermapavan9078@gmail.com, or connect on LinkedIn or GitHub." },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="content-section">
      <div className="section-shell">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Quick Answers</span>
          <h2 className="section-heading">Frequently Asked</h2>
        </motion.div>

        <div className="faq-list">
          {FAQS.map((item, idx) => (
            <motion.div
              key={idx}
              className={`faq-item ${open === idx ? "faq-open" : ""}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
            >
              <button className="faq-question" onClick={() => setOpen(open === idx ? null : idx)}>
                <span>{item.q}</span>
                <motion.span animate={{ rotate: open === idx ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown size={18} />
                </motion.span>
              </button>
              <AnimatePresence>
                {open === idx && (
                  <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p>{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
