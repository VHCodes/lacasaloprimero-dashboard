export const validateEmail = (email) => {
  if (!email) return "El Correo electrónico es obligatorio.";

  if (email !== email.toLowerCase()) return "El Correo electrónico debe ser ingresado en minúscula.";

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/;
  if (!re.test(email)) return "El Correo electrónico debe tener un formato valido.";

  return "";
};

export const validatePasswordLogin = (password) => {
  if (!password) return "La contraseña es obligatoria.";

  const re = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\d]).*$/;
  if (!re.test(password)) return "La contraseña es incorrecta.";

  return "";
};

export const validatePassword = (password) => {
  if (!password) return "La contraseña es obligatoria.";

  const re = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\d]).*$/;
  if (!re.test(password))
    return "La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula, 1 símbolo y 1 numero.";

  return "";
};

export const validateUsername = (username) => {
  if (!username) return "El usuario es obligatorio.";

  const min = 4;
  const max = 20;
  if (username.length < min || username.length > max) return `El usuario debe tener entre ${min} y ${max} caracteres.`;

  const re = /^[a-zA-Z0-9ñÑ]+$/;
  if (!re.test(username)) return "El usuario solo puede contener letras y números.";

  return "";
};

export const validateIsAdmin = (isAdmin) => {
  const re = /^(true|false)$/;
  if (!re.test(isAdmin) || typeof isAdmin === "string") return "El administrador no puede ser de ese tipo.";

  return "";
};
