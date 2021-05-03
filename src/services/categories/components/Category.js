import { Td } from "@chakra-ui/table";
import { Tr } from "@chakra-ui/table";

import ModalCategory from "./modals/ModalCategory";

function Category(props) {
  return props.categories.map((category) => (
    <Tr key={category.id}>
      <Td px={2}>{category.name}</Td>
      <Td px={2}>{category.url}</Td>
      <Td px={2} textAlign="right">
        <ModalCategory {...props} id={category.id} />
      </Td>
    </Tr>
  ));
}

export default Category;
