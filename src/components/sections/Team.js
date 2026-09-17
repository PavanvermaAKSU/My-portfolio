import React from "react";
import { motion } from "framer-motion";

export default function Team() {
  return (
    <section id="team" className="content-section">
      <div className="section-shell">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">The Team</span>
          <h2 className="section-heading">Solo, but collaborative.</h2>
          <p className="section-subtext">
            Currently operating as an independent developer and AI engineer — open to team collaborations and joint projects.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
