import { IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { Box } from "@chakra-ui/layout";
import { FaSun, FaMoon } from "react-icons/fa";

function ThemeSelector() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <IconButton icon={colorMode === "light" ? <FaMoon /> : <FaSun />} onClick={toggleColorMode} variant="ghost" />
    </Box>
  );
}

export default ThemeSelector;
