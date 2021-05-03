import { Button } from "@chakra-ui/button";
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import Layout from "../../../components/Container/Layout";
import { useFormInput, useFormTogglePassword } from "../../../utils/form";
import { validatePassword, validatePasswordLogin } from "../../users/utils/validation";
import * as DAOAuth from "../dao";
import { useTitle } from "../../../utils/title";

function UpdatePassword(props) {
  const [loading, setLoading] = useState(false);

  const show = useFormTogglePassword("");
  const showNew = useFormTogglePassword("");
  const password = useFormInput("");
  const newPassword = useFormInput("");

  const [errors, setErrors] = useState({ password: "", newPassword: "" });

  useTitle("Cambiar contraseña");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    let errors = { password: validatePasswordLogin(password.value), newPassword: validatePassword(newPassword.value) };
    setErrors(errors);

    if (errors.password !== "" || errors.newPassword !== "") {
      setLoading(false);
      return;
    }

    const res = await DAOAuth.updatePassword(password.value, newPassword.value);

    setLoading(false);

    if (res.message === "success") {
      props.setToastSetup({ title: "Contraseña modificada con exito!.", status: "success", duration: 3000 });

      password.setValue("");
      newPassword.setValue("");
    } else if (res.message === "errors") {
      Object.keys(res.errors).forEach((error, index) => {
        if ((error === "password", error === "newPassword")) {
          setErrors({ [error]: res.errors[error] });
        } else {
          props.setToastSetup({ title: res.errors[error], status: "error", duration: 2000 });
        }
      });
    } else {
      props.setToastSetup({ title: "La contraseña no pudo ser modificada!.", status: "error", duration: 5000 });
    }
  };

  return (
    <Layout {...props}>
      <Box mx={{ base: 1, md: 0 }}>
        <form noValidate onSubmit={handleSubmit}>
          <FormControl mt={4} isInvalid={errors.password}>
            <InputGroup size="md">
              <Input
                type={show.value ? "text" : "password"}
                id="password"
                name="password"
                value={password.value}
                onChange={password.onChange}
                pr="4.5rem"
                placeholder="Contraseña actual"
                autoComplete="true"
                variant="flushed"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" {...show}>
                  {show.value ? "Ocultar" : "Mostrar"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>

          <FormControl mt={4} isInvalid={errors.newPassword}>
            <InputGroup size="md">
              <Input
                type={showNew.value ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={newPassword.value}
                onChange={newPassword.onChange}
                pr="4.5rem"
                placeholder="Nueva contraseña"
                autoComplete="true"
                variant="flushed"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" {...showNew}>
                  {showNew.value ? "Ocultar" : "Mostrar"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
          </FormControl>

          <Button my={8} type="submit" colorScheme="blue" leftIcon={<FaEdit />} isLoading={loading}>
            Cambiar contraseña
          </Button>
        </form>
      </Box>
    </Layout>
  );
}

export default UpdatePassword;
