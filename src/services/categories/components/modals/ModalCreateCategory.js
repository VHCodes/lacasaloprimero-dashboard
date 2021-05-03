import { Button } from "@chakra-ui/button";
import { FormErrorMessage } from "@chakra-ui/form-control";
import { FormControl } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Stack } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { ModalBody } from "@chakra-ui/modal";
import { ModalContent } from "@chakra-ui/modal";
import { ModalOverlay } from "@chakra-ui/modal";
import { Modal } from "@chakra-ui/modal";
import { useState } from "react";
import { FaTags } from "react-icons/fa";

import { useFormInput } from "../../../../utils/form";
import { validateName } from "../../utils/validation";
import * as DAOCategories from "../../dao";

function ModalCreateCategory(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);

  const name = useFormInput("");

  const [errors, setErrors] = useState({ name: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    let errors = { name: validateName(name.value) };
    setErrors(errors);

    if (errors.name !== "") {
      setLoading(false);

      return;
    }

    const res = await DAOCategories.createCategory(name.value);

    setLoading(false);

    if (res.message === "success") {
      props.setToastSetup({ title: "Categoria creada con exito!.", status: "success", duration: 3000 });

      props.setActions(`created ${res.category.id}`);

      onClose();
    } else if (res.message === "errors") {
      Object.keys(res.errors).forEach((error, index) => {
        if (error === "name") {
          setErrors({ [error]: res.errors[error] });
        } else {
          props.setToastSetup({ title: res.errors[error], status: "error", duration: 2000 });
        }
      });
    } else {
      props.setToastSetup({ title: "La categoria no pudo ser creada!.", status: "error", duration: 5000 });
    }
  };

  const openModal = () => {
    setErrors({ name: "" });
    name.setValue("");
    setLoading(false);

    onOpen();
  };

  const closeModal = () => {
    onClose();
  };

  return (
    <>
      <Button colorScheme="blue" leftIcon={<FaTags />} onClick={openModal}>
        Crear categoria
      </Button>

      <Modal onClose={closeModal} isOpen={isOpen} isCentered closeOnOverlayClick={false} closeOnEsc={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <form noValidate onSubmit={handleSubmit}>
              <FormControl mt={4} isInvalid={errors.name}>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={name.value}
                  onChange={name.onChange}
                  placeholder="Nombre de la categoria"
                  variant="flushed"
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <Box>
                <Stack direction="row" spacing={4} mt={6}>
                  <Button type="submit" width="50%" colorScheme="blue" isLoading={loading}>
                    Enviar
                  </Button>
                  <Button width="50%" mt={4} disabled={loading} onClick={closeModal}>
                    Cancelar
                  </Button>
                </Stack>
              </Box>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalCreateCategory;
