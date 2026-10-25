/**
 * Utilidad de compresión y conversión automática a formato WebP
 * Reduce imágenes de cámaras o celulares (3MB - 12MB) a ~50KB - 95KB en formato WebP
 * garantizando carga ultrarrápida en redes móviles y catálogo web.
 */
export async function compressAndConvertToWebP(file, maxDimension = 1400, quality = 0.78) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('El archivo seleccionado no es una imagen válida.'));
      return;
    }

    const originalSizeKb = (file.size / 1024).toFixed(1);
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
        
        // Calidad de renderizado suave
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convertir a WebP optimizado
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Error al convertir la imagen a formato WebP'));
              return;
            }
            const cleanName = (file.name || 'foto_maquinaria')
              .replace(/\.[^/.]+$/, '')
              .replace(/[^a-zA-Z0-9_-]/g, '_') + '.webp';

            const webpFile = new File([blob], cleanName, { type: 'image/webp' });
            const dataUrl = canvas.toDataURL('image/webp', quality);
            const sizeKb = (blob.size / 1024).toFixed(1);
            const ratio = Math.round((1 - (blob.size / file.size)) * 100);

            resolve({
              file: webpFile,
              dataUrl,
              fileName: cleanName,
              sizeKb,
              originalSizeKb,
              reductionPercent: ratio > 0 ? ratio : 0,
              width,
              height
            });
          },
          'image/webp',
          quality
        );
      };
      img.onerror = (err) => reject(new Error('No se pudo procesar la imagen: ' + err));
      img.src = e.target.result;
    };
    reader.onerror = (err) => reject(new Error('Error leyendo el archivo: ' + err));
    reader.readAsDataURL(file);
  });
}

/**
 * Compresión por lotes para múltiples imágenes simultáneas
 */
export async function compressMultipleImages(fileList, maxDimension = 1400, quality = 0.78, onProgress = null) {
  const results = [];
  const files = Array.from(fileList);
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    try {
      const res = await compressAndConvertToWebP(file, maxDimension, quality);
      results.push(res);
      if (onProgress) {
        onProgress(i + 1, files.length, res);
      }
    } catch (e) {
      console.warn(`Error comprimiendo imagen ${file.name}:`, e);
    }
  }
  
  return results;
}
