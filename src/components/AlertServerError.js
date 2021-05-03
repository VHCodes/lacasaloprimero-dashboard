import { AlertTitle } from "@chakra-ui/alert";
import { AlertDescription } from "@chakra-ui/alert";
import { AlertIcon } from "@chakra-ui/alert";
import { Alert } from "@chakra-ui/alert";
import { Box } from "@chakra-ui/layout";

function AlertServerError() {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Uf. Tenemos problemas con el servidor!
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        <Box>Puede probar:</Box>
        <Box>1 - Compruebe su conexión a internet.</Box>
        <Box>2 - Vuelva a intentarlo más tarde.</Box>
      </AlertDescription>
    </Alert>
  );
}

export default AlertServerError;
