import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="logo">BitLance</div>
        <nav>
          <a href="/features">Features</a>
          <a href="/benefits">Benefits</a>
          <a href="/pricing">Pricing</a>
        </nav>
        <div>
          <a href="/login" className="btn btn-link">Sign In</a>
          <button className="btn btn-secondary">Book a Call</button>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-text">
            <span className="hero-pre-heading">Future of crypto trading</span>
            <h1>Fast & Secure Cryptocurrency Freelance</h1>
            <p>Buy, Sell and Grow your crypto with BitLance, the world's most advanced Lightning powered freelance platform with escrow protection.</p>
            <button className="btn btn-primary">Explore More</button>
          </div>
          <div className="hero-visual">
            <div className="balance-info">
              <p>Total Balance</p>
              <h2>$45,211.89</h2>
              <div className="crypto-details">
                <p>Lightning Network</p>
                <p className="positive-change">+485.4962</p>
                <p>+7,148.5557</p>
              </div>
              <div className="crypto-amounts">
                <div><span>BTC</span><span>2.156</span></div>
                <div><span>ETH</span><span>12.45</span></div>
                <div><span>LN</span><span>145.7</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="metrics-section">
            <div className="metric-item">
                <h2>6M+</h2>
                <p>Active Users</p>
            </div>
            <div className="metric-item">
                <h2>24/7</h2>
                <p>User Support</p>
            </div>
            <div className="metric-item">
                <h2>160+</h2>
                <p>Countries</p>
            </div>
            <div className="metric-item">
                <h2>$22B+</h2>
                <p>Trade Volume</p>
            </div>
        </section>

        <section className="features-section">
          <div className="features-text">
            <span className='why-choose'>Why choose crypto</span>
            <h2>Features of the crypto framer mobile application</h2>
          </div>
          <div className="features-visual">
            {/* Placeholder for features visual */}
          </div>
        </section>
        
        <section className="ready-to-start-section">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of freelancers getting paid instantly with Bitcoin</p>
            <button className="btn btn-primary">Start Trading &rarr;</button>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-links">
            <div className="footer-column">
                <h3>BitLance</h3>
                <p>Lightning-powered freelance marketplace for the future of work.</p>
            </div>
            <div className="footer-column">
                <h4>Platform</h4>
                <a href="/jobs">Browse Jobs</a>
                <a href="/talent">Find Talent</a>
                <a href="/how-it-works">How It Works</a>
            </div>
            <div className="footer-column">
                <h4>Company</h4>
                <a href="/about">About Us</a>
                <a href="/careers">Careers</a>
                <a href="/contact">Contact</a>
            </div>
            <div className="footer-column">
                <h4>Legal</h4>
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms of Service</a>
                <a href="/cookies">Cookie Policy</a>
            </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; 2024 BitLance. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
