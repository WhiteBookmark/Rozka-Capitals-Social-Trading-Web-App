<template>
  <footer class="site-footer">
    <div class="container footer-container">
      <!-- Footer Main Grid -->
      <div class="footer-grid">
        <!-- Brand Summary Column -->
        <div class="footer-brand-col">
          <router-link to="/" class="logo-link brand-logo-wrapper" title="Rozka Capitals Social Trading">
            <img src="/Logo.png" alt="Rozka Capitals Logo" class="footer-logo-img" />
            <div class="brand-text-group">
              <span class="brand-title">Rozka Capitals</span>
              <span class="brand-subtitle">Social Trading</span>
            </div>
          </router-link>
          <p class="footer-tagline">
            Empowering investors worldwide to automatically mirror top-tier master traders with institutional execution, real-time performance tracking, and total risk control.
          </p>
          
          <!-- Social Icons (Circular background, theme colors, opening in new tab) -->
          <div class="social-links-group">
            <a href="https://x.com/rozkacapitals" target="_blank" rel="noopener noreferrer" class="icon-link icon-circle" title="X (Twitter)">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://t.me/rozkacapitals" target="_blank" rel="noopener noreferrer" class="icon-link icon-circle" title="Telegram">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
            </a>
            <a href="https://linkedin.com/company/rozkacapitals" target="_blank" rel="noopener noreferrer" class="icon-link icon-circle" title="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9z"/></svg>
            </a>
            <a href="https://discord.gg/rozkacapitals" target="_blank" rel="noopener noreferrer" class="icon-link icon-circle" title="Discord">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
            </a>
          </div>
        </div>

        <!-- Quick Links Column -->
        <div class="footer-col">
          <h4 class="footer-col-title">Client Workspace</h4>
          <ul class="footer-links-list">
            <li><router-link to="/">Copy Trade Leaderboard</router-link></li>
            <li><router-link to="/dashboard">Social Dashboard</router-link></li>
            <li><router-link to="/investor">Investor Center</router-link></li>
            <li><router-link to="/master-trader">Master Portal</router-link></li>
            <li><router-link to="/login">Account Login</router-link></li>
            <li><router-link to="/register">Open Account</router-link></li>
          </ul>
        </div>

        <!-- Contact Quick Info -->
        <div class="footer-col">
          <h4 class="footer-col-title">Client Support</h4>
          <ul class="footer-contact-list">
            <li>
              <a href="tel:+18005557695" class="footer-contact-item">
                <div class="icon-circle icon-circle-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <span>+1 (800) 555-ROZKA</span>
              </a>
            </li>
            <li>
              <a href="mailto:support@rozkacapitals.com" class="footer-contact-item">
                <div class="icon-circle icon-circle-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <span>support@rozkacapitals.com</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Footer Bottom Bar -->
      <div class="footer-bottom">
        <p class="copyright-text">
          &copy; 2026 <strong>Rozka Capitals Social Trading</strong>. All rights reserved.
        </p>
        <p class="risk-warning">
          Risk Warning: Trading Forex, CFDs, and Cryptocurrencies involves significant risk to your invested capital. Social copy trading yields variable performance.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.site-footer {
  background-color: var(--color-surface-500);
  border-top: 1px solid rgba(229, 181, 103, 0.2);
  padding: 60px 0 30px 0;
  margin-top: auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.2fr;
  gap: 40px;
  margin-bottom: 40px;
}

.brand-logo-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.footer-logo-img {
  height: 40px;
  width: auto;
  object-fit: contain;
}

.footer-tagline {
  color: var(--color-grey-300);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 20px;
  max-width: 380px;
}

.social-links-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-col-title {
  font-size: 1.1rem;
  color: var(--color-gold-500);
  margin-bottom: 20px;
}

.footer-links-list,
.footer-contact-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-links-list a {
  color: var(--color-grey-200);
  font-size: 0.95rem;
}

.footer-contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--color-grey-200);
  font-size: 0.9rem;
}

.footer-bottom {
  border-top: 1px solid rgba(229, 181, 103, 0.1);
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  text-align: center;
}

.copyright-text {
  font-size: 0.88rem;
  color: var(--color-grey-300);
}

.copyright-text strong {
  color: var(--color-gold-500);
}

.risk-warning {
  font-size: 0.78rem;
  color: var(--color-grey-400);
  max-width: 800px;
  line-height: 1.5;
}

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
}

@media (max-width: 600px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 26px;
  }
}
</style>
