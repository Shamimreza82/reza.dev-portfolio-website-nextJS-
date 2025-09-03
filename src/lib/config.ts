export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const PERSON = {
  name: "Reza",
  altName: "Shamim Reza",
  jobTitle: "Full-Stack Web Developer",
  image: `${SITE_URL}/profile.png`,   // update
  sameAs: [
    "https://www.linkedin.com/in/shamim--reza/",
    "https://github.com/Shamimreza82",
    "https://x.com/reza_shamim1",
  ],
};
