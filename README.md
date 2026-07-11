# GetYourMemories 🧡

Web sorpresa estilo GetYourGuide: los viajes que ya hemos hecho como "experiencias" (precio: ∞), y la última de la lista revela el regalo real — el bautismo de buceo en Lanzarote.

## Arrancar en local

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Cómo poner el contenido real

**`src/data/experiences.json` es la base de datos de la página** — solo hay que rellenar ese JSON (la lista completa de campos está documentada en `src/data/experiences.js`):

1. Cada objeto del array es un viaje; el orden del array es el orden en la web.
2. Las anécdotas van en `paragraphs` (un string por párrafo).
3. **Fotos**: solo tienes que dejarlas en `src/assets/photos/<slug>/` — no se ponen en el JSON:
   - `cover.jpg` → la portada de la tarjeta
   - `01.jpg`, `02.jpg`, ... → el álbum, en ese orden (vale cualquier nombre; se ordenan alfabéticamente)
   - Si la carpeta está vacía, se usan los campos opcionales `cover`/`album` del JSON (así funcionan los placeholders actuales).
4. La experiencia de buceo (`isReveal: true`) debe ser siempre la **última** del array. Su `revealMessage` es el mensaje que aparece al pulsar "Reservar próxima aventura" (con confeti 🎉), y `externalUrl` es el enlace real (Pura Vida Diving).

## Desplegar en GitHub Pages (cuando toque)

1. En `vite.config.js` añade `base: '/<nombre-del-repo>/'`.
2. `npm run build` y publica la carpeta `dist/` (o usa GitHub Actions).
3. Para que las rutas funcionen al recargar, copia `dist/index.html` como `dist/404.html`.
# nuestros-viajes
