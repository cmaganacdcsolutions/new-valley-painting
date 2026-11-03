import { SITE, abs } from './site';
import type { Faq } from '../data/content';

export const breadcrumbList = (items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
});

export const faqPage = (faqs: Faq[]) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const cityNode = (name: string) => ({ '@type': 'City', name, containedInPlace: { '@type': 'State', name: 'North Carolina' } });

export const providerRef = { '@id': `${SITE.url}/#business` };
export const graph = (nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });
