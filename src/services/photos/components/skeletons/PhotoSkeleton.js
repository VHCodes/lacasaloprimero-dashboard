import { Box } from "@chakra-ui/layout";
import { SimpleGrid } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

function PhotoSkeleton(props) {
  return (
    <SimpleGrid columns={{ base: 2, md: 3, lg: 3, xl: 5, "2xl": "6" }} spacing="12px">
      {Array(props.perPage)
        .fill(null)
        .map((element, index) => (
          <Skeleton key={index}>
            <Box height={{base: "171px", md: "233.33px", lg: "201.66px", xl: "174.39px", "2xl": "186.5px"}}></Box>
          </Skeleton>
        ))}
    </SimpleGrid>
  );
}

export default PhotoSkeleton;
