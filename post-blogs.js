const fs = require('fs');
const path = require('path');

const AUTH = Buffer.from('sabushid:tQId hIeG JP5q WARN 7DJe Dqct').toString('base64');
const API = 'https://rushanet.com/wp-json/wp/v2/posts';

const blogs = [
  {
    file: 'wordpress-developer-montreal.html',
    title: 'Best WordPress Developer in Montreal & South Shore — How to Choose in 2026',
    slug: 'wordpress-developer-montreal',
    excerpt: 'Complete guide to choosing the right WordPress developer in Montreal and South Shore. Pricing, red flags, case studies, and a checklist to make the best decision for your business.',
    categories: [],
    tags: ['WordPress', 'Montreal', 'South Shore', 'Web Development', 'Rive-Sud'],
  },
  {
    file: 'seo-montreal-guide.html',
    title: 'SEO Montreal: The Complete 2026 Guide to Ranking #1 on Google',
    slug: 'seo-montreal-guide',
    excerpt: 'Everything Montreal and South Shore businesses need to know about SEO in 2026. Local SEO, Google Business Profile, bilingual strategy, technical SEO, and link building.',
    categories: [],
    tags: ['SEO', 'Montreal', 'South Shore', 'Google', 'Local SEO', 'Rive-Sud'],
  },
  {
    file: 'ai-automation-small-business-montreal.html',
    title: 'AI Automation for Small Businesses in Montreal — Save 20+ Hours/Week',
    slug: 'ai-automation-small-business-montreal',
    excerpt: 'How AI automation helps Montreal and South Shore small businesses save 20+ hours per week and triple their leads. Use cases, ROI calculations, and implementation guide.',
    categories: [],
    tags: ['AI Automation', 'Montreal', 'Small Business', 'Lead Generation', 'South Shore'],
  },
  {
    file: 'website-design-south-shore-montreal.html',
    title: 'Website Design for South Shore Montreal — Longueuil, Brossard & Beyond',
    slug: 'website-design-south-shore-montreal',
    excerpt: 'Professional website design for South Shore Montreal businesses. City-by-city insights for Longueuil, Brossard, Saint-Bruno, Boucherville, and more.',
    categories: [],
    tags: ['Website Design', 'South Shore', 'Longueuil', 'Brossard', 'Rive-Sud', 'Montreal'],
  },
];

function extractContent(html) {
  // Extract content between <article> or <main> tags, or fallback to body content after hero
  let content = '';

  // Try to get article body content
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (articleMatch) {
    content = articleMatch[1];
  } else {
    // Get everything between the hero section and the footer
    const bodyMatch = html.match(/<\/section>\s*\n\s*<!-- .* -->\s*\n([\s\S]*?)<!-- ── Footer/i);
    if (bodyMatch) {
      content = bodyMatch[1];
    } else {
      // Fallback: get all section content after hero
      const sections = html.match(/<section[^>]*class="[^"]*article[^"]*"[^>]*>([\s\S]*?)<\/section>/gi);
      if (sections) {
        content = sections.join('\n');
      } else {
        // Last resort: extract between specific markers
        const start = html.indexOf('class="article');
        const end = html.indexOf('class="final-cta') || html.indexOf('class="footer');
        if (start > -1 && end > -1) {
          content = html.substring(start, end);
        }
      }
    }
  }

  // If still no content, extract all meaningful sections
  if (!content || content.length < 100) {
    // Get everything from first <h2> to the Related Articles or FAQ end
    const h2Start = html.indexOf('<h2');
    const footerStart = html.indexOf('class="footer"');
    if (h2Start > -1 && footerStart > -1) {
      content = html.substring(h2Start, footerStart);
    }
  }

  // Clean up: remove inline styles from container divs but keep content formatting
  content = content.replace(/<style[\s\S]*?<\/style>/gi, '');
  content = content.replace(/<script[\s\S]*?<\/script>/gi, '');
  content = content.replace(/<nav[\s\S]*?<\/nav>/gi, '');
  content = content.replace(/<header[\s\S]*?<\/header>/gi, '');

  return content.trim();
}

async function createTag(name) {
  const res = await fetch('https://rushanet.com/wp-json/wp/v2/tags', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + AUTH,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
  const data = await res.json();
  if (data.id) return data.id;
  // Tag might already exist
  if (data.code === 'term_exists') return data.data.term_id;
  return null;
}

async function postBlog(blog) {
  const filePath = path.join(__dirname, 'blog', blog.file);
  const html = fs.readFileSync(filePath, 'utf8');
  const content = extractContent(html);

  // Create tags
  const tagIds = [];
  for (const tag of blog.tags) {
    const id = await createTag(tag);
    if (id) tagIds.push(id);
  }

  const postData = {
    title: blog.title,
    slug: blog.slug,
    content: content,
    excerpt: blog.excerpt,
    status: 'publish',
    tags: tagIds,
    comment_status: 'open',
    ping_status: 'open',
  };

  const res = await fetch(API, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + AUTH,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  const data = await res.json();
  if (data.id) {
    console.log(`✓ Published: ${blog.title}`);
    console.log(`  URL: ${data.link}`);
    return data.link;
  } else {
    console.log(`✗ Failed: ${blog.title}`, data.message || data);
    return null;
  }
}

async function main() {
  console.log('Publishing 4 blog posts to rushanet.com...\n');
  for (const blog of blogs) {
    await postBlog(blog);
    console.log('');
  }
  console.log('Done!');
}

main();
