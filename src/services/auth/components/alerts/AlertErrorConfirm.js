import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/alert";
import { Box } from "@chakra-ui/layout";

function AlertInfoConfirm(props) {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Error al confirmar!
      </AlertTitle>
      <AlertDescription mt={4} maxWidth="sm">
        <Box>No pudimos confirmar tu cuenta.</Box>
      </AlertDescription>
    </Alert>
  );
}

export default AlertInfoConfirm;
