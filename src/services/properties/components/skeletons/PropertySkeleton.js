import { ButtonGroup } from "@chakra-ui/button";
import { SkeletonCircle } from "@chakra-ui/skeleton";
import { Skeleton } from "@chakra-ui/skeleton";
import { Tbody } from "@chakra-ui/table";
import { Th } from "@chakra-ui/table";
import { Table } from "@chakra-ui/table";
import { Thead } from "@chakra-ui/table";
import { Tr } from "@chakra-ui/table";
import { Td } from "@chakra-ui/table";

function PropertySkeleton(props) {
  return (
    <Table size={props.size}>
      <Thead>
        <Tr>
          <Th px={2}>Titulo</Th>
          <Th px={2}>Categoria</Th>
          <Th px={2}>Precio</Th>
          <Th px={2}></Th>
        </Tr>
      </Thead>
      <Tbody>
        {Array(props.perPage)
          .fill(null)
          .map((element, index) => (
            <Tr key={index}>
              <Td px={2}>
                <Skeleton>Titulo</Skeleton>
              </Td>
              <Td px={2}>
                <Skeleton>Categoria</Skeleton>
              </Td>
              <Td px={2}>
                <Skeleton>Precio</Skeleton>
              </Td>
              <Td px={2} textAlign="right">
                <ButtonGroup>
                  <SkeletonCircle size="34px" />
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
}

export default PropertySkeleton;
