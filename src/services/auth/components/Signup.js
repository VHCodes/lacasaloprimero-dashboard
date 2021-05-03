import { Box, Link } from "@chakra-ui/layout";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useFormInput, useFormTogglePassword } from "../../../utils/form";
import { validateEmail, validatePasswordLogin, validateUsername } from "../../users/utils/validation";
import Layout from "./Layout";

import * as DAOAuth from "../dao";
import { Button } from "@chakra-ui/button";
import AlertRegistered from "./alerts/AlertRegistered";
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useTitle } from "../../../utils/title";

function Signup(props) {
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const show = useFormTogglePassword("");
  const username = useFormInput("");
  const email = useFormInput("");
  const password = useFormInput("");

  const [errors, setErrors] = useState({ username: "", email: "", password: "" });

  useTitle("Registrate");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    let errors = {
      username: validateUsername(username.value),
      email: validateEmail(email.value),
      password: validatePasswordLogin(password.value),
    };
    setErrors(errors);

    if (errors.username !== "" || errors.email !== "" || errors.password !== "") {
      setLoading(false);
      return;
    }

    const res = await DAOAuth.signup(username.value, email.value, password.value);

    setLoading(false);

    if (res.message === "success") {
      setRegistered(true);
    } else if (res.message === "errors") {
      Object.keys(res.errors).forEach((error, index) => {
        if (error === "username" || error === "email" || error === "password") {
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
      {registered ? (
        <Box mt={4}>
          <AlertRegistered username={username.value} email={email.value} />
          <Box textAlign="center" mt={8}>
            <Link as={NavLink} to="/login" color="blue.500">
              volver
            </Link>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box textAlign="left">
            <form noValidate onSubmit={handleSubmit}>
              <FormControl mt={4} isInvalid={errors.username}>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  value={username.value}
                  onChange={username.onChange}
                  placeholder="Nombre de usuario"
                  variant="flushed"
                />
                <FormErrorMessage>{errors.username}</FormErrorMessage>
              </FormControl>

              <FormControl mt={4} isInvalid={errors.email}>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={email.value}
                  onChange={email.onChange}
                  placeholder="Correo electrónico"
                  variant="flushed"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

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
                Registrate
              </Button>
            </form>
          </Box>

          <Box textAlign="center" mt={8}>
            <Box>
              ¿Tienes una cuenta?{" "}
              <Link as={NavLink} to="/login" color="blue.500">
                Inicia sesión
              </Link>
            </Box>
          </Box>
        </Box>
      )}
    </Layout>
  );
}

export default Signup;
