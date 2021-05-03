import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { Progress } from "@chakra-ui/progress";
import { Skeleton } from "@chakra-ui/skeleton";
import { Textarea } from "@chakra-ui/textarea";

function PropertyFormSkeleton() {
  return (
    <Box>
      <Skeleton mt={4}>
        <Input />
      </Skeleton>
      <Skeleton mt={4}>
        <Input />
      </Skeleton>
      <Skeleton mt={4}>
        <Input />
      </Skeleton>
      <Skeleton mt={4}>
        <Textarea />
      </Skeleton>
      <Skeleton mt={4}>
        <Input />
      </Skeleton>
      <Skeleton mt={4}>
        <Input />
      </Skeleton>
      <Skeleton mt={4}>
        <Progress />
      </Skeleton>
    </Box>
  );
}

export default PropertyFormSkeleton;
