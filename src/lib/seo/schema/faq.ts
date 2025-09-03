export type FaqItem = { q: string; a: string };

export const faqSchema = (items: FaqItem[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
    })),
});
