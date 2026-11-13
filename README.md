# CZ TECNO × BC Studio — Portfolio conjunto (V3)

**No es solo código. Es hacer que pase.**  
Portfolio de la futura agencia digital de **Pedro Chiozza y Bautista Chiozza**, manteniendo sus identidades **CZ TECNO** y **BC Studio** hasta definir la marca definitiva.

## Identidad visual
- **Negro carbón:** `#0B0F14`
- **Azul profundo:** `#0F2D52`
- **Celeste tecnológico:** `#4DB8FF`
- **Blanco suave:** `#F5F7FA`
- **Gris frío:** `#8A96A3`

Se preserva el logo original de CZ TECNO. **BC Studio** se representa por ahora mediante un monograma tipográfico, no un logo oficial nuevo.

## Contenido
- Presentación conjunta de Pedro + Bautista, con perfiles y vínculos individuales.
- Servicios de desarrollo web, sistemas a medida, automatizaciones e infraestructura IT.
- **10 proyectos** en `src/content/projects.json`. Los seis proyectos iniciales se atribuyen a CZ TECNO y se incorporan cuatro proyectos compartidos por Bautista:
  - Alojamiento Don Felipe: https://alojamientodonfelipe.com.ar
  - Studio JG: https://studio-jg.vercel.app
  - Cabañas El Zorzal: https://cabañaselzorzal.com.ar
  - La Pieza Barber: https://lapiezabarber.com.ar
- Acceso a https://curriculum-bautista.vercel.app (enlace proporcionado, no inspeccionado completamente).
- Contacto principal: WhatsApp **+54 9 2241 540585**, con acceso a ambas cuentas de Instagram.

**Verificación editorial:** el currículum y los cuatro sitios externos no pudieron abrirse desde el entorno de edición. Sus fichas se redactaron solo con los nombres y enlaces compartidos, sin afirmar tecnologías, funciones ni resultados no verificados. Las vistas previas de estos sitios son ilustrativas, no capturas reales. Se recomienda completar cada ficha con datos aportados por Bautista.

## Editor de proyectos
- URL local o pública con `?editar=1`.
- Puede editar textos, enlaces, autor (CZ TECNO / BC Studio), categorías, etiquetas, orden y fotos.
- Mantiene un borrador en el almacenamiento del navegador.
- **Para publicar a todos**: usar la pestaña **Publicar**, copiar o descargar `projects.json` y reemplazar `src/content/projects.json` en GitHub. GitHub Pages se reconstruye con un nuevo commit.
- Nunca incorporar datos internos ni claves.
- Al actualizar desde la versión anterior, el sitio conserva personalizaciones locales existentes y agrega los proyectos nuevos que falten.

## Desarrollo
React 18 + TypeScript + Vite + CSS + Lucide React.

```bash
npm ci
npm run dev
npm run build
```

## Publicación
- `main` se publica por `.github/workflows/deploy.yml`.
- En Settings → Pages, seleccionar **GitHub Actions**.
- URL prevista: https://pedrochiozza5.github.io/portfolio/

## Próximas mejoras sugeridas
1. Definir nombre, identidad y dominio oficial de la agencia.
2. Agregar logo auténtico de BC Studio (archivo de origen, no captura de perfil).
3. Incorporar capturas reales y testimonios autorizados.
4. Completar especialidades/formación de Bautista verificadas con el texto de su CV.
5. Si necesitan edición web multiusuario que publique sin GitHub, incorporar un backend o CMS autenticado.

© CZ TECNO × BC Studio.
