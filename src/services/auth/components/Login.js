import { Box } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/layout";
import { NavLink } from "react-router-dom";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { FormErrorMessage } from "@chakra-ui/form-control";
import { useState } from "react";
import { InputGroup } from "@chakra-ui/input";
import { InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";

import { useFormInput, useFormTogglePassword } from "../../../utils/form";
import { validateEmail, validatePasswordLogin } from "../../users/utils/validation";

import Layout from "./Layout";

import * as DAOAuth from "../dao";
import { useTitle } from "../../../utils/title";

function Login(props) {
  const [loading, setLoading] = useState(false);

  const show = useFormTogglePassword("");
  const email = useFormInput("");
  const password = useFormInput("");

  useTitle("Iniciar sesión");

  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    let errors = { email: validateEmail(email.value), password: validatePasswordLogin(password.value) };
    setErrors(errors);

    if (errors.email !== "" || errors.password !== "") {
      setLoading(false);
      return;
    }

    const res = await DAOAuth.login(email.value, password.value);

    setLoading(false);

    if (res.message === "success") {
      if (res.user.isAdmin) {
        props.login(res.token, res.user);
      } else {
        props.setToastSetup({ title: "Se requieren permisos de administrador.", status: "error", duration: 2000 });
      }
    } else if (res.message === "errors") {
      Object.keys(res.errors).forEach((error, index) => {
        if (error === "email" || error === "password") {
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
      <Box textAlign="left">
        <form noValidate onSubmit={handleSubmit}>
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
            Iniciar sesión
          </Button>
        </form>
      </Box>

      <Box textAlign="center" mt={8}>
        <Link as={NavLink} to="/request-reset-password" color="blue.500">
          ¿Olvidaste tu contraseña?
        </Link>
        <Box>
          ¿No tienes una cuenta?{" "}
          <Link as={NavLink} to="/signup" color="blue.500">
            Regístrate
          </Link>
        </Box>
      </Box>
    </Layout>
  );
}

export default Login;
