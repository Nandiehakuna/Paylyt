import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="logo">PayLyt</div>
        <nav>
          <a href="/features">Features</a>
          <a href="/benefits">Benefits</a>
          <a href="/services">Services</a>
          <a href="/upgrade">Upgrade</a>
          <a href="/faqs">FAQs</a>
        </nav>
        <button className="btn btn-secondary">Book a Call</button>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-text">
            <span className="hero-pre-heading">Future of Crypto Trading</span>
            <h1>Fast & Secure Cryptocurrency Exchange</h1>
            <p>Trade cryptocurrencies with ease, security, and advanced features on our cutting-edge platform.</p>
            <button className="btn btn-primary">Explore More</button>
          </div>
          <div className="hero-visual">
            {/* Placeholder for the hand holding a smartphone visual */}
            <div className="phone-placeholder">
                 <div className="phone-screen">
                    <div className="chart-placeholder"></div>
                 </div>
            </div>
          </div>
        </section>

        <section className="trusted-by-section">
          <span>Trusted by top crypto platforms</span>
          <div className="logos">
            <div>Logoipsum</div>
            <div>Logoipsum</div>
            <div>Logoipsum</div>
            <div>Logoipsum</div>
          </div>
        </section>

        <section className="data-display-section">
          <h2>Top Crypto Coins Updates</h2>
          <div className="coin-cards">
            <div className="coin-card">
              <span>Highest volume</span>
              <h3>Bitcoin</h3>
              <p>$83411</p>
            </div>
            <div className="coin-card">
              <span>Top gainer</span>
              <h3>Ethereum</h3>
              <p>$1799.47</p>
            </div>
            <div className="coin-card">
              <span>New listing</span>
              <h3>Litecoin</h3>
              <p>$82.77</p>
            </div>
            <div className="coin-card">
              <span>Most traded</span>
              <h3>Polkadot</h3>
              <p>$3.97</p>
            </div>
            <div className="coin-card">
              <span>Biggest gainers</span>
              <h3>Solana</h3>
              <p>$116.45</p>
            </div>
             <div className="coin-card">
              <span>Trending</span>
              <h3>Chainlink</h3>
              <p>$14.31</p>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="features-text">
            <h2>Features of the crypto framer mobile application</h2>
            <div className="features-grid">
              <div className="feature-item">
                <p>Blockchain Consulting With Your Business</p>
              </div>
              <div className="feature-item">
                <p>Kickstart your crypto website today</p>
              </div>
              <div className="feature-item">
                <p>Designed for crypto trading platforms</p>
              </div>
              <div className="feature-item">
                <p>Launch your blockchain platform today</p>
              </div>
            </div>
          </div>
          <div className="features-visual">
            {/* Placeholder for portfolio visual */}
          </div>
        </section>

        <section className="metrics-section">
          <div className="metric-item">
            <h2>6M+</h2>
            <p>Active users</p>
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
      </main>
    </div>
  );
};

export default LandingPage;
