import { Td } from "@chakra-ui/table";
import { Tr } from "@chakra-ui/table";

import ModalUser from "./modals/ModalUser";

function User(props) {
  return props.users.map((user) => (
    <Tr key={user.id}>
      <Td px={2}>{user.username}</Td>
      <Td px={2}>{user.email}</Td>
      <Td px={2}>{user.isAdmin ? "Admin" : "Usuario"}</Td>
      <Td px={2} textAlign="right">
        <ModalUser {...props} id={user.id} />
      </Td>
    </Tr>
  ));
}

export default User;
