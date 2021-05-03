import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/alert";
import { Box } from "@chakra-ui/layout";

function AlertRegistered(props) {
  return (
    <Alert
      status="success"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Bienvenido {props.username}!
      </AlertTitle>
      <AlertDescription mt={4} maxWidth="sm">
        <Box>Gracias por registrarte.</Box>
        <Box>Te enviamos un email a {props.email} para confirmar tu registro.</Box>
      </AlertDescription>
    </Alert>
  );
}

export default AlertRegistered;
