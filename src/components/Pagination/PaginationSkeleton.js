import { ButtonGroup } from "@chakra-ui/button";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { SkeletonCircle } from "@chakra-ui/skeleton";

function PaginationSkeleton() {
  const size = useBreakpointValue({ base: "md", md: "lg" });

  return (
    <ButtonGroup spacing="2" size={size}>
      <SkeletonCircle size="40px" />
      <SkeletonCircle size="40px" />
      <SkeletonCircle size="40px" />
      <SkeletonCircle size="40px" />
      <SkeletonCircle size="40px" />
      <SkeletonCircle size="40px" />
      <SkeletonCircle size="40px" />
    </ButtonGroup>
  );
}

export default PaginationSkeleton;
