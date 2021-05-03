import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/alert";
import { Box, Link } from "@chakra-ui/layout";
import { NavLink } from "react-router-dom";

function AlertInfoConfirm(props) {
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
        Cuenta confirmada!
      </AlertTitle>
      <AlertDescription mt={4} maxWidth="sm">
        <Box>Listo! ya puedes utilizar tu cuenta.</Box>
        <Box textAlign="center" mt={8}>
          <Box>
            <Link as={NavLink} to="/login" color="blue.500">
              Inicia sesión
            </Link>
          </Box>
        </Box>
      </AlertDescription>
    </Alert>
  );
}

export default AlertInfoConfirm;
