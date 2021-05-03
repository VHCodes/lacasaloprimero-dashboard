import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

function UserFormSkeleton() {
  return (
    <Box>
      <Skeleton mt={4}>
        <Input />
      </Skeleton>

      <Skeleton mt={6}>
        <Input />
      </Skeleton>

      <Skeleton mt={8}>
        <Input />
      </Skeleton>
    </Box>
  );
}

export default UserFormSkeleton;
