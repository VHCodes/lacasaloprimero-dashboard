import { Button } from "@chakra-ui/button";
import { Link } from "react-router-dom";

function ButtonSidebar(props) {
  return (
    <Button
      as={Link}
      to={props.to}
      leftIcon={props.leftIcon}
      width="full"
      justifyContent="flex-start"
      fontSize="18px"
      colorScheme={props.location.pathname === props.to ? "blue" : null}
      variant={props.location.pathname === props.to ? "solid" : "ghost"}
    >
      {props.children}
    </Button>
  );
}

export default ButtonSidebar;
