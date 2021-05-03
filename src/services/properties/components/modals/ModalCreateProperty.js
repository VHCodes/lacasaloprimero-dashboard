import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Stack } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { ModalBody } from "@chakra-ui/modal";
import { ModalContent } from "@chakra-ui/modal";
import { ModalOverlay } from "@chakra-ui/modal";
import { Modal } from "@chakra-ui/modal";
import { useRef, useState } from "react";
import { FaHome } from "react-icons/fa";

import PropertyFormSkeleton from "../skeletons/PropertyFormSkeleton";
import PropertyForm from "../forms/PropertyForm";
import {
  validateBlueprint,
  validateCategory,
  validateCover,
  validateDescription,
  validatePrice,
  validateTitle,
} from "../../utils/validation";

import AlertElementError from "../../../../components/AlertElementError";
import AlertServerError from "../../../../components/AlertServerError";
import { useFormFileInput, useFormInput } from "../../../../utils/form";

import * as DAOProperties from "../../dao";
import * as DAOCategories from "../../../categories/dao";

function ModalCreateProperty(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState();

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

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
  const [categoriesError, setCategoriesError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    let errors = {
      title: validateTitle(title.value),
      category: validateCategory(category.value),
      price: validatePrice(price.value),
      description: validateDescription(description.value),
      cover: validateCover(cover.file),
      blueprint: validateBlueprint(blueprint.file),
    };
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
    formData.append("cover", cover.file, cover.file.name);
    formData.append("blueprint", blueprint.file, blueprint.file.name);

    const res = await DAOProperties.createProperty(formData, setProgressValue);

    setLoading(false);

    if (res.message === "success") {
      props.setToastSetup({ title: "Casa creada con exito!.", status: "success", duration: 3000 });

      props.setActions(`created ${res.property.id}`);

      onClose();
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
      setProgress(0);
    } else {
      props.setToastSetup({ title: "La casa no pudo ser creada!.", status: "error", duration: 5000 });
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

  const openModal = () => {
    setErrors({
      title: "",
      category: "",
      price: "",
      description: "",
      cover: "",
      blueprint: "",
    });
    setApiError(false);
    setCategoriesError(false);

    setLoading(false);

    title.setValue("");
    category.setValue("");
    price.setValue("");
    description.setValue("");
    cover.setFile(undefined);
    blueprint.setFile(undefined);
    setProgress(0);
    getCategories();

    onOpen();
  };

  const closeModal = () => {
    DAOCategories.cancel();

    onClose();
  };

  return (
    <>
      <Button colorScheme="blue" leftIcon={<FaHome />} onClick={openModal}>
        Crear casa
      </Button>

      <Modal onClose={closeModal} isOpen={isOpen} isCentered closeOnOverlayClick={false} closeOnEsc={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <form noValidate onSubmit={handleSubmit}>
              {loadingCategories ? (
                <PropertyFormSkeleton />
              ) : categoriesError ? (
                <AlertElementError
                  title="No hay categorias!"
                  description="Primero deberías agregar nuevas categorias."
                />
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
                <Stack direction="row" spacing={4} mt={6}>
                  <Button
                    type="submit"
                    width="50%"
                    colorScheme="blue"
                    isLoading={loading}
                    disabled={loadingCategories || categoriesError || apiError || loading}
                  >
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

export default ModalCreateProperty;
