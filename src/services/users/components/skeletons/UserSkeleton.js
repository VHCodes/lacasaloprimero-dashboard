import { ButtonGroup } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { SkeletonCircle } from "@chakra-ui/skeleton";
import { Skeleton } from "@chakra-ui/skeleton";
import { Tbody } from "@chakra-ui/table";
import { Table } from "@chakra-ui/table";
import { Th } from "@chakra-ui/table";
import { Thead } from "@chakra-ui/table";
import { Tr } from "@chakra-ui/table";
import { Td } from "@chakra-ui/table";

function UserSkeleton(props) {
  return (
    <Box>
      <Table size={props.size}>
        <Thead>
          <Tr>
            <Th px={2}>Usuario</Th>
            <Th px={2}>Correo electrónico</Th>
            <Th px={2}>Rol</Th>
            <Th px={2}></Th>
          </Tr>
        </Thead>
        <Tbody>
          {Array(props.perPage)
            .fill(null)
            .map((element, index) => (
              <Tr key={index}>
                <Td px={2}>
                  <Skeleton>Usuario</Skeleton>
                </Td>
                <Td px={2}>
                  <Skeleton>Email</Skeleton>
                </Td>
                <Td px={2}>
                  <Skeleton>Usuario</Skeleton>
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
    </Box>
  );
}

export default UserSkeleton;
