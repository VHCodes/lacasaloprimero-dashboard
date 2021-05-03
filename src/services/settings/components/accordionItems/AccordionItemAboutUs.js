import { AccordionButton } from "@chakra-ui/accordion";
import { AccordionIcon } from "@chakra-ui/accordion";
import { AccordionPanel } from "@chakra-ui/accordion";
import { AccordionItem } from "@chakra-ui/accordion";
import { FormLabel } from "@chakra-ui/form-control";
import { FormControl } from "@chakra-ui/form-control";
import { Box } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useRef, useState } from "react";
import { useFormInput } from "../../../../utils/form";
import { validateContent } from "../../utils/validation";

import * as DAOSettings from "../../dao";
import { FormErrorMessage } from "@chakra-ui/form-control";
import { Button } from "@chakra-ui/button";
import { FaEdit } from "react-icons/fa";
import ButtonGroupBB from "../../../../components/ButtonGroupBB";

function AccordionItemAboutUs(props) {
  const [loading, setLoading] = useState();

  const content = useFormInput(props.content);
  const textareaRef = useRef();

  const [errors, setErrors] = useState({ content: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    let errors = { content: validateContent(content.value) };
    setErrors(errors);

    if (errors.content !== "") {
      setLoading(false);
      return;
    }

    const res = await DAOSettings.updateSettings({ aboutUs: { content: content.value } });

    setLoading(false);

    if (res.message === "success") {
      props.setToastSetup({ title: "Configuracion modificada con exito!.", status: "success", duration: 3000 });

      props.setActions(`updated ${res.settings.id} ${res.settings.updatedAt}`);
    } else if (res.message === "errors") {
      Object.keys(res.errors).forEach((error, index) => {
        if (error === "content") {
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
            Nosotros
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h1>
      <AccordionPanel pb={4}>
        <form noValidate onSubmit={handleSubmit}>
          <FormControl mt={4} isInvalid={errors.content}>
            <FormLabel>Este texto aparecera en la web</FormLabel>

            <Box pb="15px">
              <ButtonGroupBB textarea={textareaRef} setValue={content.setValue} />
            </Box>

            <Textarea
              id="content"
              name="content"
              value={content.value}
              onChange={content.onChange}
              placeholder="Este texto aparecera en la web."
              rows="20"
              variant="flushed"
              ref={textareaRef}
            />
            <FormErrorMessage>{errors.content}</FormErrorMessage>
          </FormControl>

          <Button my={8} type="submit" colorScheme="blue" leftIcon={<FaEdit />} isLoading={loading}>
            Modificar
          </Button>
        </form>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default AccordionItemAboutUs;
