import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

import { IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box } from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";

import AlertElementError from "../../../../components/AlertElementError";
import AlertServerError from "../../../../components/AlertServerError";
import { useFormSwitch } from "../../../../utils/form";

import { validateIsAdmin } from "../../utils/validation";

import UserForm from "../forms/UserForm";
import UserFormSkeleton from "../skeletons/UserFormSkeleton";

import * as DAOUsers from "../../dao";

function ModalUser(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState();

  const isAdmin = useFormSwitch("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({ isAdmin: "" });
  const [apiError, setApiError] = useState();
  const [userError, setUserError] = useState();

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await DAOUsers.deleteUser(props.id);

    setLoading(false);

    if (res.message === "success") {
      props.setToastSetup({ title: "Usuario eliminado con exito!.", status: "success", duration: 3000 });

      if (props.users.length === 1 && props.currentPage !== 1) {
        props.setCurrentPage(props.currentPage - 1);
      } else {
        props.setActions(`deleted ${res.user.id}`);
      }
    } else {
      props.setToastSetup({ title: "El usuario no pudo ser eliminado!.", status: "error", duration: 5000 });
    }
  };

  const handleModifySubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    let errors = { isAdmin: validateIsAdmin(isAdmin.isChecked) };
    setErrors(errors);

    if (errors.isAdmin !== "") {
      setLoading(false);
      return;
    }

    const res = await DAOUsers.updateUser(props.id, isAdmin.isChecked);

    setLoading(false);

    if (res.message === "success") {
      props.setToastSetup({ title: "Usuario modificado con exito!.", status: "success", duration: 3000 });

      props.setActions(`updated ${res.user.id} ${res.user.updatedAt}`);
    } else if (res.message === "errors") {
      Object.keys(res.errors).forEach((error, index) => {
        if (error === "isAdmin") {
          setErrors({ [error]: res.errors[error] });
        } else {
          props.setToastSetup({ title: res.errors[error], status: "error", duration: 2000 });
        }
      });
    } else {
      props.setToastSetup({ title: "El usuario no pudo ser modificado!.", status: "error", duration: 5000 });
    }
  };

  const getUser = async () => {
    setLoadingUser(true);

    const res = await DAOUsers.getUser(props.id);

    if (!res) return;

    setLoadingUser(false);

    if (res.message === "success") {
      isAdmin.setIsChecked(res.user.isAdmin);
      setUsername(res.user.username);
      setEmail(res.user.email);
    } else if (res.message === "error" || res.message === "errors") {
      setUserError(true);
    } else {
      setApiError(true);
    }
  };

  const OpenModal = () => {
    setErrors({ isAdmin: "" });
    setApiError(false);
    setUserError(false);

    setLoading(false);

    isAdmin.setIsChecked("");
    getUser();

    onOpen();
  };

  const closeModal = () => {
    DAOUsers.cancel();

    onClose();
  };

  return (
    <>
      <IconButton icon={<FaEllipsisV />} variant="outline" borderRadius="50%" onClick={OpenModal}></IconButton>

      <Modal onClose={closeModal} isOpen={isOpen} isCentered closeOnOverlayClick={false} closeOnEsc={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <form noValidate>
              {loadingUser ? (
                <UserFormSkeleton />
              ) : userError ? (
                <AlertElementError
                  title="El usuario ya no existe!"
                  description="Deberías actualizar la lista de usuarios."
                />
              ) : apiError ? (
                <AlertServerError />
              ) : (
                <UserForm errors={errors} isAdmin={isAdmin} email={email} username={username} />
              )}

              <Box>
                <Stack direction="row" spacing={4} mt={10}>
                  <Button
                    width="50%"
                    colorScheme="blue"
                    isLoading={loading}
                    onClick={handleModifySubmit}
                    disabled={loadingUser || userError || apiError || loading}
                  >
                    Modificar
                  </Button>
                  <Button
                    width="50%"
                    colorScheme="red"
                    isLoading={loading}
                    onClick={handleDeleteSubmit}
                    disabled={loadingUser || userError || apiError || loading}
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

export default ModalUser;
