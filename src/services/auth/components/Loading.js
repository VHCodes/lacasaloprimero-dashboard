import { Box, Flex, Image, Progress, useColorModeValue } from "@chakra-ui/react";

function Loading() {
  const css = useColorModeValue("", "filter: invert(100%);-webkit-filter: invert(100%);-moz-filter: invert(100%);");

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box>
        <Box pb={5}>
          <Image src={`${process.env.PUBLIC_URL}/img/logo_280x154.png`} css={css} />
        </Box>
        <Box padding={1}>
          <Progress size="xs" isIndeterminate />
        </Box>
      </Box>
    </Flex>
  );
}

export default Loading;
