const fs = require('fs');
const path = require('path');

const AUTH = Buffer.from('sabushid:tQId hIeG JP5q WARN 7DJe Dqct').toString('base64');
const SITE = 'https://rushanet.com/wp-json/wp/v2';

const images = [
  {
    url: 'https://d2p7pge43lyniu.cloudfront.net/output/51c9314f-c56f-4766-8537-5925bf0b9a13.png',
    filename: 'wordpress-developer-montreal-featured.png',
    alt: 'WordPress Developer Montreal - Professional Web Development',
    postSlug: 'wordpress-developer-montreal',
  },
  {
    url: 'https://d2p7pge43lyniu.cloudfront.net/output/fade1bfa-1d17-4a9b-a376-9c0a59aec385.png',
    filename: 'seo-montreal-guide-featured.png',
    alt: 'SEO Montreal Guide - Rank #1 on Google',
    postSlug: 'seo-montreal-guide',
  },
  {
    url: 'https://d1q70pf5vjeyhc.cloudfront.net/predictions/34f6bcd2147d4e2db340c61f403ac441/1.png',
    filename: 'ai-automation-montreal-featured.png',
    alt: 'AI Automation for Small Business Montreal',
    postSlug: 'ai-automation-small-business-montreal',
  },
  {
    url: 'https://d1q70pf5vjeyhc.cloudfront.net/predictions/01e6564eb12443e5aaf7e4d2da6c303d/1.png',
    filename: 'website-design-south-shore-featured.png',
    alt: 'Website Design South Shore Montreal - Longueuil Brossard',
    postSlug: 'website-design-south-shore-montreal',
  },
];

async function downloadImage(url, filepath) {
  const res = await fetch(url);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(filepath, buffer);
  return buffer;
}

async function uploadMedia(buffer, filename, alt) {
  const res = await fetch(`${SITE}/media`, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + AUTH,
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Type': 'image/png',
    },
    body: buffer,
  });
  const data = await res.json();
  if (data.id) {
    // Set alt text
    await fetch(`${SITE}/media/${data.id}`, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + AUTH,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ alt_text: alt }),
    });
    console.log(`  Uploaded media ID: ${data.id}`);
    return data.id;
  }
  console.log(`  Upload failed:`, data.message || data);
  return null;
}

async function findPost(slug) {
  const res = await fetch(`${SITE}/posts?slug=${slug}`, {
    headers: { 'Authorization': 'Basic ' + AUTH },
  });
  const posts = await res.json();
  return posts[0]?.id || null;
}

async function setFeaturedImage(postId, mediaId) {
  const res = await fetch(`${SITE}/posts/${postId}`, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + AUTH,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ featured_media: mediaId }),
  });
  const data = await res.json();
  return data.id ? true : false;
}

async function main() {
  console.log('Setting featured images on rushanet.com...\n');
  const tmpDir = path.join(__dirname, 'tmp');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

  for (const img of images) {
    console.log(`Processing: ${img.postSlug}`);

    // Download image
    const filepath = path.join(tmpDir, img.filename);
    const buffer = await downloadImage(img.url, filepath);
    console.log(`  Downloaded: ${img.filename} (${(buffer.length / 1024).toFixed(0)} KB)`);

    // Upload to WordPress
    const mediaId = await uploadMedia(buffer, img.filename, img.alt);
    if (!mediaId) continue;

    // Find post
    const postId = await findPost(img.postSlug);
    if (!postId) { console.log(`  Post not found: ${img.postSlug}`); continue; }
    console.log(`  Found post ID: ${postId}`);

    // Set featured image
    const ok = await setFeaturedImage(postId, mediaId);
    console.log(ok ? `  ✓ Featured image set!` : `  ✗ Failed to set featured image`);
    console.log('');
  }

  // Cleanup
  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log('Done!');
}

main();
