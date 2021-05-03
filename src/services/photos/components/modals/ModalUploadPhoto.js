import { Button } from "@chakra-ui/button";
import { FormErrorMessage } from "@chakra-ui/form-control";
import { FormControl } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Image } from "@chakra-ui/image";
import { InputGroup } from "@chakra-ui/input";
import { InputLeftElement } from "@chakra-ui/input";
import { Input } from "@chakra-ui/input";
import { Stack } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { ModalBody } from "@chakra-ui/modal";
import { ModalContent } from "@chakra-ui/modal";
import { ModalOverlay } from "@chakra-ui/modal";
import { Modal } from "@chakra-ui/modal";
import { useEffect, useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { Progress } from "@chakra-ui/progress";

import { useFormFileInput } from "../../../../utils/form";
import { validatePhoto } from "../../utils/validation";

import * as DAOPhotos from "../../dao";

function ModalUploadPhoto(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const photo = useFormFileInput();
  const inputRef = useRef();
  const imgRef = useRef();

  const [errors, setErrors] = useState({ photo: "" });

  useEffect(() => {
    setErrors({ photo: "" });

    if (photo.file) {
      imgRef.current.src = URL.createObjectURL(photo.file);
    } else {
      if (imgRef.current) imgRef.current.src = "";
    }
  }, [photo.file]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    let errors = { photo: validatePhoto(photo.file) };
    setErrors(errors);

    if (errors.photo !== "") {
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo.file, photo.file.name);

    const res = await DAOPhotos.uploadPhoto(formData, setProgressValue);

    setLoading(false);

    if (res.message === "success") {
      props.setToastSetup({ title: "Foto enviada con exito!.", status: "success", duration: 3000 });

      props.setActions(`created ${res.photo.id}`);

      onClose();
    } else if (res.message === "errors") {
      Object.keys(res.errors).forEach((error, index) => {
        if (error === "photo") {
          setErrors({ [error]: res.errors[error] });
        } else {
          props.setToastSetup({ title: res.errors[error], status: "error", duration: 2000 });
        }
      });
    } else {
      props.setToastSetup({ title: "La foto no pudo ser enviada!.", status: "error", duration: 5000 });
    }
  };

  const setProgressValue = (progress) => {
    setProgress(progress * 100);
  };

  const OpenModal = () => {
    setErrors({ photo: "" });
    photo.setFile(undefined);
    setProgress(0);
    setLoading(false);

    onOpen();
  };

  const closeModal = () => {
    onClose();
  };

  return (
    <>
      <Button colorScheme="blue" leftIcon={<FaUpload />} onClick={OpenModal}>
        Subir foto
      </Button>

      <Modal onClose={closeModal} isOpen={isOpen} isCentered closeOnOverlayClick={false} closeOnEsc={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <form noValidate onSubmit={handleSubmit}>
              <Box>
                <FormControl isInvalid={errors.photo}>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" children={<FaUpload />} />
                    <input
                      type="file"
                      id="photo"
                      name="photo"
                      accept="image/png, image/jpeg, image/jpg"
                      file={photo.file}
                      onChange={photo.onChange}
                      style={{ display: "none" }}
                      ref={inputRef}
                    />
                    <Input
                      placeholder="Seleccionar la foto a subir"
                      value={photo.file ? photo.file.name : ""}
                      readOnly
                      variant="flushed"
                      onClick={() => inputRef.current.click()}
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.photo}</FormErrorMessage>
                </FormControl>

                <Box pt={4} align="center">
                  <Image ref={imgRef} maxHeight="350px" />
                </Box>

                <Box pt={4}>
                  <Progress hasStripe value={progress} isAnimated colorScheme="blue" />
                </Box>

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

export default ModalUploadPhoto;
