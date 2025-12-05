


export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};
  const title = `${tool.title} — Rezahub`;
  const description = tool.short;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://rezahub.com/tools/${tool.slug}`,
      images: [{ url: `https://rezahub.com/og/${tool.slug}.png` }],
    },
    twitter: {
      title,
      description,
      images: [`https://rezahub.com/og/${tool.slug}.png`],
    },
    alternates: { canonical: `https://rezahub.com/tools/${tool.slug}` },
  };
}
