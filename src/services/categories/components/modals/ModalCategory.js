import { IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

import { useFormInput } from "../../../../utils/form";
import { validateName } from "../../utils/validation";

import * as DAOCategories from "../../dao";
import CategoryFormSkeleton from "../skeletons/CategoryFormSkeleton";
import AlertServerError from "../../../../components/AlertServerError";
import AlertElementError from "../../../../components/AlertElementError";
import CategoryForm from "../forms/CategoryForm";
import { Box } from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

function ModalCategory(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState();

  const name = useFormInput("");

  const [errors, setErrors] = useState({ name: "" });
  const [apiError, setApiError] = useState();
  const [categoryError, setCategoryError] = useState();

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await DAOCategories.deleteCategory(props.id);

    setLoading(false);

    if (res.message === "success") {
      props.setToastSetup({ title: "Categoria eliminada con exito!.", status: "success", duration: 3000 });

      if (props.categories.length === 1 && props.currentPage !== 1) {
        props.setCurrentPage(props.currentPage - 1);
      } else {
        props.setActions(`deleted ${res.category.id}`);
      }
    } else {
      props.setToastSetup({ title: "La categoria no pudo ser eliminada!.", status: "error", duration: 5000 });
    }
  };

  const handleModifySubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    let errors = { name: validateName(name.value) };
    setErrors(errors);

    if (errors.name !== "") {
      setLoading(false);
      return;
    }

    const res = await DAOCategories.updateCategory(props.id, name.value);

    setLoading(false);

    if (res.message === "success") {
      props.setToastSetup({ title: "Categoria modificada con exito!.", status: "success", duration: 3000 });

      props.setActions(`updated ${res.category.id} ${res.category.updatedAt}`);
    } else if (res.message === "errors") {
      Object.keys(res.errors).forEach((error, index) => {
        if (error === "name") {
          setErrors({ [error]: res.errors[error] });
        } else {
          props.setToastSetup({ title: res.errors[error], status: "error", duration: 2000 });
        }
      });
    } else {
      props.setToastSetup({ title: "La categoria no pudo ser modificada!.", status: "error", duration: 5000 });
    }
  };

  const getCategory = async () => {
    setLoadingCategory(true);

    const res = await DAOCategories.getCategory(props.id);

    if (!res) return;

    setLoadingCategory(false);

    if (res.message === "success") {
      name.setValue(res.category.name);
    } else if (res.message === "error" || res.message === "errors") {
      setCategoryError(true);
    } else {
      setApiError(true);
    }
  };

  const OpenModal = () => {
    setErrors({ name: "" });
    setApiError(false);
    setCategoryError(false);

    setLoading(false);

    name.setValue("");
    getCategory();

    onOpen();
  };

  const closeModal = () => {
    DAOCategories.cancel();

    onClose();
  };

  return (
    <>
      <IconButton icon={<FaEllipsisV />} variant="outline" borderRadius="50%" onClick={OpenModal}></IconButton>

      <Modal onClose={closeModal} isOpen={isOpen} isCentered closeOnOverlayClick={false} closeOnEsc={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>
            <form noValidate>
              {loadingCategory ? (
                <CategoryFormSkeleton />
              ) : categoryError ? (
                <AlertElementError
                  title="La categoria ya no existe!"
                  description="Deberías actualizar la lista de categorias."
                />
              ) : apiError ? (
                <AlertServerError />
              ) : (
                <CategoryForm errors={errors} name={name} />
              )}

              <Box>
                <Stack direction="row" spacing={4} mt={10}>
                  <Button
                    width="50%"
                    colorScheme="blue"
                    isLoading={loading}
                    disabled={loadingCategory || categoryError || apiError || loading}
                    onClick={handleModifySubmit}
                  >
                    Modificar
                  </Button>
                  <Button
                    width="50%"
                    colorScheme="red"
                    isLoading={loading}
                    disabled={loadingCategory || categoryError || apiError || loading}
                    onClick={handleDeleteSubmit}
                  >
                    Eliminar
                  </Button>
                </Stack>

                <Button width="100%" mt={4} disabled={loading} onClick={closeModal}>
                  Cancelar
                </Button>
              </Box>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalCategory;
