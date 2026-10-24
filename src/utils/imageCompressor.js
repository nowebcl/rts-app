/**
 * Utilidad de compresión y conversión automática a formato WebP
 * Reduce imágenes de cámaras o celulares (5MB-10MB) a ~100KB-180KB en formato WebP
 * antes de subirlas a PocketBase.
 */
export async function compressAndConvertToWebP(file, maxDimension = 1600, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('El archivo seleccionado no es una imagen válida.'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Redimensionar proporcionalmente si supera la resolución máxima
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Convertir a formato WebP optimizado
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Error al convertir la imagen a formato WebP'));
              return;
            }
            const cleanName = (file.name || 'maquina')
              .replace(/\.[^/.]+$/, '')
              .replace(/[^a-zA-Z0-9_-]/g, '_') + '.webp';

            const webpFile = new File([blob], cleanName, { type: 'image/webp' });
            const dataUrl = canvas.toDataURL('image/webp', quality);
            const sizeKb = (blob.size / 1024).toFixed(1);

            resolve({
              file: webpFile,
              dataUrl,
              fileName: cleanName,
              sizeKb,
              width,
              height
            });
          },
          'image/webp',
          quality
        );
      };
      img.onerror = (err) => reject(new Error('No se pudo decodificar la imagen: ' + err));
      img.src = e.target.result;
    };
    reader.onerror = (err) => reject(new Error('Error leyendo el archivo: ' + err));
    reader.readAsDataURL(file);
  });
}
