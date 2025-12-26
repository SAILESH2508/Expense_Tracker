import React from 'react';
import '../styles/About.css'; // We'll create this or reuse global styles

function About() {
    return (
        <div className="about-container fade-in">
            <div className="glass-panel about-card">
                <h1>👋 About Expense Tracker</h1>
                <p className="mission-text">
                    Our mission is to empower individuals to take control of their financial future through
                    intuitive tracking and smart, AI-driven insights.
                </p>

                <div className="team-section">
                    <h2>Why Choose Us?</h2>
                    <div className="features-grid">
                        <div className="feature-box">
                            <span className="icon">🚀</span>
                            <h3>Fast & Easy</h3>
                            <p>Log expenses in seconds with our streamlined interface.</p>
                        </div>
                        <div className="feature-box">
                            <span className="icon">🤖</span>
                            <h3>AI Powered</h3>
                            <p>Get smart predictions and anomaly detection for free.</p>
                        </div>
                        <div className="feature-box">
                            <span className="icon">🔒</span>
                            <h3>Secure</h3>
                            <p>Your data is stored locally in your browser for maximum privacy.</p>
                        </div>
                    </div>
                </div>

                <div className="version-info">
                    <p>Version 2.0.0 (Sunburst Edition)</p>
                    <p>Built with React + Vite + Django</p>
                </div>
            </div>
        </div>
    );
}

export default About;
