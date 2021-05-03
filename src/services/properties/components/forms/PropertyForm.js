import { FormErrorMessage } from "@chakra-ui/form-control";
import { FormControl } from "@chakra-ui/form-control";
import { InputGroup } from "@chakra-ui/input";
import { InputLeftElement } from "@chakra-ui/input";
import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { Progress } from "@chakra-ui/progress";
import { Select } from "@chakra-ui/select";
import { Textarea } from "@chakra-ui/textarea";
import { useRef } from "react";
import { FaChevronDown, FaUpload } from "react-icons/fa";
import ButtonGroupBB from "../../../../components/ButtonGroupBB";

function PropertyForm(props) {
  const textareaRef = useRef();

  return (
    <Box>
      <FormControl mt={4} isInvalid={props.errors.title}>
        <Input
          type="text"
          id="title"
          name="title"
          value={props.title.value}
          onChange={props.title.onChange}
          placeholder="Titulo de la casa"
          variant="flushed"
        />
        <FormErrorMessage>{props.errors.title}</FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={props.errors.category}>
        <Select
          icon={<FaChevronDown fontSize="12px" />}
          id="category"
          name="category"
          value={props.category.value}
          onChange={props.category.onChange}
          placeholder={"Seleccione la categoria"}
          variant="flushed"
        >
          {props.categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{props.errors.category}</FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={props.errors.price}>
        <Input
          type="text"
          id="price"
          name="price"
          value={props.price.value}
          onChange={props.price.onChange}
          placeholder="Precio de la casa"
          variant="flushed"
        />
        <FormErrorMessage>{props.errors.price}</FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={props.errors.description}>
        <Box pb="15px">
          <ButtonGroupBB textarea={textareaRef} setValue={props.description.setValue} />
        </Box>

        <Textarea
          id="description"
          name="description"
          value={props.description.value}
          onChange={props.description.onChange}
          placeholder="Descripcion de la casa"
          ref={textareaRef}
          rows="10"
          variant="flushed"
          resize="none"
        />
        <FormErrorMessage>{props.errors.description}</FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={props.errors.cover}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<FaUpload />} />
          <input
            type="file"
            id="cover"
            name="cover"
            accept="image/png, image/jpeg, image/jpg"
            file={props.cover.file}
            onChange={props.cover.onChange}
            style={{ display: "none" }}
            ref={props.inputCoverRef}
          />
          <Input
            placeholder="Seleccionar la caratula de la casa."
            value={props.cover.file ? props.cover.file.name : ""}
            readOnly
            variant="flushed"
            onClick={() => props.inputCoverRef.current.click()}
          />
        </InputGroup>
        <FormErrorMessage>{props.errors.cover}</FormErrorMessage>
      </FormControl>

      <FormControl mt={4} isInvalid={props.errors.blueprint}>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<FaUpload />} />
          <input
            type="file"
            id="blueprint"
            name="bluprint"
            accept="image/png, image/jpeg, image/jpg"
            file={props.blueprint.file}
            onChange={props.blueprint.onChange}
            style={{ display: "none" }}
            ref={props.inputBlueprintRef}
          />
          <Input
            placeholder="Seleccionar el plano de la casa"
            value={props.blueprint.file ? props.blueprint.file.name : ""}
            readOnly
            variant="flushed"
            onClick={() => props.inputBlueprintRef.current.click()}
          />
        </InputGroup>
        <FormErrorMessage>{props.errors.blueprint}</FormErrorMessage>
      </FormControl>

      <Box pt={4}>
        <Progress hasStripe value={props.progress} isAnimated colorScheme="blue" />
      </Box>
    </Box>
  );
}

export default PropertyForm;
