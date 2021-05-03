import { Button } from "@chakra-ui/button";
import { IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Stack } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { useRef, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

import { useFormFileInput, useFormInput } from "../../../../utils/form";
import {
  validateBlueprint,
  validateCategory,
  validateCover,
  validateDescription,
  validatePrice,
  validateTitle,
} from "../../utils/validation";

import * as DAOProperties from "../../dao";
import * as DAOCategories from "../../../categories/dao";
import AlertElementError from "../../../../components/AlertElementError";
import AlertServerError from "../../../../components/AlertServerError";
import PropertyFormSkeleton from "../skeletons/PropertyFormSkeleton";
import PropertyForm from "../forms/PropertyForm";

function ModalProperty(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState();

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingProperty, setLoadingProperty] = useState();

  const inputCoverRef = useRef();
  const inputBlueprintRef = useRef();

  const title = useFormInput("");
  const category = useFormInput("");
  const price = useFormInput("");
  const description = useFormInput("");
  const cover = useFormFileInput();
  const blueprint = useFormFileInput();

  const [errors, setErrors] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    cover: "",
    blueprint: "",
  });
  const [apiError, setApiError] = useState();
  const [propertyError, setPropertyError] = useState();
  const [categoriesError, setCategoriesError] = useState();

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await DAOProperties.deleteProperty(props.id);

    setLoading(false);

    if (res.message === "success") {
      props.setToastSetup({ title: "Casa eliminada con exito!.", status: "success", duration: 3000 });

      if (props.properties.length === 1 && props.currentPage !== 1) {
        props.setCurrentPage(props.currentPage - 1);
      } else {
        props.setActions(`deleted ${res.property.id}`);
      }
    } else {
      props.setToastSetup({ title: "La casa no pudo ser eliminada!.", status: "error", duration: 5000 });
    }
  };

  const handleModifySubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    let errors = {
      title: validateTitle(title.value),
      category: validateCategory(category.value),
      price: validatePrice(price.value),
      description: validateDescription(description.value),
    };

    if (cover.file === undefined) {
      errors.cover = "";
    } else {
      errors.cover = validateCover(cover.file);
    }

    if (blueprint.file === undefined) {
      errors.blueprint = "";
    } else {
      errors.blueprint = validateBlueprint(blueprint.file);
    }

    setErrors(errors);

    if (
      errors.title !== "" ||
      errors.category !== "" ||
      errors.price !== "" ||
      errors.description !== "" ||
      errors.cover !== "" ||
      errors.blueprint !== ""
    ) {
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title.value);
    formData.append("category", category.value);
    formData.append("price", price.value);
    formData.append("description", description.value);

    if (cover.file !== undefined) {
      formData.append("cover", cover.file, cover.file.name);
    }

    if (blueprint.file !== undefined) {
      formData.append("blueprint", blueprint.file, blueprint.file.name);
    }

    const res = await DAOProperties.updateProperty(props.id, formData, setProgressValue);

    setLoading(false);

    if (res.message === "success") {
      props.setToastSetup({ title: "Casa modificada con exito!.", status: "success", duration: 3000 });

      props.setActions(`updated ${res.property.id} ${res.property.updatedAt}`);
    } else if (res.message === "errors") {
      Object.keys(res.errors).forEach((error, index) => {
        if (
          error === "title" ||
          error === "category" ||
          error === "price" ||
          error === "description" ||
          error === "cover" ||
          error === "blueprint"
        ) {
          setErrors({ [error]: res.errors[error] });
        } else {
          props.setToastSetup({ title: res.errors[error], status: "error", duration: 2000 });
        }
      });
    } else {
      props.setToastSetup({ title: "La casa no pudo ser modificada!.", status: "error", duration: 5000 });
    }
  };

  const setProgressValue = (progress) => {
    setProgress(progress * 100);
  };

  const getCategories = async () => {
    setLoadingCategories(true);

    const res = await DAOCategories.getCategories();
    if (!res) return;

    setLoadingCategories(false);

    if (res.message === "success") {
      if (res.categories.length !== 0) {
        setCategories(res.categories);
      } else {
        setCategoriesError(true);
      }
    } else if (res.message === "error" || res.message === "errors") {
      setCategoriesError(true);
    } else {
      setApiError(true);
    }
  };

  const getProperty = async () => {
    setLoadingProperty(true);

    const res = await DAOProperties.getProperty(props.id);

    if (!res) return;

    setLoadingProperty(false);

    if (res.message === "success") {
      title.setValue(res.property.title);
      category.setValue(res.property.category ? res.property.category.id : "");
      price.setValue(res.property.price);
      description.setValue(res.property.description);
    } else if (res.message === "error" || res.message === "errors") {
      setPropertyError(true);
    } else {
      setApiError(true);
    }
  };

  const openModal = () => {
    setErrors({
      title: "",
      category: "",
      price: "",
      description: "",
      cover: "",
      blueprint: "",
    });

    setProgress(0);

    setApiError(false);
    setCategoriesError(false);
    setPropertyError(false);

    setLoading(false);

    title.setValue("");
    category.setValue("");
    price.setValue("");
    description.setValue("");
    cover.setFile(undefined);
    blueprint.setFile(undefined);
    setProgress(0);
    getCategories();

    getProperty();

    onOpen();
  };

  const closeModal = () => {
    DAOCategories.cancel();

    onClose();
  };

  return (
    <>
      <IconButton icon={<FaEllipsisV />} variant="outline" borderRadius="50%" onClick={openModal}></IconButton>

      <Modal onClose={closeModal} isOpen={isOpen} isCentered closeOnOverlayClick={false} closeOnEsc={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <form noValidate>
              {loadingCategories || loadingProperty ? (
                <PropertyFormSkeleton />
              ) : categoriesError ? (
                <AlertElementError
                  title="No hay categorias!"
                  description="Primero deberías agregar nuevas categorias."
                />
              ) : propertyError ? (
                <AlertElementError title="La casa ya no existe!" description="Deberías actualizar la lista de casas." />
              ) : apiError ? (
                <AlertServerError />
              ) : (
                <PropertyForm
                  errors={errors}
                  title={title}
                  category={category}
                  price={price}
                  description={description}
                  cover={cover}
                  blueprint={blueprint}
                  progress={progress}
                  inputCoverRef={inputCoverRef}
                  inputBlueprintRef={inputBlueprintRef}
                  categories={categories}
                />
              )}

              <Box>
                <Stack direction="row" spacing={4} mt={10}>
                  <Button
                    width="50%"
                    colorScheme="blue"
                    isLoading={loading}
                    onClick={handleModifySubmit}
                    disabled={loadingCategories || categoriesError || apiError || propertyError || loading}
                  >
                    Modificar
                  </Button>
                  <Button
                    width="50%"
                    colorScheme="red"
                    isLoading={loading}
                    onClick={handleDeleteSubmit}
                    disabled={loadingCategories || categoriesError || apiError || propertyError || loading}
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

export default ModalProperty;
