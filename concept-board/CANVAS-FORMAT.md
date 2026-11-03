# Formato del canvas Design (para agentes del board)

Board: https://claude.ai/artifact/XuQQ4hveqLDcmjafwMifxR — "New Valley Painting · Concept Board"
Los agentes **escriben archivos locales** en `concept-board/project/`; el Foreman los publica. No publiques nada.

## Archivos
- `concept-board/project/canvas.json` (índice). Forma exacta:
  `{"v":3,"createdOnFiles":{"v":1,"at":"2026-11-03T00:00:00Z"},"title":"New Valley Painting · Concept Board","launch":{"view":"canvas","page":"portada"},"pages":[{"id":"portada","name":"Portada"},…],"boards":{"Main.dc.html":{"x":0,"y":0,"w":1440,"h":900,"page":"portada","title":"Portada"}},"order":["Main.dc.html",…],"notes":{}}`
  - `boards`: una entrada por artboard, clave = nombre de archivo. `x,y,w,h` = marco en px (w,h 40–8000; 80 px entre marcos de una fila, 120 entre filas). Opcionales: `title`, `page` (id de página), `expand:"fill"` (artboard que es una PÁGINA web fluida), `is_interactive:true` (controles que funcionan → botón Play).
  - `order`: los mismos nombres, de atrás hacia adelante. El primer artboard se llama `Main.dc.html` (entrada = Portada).
  - `notes`: títulos de fila `{"<id>":{"x":0,"y":-300,"text":"Web · 1366","kind":"title1","maxW":1840,"page":"web"}}`, ≥223 px por encima de la fila.
  - `pages`: ≤40, ids `[A-Za-z0-9_-]{1,40}`, nombres EXACTOS del estándar.
  - Si el índice ya existe: conserva toda clave y entrada que no cambies; solo agrega las tuyas.
- `concept-board/project/<nombre>.dc.html`: un artboard por archivo, fuente completa. Nombres: minúsculas, guiones, sin espacios, terminan en `.dc.html`, únicos.

## Esqueleto de artboard
```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Nombre de la pantalla</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=…&display=swap" rel="stylesheet">
<style>
body{margin:0}
a{color:#ea580c}a:hover{color:#c2410c}
</style>
</helmet>
<div style="width: 1440px; min-height: 900px; box-sizing: border-box; font-family: …; color: …; background: …">
  …contenido…
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":1440,"height":900}}'>
class Component extends DCLogic {
  renderVals() { return {}; }
}
</script>
</body>
</html>
```

## Reglas que fallan en silencio
- Conserva la línea `<script src="./support.js"></script>` EXACTA. Cierra todo elemento no vacío; comillas en todo atributo.
- Raíz FIJA a `w`×`h` para mockups de dispositivo, láminas, ads. Raíz FLUIDA para una PÁGINA web (`expand:"fill"` en el índice, `max-width` + %/rem/fr, sin ancho en px; el `h` del marco = su altura a ese `w`).
- Estilos de los elementos: inline `style="…"` (es lo que edita el panel). `<helmet><style>` solo para lo básico de la página, colores `a`/`a:hover`, `:hover`/`:focus-visible` y `@media`.
- `{{hueco}}` = búsqueda con puntos en `renderVals()`, nunca una expresión (`{{a+b}}` y `{{!x}}` fallan). Calcula en `renderVals()`.
- Eventos: `onClick="{{ fn }}"` con `fn` devuelto por `renderVals()`; estado con `this.state`/`this.setState`. Controles de flujo: `<sc-if value="{{cond}}" hint-placeholder-val="{{ true }}">…</sc-if>`, `<sc-for list="{{items}}" as="item" hint-placeholder-count="3">…</sc-for>`.
- Inputs controlados: `value="{{form.name}}" onChange="{{onName}}"`, donde el handler lee `e.target.value`.
- Enlaces entre artboards (prototipo): `<a href="otro.dc.html">` estilizado como botón. **Nunca `<button>` dentro de `<a>`.**
- Toda la UI es markup `<x-dc>`: nada de `innerHTML`, `appendChild` ni `window.X`. El script es JS clásico: `class Component extends DCLogic`, sin imports.
- `data-props` va entre comillas simples; escapes `&amp;`, `&#39;`, `\"`. Tweaks solo para palancas (no para copy).
- Red: solo un `<link>` de Google Fonts `css2` en `<helmet>` y URLs `/_blob/<id>` de assets subidos (tabla abajo). Ningún otro `src`/`href` externo, ni `data:` URI.
- Iconos: SVG inline de trazo, nunca emoji. Decorativos con `aria-hidden="true"`; los que informan, con `role="img" aria-label`.
- Sin `<iframe>`, `<object>` ni `<embed>`. Sin manejadores globales de keydown.
- Accesible tal como se dibuja: `<button>`, `<a href>` e `<input>`+`<label>` reales; contraste AA; targets ≥44px.
- Sin relleno: nada de lorem ipsum ni cifras inventadas; los datos sin confirmar se marcan `[confirmar]`.
- Tamaños: teléfono 390×844 (iOS) / 412×915 (Android); página de escritorio de 1366 o 1440 de ancho.

## Assets subidos (usar la URL tal cual)
(el Foreman llena esta tabla)
| Archivo local | URL en el canvas |
|---|---|
| assets/current-site/LogoF.4ab35146.png | /_blob/c0551c00c45b846e8316d879407b8817 |
| assets/current-site/LogoN.d5100d32.png | /_blob/fc94c9cccc85f2e50008980dba7d4ae7 |
| assets/current-site/image0-1920.jpg (foto del cliente) | /_blob/9226420d74e06266d617a98664714be8 |
| assets/current-site/image1-1920.jpg (foto del cliente) | /_blob/94f64b9a85884fcad2b8471f3bc16cbd |

¿Necesitas otra imagen (stock)? Déjala en `concept-board/to-upload/` y lístala en tu HANDOFF: el Foreman la sube y te devuelve la URL. Mientras tanto usa un placeholder rotulado.

### Stock (Unsplash, placeholders) — subidos 03-nov
| Slot | URL en el canvas |
|---|---|
| IMG-01 hero (living room) | /_blob/cc0c60483c89a1de0ce06fb6e3fa4716 |
| IMG-04 painter | /_blob/1f18e468d6961b0f401cdcce2f642df6 |
| IMG-05 kitchen hub | /_blob/30d85ecbff0bf2d66435b2a5f305bb75 |
| IMG-10 interior | /_blob/9ddce7478bb5eedcb472cad2c325b7c8 |
| IMG-11 cabinet | /_blob/32d6ee280c64a977bd8040869598ebef |
| IMG-12 kitchen | /_blob/19028f9bc0ed6c333a58d6463b7742d3 |
| IMG-13 bath | /_blob/381b7014a8f7a313c552c1084b83259d |
| IMG-14 flooring | /_blob/c66d9cd0f259160cbbb251b7de8dbcf6 |
| IMG-15 drywall | /_blob/8362d8d0153889ff95e1df65485b94f4 |
| IMG-16 decks | /_blob/a0accfc0289fdeee5ea46091f6eeea8c |
Before = image1 (tan brick, /_blob/94f64b9a85884fcad2b8471f3bc16cbd) · After = image0 (white brick, /_blob/9226420d74e06266d617a98664714be8).
