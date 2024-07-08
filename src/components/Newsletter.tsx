import React from "react";
import "../styles/Newsletter.css";

const Newsletter = () => {
  return (
    <div className="newsletter-container" id="newsletter-container">
      <h1>Be the first to know</h1>
      <p>
        Join our email list and be the first to know about new limited edition
        product, stay updated with what's trending and lots of other fun updates
      </p>
      <div className="input-container">
        <input type="text" placeholder="Enter your email address" />
        <span className="button">
          <span>Subscribe Now</span>
        </span>
      </div>
    </div>
  );
};

export default Newsletter;
