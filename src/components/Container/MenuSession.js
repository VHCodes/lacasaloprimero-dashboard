import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Menu, MenuButton, MenuDivider, MenuItem, MenuList } from "@chakra-ui/menu";
import { FaChevronDown, FaLock, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function MenuSession(props) {
  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" rightIcon={<Icon as={FaChevronDown} color="navItem.500" />}>
        {props.user ? props.user.username : "Cargando"}
      </MenuButton>
      <MenuList zIndex={3}>
        <MenuItem as={Link} to="/password" icon={<FaLock fontSize="16px" />}>
          Cambiar contraseña
        </MenuItem>
        <MenuDivider />
        <MenuItem icon={<FaSignOutAlt fontSize="16px" />} onClick={() => props.logout()}>
          Salir
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default MenuSession;
