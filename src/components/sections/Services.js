import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  {
    title: "Machine Learning Solutions",
    desc: "Custom AI models, predictive analytics, and computer vision systems tailored to solve complex business problems."
  },
  {
    title: "Full-Stack Web Engineering",
    desc: "High-performance React applications backed by scalable Python/FastAPI architectures."
  },
  {
    title: "Data Analytics & Engineering",
    desc: "Transforming raw data into actionable insights with automated pipelines and interactive dashboards."
  }
];

export default function Services() {
  return (
    <section id="services" className="bq-chapter">
      <div className="bq-chapter__shell">
        <div className="bq-chapter__header">
          <span className="bq-chapter__num">05 /</span>
          <span className="bq-chapter__label">Expertise</span>
          <h2 className="bq-chapter__title">What I <em>do</em>.</h2>
        </div>

        <div className="bq-services__list">
          {SERVICES.map((s, idx) => (
            <motion.div 
              key={idx}
              className="bq-service-row"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bq-service-row__num">
                {(idx + 1).toString().padStart(2, '0')}
              </div>
              <div className="bq-service-row__body">
                <h3 className="bq-service-row__title">{s.title}</h3>
                <p className="bq-service-row__desc">{s.desc}</p>
              </div>
              <div className="bq-service-row__arrow">
                <ArrowRight size={24} strokeWidth={1} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
