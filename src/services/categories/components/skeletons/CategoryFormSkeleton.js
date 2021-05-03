import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

function CategoryFormSkeleton() {
  return (
    <Box>
      <Skeleton mt={4}>
        <Input />
      </Skeleton>
    </Box>
  );
}

export default CategoryFormSkeleton;
