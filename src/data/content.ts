import type { ImageMetadata } from 'astro';
import type { IconName } from '../lib/icons';
import imgAfter from '../assets/client/after.jpg';
import imgBefore from '../assets/client/before.jpg';
import img04 from '../assets/stock/img-04-painter.jpg';
import img05 from '../assets/stock/img-05-kitchen-hub.jpg';
import img10 from '../assets/stock/img-10-interior.jpg';
import img11 from '../assets/stock/img-11-cabinet.jpg';
import img12 from '../assets/stock/img-12-kitchen.jpg';
import img13 from '../assets/stock/img-13-bath.jpg';
import img14 from '../assets/stock/img-14-flooring.jpg';
import img15 from '../assets/stock/img-15-drywall.jpg';
import img16 from '../assets/stock/img-16-decks.jpg';

export interface Service {
  slug: string; name: string; short: string; icon: IconName; image: ImageMetadata; alt: string; placeholder: boolean;
  title: string; metaDesc: string; h1: string; confirm?: boolean; intro: string; included: string[];
}
const FAQ_AREAS = 'Raleigh, Durham, Cary, Chapel Hill, Apex, Wake Forest and nearby communities in the Triangle.';
export const imgs = { after: imgAfter, before: imgBefore };

export const services: Service[] = [
  { slug: 'interior-painting', name: 'Interior Painting', short: 'Walls, ceilings, trim and doors finished with careful prep and clean lines.', icon: 'paint-roller', image: img10, alt: 'Bright living room with freshly painted white walls', placeholder: true,
    title: 'Interior Painting in Raleigh, NC | New Valley Painting', metaDesc: 'Interior painting for walls, ceilings, trim and doors in Raleigh-Durham. Careful prep, clean lines, 2-year workmanship warranty. Free estimate.', h1: 'Interior Painting in Raleigh-Durham, NC',
    intro: 'Fresh interior paint changes how a home feels. We prep every surface, protect your floors and furniture and finish with clean, sharp lines.', included: ['Walls & ceilings', 'Trim, doors & baseboards', 'Surface prep & patching', 'Color guidance', 'Clean-up every day'] },
  { slug: 'exterior-painting', name: 'Exterior Painting', short: 'Siding, brick, trim and doors protected and refreshed for North Carolina weather.', icon: 'house-exterior', image: imgAfter, alt: 'Two-story brick home after exterior painting: white brick with black window trim', placeholder: false,
    title: 'Exterior Painting in Raleigh, NC | New Valley Painting', metaDesc: 'Exterior house painting for siding, brick, trim and doors in Raleigh-Durham. Fully insured, 2-year workmanship warranty. Free estimate.', h1: 'Exterior House Painting in Raleigh-Durham, NC',
    intro: 'Your exterior takes the brunt of North Carolina sun, humidity and storms. We prep, repair and paint so your home looks great and stays protected.', included: ['Siding & brick', 'Trim, fascia & soffits', 'Doors & shutters', 'Pressure washing & prep', 'Caulking & minor repairs'] },
  { slug: 'cabinet-painting', name: 'Cabinet Painting', confirm: true, short: 'A fresh, durable finish for your cabinets without the cost of replacing them.', icon: 'cabinet', image: img11, alt: 'Freshly painted gray kitchen cabinets with brass pulls', placeholder: true,
    title: 'Cabinet Painting in Raleigh, NC | New Valley Painting', metaDesc: 'Kitchen cabinet painting in Raleigh-Durham: a fresh, durable finish without the cost of new cabinets. Free estimate from a family-owned team.', h1: 'Cabinet Painting in Raleigh-Durham, NC',
    intro: 'Painted cabinets give your kitchen a new look without a full remodel. We clean, sand, prime and finish for a smooth, durable result.', included: ['Cabinet boxes & doors', 'Degreasing & sanding', 'Primer & durable topcoat', 'Hardware removal & reinstall', 'Color guidance'] },
  { slug: 'kitchen-remodeling', name: 'Kitchen Remodeling', short: 'Cabinets, counters, layout and finishes brought together in one project.', icon: 'cooking-pot', image: img12, alt: 'Remodeled white kitchen with light countertops', placeholder: true,
    title: 'Kitchen Remodeling in Raleigh, NC | New Valley Painting', metaDesc: 'Kitchen remodeling in Raleigh-Durham, from cabinets and counters to finishes and paint. One family-owned team, fully insured. Free estimate.', h1: 'Kitchen Remodeling in Raleigh-Durham, NC',
    intro: 'From updated finishes to a complete renovation, we plan and build the kitchen that fits how you live, with one team from demo to final coat of paint.', included: ['Planning & layout', 'Cabinets & countertops', 'Backsplash & finishes', 'Lighting & fixtures coordination', 'Paint & trim'] },
  { slug: 'bathroom-remodeling', name: 'Bathroom Remodeling', short: 'From quick refreshes to complete bathroom makeovers.', icon: 'bath', image: img13, alt: 'Remodeled bathroom with glass shower and double vanity', placeholder: true,
    title: 'Bathroom Remodeling in Raleigh, NC | New Valley Painting', metaDesc: 'Bathroom remodeling in Raleigh-Durham, from quick refreshes to complete makeovers. Family owned, fully insured. Request a free estimate.', h1: 'Bathroom Remodeling in Raleigh-Durham, NC',
    intro: "Whether it's a quick refresh or a complete makeover, we turn dated bathrooms into clean, comfortable spaces.", included: ['Vanities & fixtures', 'Tile & surfaces', 'Lighting & mirrors', 'Drywall & paint', 'Trim & finishing'] },
  { slug: 'flooring-installation', name: 'Flooring Installation', short: 'New floors installed level, tight and ready for everyday life.', icon: 'flooring', image: img14, alt: 'Hallway with newly installed light wood flooring', placeholder: true,
    title: 'Flooring Installation in Raleigh, NC | New Valley Painting', metaDesc: 'Flooring installation in Raleigh-Durham homes, installed level, tight and ready for daily life. Family-owned and fully insured. Free estimate.', h1: 'Flooring Installation in Raleigh-Durham, NC',
    intro: 'New floors tie a room together. We prepare the subfloor and install level, tight floors built for everyday life.', included: ['Subfloor prep', 'Floor installation', 'Transitions & thresholds', 'Baseboards & trim', 'Clean-up'] },
  { slug: 'drywall-finishing', name: 'Drywall & Finishing', short: 'Patches, repairs and smooth finishes, ready for paint.', icon: 'layers', image: img15, alt: 'Tools on a floor during a home repair and renovation project', placeholder: true,
    title: 'Drywall Repair & Finishing in Raleigh, NC | New Valley', metaDesc: 'Drywall repair, patching and finishing in Raleigh-Durham. Smooth, paint-ready walls from a family-owned, fully insured team. Free estimate.', h1: 'Drywall Repair & Finishing in Raleigh-Durham, NC',
    intro: 'Holes, cracks and water damage happen. We repair, patch and finish drywall so walls are smooth and ready for paint.', included: ['Patches & holes', 'Crack & water-damage repair', 'New drywall sections', 'Texture matching', 'Prime & paint'] },
  { slug: 'decks-outdoor-living', name: 'Decks & Outdoor Living', short: 'Decks and outdoor spaces built, restored and stained.', icon: 'fence', image: img16, alt: 'Craftsman home with a covered front porch', placeholder: true,
    title: 'Decks & Outdoor Living in Raleigh, NC | New Valley Painting', metaDesc: 'Deck building, restoration and staining plus outdoor living spaces in Raleigh-Durham. Fully insured, family owned. Request a free estimate.', h1: 'Decks & Outdoor Living in Raleigh-Durham, NC',
    intro: "Make the most of North Carolina's outdoor seasons with a deck or outdoor space that's built, restored and finished to last.", included: ['Deck building', 'Repairs & board replacement', 'Cleaning & staining', 'Railings & steps', 'Outdoor living spaces'] },
];
export const serviceBySlug = (s: string) => services.find((x) => x.slug === s)!;

/** Per-service gallery: same-trade photos only, never the page's own hero. `null` = labeled placeholder slot (D-12). */
export interface GalleryItem { image: ImageMetadata | null; alt: string }
const g = (image: ImageMetadata | null, alt: string): GalleryItem => ({ image, alt });
export const serviceGallery: Record<string, GalleryItem[]> = {
  'interior-painting': [g(img14, 'Hallway with clean painted walls and trim'), g(img11, 'Painted trim and cabinetry in a bright room'), g(img12, 'Bright interior with freshly painted walls')],
  'cabinet-painting': [g(img12, 'Kitchen with painted cabinets'), g(img05, 'Kitchen with cabinets and a light finish'), g(null, 'Cabinet painting photo placeholder')],
  'kitchen-remodeling': [g(img05, 'Open kitchen with island'), g(img11, 'Kitchen cabinets with brass pulls'), g(null, 'Kitchen remodeling photo placeholder')],
  'bathroom-remodeling': [g(null, 'Bathroom photo placeholder'), g(null, 'Bathroom photo placeholder'), g(null, 'Bathroom photo placeholder')],
  'flooring-installation': [g(img10, 'Living room with light flooring'), g(null, 'Flooring photo placeholder'), g(null, 'Flooring photo placeholder')],
  'drywall-finishing': [g(img04, 'Painter at work on a smooth finished wall'), g(null, 'Drywall photo placeholder'), g(null, 'Drywall photo placeholder')],
  'decks-outdoor-living': [g(null, 'Deck photo placeholder'), g(null, 'Deck photo placeholder'), g(null, 'Deck photo placeholder')],
  'exterior-painting': [],
};
export const serviceRelated: Record<string, string[]> = {
  'interior-painting': ['exterior-painting', 'cabinet-painting', 'drywall-finishing'],
  'exterior-painting': ['interior-painting', 'decks-outdoor-living', 'drywall-finishing'],
  'cabinet-painting': ['kitchen-remodeling', 'interior-painting', 'drywall-finishing'],
  'kitchen-remodeling': ['cabinet-painting', 'bathroom-remodeling', 'flooring-installation'],
  'bathroom-remodeling': ['kitchen-remodeling', 'interior-painting', 'flooring-installation'],
  'flooring-installation': ['interior-painting', 'kitchen-remodeling', 'bathroom-remodeling'],
  'drywall-finishing': ['interior-painting', 'exterior-painting', 'cabinet-painting'],
  'decks-outdoor-living': ['exterior-painting', 'interior-painting', 'flooring-installation'],
};

export interface City { slug: string; name: string; intro: string }
export const cities: City[] = [
  { slug: 'raleigh-nc', name: 'Raleigh', intro: 'From established neighborhoods inside the Beltline to newer communities across Wake County, Raleigh homes come in every style. We help Raleigh homeowners refresh, protect and remodel the homes they love.' },
  { slug: 'durham-nc', name: 'Durham', intro: 'Durham mixes historic homes with brand-new builds, and each one needs a different approach. We bring careful prep and quality finishes to homes across Durham.' },
  { slug: 'cary-nc', name: 'Cary', intro: 'Cary homeowners take pride in well-kept homes and neighborhoods. We help keep yours looking its best inside and out.' },
  { slug: 'chapel-hill-nc', name: 'Chapel Hill', intro: "Chapel Hill's tree-lined streets and mix of older and newer homes call for painters who sweat the details. That's how we work on every job." },
  { slug: 'apex-nc', name: 'Apex', intro: "Apex keeps growing, and so does the need for quality home updates. We paint and remodel homes across Apex with the same care we'd give our own." },
  { slug: 'wake-forest-nc', name: 'Wake Forest', intro: "From historic downtown homes to newer subdivisions, Wake Forest homeowners trust local pros for lasting results. We're proud to be one of them." },
];

export interface Faq { q: string; a: string }
export const homeFaqs: Faq[] = [
  { q: 'Do you offer free estimates?', a: "Yes. Estimates are free and come with no obligation. Call (919) 805-7952 or request one online and we'll get back to you." },
  { q: 'Are you insured?', a: 'Yes. New Valley Painting is fully insured, so your property is protected from job-site accidents.' },
  { q: 'Do you offer a warranty?', a: 'Yes. We back our work with a 2-year workmanship warranty.' },
  { q: 'What services do you offer besides painting?', a: 'Kitchen and bathroom remodeling, flooring installation, drywall repair and finishing, and decks and outdoor living spaces, plus interior, exterior and cabinet painting.' },
  { q: 'Which areas do you serve?', a: FAQ_AREAS },
  { q: 'How do I get started?', a: "Request your free estimate by phone, text or our online form. We'll schedule a walkthrough, give you a clear quote and plan your project around you." },
];
export const serviceFaqs = (s: Service): Faq[] => [
  { q: `How much does ${s.name.toLowerCase()} cost?`, a: 'Every project is different. We give you a clear, free estimate after seeing the space. Call (919) 805-7952 or request one online.' },
  { q: `Do you offer a warranty on ${s.name.toLowerCase()}?`, a: 'Yes. Our work is backed by a 2-year workmanship warranty.' },
  { q: 'Which areas do you serve?', a: FAQ_AREAS },
];
export const cityFaqs = (c: City): Faq[] => [
  { q: `Do you offer free estimates in ${c.name}?`, a: `Yes. Estimates in ${c.name} are free and come with no obligation. Call (919) 805-7952 or request one online.` },
  { q: 'Are you insured?', a: 'Yes. New Valley Painting is fully insured, so your property is protected from job-site accidents.' },
  { q: `Do you also serve areas near ${c.name}?`, a: `Yes. Besides ${c.name}, we serve ${cities.filter((x) => x.slug !== c.slug).map((x) => x.name).join(', ')} and nearby communities in the Triangle.` },
];

export const trust: { icon: IconName; label: string; sub: string }[] = [
  { icon: 'shield-check', label: 'Fully Insured', sub: 'Protected from job-site accidents' },
  { icon: 'award', label: '2-Year Workmanship Warranty', sub: 'On every project we complete' },
  { icon: 'users', label: 'Family Owned & Operated', sub: 'Local to Raleigh-Durham' },
  { icon: 'clipboard-check', label: 'Free Estimates', sub: 'No obligation, no pressure' },
];
export const stats: { icon: IconName; n: string; suffix: string; label: string }[] = [
  { icon: 'calendar-check', n: '10', suffix: '+', label: 'Years of Experience' },
  { icon: 'home', n: '200', suffix: '+', label: 'Completed Projects' },
  { icon: 'star', n: '5.0', suffix: '★', label: 'Customer Rating' },
  { icon: 'award', n: '100', suffix: '%', label: 'Client Satisfaction' },
];
export const steps: { icon: IconName; h: string; p: string; confirm?: boolean }[] = [
  { icon: 'clipboard-check', h: 'Request your free estimate', p: 'Call, text or send the form and tell us about your project.' },
  { icon: 'map-pin', h: 'Walkthrough & quote', p: 'We visit, look at every surface and give you a clear, detailed quote.', confirm: true },
  { icon: 'paint-roller', h: 'Prep & transform', p: 'We protect your home, prep carefully and get to work.' },
  { icon: 'award', h: 'Final walkthrough', p: 'We review every detail with you, backed by our 2-year workmanship warranty.' },
];
export const protection: { icon: IconName; h: string; p: string }[] = [
  { icon: 'shield-check', h: 'Fully Insured', p: "Rest easy: our insurance protects your property from any job-site accidents. Don't take the risk of hiring an uninsured painting contractor." },
  { icon: 'award', h: '2-Year Workmanship Warranty', p: "We pride ourselves on every project we complete and strive for perfection. That's why we back our work with a 2-year workmanship warranty." },
  { icon: 'users', h: 'Family Owned & Operated', p: "We're a local business proud to serve our community, and being family owned lets us give special attention to every project." },
];
export const reviews = [
  { name: 'Ellen Williams', ctx: 'Painting · Raleigh-Durham', text: "[Review text pending: copy Ellen Williams's full testimonial from the current site.]", initials: 'EW' },
  { name: 'Homeowner name', ctx: 'Exterior painting', text: 'Sample review: the crew was on time, protected everything and the house looks brand new.', initials: 'H' },
  { name: 'Homeowner name', ctx: 'Kitchen remodel', text: 'Sample review: clear quote, clean job site and a finish we love.', initials: 'H' },
];
