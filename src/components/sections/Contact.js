import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PERSONAL_INFO } from "../../data/portfolioData";
import { Copy, Check, Send, ArrowUpRight } from "lucide-react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedRole, setSelectedRole] = useState("AI & Data Science");
  const [currentTime, setCurrentTime] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const updateIST = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };
    updateIST();
    const interval = setInterval(updateIST, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const roles = ["AI & Data Science", "Machine Learning Engineer", "Full-Stack Web", "Consultation / Collaboration"];

  return (
    <section id="contact" className="bq-chapter bq-contact-section">
      <div className="bq-chapter__shell">
        <div className="bq-chapter__header">
          <span className="bq-chapter__num">06 /</span>
          <span className="bq-chapter__label">Initiate Contact</span>
          <h2 className="bq-chapter__title bq-contact-headline">
            Let's build something <em>extraordinary</em>.
          </h2>
          <p className="bq-chapter__subtitle">
            Whether you have an impactful AI project, an industry engineering opening, or just want to connect — my inbox is always open.
          </p>
        </div>

        <div className="bq-contact__layout">
          {/* Left Column: Direct Info & Quick Copy */}
          <motion.div
            className="bq-contact__info"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
          >
            <div className="bq-contact__email-box">
              <span className="bq-contact__label">Direct Inquiries</span>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="bq-contact__email-link"
                data-cursor="open"
                data-cursor-text="EMAIL"
              >
                {PERSONAL_INFO.email}
              </a>
              <button
                className={`bq-contact__copy-btn ${copied ? "is-copied" : ""}`}
                onClick={handleCopyEmail}
                data-cursor="open"
                data-cursor-text="COPY"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? "Email Copied to Clipboard!" : "Copy Email"}</span>
              </button>
            </div>

            <div className="bq-contact__meta-block">
              <span className="bq-contact__label">Location & Local Time</span>
              <div className="bq-contact__meta-value">{PERSONAL_INFO.location}</div>
              <div className="bq-contact__clock">
                <span className="bq-live-dot" />
                <span>IST (Satna, IN): {currentTime || "Loading..."}</span>
              </div>
            </div>

            <div className="bq-contact__social-links">
              <span className="bq-contact__label">Digital Presence</span>
              <div className="bq-social-grid">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="bq-social-btn"
                  data-cursor="open"
                  data-cursor-text="LINKEDIN"
                >
                  <FaLinkedin size={18} />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={14} className="bq-social-arrow" />
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="bq-social-btn"
                  data-cursor="open"
                  data-cursor-text="GITHUB"
                >
                  <FaGithub size={18} />
                  <span>GitHub</span>
                  <ArrowUpRight size={14} className="bq-social-arrow" />
                </a>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="bq-social-btn"
                  data-cursor="open"
                  data-cursor-text="MAIL"
                >
                  <FaEnvelope size={18} />
                  <span>Email</span>
                  <ArrowUpRight size={14} className="bq-social-arrow" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Inquiry Form */}
          <motion.div
            className="bq-contact__form-card"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {formSubmitted ? (
              <div className="bq-form-success">
                <Check size={42} className="bq-success-icon" />
                <h3 className="bq-success-title">Message Transmitted</h3>
                <p className="bq-success-desc">
                  Thank you for reaching out! I've received your note and will get back to you promptly at {formData.email || "your email address"}.
                </p>
                <button
                  className="bq-filter__btn active"
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                  data-cursor="open"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bq-inquiry-form">
                <div className="bq-form-role-select">
                  <span className="bq-contact__label">Inquiry Scope</span>
                  <div className="bq-role-pills">
                    {roles.map((role, idx) => (
                      <button
                        type="button"
                        key={idx}
                        className={`bq-role-pill ${selectedRole === role ? "active" : ""}`}
                        onClick={() => setSelectedRole(role)}
                        data-cursor="open"
                        data-cursor-text="SELECT"
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bq-form-field">
                  <label htmlFor="user-name" className="bq-form-label">Your Name</label>
                  <input
                    id="user-name"
                    type="text"
                    required
                    placeholder="e.g. Sindhur Dutta"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bq-form-input"
                  />
                </div>

                <div className="bq-form-field">
                  <label htmlFor="user-email" className="bq-form-label">Your Email</label>
                  <input
                    id="user-email"
                    type="email"
                    required
                    placeholder="name@organization.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bq-form-input"
                  />
                </div>

                <div className="bq-form-field">
                  <label htmlFor="user-subject" className="bq-form-label">Subject</label>
                  <input
                    id="user-subject"
                    type="text"
                    required
                    placeholder="What should we explore?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="bq-form-input"
                  />
                </div>

                <div className="bq-form-field">
                  <label htmlFor="user-message" className="bq-form-label">Project / Message Details</label>
                  <textarea
                    id="user-message"
                    required
                    rows={4}
                    placeholder="Tell me about your goals, timelines, or role requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bq-form-textarea"
                  />
                </div>

                <button
                  type="submit"
                  className="bq-form-submit-btn"
                  data-cursor="open"
                  data-cursor-text="TRANSMIT"
                >
                  <span>Send Transmission</span>
                  <Send size={16} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
