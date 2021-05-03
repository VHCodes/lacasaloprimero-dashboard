import { StackDivider } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { FaCameraRetro, FaCog, FaHome, FaTag, FaUserCog } from "react-icons/fa";

import ButtonSidebar from "./ButtonSidebar";

function Sidebar(props) {
  return (
    <Box>
      <Box mt="0.4rem" mb="1.5rem" minHeight="40px"></Box>
      <VStack divider={<StackDivider borderColor="gray.200" />} spacing={6} align="stretch">
        <VStack>
          <ButtonSidebar to="/users" leftIcon={<FaUserCog />} {...props}>
            Usuarios
          </ButtonSidebar>

          <ButtonSidebar to="/photos" leftIcon={<FaCameraRetro />} {...props}>
            Fotos
          </ButtonSidebar>

          <ButtonSidebar to="/categories" leftIcon={<FaTag />} {...props}>
            Categorias
          </ButtonSidebar>

          <ButtonSidebar to="/properties" leftIcon={<FaHome />} {...props}>
            Casas
          </ButtonSidebar>
        </VStack>

        <VStack>
          <ButtonSidebar to="/" leftIcon={<FaCog />} {...props}>
            Configuraciones
          </ButtonSidebar>
        </VStack>
      </VStack>
    </Box>
  );
}

export default Sidebar;
