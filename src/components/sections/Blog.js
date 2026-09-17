// Blog section placeholder
import React from "react";

export default function Blog() {
  return (
    <section id="blog" className="content-section blog-section">
      <div className="section-shell">
        <div className="section-header">
          <span className="section-tag">Insights &amp; Updates</span>
          <h2 className="section-heading">Blog</h2>
          <p className="section-subtext">
            Stay tuned for articles, tutorials, and insights about AI, data science, and full‑stack development.
          </p>
        </div>
        {/* Add your blog posts or integrate a CMS here */}
        <div className="blog-placeholder">
          <p>Blog content coming soon…</p>
        </div>
      </div>
    </section>
  );
}
