import { useState } from "react";
import { useFormInput } from "../../../utils/form";
import { validateEmail } from "../../users/utils/validation";
import Layout from "./Layout";

import * as DAOAuth from "../dao";
import { Box, Link } from "@chakra-ui/layout";

import AlertRequestResetPassword from "./alerts/AlertRequestResetPassword";
import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { NavLink } from "react-router-dom";
import { useTitle } from "../../../utils/title";

function RequestResetPassword(props) {
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const email = useFormInput("");

  const [errors, setErrors] = useState({ email: "" });

  useTitle("Restablecer contraseña")

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    let errors = { email: validateEmail(email.value) };
    setErrors(errors);

    if (errors.email !== "") {
      setLoading(false);
      return;
    }

    const res = await DAOAuth.requestResetPassword(email.value);

    setLoading(false);

    if (res.message === "success") {
      setValidated(true);
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
      {validated ? (
        <Box mt={4}>
          <AlertRequestResetPassword email={email.value} />
        </Box>
      ) : (
        <Box>
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

              <Button type="submit" width="full" mt={10} colorScheme="blue" isLoading={loading}>
                Enviar solicitud
              </Button>
            </form>
          </Box>

          <Box textAlign="center" mt={8}>
            <Link as={NavLink} to="/login" color="blue.500">
              volver
            </Link>
          </Box>
        </Box>
      )}
    </Layout>
  );
}

export default RequestResetPassword;
