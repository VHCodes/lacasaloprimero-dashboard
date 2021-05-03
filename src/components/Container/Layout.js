import { Flex, Box } from "@chakra-ui/layout";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout(props) {
  return (
    <Flex minHeight="100vh">
      <Box width="full" maxWidth="20rem" d={{ base: "none", lg: "block" }} borderRight="1px solid #ccc" px={6} pt={2}>
        <Sidebar {...props} />
      </Box>

      <Box width="100%">
        <Box p="0.4rem" minHeight="40px" borderBottom="1px solid #ccc">
          <Navbar {...props} />
        </Box>
        <Box py={6} px={{ base: 0, md: 6 }}>
          {props.children}
        </Box>
      </Box>
    </Flex>
  );
}

export default Layout;
