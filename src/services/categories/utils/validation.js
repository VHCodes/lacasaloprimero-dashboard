export const validateName = (name) => {
  if (!name) return "El nombre es obligatorio.";

  const re = /^([a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ]+\s)*[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ]+$/;
  if (!re.test(name)) return "El nombre solo puede contener letras y números.";

  const min = 4;
  const max = 20;
  if (name.length < min || name.length > max) return `El nombre debe tener entre ${min} y ${max} caracteres.`;

  return "";
};
