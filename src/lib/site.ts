export const SITE = {
  name: 'New Valley Painting',
  phone: '(919) 805-7952',
  phoneHref: 'tel:+19198057952',
  phoneIntl: '+1-919-805-7952',
  email: 'nvpnting@gmail.com',
  whatsapp: 'https://wa.me/19198057952',
  facebook: 'https://www.facebook.com/newvalleypaintingrdu/',
  slogan: 'The brush of quality, the stroke of excellence',
  url: (import.meta.env.PUBLIC_SITE_URL || 'https://new-valley-painting.vercel.app').replace(/\/$/, ''),
  noindex: import.meta.env.PUBLIC_NOINDEX !== 'false',
} as const;
export const abs = (path: string) => SITE.url + path;
