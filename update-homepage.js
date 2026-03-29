const AUTH = Buffer.from('sabushid:tQId hIeG JP5q WARN 7DJe Dqct').toString('base64');
const SITE = 'https://rushanet.com/wp-json/wp/v2';

const homepageHTML = `
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Roboto:wght@300;400;500;700&display=swap');
.rn-page * { margin: 0; padding: 0; box-sizing: border-box; }
.rn-page { font-family: 'Roboto', sans-serif; color: #374151; line-height: 1.6; -webkit-font-smoothing: antialiased; }
.rn-page h1,.rn-page h2,.rn-page h3,.rn-page h4 { font-family: 'Montserrat', sans-serif; line-height: 1.2; }
.rn-page a { text-decoration: none; color: inherit; }

/* Hero */
.rn-hero { min-height: 90vh; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #000; }
.rn-hero-bg { position: absolute; inset: 0; background: linear-gradient(135deg, #000 0%, #1a0040 25%, #5400b1 50%, #804dd3 75%, #1a0040 100%); background-size: 400% 400%; animation: rnMesh 15s ease infinite; }
@keyframes rnMesh { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
.rn-hero-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.45); z-index: 1; }
.rn-hero-content { position: relative; z-index: 2; text-align: center; max-width: 800px; padding: 60px 24px; }
.rn-badge { display: inline-flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 10px 20px; border-radius: 999px; margin-bottom: 32px; }
.rn-dot { width: 8px; height: 8px; border-radius: 50%; background: #c3aaea; animation: rnPulse 2s infinite; }
@keyframes rnPulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
.rn-badge span { color: rgba(255,255,255,0.9); font-size: 14px; font-weight: 500; }
.rn-hero h1 { font-size: clamp(30px,5vw,52px); font-weight: 700; color: #fff; margin-bottom: 24px; line-height: 1.1; }
.rn-line1 { display: block; font-weight: 300; font-size: clamp(18px,3vw,28px); margin-bottom: 8px; letter-spacing: 0.05em; background: linear-gradient(135deg, #fff, #c3aaea 40%, #804dd3 70%, #fff); background-size: 200% 200%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: rnGrad 8s linear infinite; }
@keyframes rnGrad { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
.rn-line2 { display: block; font-weight: 900; text-shadow: 0 2px 20px rgba(0,0,0,0.5); }
.rn-line3 { display: block; font-weight: 300; font-style: italic; text-shadow: 0 2px 16px rgba(0,0,0,0.4); }
.rn-hero p { font-size: clamp(15px,2vw,18px); font-weight: 300; color: rgba(255,255,255,0.85); max-width: 560px; margin: 0 auto 36px; line-height: 1.7; }
.rn-ctas { display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; }
.rn-cta1 { padding: 16px 40px; border-radius: 999px; background: linear-gradient(135deg, #5400b1, #804dd3); color: #fff; font-weight: 600; font-size: 14px; transition: all 0.3s; box-shadow: 0 4px 20px rgba(84,0,177,0.4); display: inline-block; }
.rn-cta1:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(84,0,177,0.5); }
.rn-cta2 { padding: 16px 40px; border-radius: 999px; border: 2px solid rgba(255,255,255,0.2); color: #fff; font-weight: 500; font-size: 14px; transition: all 0.3s; display: inline-block; }
.rn-cta2:hover { background: rgba(255,255,255,0.1); border-color: rgba(195,170,234,0.6); }
.rn-stats { display: flex; justify-content: center; gap: 40px; margin-top: 40px; flex-wrap: wrap; }
.rn-stat-val { font-family: 'Montserrat', sans-serif; font-size: 28px; font-weight: 900; color: #fff; }
.rn-stat-label { font-size: 11px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.08em; }

/* Sections */
.rn-section { padding: 80px 24px; }
.rn-inner { max-width: 1100px; margin: 0 auto; }
.rn-head { text-align: center; max-width: 640px; margin: 0 auto 48px; }
.rn-tag { display: inline-block; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em; color: #5400b1; background: rgba(84,0,177,0.05); padding: 6px 16px; border-radius: 999px; margin-bottom: 16px; }
.rn-title { font-size: clamp(26px,4vw,36px); font-weight: 800; margin-bottom: 16px; }
.rn-title em { font-style: normal; background: linear-gradient(135deg, #5400b1, #804dd3); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.rn-desc { color: #6b7280; font-size: 17px; line-height: 1.7; }
.rn-bg { background: #f7f5fc; }

/* Service Cards */
.rn-grid3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
.rn-card { background: #fff; border-radius: 16px; padding: 36px 28px; border: 1px solid rgba(84,0,177,0.05); transition: all 0.3s; text-align: center; }
.rn-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); border-color: #c3aaea; }
.rn-card-icon { width: 56px; height: 56px; border-radius: 14px; background: linear-gradient(135deg, rgba(84,0,177,0.05), rgba(128,77,211,0.08)); color: #5400b1; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 28px; }
.rn-card h3 { font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 12px; }
.rn-card p { color: #6b7280; font-size: 14px; line-height: 1.7; }
.rn-card a { display: inline-block; margin-top: 16px; color: #5400b1; font-weight: 600; font-size: 14px; transition: all 0.2s; }
.rn-card a:hover { color: #804dd3; }

/* Results */
.rn-results { background: linear-gradient(135deg, #5400b1, #2d0063); color: #fff; position: relative; overflow: hidden; }
.rn-results::before { content: ''; position: absolute; top: -50%; right: -20%; width: 600px; height: 600px; border-radius: 50%; background: rgba(128,77,211,0.15); filter: blur(100px); }
.rn-results .rn-tag { color: #c3aaea; background: rgba(255,255,255,0.1); }
.rn-results .rn-title { color: #fff; }
.rn-results .rn-title em { background: none; -webkit-text-fill-color: #c3aaea; }
.rn-results .rn-desc { color: rgba(255,255,255,0.6); }
.rn-grid4 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; position: relative; z-index: 2; }
@media(min-width:768px) { .rn-grid4 { grid-template-columns: repeat(4, 1fr); } }
.rn-rcard { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 28px; text-align: center; transition: all 0.3s; }
.rn-rcard:hover { background: rgba(255,255,255,0.1); transform: translateY(-4px); }
.rn-rval { font-family: 'Montserrat', sans-serif; font-size: 32px; font-weight: 800; color: #c3aaea; margin-bottom: 8px; }
.rn-rlabel { font-size: 14px; color: rgba(255,255,255,0.6); }

/* Testimonials */
.rn-tgrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
@media(min-width:768px) { .rn-tgrid { grid-template-columns: repeat(3, 1fr); } }
.rn-test { border-radius: 16px; padding: 28px; transition: all 0.3s; }
.rn-test:hover { transform: translateY(-4px); }
.rn-test-d { background: #fff; border: 1px solid rgba(84,0,177,0.05); }
.rn-test-d:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.08); border-color: #c3aaea; }
.rn-test-f { background: linear-gradient(135deg, #5400b1, #2d0063); color: #fff; }
@media(min-width:768px) { .rn-test-f { grid-column: span 2; } }
.rn-test-f:hover { box-shadow: 0 16px 50px rgba(84,0,177,0.3); }
.rn-stars { color: #fbbf24; font-size: 14px; margin-bottom: 12px; }
.rn-quote { font-size: 14px; font-style: italic; line-height: 1.7; margin-bottom: 20px; }
.rn-test-d .rn-quote { color: #374151; }
.rn-test-f .rn-quote { color: rgba(255,255,255,0.9); font-size: 15px; }
.rn-author { display: flex; align-items: center; gap: 12px; }
.rn-avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; }
.rn-test-d .rn-avatar { background: linear-gradient(135deg, #c3aaea, #804dd3); color: #fff; }
.rn-test-f .rn-avatar { background: rgba(255,255,255,0.15); color: #fff; }
.rn-name { font-size: 14px; font-weight: 700; }
.rn-test-f .rn-name { color: #fff; }
.rn-role { font-size: 12px; }
.rn-test-d .rn-role { color: #9ca3af; }
.rn-test-f .rn-role { color: #c3aaea; }

/* CTA */
.rn-fcta { padding: 100px 24px; background: linear-gradient(135deg, #5400b1, #1a0040); color: #fff; text-align: center; position: relative; overflow: hidden; }
.rn-fcta::before { content: ''; position: absolute; top: -30%; left: 50%; transform: translateX(-50%); width: 800px; height: 800px; border-radius: 50%; background: rgba(128,77,211,0.15); filter: blur(120px); }
.rn-fcta-inner { position: relative; z-index: 2; max-width: 640px; margin: 0 auto; }
.rn-fcta h2 { font-family: 'Montserrat', sans-serif; font-size: clamp(26px,5vw,44px); font-weight: 800; margin-bottom: 20px; }
.rn-fcta p { font-size: 18px; color: rgba(255,255,255,0.6); margin-bottom: 36px; line-height: 1.7; }
.rn-fcta-btn { display: inline-block; padding: 20px 48px; border-radius: 16px; background: #fff; color: #5400b1; font-size: 18px; font-weight: 700; transition: all 0.3s; }
.rn-fcta-btn:hover { transform: translateY(-4px); box-shadow: 0 16px 50px rgba(0,0,0,0.3); }
.rn-fcta-note { margin-top: 20px; font-size: 14px; color: rgba(255,255,255,0.3); }

@media(max-width:767px) {
  .rn-section { padding: 56px 16px; }
  .rn-hero-content { padding: 40px 16px; }
  .rn-ctas { flex-direction: column; align-items: stretch; }
  .rn-cta1,.rn-cta2 { text-align: center; }
  .rn-stats { gap: 20px; }
  .rn-stat-val { font-size: 22px; }
  .rn-card { padding: 24px 20px; }
  .rn-fcta { padding: 64px 16px; }
}
</style>

<div class="rn-page">

<!-- Hero -->
<div class="rn-hero">
  <div class="rn-hero-bg"></div>
  <div class="rn-hero-overlay"></div>
  <div class="rn-hero-content">
    <div class="rn-badge"><div class="rn-dot"></div><span>WordPress &bull; SEO &bull; AI Automation &bull; Consulting</span></div>
    <h1>
      <span class="rn-line1">Websites. SEO. AI Automation.</span>
      <span class="rn-line2">More Leads. More Revenue.</span>
      <span class="rn-line3">Real Results.</span>
    </h1>
    <p>We build WordPress websites, optimize your SEO, automate your lead follow-up with AI, and provide expert consulting and education — all to help your business grow faster.</p>
    <div class="rn-ctas">
      <a href="/contact/" class="rn-cta1">Book a Free Consultation</a>
      <a href="/services/" class="rn-cta2">&#9654; Explore Our Services</a>
    </div>
    <div class="rn-stats">
      <div style="text-align:center"><div class="rn-stat-val">50+</div><div class="rn-stat-label">Clients Served</div></div>
      <div style="text-align:center"><div class="rn-stat-val">100+</div><div class="rn-stat-label">Projects Delivered</div></div>
      <div style="text-align:center"><div class="rn-stat-val">5.0</div><div class="rn-stat-label">Client Rating</div></div>
    </div>
  </div>
</div>

<!-- Services -->
<div class="rn-section">
  <div class="rn-inner">
    <div class="rn-head">
      <span class="rn-tag">Our Services</span>
      <h2 class="rn-title">Everything You Need to <em>Grow Your Business</em></h2>
      <p class="rn-desc">From WordPress websites and SEO to AI automation, consulting, and education — we deliver complete digital growth solutions.</p>
    </div>
    <div class="rn-grid3">
      <div class="rn-card">
        <div class="rn-card-icon">&#127760;</div>
        <h3>WordPress Website</h3>
        <p>Fast, mobile-optimized WordPress sites built to convert. Professional design with SEO-ready architecture that increases leads by 20–40%.</p>
        <a href="https://wordpress.rushanet.com/">Learn More &rarr;</a>
      </div>
      <div class="rn-card">
        <div class="rn-card-icon">&#128270;</div>
        <h3>SEO &amp; Local SEO</h3>
        <p>Rank in Montreal and South Shore searches. Generate consistent organic leads with local SEO optimization and content strategy.</p>
        <a href="https://wordpress.rushanet.com/">Learn More &rarr;</a>
      </div>
      <div class="rn-card">
        <div class="rn-card-icon">&#9889;</div>
        <h3>AI Lead Automation</h3>
        <p>Respond to every lead in under 60 seconds via email, SMS, and phone. Book appointments automatically and track leads in Google Sheets.</p>
        <a href="https://realestate.rushanet.com/">Learn More &rarr;</a>
      </div>
      <div class="rn-card">
        <div class="rn-card-icon">&#129302;</div>
        <h3>AI Agents Development</h3>
        <p>We design and build custom AI agents that automate tasks, enhance efficiency, and drive business growth. From chatbots to workflow automation.</p>
        <a href="/ai-agents-development/">Learn More &rarr;</a>
      </div>
      <div class="rn-card">
        <div class="rn-card-icon">&#128161;</div>
        <h3>AI Agents Consultation</h3>
        <p>Expert AI consultation to identify opportunities, solve challenges, and guide your business toward smarter, more efficient AI adoption.</p>
        <a href="/services/">Learn More &rarr;</a>
      </div>
      <div class="rn-card">
        <div class="rn-card-icon">&#127891;</div>
        <h3>AI Agents Education</h3>
        <p>Practical AI education empowering your team with the skills to leverage, implement, and manage AI solutions confidently.</p>
        <a href="/ai-agents-education/">Learn More &rarr;</a>
      </div>
    </div>
  </div>
</div>

<!-- Why Choose Us -->
<div class="rn-section rn-bg">
  <div class="rn-inner">
    <div class="rn-head">
      <span class="rn-tag">Why Rushanet</span>
      <h2 class="rn-title">Why Businesses <em>Choose Us</em></h2>
      <p class="rn-desc">We combine proven AI expertise with a results-driven approach to deliver solutions that actually work.</p>
    </div>
    <div class="rn-grid3">
      <div class="rn-card">
        <div class="rn-card-icon">&#127919;</div>
        <h3>Proven Results</h3>
        <p>We deliver consistent, measurable results with custom AI solutions designed to drive real business growth and success.</p>
      </div>
      <div class="rn-card">
        <div class="rn-card-icon">&#9889;</div>
        <h3>Transformative AI</h3>
        <p>We blend proven results and innovation to create AI agents that streamline your operations and boost efficiency.</p>
      </div>
      <div class="rn-card">
        <div class="rn-card-icon">&#128640;</div>
        <h3>Cutting-Edge Technology</h3>
        <p>Our team delivers proven results using advanced AI technology, helping your company stay ahead of the competition.</p>
      </div>
    </div>
  </div>
</div>

<!-- Results -->
<div class="rn-section rn-results">
  <div class="rn-inner">
    <div class="rn-head">
      <span class="rn-tag">Results</span>
      <h2 class="rn-title">Numbers That <em>Speak for Themselves</em></h2>
      <p class="rn-desc">Real metrics from businesses using our AI solutions.</p>
    </div>
    <div class="rn-grid4">
      <div class="rn-rcard"><div class="rn-rval">50+</div><div class="rn-rlabel">Clients served</div></div>
      <div class="rn-rcard"><div class="rn-rval">100+</div><div class="rn-rlabel">Projects delivered</div></div>
      <div class="rn-rcard"><div class="rn-rval">20+ hrs</div><div class="rn-rlabel">Saved per client / week</div></div>
      <div class="rn-rcard"><div class="rn-rval">5.0</div><div class="rn-rlabel">Average client rating</div></div>
    </div>
  </div>
</div>

<!-- Testimonials -->
<div class="rn-section">
  <div class="rn-inner">
    <div class="rn-head">
      <span class="rn-tag">Testimonials</span>
      <h2 class="rn-title">What Our Clients <em>Are Saying</em></h2>
      <p class="rn-desc">Hear from businesses that transformed their operations with our AI solutions.</p>
    </div>
    <div class="rn-tgrid">
      <div class="rn-test rn-test-f">
        <div class="rn-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <p class="rn-quote">&ldquo;Working with Rushanet transformed our workflow. Their custom AI agent saved us hours every week and the results were immediate.&rdquo;</p>
        <div class="rn-author"><div class="rn-avatar">JS</div><div><div class="rn-name">John Smith</div><div class="rn-role">Geophysicist</div></div></div>
      </div>
      <div class="rn-test rn-test-d">
        <div class="rn-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <p class="rn-quote">&ldquo;Their consultation was a game-changer. We identified new opportunities and saw measurable improvements fast.&rdquo;</p>
        <div class="rn-author"><div class="rn-avatar">SL</div><div><div class="rn-name">Sarah Lewis</div><div class="rn-role">Operations Manager</div></div></div>
      </div>
      <div class="rn-test rn-test-d">
        <div class="rn-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <p class="rn-quote">&ldquo;The AI training was clear and practical. Our staff now confidently uses AI tools that save us 15+ hours a week.&rdquo;</p>
        <div class="rn-author"><div class="rn-avatar">DG</div><div><div class="rn-name">David Grealish</div><div class="rn-role">CEO</div></div></div>
      </div>
      <div class="rn-test rn-test-d">
        <div class="rn-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <p class="rn-quote">&ldquo;From concept to deployment, the team delivered an AI solution that exceeded our expectations. Highly recommend.&rdquo;</p>
        <div class="rn-author"><div class="rn-avatar">ME</div><div><div class="rn-name">Marie Emerson</div><div class="rn-role">Marketing Director</div></div></div>
      </div>
      <div class="rn-test rn-test-f">
        <div class="rn-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <p class="rn-quote">&ldquo;Rushanet built us a complete AI automation system — lead follow-up, appointment booking, the works. Our leads tripled and we saved 20+ hours a week. The ROI has been incredible.&rdquo;</p>
        <div class="rn-author"><div class="rn-avatar">RP</div><div><div class="rn-name">Robert Pelletier</div><div class="rn-role">Business Owner, Montreal</div></div></div>
      </div>
      <div class="rn-test rn-test-d">
        <div class="rn-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <p class="rn-quote">&ldquo;The education program gave our team the confidence to work with AI daily. Best investment we've made this year.&rdquo;</p>
        <div class="rn-author"><div class="rn-avatar">AL</div><div><div class="rn-name">Amanda Liu</div><div class="rn-role">HR Director</div></div></div>
      </div>
    </div>
  </div>
</div>

<!-- Final CTA -->
<div class="rn-fcta">
  <div class="rn-fcta-inner">
    <h2>Ready to Transform Your Business with AI?</h2>
    <p>Let's build custom AI solutions that automate your operations, save you time, and drive real growth. Free consultation, no commitment.</p>
    <a href="/contact/" class="rn-fcta-btn">Book Your Free Consultation</a>
    <p class="rn-fcta-note">No commitment. No credit card. Just results.</p>
  </div>
</div>

</div>
`;

async function main() {
  console.log('Updating rushanet.com homepage...');

  const res = await fetch(SITE + '/pages/2174', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + AUTH,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: homepageHTML,
      title: 'Rushanet — AI Agents Development, Consultation & Education',
    }),
  });

  const data = await res.json();
  if (data.id) {
    console.log('✓ Homepage updated!');
    console.log('  URL:', data.link);
  } else {
    console.log('✗ Failed:', data.message || data);
  }
}

main();
