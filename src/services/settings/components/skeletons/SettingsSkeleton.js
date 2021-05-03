import { Box } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

function SettingsSkeleton() {
  return (
    <Box>
      <Box pb="1px">
        <Skeleton height="40px">inicio</Skeleton>
      </Box>

      <Box pb="1px">
        <Skeleton height="40px">Modelos</Skeleton>
      </Box>

      <Box pb="1px">
        <Skeleton height="40px">Fotos y videos</Skeleton>
      </Box>

      <Box pb="1px">
        <Skeleton height="40px">Sistema de construccion</Skeleton>
      </Box>

      <Box pb="1px">
        <Skeleton height="40px">Nosotros</Skeleton>
      </Box>

      <Box pb="1px">
        <Skeleton height="40px">contacto</Skeleton>
      </Box>
    </Box>
  );
}

export default SettingsSkeleton;
