import { Box } from "@chakra-ui/layout";
import { FaChevronDown, FaEdit } from "react-icons/fa";
import { AccordionItem } from "@chakra-ui/accordion";
import { AccordionButton } from "@chakra-ui/accordion";
import { AccordionIcon } from "@chakra-ui/accordion";
import { AccordionPanel } from "@chakra-ui/accordion";

import { useState } from "react";
import { Button } from "@chakra-ui/button";
import { useFormInput } from "../../../../utils/form";
import { validateDiscount, validateProperty } from "../../utils/validation";

import * as DAOSettings from "../../dao";
import { FormControl } from "@chakra-ui/form-control";
import { FormLabel } from "@chakra-ui/form-control";
import { Select } from "@chakra-ui/select";
import { FormErrorMessage } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";

function AccordionItemHome(props) {
  const [loading, setLoading] = useState(false);

  const property = useFormInput(props.property ? props.property.id : "607c631d24067d1ff02bedaa");
  const discount = useFormInput(props.discount);

  const [errors, setErrors] = useState({ property: "", discount: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    let errors = { property: validateProperty(property.value), discount: validateDiscount(discount.value) };
    setErrors(errors);

    if (errors.property !== "" || errors.discount !== "") {
      setLoading(false);
      return;
    }

    const res = await DAOSettings.updateSettings({ home: { property: property.value, discount: discount.value } });

    setLoading(false);

    if (res.message === "success") {
      props.setToastSetup({ title: "Configuracion modificada con exito!.", status: "success", duration: 3000 });

      props.setActions(`updated ${res.settings.id} ${res.settings.updatedAt}`);
    } else if (res.message === "errors") {
      Object.keys(res.errors).forEach((error, index) => {
        if (error === "id" || error === "discount") {
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
            Inicio
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h1>
      <AccordionPanel pb={4}>
        <form noValidate onSubmit={handleSubmit}>
          <FormControl mt={4} isInvalid={errors.property}>
            <FormLabel>Casa en oferta.</FormLabel>
            <Select
              icon={<FaChevronDown fontSize="12px" />}
              id="property"
              name="property"
              value={property.value}
              onChange={property.onChange}
              placeholder={"Seleccione la casa en oferta"}
              variant="flushed"
            >
              <option value="607c631d24067d1ff02bedaa">Ninguna</option>
              {props.properties.map((property) => (
                <option value={property.id} key={property.id}>
                  {property.title}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.property}</FormErrorMessage>
          </FormControl>

          <FormControl mt={4} isInvalid={errors.discount}>
            <FormLabel>Porcentaje de descuento en la casa seleccionada</FormLabel>
            <Input
              type="text"
              id="discount"
              name="discount"
              value={discount.value}
              onChange={discount.onChange}
              placeholder="Porcentaje de descuento en la casa seleccionada."
              variant="flushed"
            />
            <FormErrorMessage>{errors.discount}</FormErrorMessage>
          </FormControl>

          <Button my={8} type="submit" colorScheme="blue" leftIcon={<FaEdit />} isLoading={loading}>
            Modificar
          </Button>
        </form>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default AccordionItemHome;
