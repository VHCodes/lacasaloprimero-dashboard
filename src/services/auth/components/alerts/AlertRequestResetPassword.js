import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/alert";
import { Box } from "@chakra-ui/layout";

function AlertRequestResetPassword(props) {
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
        Solicitud enviada!
      </AlertTitle>
      <AlertDescription mt={4} maxWidth="sm">
        <Box>Te enviamos un email a {props.email} para resetear tu contraseña.</Box>
      </AlertDescription>
    </Alert>
  );
}

export default AlertRequestResetPassword;
