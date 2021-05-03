export const validateProperty = (property) => {
  if (!property) return "La casa es obligatoria.";

  return "";
};

export const validateDiscount = (discount) => {
  if (!discount) return "El descuento es obligatorio.";

  const re = /^[1-9][0-9]?$|^100$/;
  if (!re.test(discount)) return "El descuento debe ser un numero entero entre 1 y 100.";

  return "";
};

export const validatePerPage = (perPage) => {
  if (!perPage) return "La cantidad a mostrar por pagina es obligatoria.";

  const re = /^[1-9][0-9]*$/;
  if (!re.test(perPage)) return "La cantidad a mostrar por pagina debe ser un numero entero mayor a 0.";

  return "";
};

export const validateContent = (content) => {
  if (!content) return "La descripcion es obligatoria.";

  const min = 10;
  if (content.length < min) return `La descripcion debe tener mas de ${min} caracteres.`;

  return "";
};

export const validateAddress = (address) => {
  if (!address) return "La dirección es obligatoria.";

  const re = /^([a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ,]+\s)*[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ]+$/;
  if (!re.test(address)) return "La dirección solo puede contener letras y números.";

  const min = 4;
  const max = 100;
  if (address.length < min || address.length > max) return `La dirección debe tener entre ${min} y ${max} caracteres.`;

  return "";
};

const emailRules = (email) => {
  if (!email) return "El Correo electrónico es obligatorio.";

  if (email !== email.toString().toLowerCase()) return "El Correo electrónico debe ser ingresado en minúscula.";

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/;
  if (!re.test(email)) return "El Correo electrónico debe tener un formato valido.";

  return "";
};

export const validateEmails = (emails) => {
  for (let i = 0; i < emails.length; i++) {
    const res = emailRules(emails[i]);

    if (res !== "") return res;
  }

  return "";
};

const phoneRules = (phone) => {
  if (!phone) return "El teléfono es obligatorio.";

  const re = /^\d+$/;
  if (!re.test(phone)) return "El teléfono debe ser un numero.";

  const max = 10;
  if (phone.length > max) return `El teléfono no puede tener mas de ${max} numeros.`;

  return "";
};

export const validatePhones = (phones) => {
  for (let i = 0; i < phones.length; i++) {
    const res = phoneRules(phones[i]);

    if (res !== "") return res;
  }

  return "";
};

const socialMediaRules = (socialMedia) => {
  if (!socialMedia.name || !socialMedia.url) return "El nombre y url de la red social es obligatoria.";

  const re = /^[A-Za-z0-9]+$/g;
  if (!re.test(socialMedia.name)) return "El nombre de la red social solo puede tener letras y numeros.";

  const reUrl = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  if (!reUrl.test(socialMedia.url)) return "La url de la red social es invalida.";

  return "";
};

export const validateSocialMedia = (socialMedia) => {
  for (let i = 0; i < socialMedia.length; i++) {
    const res = socialMediaRules(socialMedia[i]);

    if (res !== "") return res;
  }

  return "";
};
