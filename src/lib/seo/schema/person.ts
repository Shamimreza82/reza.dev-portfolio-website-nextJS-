import { PERSON, SITE_URL } from "@/lib/config";

export const personSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSON.name,
  alternateName: PERSON.altName,
  url: SITE_URL,
  image: PERSON.image,
  jobTitle: PERSON.jobTitle,
  description:
    "Full-Stack Developer specializing in Next.js, React, and Node.js.",
  sameAs: PERSON.sameAs,
  knowsAbout: ["Next.js", "React", "Node.js", "APIs", "Web Development", "SEO"],
});
