export async function GET(request) {
    const baseUrl = "https://www.tuanalytics.xyz";
  
    const staticPages = [
      "",
      "/features",
      "/pricing",
      "/about",
    ];
  
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${staticPages
          .map((page) => {
            return `
              <url>
                <loc>${baseUrl}${page}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>0.7</priority>
              </url>
            `;
          })
          .join("")}
      </urlset>`;
  
    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  }
  