// Listado de imágenes reales de entregas en terreno RST Maquinarias
export const deliveries = Array.from({ length: 33 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return {
    id: `entrega-${num}`,
    image: `/images/entregas/entrega-${num}.jpg`,
    webp: `/images/entregas/entrega-${num}.webp`
  };
});
