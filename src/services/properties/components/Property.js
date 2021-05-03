import { Td } from "@chakra-ui/table";
import { Tr } from "@chakra-ui/table";

import ModalProperty from "./modals/ModalProperty";

function Property(props) {
  return props.properties.map((property) => (
    <Tr key={property.id}>
      <Td px={2}>{property.title}</Td>
      <Td px={2}>{property.category ? property.category.name : ""}</Td>
      <Td px={2}>{property.price}</Td>
      <Td px={2} textAlign="right">
        <ModalProperty {...props} id={property.id} />
      </Td>
    </Tr>
  ));
}

export default Property;
