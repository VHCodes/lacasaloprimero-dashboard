import { Image } from "@chakra-ui/image";
import { Box } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

function PhotoFormSkeleton() {
  return (
    <Box align="center">
      <Skeleton>
        <Image height="350px" />
      </Skeleton>
    </Box>
  );
}

export default PhotoFormSkeleton;
