const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const logoPath = path.resolve('public/brand/rst_logo_transparent.png');
const logoBase64 = fs.readFileSync(logoPath).toString('base64');
const logoDataUri = `data:image/png;base64,${logoBase64}`;

const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Documentación Oficial y Entrega de Proyecto - RST Importaciones</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

    @page {
      size: A4;
      margin: 12mm 15mm 12mm 15mm;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #1a1a1a;
      background-color: #ffffff;
      font-size: 8.5pt;
      line-height: 1.45;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .brand-header {
      text-align: center;
      padding-top: 2px;
      padding-bottom: 12px;
      margin-bottom: 12px;
      border-bottom: 1px solid #eaeaea;
    }

    .brand-logo {
      height: 52px;
      max-width: 220px;
      object-fit: contain;
      display: inline-block;
    }

    .document-title {
      font-size: 16.5pt;
      font-weight: 800;
      letter-spacing: -0.4px;
      color: #111827;
      margin-bottom: 3px;
      text-transform: uppercase;
    }

    .document-subtitle {
      font-size: 8.5pt;
      color: #64748b;
      font-weight: 500;
      margin-bottom: 14px;
    }

    .section {
      margin-bottom: 13px;
      break-inside: avoid;
      page-break-inside: avoid;
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 7px;
      margin-bottom: 7px;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 3px;
    }

    .section-number {
      background: #FE8003;
      color: #ffffff;
      font-size: 7.2pt;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 3px;
    }

    .section-title {
      font-size: 9.8pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.25px;
      color: #0f172a;
    }

    .card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 5px;
      padding: 9px 12px;
      margin-bottom: 7px;
    }

    .card-highlight {
      background: #fafaf9;
      border-left: 3.5px solid #FE8003;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 9px;
    }

    .grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 7px;
    }

    .meta-row {
      display: flex;
      justify-content: space-between;
      padding: 2.5px 0;
      border-bottom: 1px dashed #f1f5f9;
      font-size: 8pt;
    }

    .meta-label { color: #64748b; font-weight: 600; }
    .meta-value { color: #0f172a; font-weight: 700; text-align: right; }

    .code-badge {
      font-family: 'JetBrains Mono', monospace;
      background: #f1f5f9;
      color: #0f172a;
      padding: 1.5px 5px;
      border-radius: 3px;
      font-size: 7.6pt;
      font-weight: 600;
      border: 1px solid #e2e8f0;
    }

    .badge-orange { background: #fff7ed; color: #c2410c; border: 1px solid #fed7aa; font-weight: 700; }
    .badge-blue { background: #f0f9ff; color: #0369a1; border: 1px solid #bae6fd; font-weight: 700; }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 7.6pt;
      margin: 5px 0;
    }

    th {
      background: #f8fafc;
      color: #0f172a;
      text-align: left;
      padding: 5px 7px;
      font-weight: 700;
      border-bottom: 1.5px solid #cbd5e1;
      text-transform: uppercase;
      font-size: 7pt;
    }

    td {
      padding: 4.5px 7px;
      border-bottom: 1px solid #f1f5f9;
      color: #334155;
    }

    .callout-warning {
      background: #fffbeb;
      border: 1px solid #fde68a;
      border-left: 3.5px solid #d97706;
      padding: 7px 10px;
      border-radius: 4px;
      font-size: 7.9pt;
      color: #92400e;
      margin: 6px 0;
    }

    .callout-info {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-left: 3.5px solid #16a34a;
      padding: 7px 10px;
      border-radius: 4px;
      font-size: 7.9pt;
      color: #14532d;
      margin: 6px 0;
    }

    .page-break { page-break-before: always; break-before: page; }

    .doc-footer {
      margin-top: 14px;
      padding-top: 8px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.2pt;
      color: #94a3b8;
    }
  </style>
</head>
<body>

  <!-- PÁGINA 1: LOGO DE LA MARCA (SOLO LOGO ARRIBA) -->
  <div class="brand-header">
    <img src="${logoDataUri}" alt="RST Logo Oficial" class="brand-logo" />
  </div>

  <div style="margin-bottom: 14px;">
    <h1 class="document-title">Documentación Técnica y Manual de Entrega</h1>
    <div class="document-subtitle">Sitio Web Oficial RST Importaciones · Administración, Correos Corporativos, SEO y Garantía</div>
  </div>

  <!-- 1. DATOS DEL DESARROLLADOR -->
  <div class="section">
    <div class="section-header">
      <span class="section-number">01</span>
      <h2 class="section-title">Datos del Desarrollador y Proveedor de Software</h2>
    </div>
    
    <div class="card card-highlight">
      <div class="grid-2">
        <div>
          <div class="meta-row">
            <span class="meta-label">Desarrollador Responsable:</span>
            <span class="meta-value">Oscar P.</span>
          </div>
          <div class="meta-row">
            <span class="meta-label">Rol Profesional:</span>
            <span class="meta-value">Desarrollador Web Full Stack</span>
          </div>
        </div>
        <div>
          <div class="meta-row">
            <span class="meta-label">Empresa / Laboratorio:</span>
            <span class="meta-value">Noweb Labs</span>
          </div>
          <div class="meta-row">
            <span class="meta-label">Servicio Contratado:</span>
            <span class="meta-value" style="color:#c2410c;">Sitio web a medida con catálogo</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 2. DOCUMENTACIÓN DEL SITIO -->
  <div class="section">
    <div class="section-header">
      <span class="section-number">02</span>
      <h2 class="section-title">Documentación Técnica de la Plataforma Web</h2>
    </div>

    <div class="card" style="margin-bottom: 7px;">
      <div class="meta-row" style="padding-bottom: 3px;">
        <span class="meta-label">Enlace de Producción Activo (En Vivo):</span>
        <span class="meta-value"><a href="https://www.rstimportaciones.cl/" style="color:#0284c7; text-decoration:none;">https://www.rstimportaciones.cl/</a></span>
      </div>
      <div class="meta-row" style="padding-top: 3px; border-bottom: none;">
        <span class="meta-label">Infraestructura y Red CDN:</span>
        <span class="meta-value">Vercel Global Edge Network (SSL/TLS Automatizado & Compresión Brotli)</span>
      </div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div style="font-weight: 800; color: #0f172a; margin-bottom: 4px; font-size: 8.2pt; display:flex; justify-content:space-between;">
          <span>ARQUITECTURA FRONTEND</span>
          <span class="code-badge badge-orange">React 19 + Vite</span>
        </div>
        <ul style="font-size: 7.7pt; line-height: 1.42; padding-left: 13px; color:#334155;">
          <li><strong>Framework Core:</strong> React 19 SPA con renderizado ultra fluido.</li>
          <li><strong>Compilador:</strong> Vite v8.3 con tiempo de build de 1.2s.</li>
          <li><strong>Diseño Editorial:</strong> Fondo blanco SaaS, responsive sin desbordes horizontales.</li>
          <li><strong>Rutas & UI:</strong> React Router DOM v7 y Lucide React Icons.</li>
        </ul>
      </div>

      <div class="card">
        <div style="font-weight: 800; color: #0f172a; margin-bottom: 4px; font-size: 8.2pt; display:flex; justify-content:space-between;">
          <span>ARQUITECTURA BACKEND</span>
          <span class="code-badge badge-orange">PocketBase BaaS</span>
        </div>
        <ul style="font-size: 7.7pt; line-height: 1.42; padding-left: 13px; color:#334155;">
          <li><strong>Base de Datos:</strong> PocketBase Cloud en <span class="code-badge">https://bd.rstimportaciones.cl</span>.</li>
          <li><strong>Seguridad:</strong> Consultas preparadas SQLite (anti-SQL Injection) y sanitización estricta.</li>
          <li><strong>Archivos:</strong> Múltiples imágenes WebP optimizadas por ficha y manuales PDF.</li>
          <li><strong>Resiliencia:</strong> Sincronización en tiempo real con respaldo en caché local.</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- 3. TUTORIAL MODO ADMIN -->
  <div class="section">
    <div class="section-header">
      <span class="section-number">03</span>
      <h2 class="section-title">Manual de Uso del Panel de Administración (Fondo Blanco & Móvil)</h2>
    </div>

    <div class="card card-highlight">
      <div style="font-weight: 800; color: #0f172a; margin-bottom: 4px; font-size: 8.2pt;">ACCESO SEGURO AL PANEL ADMINISTRATIVO</div>
      <div class="grid-3">
        <div>
          <span class="meta-label" style="display:block; font-size:7pt;">ENLACE DIRECTO:</span>
          <span class="code-badge" style="display:inline-block; margin-top:2px;">/admin/login</span>
        </div>
        <div>
          <span class="meta-label" style="display:block; font-size:7pt;">USUARIO ADMIN:</span>
          <span class="code-badge badge-orange" style="display:inline-block; margin-top:2px;">RST4</span>
        </div>
        <div>
          <span class="meta-label" style="display:block; font-size:7pt;">CLAVE DE ACCESO:</span>
          <span class="code-badge badge-orange" style="display:inline-block; margin-top:2px;">Rst#2026!Pass</span>
        </div>
      </div>
    </div>

    <div class="card">
      <div style="font-weight: 700; color: #0f172a; margin-bottom: 3px;">Experiencia de Usuario Mejorada:</div>
      <ol style="font-size: 7.7pt; line-height: 1.42; margin-left: 14px; color:#334155;">
        <li><strong>Fondo Blanco y Tarjetas Cuadradas:</strong> Interfaz luminosa sin fondos oscuros. En celulares se organiza en tarjetas visuales, eliminando el scroll horizontal.</li>
        <li><strong>Edición en Página Completa:</strong> Al pulsar <em>"Editar Ficha"</em>, se abre una página completa con todo el espacio para editar especificaciones, motor y valores.</li>
        <li><strong>Subida Múltiple de Fotos con Compresión WebP en Baja:</strong> Permite seleccionar varias fotos a la vez. El sistema las comprime en el navegador a WebP (&lt; 90 KB) para máxima velocidad de carga.</li>
        <li><strong>Subida y Descarga de PDF:</strong> Permite adjuntar el manual técnico en PDF con enlace de apertura directa.</li>
        <li><strong>Alternador Rápido de Stock:</strong> Botón táctil para alternar en un clic entre <strong>"EN STOCK"</strong> y <strong>"VENDIDA"</strong>.</li>
      </ol>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- PÁGINA 2: LOGO DE LA MARCA (SOLO LOGO ARRIBA) -->
  <div class="brand-header" style="margin-bottom: 12px; padding-bottom: 12px;">
    <img src="${logoDataUri}" alt="RST Logo Oficial" class="brand-logo" style="height: 46px;" />
  </div>

  <!-- 4. TUTORIAL CORREO CORPORATIVO CON OUTLOOK -->
  <div class="section">
    <div class="section-header">
      <span class="section-number">04</span>
      <h2 class="section-title">Configuración del Correo Corporativo en Outlook (PC y Móvil)</h2>
    </div>

    <div class="callout-warning">
      <strong>MOTIVO TÉCNICO DE LA CONFIGURACIÓN CON "mail.":</strong><br>
      El dominio principal <span class="code-badge">rstimportaciones.cl</span> apunta por registros DNS hacia <strong>Vercel</strong> para servir la web a velocidad ultra rápida. Por esa razón, el servidor de correo <strong>NUNCA</strong> debe ser el dominio raíz, sino obligatoriamente <strong><span class="code-badge" style="background:#fed7aa; color:#9a3412;">mail.rstimportaciones.cl</span></strong>, que está enlazado a los registros MX del servidor de correos.
    </div>

    <!-- CUENTAS CORPORATIVAS ACTIVAS -->
    <div class="card card-highlight">
      <div style="font-weight: 800; color: #0f172a; margin-bottom: 6px; font-size: 8.2pt;">CUENTAS DE CORREO CORPORATIVO HABILITADAS</div>
      
      <!-- Cuenta 1: Rudy -->
      <div style="margin-bottom: 6px; padding-bottom: 5px; border-bottom: 1px dashed #e2e8f0;">
        <div style="font-weight: 700; color: #c2410c; font-size: 7.7pt; margin-bottom: 2px;">1. CUENTA DIRECTA / GERENCIA (RUDY):</div>
        <div class="grid-2">
          <div>
            <div class="meta-row">
              <span class="meta-label">Dirección de Correo:</span>
              <span class="meta-value">rudy@rstimportaciones.cl</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Contraseña Asignada:</span>
              <span class="meta-value"><span class="code-badge badge-orange">SRUD34-.Ss</span></span>
            </div>
          </div>
          <div>
            <div class="meta-row">
              <span class="meta-label">Usuario Completo:</span>
              <span class="meta-value">rudy@rstimportaciones.cl</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Protocolo:</span>
              <span class="meta-value">IMAP (PC y Celular)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Cuenta 2: Contacto General -->
      <div>
        <div style="font-weight: 700; color: #0369a1; font-size: 7.7pt; margin-bottom: 2px;">2. CUENTA GENERAL / VENTAS:</div>
        <div class="grid-2">
          <div>
            <div class="meta-row">
              <span class="meta-label">Dirección de Correo:</span>
              <span class="meta-value">contacto@rstimportaciones.cl</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Contraseña Asignada:</span>
              <span class="meta-value"><span class="code-badge badge-blue">Rst#Contacto2026!</span></span>
            </div>
          </div>
          <div>
            <div class="meta-row">
              <span class="meta-label">Usuario Completo:</span>
              <span class="meta-value">contacto@rstimportaciones.cl</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">Protocolo:</span>
              <span class="meta-value">IMAP (PC y Celular)</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Servidor</th>
          <th>Puerto</th>
          <th>Seguridad</th>
          <th>Autenticación</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Entrante (IMAP)</strong></td>
          <td><span class="code-badge">mail.rstimportaciones.cl</span></td>
          <td><strong>993</strong></td>
          <td>SSL / TLS</td>
          <td>Contraseña normal (mismo usuario y clave)</td>
        </tr>
        <tr>
          <td><strong>Saliente (SMTP)</strong></td>
          <td><span class="code-badge">mail.rstimportaciones.cl</span></td>
          <td><strong>465</strong> (o 587)</td>
          <td>SSL / TLS</td>
          <td>Requerida (mismas credenciales de entrada)</td>
        </tr>
      </tbody>
    </table>

    <div class="grid-2" style="margin-top: 6px;">
      <div class="card">
        <div style="font-weight: 800; color: #0f172a; margin-bottom: 3px; font-size: 8pt;">OUTLOOK PARA COMPUTADOR (WINDOWS / MAC)</div>
        <ol style="font-size: 7.4pt; line-height: 1.4; margin-left: 13px; color:#334155;">
          <li>En Outlook: <em>Archivo > Agregar Cuenta > Configuración manual > IMAP</em>.</li>
          <li>En Servidor Entrante: <span class="code-badge">mail.rstimportaciones.cl</span> (Puerto 993, SSL/TLS).</li>
          <li>En Servidor Saliente: <span class="code-badge">mail.rstimportaciones.cl</span> (Puerto 465, SSL/TLS).</li>
          <li>En <em>"Más configuraciones" > "Servidor de salida"</em>, marcar: <strong>"Mi servidor de salida requiere autenticación"</strong>.</li>
        </ol>
      </div>

      <div class="card">
        <div style="font-weight: 800; color: #0f172a; margin-bottom: 3px; font-size: 8pt;">OUTLOOK EN CELULAR (IPHONE / ANDROID)</div>
        <ol style="font-size: 7.4pt; line-height: 1.4; margin-left: 13px; color:#334155;">
          <li>Abra Outlook en su móvil e ingrese su correo corporativo correspondiente.</li>
          <li>Seleccione <em>"Configurar cuenta manualmente"</em> y elija <strong>IMAP</strong>.</li>
          <li>Servidor IMAP: <span class="code-badge">mail.rstimportaciones.cl:993</span> con SSL.</li>
          <li>Servidor SMTP: <span class="code-badge">mail.rstimportaciones.cl:465</span> con SSL.</li>
        </ol>
      </div>
    </div>
  </div>

  <!-- 5. INFORME SEO ACTUALIZADO -->
  <div class="section">
    <div class="section-header">
      <span class="section-number">05</span>
      <h2 class="section-title">Informe SEO: Título al Compartir y Palabras Clave Regionales</h2>
    </div>

    <!-- Título al compartir destacado -->
    <div class="callout-info">
      <strong>TÍTULO Y METADATOS OFICIALES AL COMPARTIR EN REDES Y WHATSAPP:</strong><br>
      <span style="font-size: 8.5pt; font-weight:800; color:#0f172a;">
        "Mini Excavadoras en Región de Los Lagos y Todo Chile | Catálogo Oficial RST"
      </span><br>
      <span style="font-size:7.4pt; color:#166534;">
        Configurado en etiquetas OpenGraph (<span class="code-badge">og:title</span>), Twitter Card (<span class="code-badge">twitter:title</span>) y <span class="code-badge">&lt;title&gt;</span> principal.
      </span>
    </div>

    <p style="font-size: 7.8pt; margin-bottom: 5px; color:#334155;">
      Estrategia de posicionamiento orgánico con las <strong>6 palabras clave oficiales</strong> requeridas (nacionales y regionales):
    </p>

    <!-- Grid de 6 Palabras Clave -->
    <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 5px; margin-bottom: 6px;">
      <div class="card" style="padding: 5px; text-align: center; border-top: 2.5px solid #FE8003; margin:0;">
        <div style="font-size: 6.5pt; font-weight:700; color:#64748b;">PALABRA CLAVE 1</div>
        <div style="font-size: 7.4pt; font-weight:800; color:#0f172a;">"Mini excavadoras en Chile"</div>
      </div>
      <div class="card" style="padding: 5px; text-align: center; border-top: 2.5px solid #FE8003; margin:0;">
        <div style="font-size: 6.5pt; font-weight:700; color:#64748b;">PALABRA CLAVE 2</div>
        <div style="font-size: 7.4pt; font-weight:800; color:#0f172a;">"Mini excavadoras SANNY"</div>
      </div>
      <div class="card" style="padding: 5px; text-align: center; border-top: 2.5px solid #FE8003; margin:0;">
        <div style="font-size: 6.5pt; font-weight:700; color:#64748b;">PALABRA CLAVE 3</div>
        <div style="font-size: 7.4pt; font-weight:800; color:#0f172a;">"Donde comprar mini excavadoras"</div>
      </div>
      <div class="card" style="padding: 5px; text-align: center; border-top: 2.5px solid #FE8003; margin:0;">
        <div style="font-size: 6.5pt; font-weight:700; color:#64748b;">PALABRA CLAVE 4</div>
        <div style="font-size: 7.4pt; font-weight:800; color:#0f172a;">"Mini excavadoras en puerto montt"</div>
      </div>
      <div class="card" style="padding: 5px; text-align: center; border-top: 2.5px solid #16a34a; margin:0; background:#f0fdf4;">
        <div style="font-size: 6.5pt; font-weight:700; color:#15803d;">PALABRA CLAVE 5 (REGIONAL)</div>
        <div style="font-size: 7.4pt; font-weight:800; color:#14532d;">"Mini excavadoras en Llanquihue"</div>
      </div>
      <div class="card" style="padding: 5px; text-align: center; border-top: 2.5px solid #16a34a; margin:0; background:#f0fdf4;">
        <div style="font-size: 6.5pt; font-weight:700; color:#15803d;">PALABRA CLAVE 6 (REGIONAL)</div>
        <div style="font-size: 7.4pt; font-weight:800; color:#14532d;">"Mini excavadoras Región de Los Lagos"</div>
      </div>
    </div>

    <div class="card">
      <ul style="font-size: 7.4pt; line-height: 1.4; padding-left: 13px; color:#334155;">
        <li><strong>Optimización Local Dual:</strong> Posicionamiento focalizado en la bodega de <strong>Llanquihue</strong> (Parcela 11, Ruta V-500) y atención en <strong>Puerto Montt</strong>, con despacho rápido a comunas vecinas (Puerto Varas, Frutillar, Osorno, Chiloé).</li>
        <li><strong>Schema.org JSON-LD LocalBusiness & FAQPage:</strong> Coordenadas geográficas de Llanquihue y Puerto Montt (<span class="code-badge">geo.region: CL-LL</span>), con radio de cobertura en toda la Región de Los Lagos y territorio nacional.</li>
        <li><strong>Componente FAQ en Página de Inicio:</strong> Encabezado semántico H2: <em>"Mini Excavadoras en Región de Los Lagos y Todo Chile"</em> con tarjetas temáticas para indexación rápida por el algoritmo de Google.</li>
      </ul>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- PÁGINA 3: LOGO DE LA MARCA (SOLO LOGO ARRIBA) -->
  <div class="brand-header" style="margin-bottom: 12px; padding-bottom: 12px;">
    <img src="${logoDataUri}" alt="RST Logo Oficial" class="brand-logo" style="height: 46px;" />
  </div>

  <!-- 6. GARANTÍA Y ESCALABILIDAD -->
  <div class="section">
    <div class="section-header">
      <span class="section-number">06</span>
      <h2 class="section-title">Garantía, Plazos de Búsqueda y Escalabilidad del Sistema</h2>
    </div>

    <div class="card card-highlight" style="margin-bottom: 9px;">
      <div style="font-weight: 800; color: #0f172a; margin-bottom: 3px; font-size: 8.8pt;">
        GARANTÍA DE SOPORTE Y CAMBIOS ESTÉTICOS (30 DÍAS)
      </div>
      <p style="font-size: 7.8pt; line-height: 1.44; margin-bottom: 0; color:#334155;">
        El proyecto cuenta con <strong>30 días de garantía de satisfacción</strong> a partir de la entrega. Durante este plazo, el cliente puede solicitar sin costo adicional: cambios estéticos, ajustes de tipografías o colores, adición de textos, sustitución de imágenes o mejoras visuales en cualquier sección.
      </p>
    </div>

    <div class="card" style="margin-bottom: 9px;">
      <div style="font-weight: 800; color: #0f172a; margin-bottom: 3px; font-size: 8.8pt;">
        TIEMPOS ESTIMADOS PARA RESULTADOS SEO EN GOOGLE
      </div>
      <p style="font-size: 7.8pt; line-height: 1.44; margin-bottom: 0; color:#334155;">
        El proceso técnico asegura que los robots de Google rastreen el sitemap inmediatamente. No obstante, <strong>los primeros resultados visibles y escalada de posiciones en los rankings orgánicos toman entre 1 y 2 semanas</strong>, tras lo cual se comenzará a registrar tráfico calificado proveniente de Llanquihue, Puerto Montt, Región de Los Lagos y todo Chile.
      </p>
    </div>

    <div class="card">
      <div style="font-weight: 800; color: #0f172a; margin-bottom: 3px; font-size: 8.8pt;">
        CAPACIDAD DE ESCALAMIENTO PROFESIONAL DE SOFTWARE
      </div>
      <p style="font-size: 7.8pt; line-height: 1.42; margin-bottom: 7px; color:#334155;">
        La aplicación fue desarrollada sobre una base de código desacoplada de nivel empresarial, lista para incorporar nuevos módulos de software sin rehacer el sistema:
      </p>

      <div class="grid-3">
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:4px; padding:7px;">
          <div style="font-weight:700; color:#0f172a; font-size:7.7pt; margin-bottom:2px;">MÓDULO E-COMMERCE</div>
          <p style="font-size:7.2pt; color:#475569; margin:0;">Pasarelas de pago Webpay Plus Transbank, Mercado Pago y cálculo de envíos en línea.</p>
        </div>
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:4px; padding:7px;">
          <div style="font-weight:700; color:#0f172a; font-size:7.7pt; margin-bottom:2px;">SISTEMA DE ARRIENDO</div>
          <p style="font-size:7.2pt; color:#475569; margin:0;">Agendamiento y arriendo por días/meses con calendario interactivo y contratos digitales.</p>
        </div>
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:4px; padding:7px;">
          <div style="font-weight:700; color:#0f172a; font-size:7.7pt; margin-bottom:2px;">CRM & COTIZADOR</div>
          <p style="font-size:7.2pt; color:#475569; margin:0;">Captura de leads, seguimiento comercial y enlace con facturación electrónica SII.</p>
        </div>
      </div>
    </div>
  </div>

  <div class="doc-footer">
    <div><strong>Noweb Labs</strong> · Soluciones de Software a Medida · Puerto Montt / Santiago, Chile</div>
    <div>Documento Oficial de Entrega · Octubre 2026</div>
  </div>

</body>
</html>`;

const tempHtmlPath = path.resolve('temp_documentacion.html');
fs.writeFileSync(tempHtmlPath, htmlContent, 'utf8');

const desktopPath = path.join(process.env.USERPROFILE || 'C:\\Users\\NOWEB  DESKTOP', 'Desktop');
const outputPdfPath = path.join(desktopPath, 'Documentacion_RST_NowebLabs.pdf');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browserExe = fs.existsSync(edgePath) ? edgePath : chromePath;

const cmd = `"${browserExe}" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="${outputPdfPath}" "file://${tempHtmlPath.replace(/\\/g, '/')}"`;

try {
  execSync(cmd, { stdio: 'inherit' });
  if (fs.existsSync(outputPdfPath)) {
    console.log('PDF generado exitosamente en el Escritorio:', outputPdfPath);
    if (fs.existsSync(tempHtmlPath)) {
      fs.unlinkSync(tempHtmlPath);
    }
  }
} catch (err) {
  console.error('Error generando PDF:', err);
}
