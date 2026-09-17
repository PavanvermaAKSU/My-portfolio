import React from "react";
import { motion } from "framer-motion";

export default function Careers() {
  return (
    <section id="careers" className="content-section">
      <div className="section-shell">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Open Roles</span>
          <h2 className="section-heading">Careers &amp; Opportunities</h2>
          <p className="section-subtext">
            Actively seeking internship and full-time roles in Data Science, AI Engineering, and Full-Stack Development.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
