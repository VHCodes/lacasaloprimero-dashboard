import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { Spacer } from "@chakra-ui/layout";

import SidebarDrawer from "./SidebarDrawer";
import MenuSession from "./MenuSession";
import ThemeSelector from "../ThemeSelector";

function Navbar(props) {
  return (
    <Flex>
      <Box>
        <SidebarDrawer {...props} />
      </Box>
      <Spacer />
      <Flex>
        <Box>
          <MenuSession {...props} />
        </Box>
        <Box ml={2}>
          <ThemeSelector />
        </Box>
      </Flex>
    </Flex>
  );
}

export default Navbar;
