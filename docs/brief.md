# New Valley Painting — Brief del prototipo (pitch)

Fecha: 2026-11-02 · Reunión con el cliente: **2026-11-03** · Dueño: Carlos (CDC Software Solutions)
Estado comercial: **cliente potencial, pre-venta**. Este prototipo es material de pitch, no un build contratado.

## Cliente
- **New Valley Painting** — contratista de pintura y remodelación residencial, Raleigh-Durham (RDU), North Carolina.
- Sitio actual: https://newvalleypainting.us/#/home (Vue SPA con rutas hash).
- Teléfono: **(919) 805-7952** (sitio actual + enlace de WhatsApp). La imagen de referencia dice (919) 805-7052 → `[confirmar]` con el cliente.
- Email: nvpnting@gmail.com · Facebook: facebook.com/newvalleypaintingrdu/ · WhatsApp: wa.me/19198057952
- amprco.com: dominio **estacionado** (página de parking de GoDaddy, sin sitio). El usuario lo mencionó como "su sitio"; su relación con el cliente está `[confirmar]`.

## Qué pide el cliente
1. **Conservar los colores** del sitio actual, pero que se vea distinto y más moderno.
2. **Estructura = SOLO la imagen de referencia** `assets/reference-structure.jpeg` (dos variantes del hero de escritorio: (a) "Painting & Remodeling Services" con cocina, 2 CTA y franja de 4 sellos de confianza; (b) "More Than Painting — Complete Home Remodeling" con checklist de servicios, CTA + botón de llamada y franja de 4 cifras). No copiar la estructura del sitio actual.
3. **Más atractivo y llamativo**: captar la atención y convertir en llamadas y solicitudes de cotización.
4. **Responsive** (le importa mucho) y **SEO** (le importa mucho).

## Colores del sitio actual (Tailwind)
- Naranja de acento: `#ea580c` (orange-600); también `border-orange-600`.
- Azules: `bg-blue-900` (#1e3a8a), `bg-blue-700` (#1d4ed8); overlay teal `rgba(17,105,140,.7)` = `#11698C`.
- Neutros: `bg-gray-900` (#111827, el más usado), gray-800/600/400, `text-gray-200/300`, `#9ca3af`.
- Tipografías actuales: Raleway, Acme (Google Fonts) y la pila del sistema.
- La imagen de referencia usa azul marino + naranja: es la misma familia (azul oscuro + naranja). Se pueden refinar tonos para AA sin salir de esa familia.

## Copy del sitio actual (reutilizable, corregir ortografía)
- Lema: "The brush of quality, the stroke of excellence" (el original dice "exellence").
- "Family Owned & Operated": "We are a local business that is proud to serve our community, and our family-owned & operated business allows us to give special attention to every project."
- "Fully Insured": "Rest easy, our company's insurance protects your property from any job site accidents. Don't take the risk of hiring an uninsured painting contractor."
- Garantía: "We pride ourselves on each and every project we complete and strive for perfection. That's why we offer a 2-year workmanship warranty to hold ourselves up to that standard."
- CTA: "Contact New Valley Painting today to schedule your consultation and start the journey toward a beautifully painted home."
- Testimonio: Ellen Williams (texto completo no extraído).
- Servicios (de la imagen de referencia): pintura interior y exterior, remodelación de cocina y baño, instalación de pisos, drywall y acabados, decks y espacios exteriores, y más.
- Cifras de la imagen: 10+ años, 200+ proyectos, 5.0 de calificación, 100% satisfacción → `[confirmar]` con el cliente (no publicar como hecho).

## Activos
- `assets/current-site/LogoF.4ab35146.png`, `LogoN.d5100d32.png` — logos actuales.
- `assets/current-site/image0.528f74a7.webp` (3.7 MB), `image1.d80b4111.webp` (5.4 MB) — fotos del sitio actual (gitignored por peso; optimizarlas).
- `assets/reference-structure.jpeg` — referencia de estructura.

## Hallazgos de SEO del sitio actual (argumentos del pitch)
- Rutas hash (`/#/home`): Google indexa una sola URL; no hay páginas por servicio ni por ciudad.
- `<title>NewValley</title>`, sin meta description, sin canonical, sin datos estructurados (JSON-LD), sin Open Graph.
- `robots.txt` y `sitemap.xml` → 404.
- Render del lado del cliente: el contenido no está en el HTML inicial.
- Fotos de 3.7–5.4 MB → LCP lento en móvil.

## Stack y despliegue del prototipo
- **Astro** (HTML estático, cero JS por defecto, ideal para SEO) + CSS con tokens; `astro:assets` para AVIF/WebP responsivo.
- Despliegue en **Vercel** (equipo cdc-software-solutions; el CLI ya tiene sesión). Repo: github.com/cmaganacdcsolutions/new-valley-painting (público).
- Idioma del sitio: **inglés** (mercado de NC). Español como opcional para conversar en la reunión.
