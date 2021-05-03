import { AccordionButton } from "@chakra-ui/accordion";
import { AccordionIcon } from "@chakra-ui/accordion";
import { AccordionPanel } from "@chakra-ui/accordion";
import { AccordionItem } from "@chakra-ui/accordion";
import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { FormErrorMessage } from "@chakra-ui/form-control";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useFormInput } from "../../../../utils/form";

import * as DAOSettings from "../../dao";
import { validatePerPage } from "../../utils/validation";

function AccordionItemMultimedia(props) {
  const [loading, setLoading] = useState();

  const perPage = useFormInput(props.perPage);

  const [errors, setErrors] = useState({ perPage: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    let errors = { perPage: validatePerPage(perPage.value) };
    setErrors(errors);

    if (errors.perPage !== "") {
      setLoading(false);
      return;
    }

    const res = await DAOSettings.updateSettings({ multimedia: { perPage: perPage.value } });

    setLoading(false);

    if (res.message === "success") {
      props.setToastSetup({ title: "Configuracion modificada con exito!.", status: "success", duration: 3000 });

      props.setActions(`updated ${res.settings.id} ${res.settings.updatedAt}`);
    } else if (res.message === "errors") {
      Object.keys(res.errors).forEach((error, index) => {
        if (error === "perPage") {
          setErrors({ [error]: res.errors[error] });
        } else {
          props.setToastSetup({ title: res.errors[error], status: "error", duration: 2000 });
        }
      });
    } else {
      props.setToastSetup({ title: "La configuracion no pudo ser modificada!.", status: "error", duration: 5000 });
    }
  };

  return (
    <AccordionItem>
      <h1>
        <AccordionButton bg="blue.500" color="white" _hover={{ bg: "blue.600" }}>
          <Box flex="1" textAlign="left">
            Fotos y videos
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h1>
      <AccordionPanel pb={4}>
        <form noValidate onSubmit={handleSubmit}>
          <FormControl mt={4} isInvalid={errors.perPage}>
            <FormLabel>Cantidad de fotos a mostrar por pagina.</FormLabel>
            <Input
              type="text"
              id="perPage"
              name="perPage"
              value={perPage.value}
              onChange={perPage.onChange}
              placeholder="Cantidad de fotos a mostrar por pagina."
              variant="flushed"
            />
            <FormErrorMessage>{errors.perPage}</FormErrorMessage>
          </FormControl>

          <Button my={8} type="submit" colorScheme="blue" leftIcon={<FaEdit />} isLoading={loading}>
            Modificar
          </Button>
        </form>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default AccordionItemMultimedia;
