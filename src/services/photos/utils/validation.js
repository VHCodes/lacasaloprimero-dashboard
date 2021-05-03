export const validatePhoto = (photo) => {
  if (!photo) return "La foto es obligatoria.";

  const allowed = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowed.includes(photo.type)) return "La foto solo puede ser en formato: jpg jpeg png.";

  const size = 3;
  const maxSize = size * 1024 * 1024;
  if (photo.size > maxSize) return `La foto es muy grande. Tamaño maximo: ${size}mb`;

  return "";
};
