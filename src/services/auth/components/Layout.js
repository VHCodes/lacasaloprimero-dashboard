import { useColorModeValue } from "@chakra-ui/color-mode";
import { Image } from "@chakra-ui/image";
import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";

import ThemeSelector from "../../../components/ThemeSelector";

function Layout(props) {
  const css = useColorModeValue("", "filter: invert(100%);-webkit-filter: invert(100%);-moz-filter: invert(100%);");

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box borderWidth={1} borderRadius={4} width="full" maxWidth="330px" textAlign="center" boxShadow="lg">
        <Box textAlign="right" p={6}>
          <ThemeSelector />
          <Box>
            <Image src={"/img/logo_280x154.png"} css={css} />
          </Box>

          <Box>{props.children}</Box>
        </Box>
      </Box>
    </Flex>
  );
}

export default Layout;
