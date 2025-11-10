import React from "react";
import "./Footer.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-bg text-light pt-5 pb-4">
      <div className="container">

        <div className="row">

          {/* Brand section */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h3 className="fw-bold mb-3 footer-title">Project Manager</h3>
            <p className="footer-desc">
              A powerful and intuitive platform to plan, track, and manage all your projects effortlessly.
              Stay productive and organized with real-time collaboration.
            </p>
          </div>

          {/* Quick links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="fw-semibold mb-3">Quick Links</h5>
            <ul className="footer-links">
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/tasks">Tasks</a></li>
              <li><a href="/projects">Projects</a></li>
              <li><a href="/team">Team</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="fw-semibold mb-3">Resources</h5>
            <ul className="footer-links">
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">API</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>

          {/* Contact section */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="fw-semibold mb-3">Contact Us</h5>
            <p className="footer-contact"><FaEnvelope className="me-2" /> support@projectmanager.com</p>
            <p className="footer-contact"><FaPhone className="me-2" /> +91 98765 43210</p>
            <p className="footer-contact"><FaMapMarkerAlt className="me-2" /> Mumbai, India</p>

            <div className="footer-social mt-3">
              <a href="#"><FaLinkedin /></a>
              <a href="#"><FaGithub /></a>
              <a href="#"><FaTwitter /></a>
            </div>
          </div>

        </div>

        {/* Bottom strip */}
        <div className="footer-bottom text-center mt-4 pt-3">
          © {new Date().getFullYear()} Project Manager. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
