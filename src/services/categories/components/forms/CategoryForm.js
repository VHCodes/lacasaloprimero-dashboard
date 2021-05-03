import { FormErrorMessage } from "@chakra-ui/form-control";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";

function CategoryForm(props) {
  return (
    <FormControl mt={4} isInvalid={props.errors.name}>
      <Input
        type="text"
        id="name"
        name="name"
        value={props.name.value}
        onChange={props.name.onChange}
        placeholder="Nombre de la categoria"
        variant="flushed"
      />
      <FormErrorMessage>{props.errors.name}</FormErrorMessage>
    </FormControl>
  );
}

export default CategoryForm;
