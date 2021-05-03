import { FormControl, FormErrorMessage } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex } from "@chakra-ui/layout";
import { Switch } from "@chakra-ui/switch";

function UserForm(props) {
  return (
    <Box>
      <FormControl mt={4}>
        <Input type="text" id="username" name="username" defaultValue={props.username} variant="flushed" isReadOnly />
      </FormControl>

      <FormControl mt={6}>
        <Input type="email" id="email" name="email" defaultValue={props.email} variant="flushed" isReadOnly />
      </FormControl>

      <FormControl mt={8} isInvalid={props.errors.isAdmin}>
        <Flex>
          <Box pr={2}>Es Administrador</Box>
          <Box>
            <Switch size="lg" isChecked={props.isAdmin.isChecked} onChange={props.isAdmin.onChange} />
          </Box>
        </Flex>
        <FormErrorMessage>{props.errors.isAdmin}</FormErrorMessage>
      </FormControl>
    </Box>
  );
}

export default UserForm;
