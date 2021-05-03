export const validateTitle = (title) => {
  if (!title) return "El titulo es obligatorio.";

  const re = /^([a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ]+\s)*[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ]+$/;
  if (!re.test(title)) return "El titulo solo puede contener letras y números.";

  const min = 4;
  const max = 50;
  if (title.length < min || title.length > max) return `El titulo debe tener entre ${min} y ${max} caracteres.`;

  return "";
};

export const validateCategory = (category) => {
  if (!category) return "La categoria es obligatoria.";

  return "";
};

export const validatePrice = (price) => {
  if (!price) return "El precio es obligatorio.";

  const re = /^(\d+(?:[,]\d{2})?)$/;
  if (!re.test(price)) return "El precio debe ser un numero y los decimales separados por coma.";

  return "";
};

export const validateDescription = (description) => {
  if (!description) return "La descripcion es obligatoria.";

  const min = 10;
  if (description.length < min) return `La descripcion debe tener mas de ${min} caracteres.`;

  return "";
};

export const validateCover = (cover) => {
  if (!cover) return "La caratula es obligatoria.";

  const allowed = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowed.includes(cover.type)) return "La caratula solo puede ser en formato: jpg jpeg png.";

  const size = 2;
  const maxSize = size * 1024 * 1024;
  if (cover.size > maxSize) return `La caratula es muy grande. Tamaño maximo: ${size}mb`;

  return "";
};

export const validateBlueprint = (blueprint) => {
  if (!blueprint) return "El plano es obligatorio.";

  const allowed = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowed.includes(blueprint.type)) return "El plano solo puede ser en formato: jpg jpeg png.";

  const size = 2;
  const maxSize = size * 1024 * 1024;
  if (blueprint.size > maxSize) return `El plano es muy grande. Tamaño maximo: ${size}mb`;

  return "";
};
