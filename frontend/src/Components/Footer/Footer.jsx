import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="page-footer">
            <div className="footer-container">
                {/* Single Row */}
                <div className="footer-row">
                    <div className="footer-social">
                        <a
                            href="https://www.linkedin.com/in/yourprofile"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon"
                            aria-label="LinkedIn"
                        >
                            <FontAwesomeIcon icon={faLinkedinIn} />
                        </a>

                        <a
                            href="https://www.instagram.com/yourprofile"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon social-icon-instagram"
                            aria-label="Instagram"
                        >
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>

                        <a
                            href="mailto:tehlipeh@gmail.com"
                            className="social-icon social-icon-email"
                            aria-label="Email"
                        >
                            <FontAwesomeIcon icon={faEnvelope} />
                        </a>

                        <a
                            href="/path/to/your_resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon social-icon-resume"
                            aria-label="Resume"
                        >
                            <FontAwesomeIcon icon={faFileAlt} />
                        </a>
                    </div>

                    <div className="footer-copyright">
                        <p className="copyright">© {currentYear} Teh Li Peh</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;