import { Button } from "@chakra-ui/button";
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Link } from "@chakra-ui/layout";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useFormInput, useFormTogglePassword } from "../../../utils/form";
import { validatePassword } from "../../users/utils/validation";
import Layout from "./Layout";
import { useTitle } from "../../../utils/title";

import * as DAOAuth from "../dao";

function ResetPassword(props) {
  const token = props.location.pathname.split("/reset-password/")[1];

  const [loading, setLoading] = useState(false);

  const show = useFormTogglePassword("");
  const password = useFormInput("");

  const [errors, setErrors] = useState({ password: "" });

  useTitle("Cambiar contraseña");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    let errors = { password: validatePassword(password.value) };
    setErrors(errors);

    if (errors.password !== "") {
      setLoading(false);
      return;
    }

    const res = await DAOAuth.resetPassword(password.value, token);

    setLoading(false);

    if (res.message === "success") {
      if (res.user.isAdmin) {
        props.login(res.token, res.user);
      } else {
        props.setToastSetup({ title: "Contraseña guardada con exito.", status: "success", duration: 2000 });

        props.history.push({ pathname: "/" });
      }
    } else if (res.message === "errors") {
      Object.keys(res.errors).forEach((error, index) => {
        if (error === "email") {
          setErrors({ [error]: res.errors[error] });
        } else {
          props.setToastSetup({ title: res.errors[error], status: "error", duration: 2000 });
        }
      });
    } else {
      props.setToastSetup({ title: "Se ha producido un error inesperado", status: "error", duration: 5000 });
    }
  };

  return (
    <Layout {...props}>
      <Box>
        <Box textAlign="left">
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
                  placeholder="Contraseña"
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

            <Button type="submit" width="full" mt={10} colorScheme="blue" isLoading={loading}>
              Cambiar contraseña
            </Button>
          </form>
        </Box>

        <Box textAlign="center" mt={8}>
          <Link as={NavLink} to="/login" color="blue.500">
            volver
          </Link>
        </Box>
      </Box>
    </Layout>
  );
}

export default ResetPassword;
