# Recortar y Rotar Imagen

Recorta el área que quieres, rota o voltea la foto y descárgala, todo dentro de tu navegador.

Herramienta gratuita y de código abierto de [SonhoLab](https://sonholab.com). Corre **100 % en el navegador**: los archivos no se suben a ningún servidor.

> Licencia: **MIT** · Autor: Leandro Manuel Perez Montañana · Idiomas de la interfaz: español, inglés, francés, portugués (BR), alemán, hindi, indonesio y ruso.

## Qué hace

Muchas veces la foto está bien pero el encuadre no: sobra fondo, quedó torcida o la red social la pide cuadrada. Aquí marcas con el mouse el área que quieres conservar, giras o volteas la imagen y descargas el resultado. Todo ocurre en tu navegador: el archivo no se sube a ningún servidor.

**Cuándo te sirve:**

- Tu foto de perfil de LinkedIn o WhatsApp sale con mucho fondo alrededor: la recortas cuadrada y dejas la cara centrada.
- Vendes por Instagram y las fotos del producto quedaron torcidas: las enderezas y las dejas todas con el mismo encuadre.
- Un formulario pide la foto del documento en vertical y el celular la guardó acostada: la giras y recortas los bordes que sobran.

## Cómo se usa

1. **Abre tu imagen.** Arrastra la foto al recuadro o haz clic para elegirla desde tu equipo. Se abre al instante en tu navegador, sin subirla a ningún lado.
2. **Marca el recorte.** Dibuja con el mouse el área que quieres conservar y ajusta las esquinas. Si hace falta, gira la imagen 90 grados o voltéala en espejo.
3. **Descarga el resultado.** Revisa la vista previa y descarga la imagen ya recortada. Queda en tu carpeta de descargas, sin marca de agua y lista para usar.

## Qué necesita para funcionar

### Para instalarla y compilarla

- [Node.js](https://nodejs.org) 18 o superior (probado con Node 22) y npm.
- Conexión a internet **solo** durante `npm install`. Una vez compilada, la herramienta no pide nada a internet.

### Complementos específicos de esta herramienta

- **Ninguno.** No usa modelos, binarios ni servicios externos: todo está en el código y en dependencias normales de npm.

### En el navegador de quien la usa

- Cualquier navegador moderno (Chrome, Edge, Firefox, Safari). No necesita permisos especiales.

## Instalación

```bash
git clone https://github.com/nanoizax/herramienta-recortar-imagen.git
cd herramienta-recortar-imagen
npm install
npm run dev         # servidor de desarrollo en http://localhost:5173
```

Para publicarla:

```bash
npm run build       # genera la carpeta dist/
npm run preview     # probar la versión compilada
```

Esta herramienta **no tiene servidor propio**: todo ocurre en el navegador de quien la usa. Basta con publicar la carpeta `dist/` en cualquier hosting estático (GitHub Pages, Netlify, Cloudflare Pages, Nginx, Apache...).

## Cómo está organizado

```
src/pages/tools/   La página de la herramienta (interfaz y lógica de pantalla)
src/lib/tools/     La lógica de la herramienta, separada de la interfaz
src/components/    Piezas compartidas (zona de arrastre de archivos, botón)
src/locales/       Textos en 8 idiomas (esta herramienta solamente)
src/i18n.ts        Configuración de idiomas
```

## Cómo meterla en tu propia plataforma

1. **Como página aparte:** publica `dist/` en una ruta de tu sitio, por ejemplo `/herramientas/recortar-imagen/`. Si la sirves en una subcarpeta, define `base` en `vite.config.ts`.
2. **Dentro de tu aplicación React:** copia `src/pages/tools/*Page.tsx`, `src/lib/tools/` y `src/components/` a tu proyecto, instala las mismas dependencias de `package.json` y renderiza la página donde quieras.
3. **Con tu diseño:** el marco de la página (título, ayuda, preguntas frecuentes) está en `src/components/tools/ToolPageLayout.tsx` y es intencionalmente simple. Cámbialo por tu cabecera, tu pie y tus estilos; solo necesita pintar `children`.
4. **Con tu analítica:** `src/lib/hitCounter.ts` no hace nada. Si quieres medir el uso, conéctalo ahí a tu propia herramienta.

## Privacidad

Todo el procesamiento ocurre en el navegador. Esta copia no incluye analítica, cookies, contadores ni llamadas a ningún servidor propio. Los archivos del usuario no salen de su equipo.

## Preguntas frecuentes

**¿Qué pasa con mis imágenes, se suben a algún servidor?**  
No. El recorte ocurre dentro de tu navegador, con los recursos de tu propio equipo. La foto no viaja por internet ni queda guardada en ninguna parte, y cuando cierras la pestaña no queda rastro de ella fuera de tu dispositivo.

**¿Es gratis? ¿Hay límite de imágenes?**  
Es gratis y no hay límite de imágenes ni registro. Como el trabajo lo hace tu equipo y no un servidor nuestro, no tenemos costo por archivo procesado ni cola de espera, y tampoco agregamos marca de agua al resultado.

**¿Necesito instalar algún programa?**  
No. Funciona en el navegador que ya tienes, sea computadora, tablet o celular. No hay extensión ni aplicación que descargar: abres la página, arrastras la imagen y listo. Una vez cargada la página, el recorte funciona aunque se corte la conexión.

**¿Qué formatos de imagen puedo recortar?**  
Los que abre cualquier navegador: JPG, PNG y WebP, además de GIF, aunque un GIF animado se descarga como imagen fija. El resultado queda como una imagen normal, lista para subir a una red social o adjuntar en un formulario.

**¿Se pierde calidad al recortar o rotar la foto?**  
El recorte conserva los píxeles del área que marcas, así que a simple vista no vas a notar diferencia. Al guardar, un JPG se vuelve a comprimir y puede perder algo mínimo. Lo que sí cambia es el tamaño: si recortas una parte pequeña, la descarga tendrá menos píxeles.

## Licencia

Este proyecto se publica bajo la licencia **MIT**. El texto completo está en [LICENSE](LICENSE).

Las dependencias tienen sus propias licencias, listadas en [THIRD-PARTY.md](THIRD-PARTY.md).

## Más herramientas gratuitas

Esta es una de las herramientas gratuitas de SonhoLab. Encuentra el resto, cada una con su repositorio, en https://sonholab.com/es/herramientas.

---

Hecho por Leandro Manuel Perez Montañana.
