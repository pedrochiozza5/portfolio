# CZ Tecno — Portfolio web

Portfolio profesional de **CZ Tecno**, marca de desarrollo y soluciones IT de Pedro Chiozza.

## Tecnologías
React 18 · TypeScript · Vite · CSS · Lucide React. Sitio estático sin backend.

## Ejecutar
```powershell
npm.cmd install
npm.cmd run dev
```

## Comprobar compilación
```powershell
npm.cmd run build
```

## Publicar en GitHub Pages
1. Creá un repositorio llamado `portfolio` o `cz-tecno-portfolio`.
2. Subí todo el contenido de esta carpeta a la rama `main`.
3. En GitHub → Settings → Pages → Source, seleccioná **GitHub Actions**.
4. El workflow `.github/workflows/deploy.yml` instala dependencias, compila y publica automáticamente.

## Personalización
- `src/App.tsx`: textos, proyectos, email, Instagram y enlace de LinkedIn.
- `src/styles.css`: paleta, tipografía, componentes y diseño responsive.
- Las tarjetas de proyectos incluyen **composiciones ilustrativas**, no capturas reales. Sustituilas por capturas verificadas si querés presentar casos de clientes.
- El enlace de LinkedIn apunta por defecto al sitio genérico: cambialo por tu perfil antes de compartir.

**Nota:** No publicar credenciales, datos de clientes ni bases de datos en este repositorio.
