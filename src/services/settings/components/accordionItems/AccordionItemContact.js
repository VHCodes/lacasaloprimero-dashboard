import { AccordionButton } from "@chakra-ui/accordion";
import { AccordionIcon } from "@chakra-ui/accordion";
import { AccordionPanel } from "@chakra-ui/accordion";
import { AccordionItem } from "@chakra-ui/accordion";
import { Button } from "@chakra-ui/button";
import { FormErrorMessage } from "@chakra-ui/form-control";
import { FormLabel } from "@chakra-ui/form-control";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { InputRightElement } from "@chakra-ui/input";
import { InputGroup } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useFormInput } from "../../../../utils/form";
import { validateAddress, validateEmails, validatePhones, validateSocialMedia } from "../../utils/validation";
import * as DAOSettings from "../../dao";

function AccordionItemContact(props) {
  const [loading, setLoading] = useState();

  const address = useFormInput(props.address);
  const [emails, setEmails] = useState(props.emails);
  const [phones, setPhones] = useState(props.phones);
  const [socialMedia, setSocialMedia] = useState(props.socialMedia);

  const [errors, setErrors] = useState({ address: "", emails: "", phones: "", socialMedia: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    let errors = {
      address: validateAddress(address.value),
      emails: validateEmails(emails),
      phones: validatePhones(phones),
      socialMedia: validateSocialMedia(socialMedia),
    };
    setErrors(errors);

    if (errors.address !== "" || errors.emails !== "" || errors.phones !== "" || errors.socialMedia !== "") {
      setLoading(false);
      return;
    }

    const res = await DAOSettings.updateSettings({ contact: { address: address.value, emails, phones, socialMedia } });

    setLoading(false);

    if (res.message === "success") {
      props.setToastSetup({ title: "Configuracion modificada con exito!.", status: "success", duration: 3000 });

      props.setActions(`updated ${res.settings.id} ${res.settings.updatedAt}`);
    } else if (res.message === "errors") {
      Object.keys(res.errors).forEach((error, index) => {
        if (error === "address" || error === "email" || error === "phone" || error === "socialMedia") {
          setErrors({ [error]: res.errors[error] });
        } else {
          props.setToastSetup({ title: res.errors[error], status: "error", duration: 2000 });
        }
      });
    } else {
      props.setToastSetup({ title: "La configuracion no pudo ser modificada!.", status: "error", duration: 5000 });
    }
  };

  const addEmail = () => {
    setEmails([...emails, ""]);
  };

  const deleteEmail = (index) => {
    emails.splice(index, 1);

    setEmails([...emails]);
  };

  const onChangeEmail = (e, index) => {
    emails[index] = e.target.value;

    setEmails([...emails]);
  };

  const addPhone = () => {
    setPhones([...phones, ""]);
  };

  const deletePhone = (index) => {
    phones.splice(index, 1);

    setPhones([...phones]);
  };

  const onChangePhone = (e, index) => {
    phones[index] = e.target.value;

    setPhones([...phones]);
  };

  const addSocialMedia = () => {
    setSocialMedia([...socialMedia, { name: "", url: "" }]);
  };

  const deleteSocialMedia = (index) => {
    socialMedia.splice(index, 1);

    setSocialMedia([...socialMedia]);
  };

  const onChangeSocialMedia = (e, index) => {
    socialMedia[index] = { ...socialMedia[index], name: e.target.value };

    setSocialMedia([...socialMedia]);
  };

  const onChangeSocialMediaUrl = (e, index) => {
    socialMedia[index] = { ...socialMedia[index], url: e.target.value };

    setSocialMedia([...socialMedia]);
  };

  return (
    <AccordionItem>
      <h1>
        <AccordionButton bg="blue.500" color="white" _hover={{ bg: "blue.600" }}>
          <Box flex="1" textAlign="left">
            Contacto
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h1>
      <AccordionPanel pb={4}>
        <form noValidate onSubmit={handleSubmit}>
          <FormControl mt={4} isInvalid={errors.address}>
            <FormLabel>Direccion del local principal.</FormLabel>
            <Input
              type="text"
              id="address"
              name="address"
              value={address.value}
              onChange={address.onChange}
              placeholder="Direccion del local principal."
              variant="flushed"
            />
            <FormErrorMessage>{errors.address}</FormErrorMessage>
          </FormControl>

          <FormControl mt={12} isInvalid={errors.emails}>
            <FormLabel>Lista de emails de contacto.</FormLabel>

            <Button h="1.75rem" size="sm" onClick={addEmail}>
              Nuevo email
            </Button>

            {emails.map((email, index) => (
              <InputGroup size="md" key={index} mt={4}>
                <Input
                  pr="4.5rem"
                  type="email"
                  placeholder="Correo electrónico"
                  variant="flushed"
                  value={email}
                  onChange={(e) => onChangeEmail(e, index)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => deleteEmail(index)}>
                    Eliminar
                  </Button>
                </InputRightElement>
              </InputGroup>
            ))}

            <FormErrorMessage>{errors.emails}</FormErrorMessage>
          </FormControl>

          <FormControl mt={12} isInvalid={errors.phones}>
            <FormLabel>Lista de telefonos de contacto.</FormLabel>

            <Button h="1.75rem" size="sm" onClick={addPhone}>
              Nuevo telefono
            </Button>

            {phones.map((phone, index) => (
              <InputGroup size="md" key={index} mt={4}>
                <Input
                  pr="4.5rem"
                  type="text"
                  placeholder="Telefono"
                  variant="flushed"
                  value={phone}
                  onChange={(e) => onChangePhone(e, index)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => deletePhone(index)}>
                    Eliminar
                  </Button>
                </InputRightElement>
              </InputGroup>
            ))}

            <FormErrorMessage>{errors.phones}</FormErrorMessage>
          </FormControl>

          <FormControl mt={12} isInvalid={errors.socialMedia}>
            <FormLabel>Lista de redes sociales.</FormLabel>

            <Button h="1.75rem" size="sm" onClick={addSocialMedia}>
              Nueva red social
            </Button>

            {socialMedia.map((sm, index) => (
              <InputGroup size="md" key={index} mt={4}>
                <Input
                  pr="4.5rem"
                  type="text"
                  placeholder="Red social"
                  variant="flushed"
                  value={sm.name}
                  onChange={(e) => onChangeSocialMedia(e, index)}
                  width="30%"
                />
                <Input
                  pr="4.5rem"
                  type="text"
                  placeholder="Link red social"
                  variant="flushed"
                  value={sm.url}
                  onChange={(e) => onChangeSocialMediaUrl(e, index)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => deleteSocialMedia(index)}>
                    Eliminar
                  </Button>
                </InputRightElement>
              </InputGroup>
            ))}

            <FormErrorMessage>{errors.socialMedia}</FormErrorMessage>
          </FormControl>

          <Button my={8} type="submit" colorScheme="blue" leftIcon={<FaEdit />} isLoading={loading}>
            Modificar
          </Button>
        </form>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default AccordionItemContact;
