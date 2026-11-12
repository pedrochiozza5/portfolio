# CZ TECNO · Portfolio 2.0

**No es solo código. Es hacer que pase.**

Portfolio de **CZ TECNO**, la marca de desarrollo y soluciones tecnológicas de **Pedro Chiozza** en Ranchos, Buenos Aires, Argentina.

Presenta proyectos reales, servicios, forma de trabajo y visión de crecimiento: una identidad que cruza desarrollo web, backend, sistemas a medida, automatizaciones, redes e infraestructura IT.

## Qué incluye

- Inicio inmersivo con animaciones sutiles y composición editorial.
- Seis proyectos reales / en desarrollo, con filtros por especialidad.
- Casos interactivos: desafío, solución, resultado y tecnologías.
- Sección de soluciones: webs, sistemas, bots, redes y soporte.
- Historia personal, proceso de trabajo, stack y visión de CZ TECNO.
- Contacto directo por email e Instagram; enlaces a GitHub y proyectos públicos.
- Menú responsive, ventana de accesos rápidos (**Ctrl/Cmd + K**), botón para copiar correo.
- SEO, metadatos sociales, portada SVG, favicon SVG, soporte para movimiento reducido y carga liviana.

> **Importante:** Los gráficos dentro de las tarjetas son composiciones conceptuales ilustrativas, **no capturas del software real**. No se muestran datos privados, métricas de clientes ni sistemas internos.

## Stack

React 18 · TypeScript · Vite · CSS sin frameworks de UI · Lucide React.

## Correr localmente

```bash
npm install
npm run dev
```

Abrir la dirección que informa Vite (normalmente `http://localhost:5173`).

## Compilar

```bash
npm run build
npm run preview
```

## Publicar en GitHub Pages

El repositorio incluye `.github/workflows/deploy.yml`, que genera y publica el build automáticamente al hacer push a `main`.

1. Entrar a **Settings → Pages** del repositorio.
2. En **Build and deployment**, configurar **Source → GitHub Actions**.
3. Revisar el resultado en **Actions**.
4. Abrir la URL de Pages que devuelve GitHub. Para `pedrochiozza5/portfolio`, la dirección esperada es `https://pedrochiozza5.github.io/portfolio/`, una vez publicado.

El sitio usa `base: './'`, así que funciona en un subdirectorio de GitHub Pages.

## Personalizar

- `src/App.tsx`: textos, proyectos, categorías y enlaces.
- `src/styles.css`: estética, responsive y animaciones.
- `public/cover.svg`: portada social.
- `public/favicon.svg`: favicon.
- `index.html`: título y metadatos SEO.

## Criterios

- Sin backend ni formulario que guarde datos personales.
- No compartir credenciales, datos de clientes, capturas internas ni métricas no verificadas.
- Mantener actualizados los estados de los proyectos y usar capturas reales solo con permiso.

---

**CZ TECNO** · [GitHub](https://github.com/pedrochiozza5) · [Instagram](https://www.instagram.com/cz.tecno/)

## Editor de proyectos e imágenes — Pages CMS

1. Abrí https://app.pagescms.org e iniciá sesión con GitHub.
2. Instalá la app de Pages CMS con acceso **solo** al repositorio `pedrochiozza5/portfolio`.
3. Entrá a **Proyectos del portfolio**: podés editar nombres, descripciones, links, tecnologías, imágenes, agregar o quitar proyectos.
4. Cuando guardás, Pages CMS hace un commit en GitHub y el workflow de GitHub Pages publica automáticamente el cambio.

Las fotos se guardan dentro de `public/images/projects` y los proyectos en `src/content/projects.json`. Si no hay imagen, se mantiene la composición visual original. No requiere que pegues contraseñas ni tokens en la web pública.

**WhatsApp principal:** +54 9 2241 540585. Correo secundario: pedrochiozza5@gmail.com.

**Identidad:** `public/logo-cztecno.svg` es una reproducción vectorizada del logo que compartiste, desde la captura de pantalla.


## Editor de proyectos (CZ TECNO v2.2)

Abrí el portfolio con `?editar=1` en la URL, o entrá por **Editar portfolio** en el pie de página.

El editor permite cambiar nombres, descripciones, desafíos, soluciones, resultados, tecnologías, enlaces y categorías; agregar, borrar y reordenar proyectos; importar proyectos desde JSON; y cargar JPG/PNG/WEBP con optimización automática. También muestra las imágenes en las tarjetas y casos del sitio.

**Importante: es un editor de borradores local, no un backend administrativo con autenticación.** El botón de edición guarda en el almacenamiento del navegador y solo modifica la vista de ese dispositivo. No guarda credenciales ni escribe directamente en GitHub. No publiques contraseñas ni información privada en las capturas o el JSON.

### Cómo publicar los cambios para todo el público

1. Desde la pestaña **Publicar** del editor, elegí **Copiar JSON** o **Descargar JSON**.
2. Abrí [src/content/projects.json](https://github.com/pedrochiozza5/portfolio/edit/main/src/content/projects.json) con tu sesión de GitHub.
3. Reemplazá el contenido por el JSON exportado y confirmá **Commit changes** en la rama `main`.
4. El workflow de GitHub Actions recompila y publica la web. Al terminar, los visitantes ven los nuevos proyectos e imágenes.

Las fotos subidas desde el editor se comprimen y se guardan como datos embebidos en el JSON; para una galería grande conviene guardar fotos en `public/images/projects/` y usar rutas relativas del tipo `images/projects/mi-foto.jpg`.

El WhatsApp comercial principal es **+54 9 2241 540585**. El correo queda como contacto secundario. El logotipo vectorial fue recuperado de la imagen facilitada por el propietario.
