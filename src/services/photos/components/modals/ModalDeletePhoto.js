import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Image } from "@chakra-ui/image";
import { Stack } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { ModalBody } from "@chakra-ui/modal";
import { ModalContent } from "@chakra-ui/modal";
import { ModalHeader } from "@chakra-ui/modal";
import { ModalOverlay } from "@chakra-ui/modal";
import { Modal } from "@chakra-ui/modal";
import { useState } from "react";

import * as DAOPhotos from "../../dao";
import PhotoFormSkeleton from "../skeletons/PhotoFormSkeleton";

import AlertServerError from "../../../../components/AlertServerError";
import AlertElementError from "../../../../components/AlertElementError";
import PhotoForm from "../forms/PhotoForm";
import { useColorModeValue } from "@chakra-ui/color-mode";

function ModalDeletePhoto(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [loadingPhoto, setLoadingPhoto] = useState();

  const [photo, setPhoto] = useState();

  const [apiError, setApiError] = useState();
  const [photoError, setPhotoError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await DAOPhotos.deletePhoto(props.id);

    setLoading(false);

    if (res.message === "success") {
      props.setToastSetup({ title: "Foto eliminada con exito!.", status: "success", duration: 3000 });

      if (props.photos.length === 1 && props.currentPage !== 1) {
        props.setCurrentPage(props.currentPage - 1);
      } else {
        props.setActions(`deleted ${res.photo.id}`);
      }
    } else {
      props.setToastSetup({ title: "la foto no pudo ser eliminada!.", status: "error", duration: 5000 });
    }
  };

  const getPhoto = async () => {
    setLoadingPhoto(true);

    const res = await DAOPhotos.getPhoto(props.id);

    if (!res) return;

    setLoadingPhoto(false);

    if (res.message === "success") {
      setPhoto(res.photo.photo);
    } else if (res.message === "error" || res.message === "errors") {
      setPhotoError(true);
    } else {
      setApiError(true);
    }
  };

  const OpenModal = () => {
    setApiError(false);
    setPhotoError(false);

    setLoading(false);

    setPhoto("");
    getPhoto();

    onOpen();
  };

  const closeModal = () => {
    DAOPhotos.cancel();

    onClose();
  };

  return (
    <>
      <Box as={Link} onClick={OpenModal}>
        <Box
          w={"full"}
          h={"full"}
          overflow={"hidden"}
          mb="10px"
          p={1}
          boxShadow={"lg"}
          rounded={"md"}
          border="1px"
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <Image src={props.photo} w={"full"} h={"full"} fallbackSrc={`${process.env.PUBLIC_URL}/img/image-150.png`} />
        </Box>
      </Box>

      <Modal onClose={closeModal} isOpen={isOpen} isCentered closeOnOverlayClick={false} closeOnEsc={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>
            <form noValidate onSubmit={handleSubmit}>
              {loadingPhoto ? (
                <PhotoFormSkeleton />
              ) : photoError ? (
                <AlertElementError title="La foto ya no existe!" description="Deberías actualizar la lista de fotos." />
              ) : apiError ? (
                <AlertServerError />
              ) : (
                <PhotoForm photo={photo} />
              )}

              <Box>
                <Stack direction="row" spacing={4} mt={10}>
                  <Button
                    type="submit"
                    width="50%"
                    colorScheme="red"
                    isLoading={loading}
                    disabled={loadingPhoto || photoError || apiError || loading}
                  >
                    Eliminar
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

export default ModalDeletePhoto;
