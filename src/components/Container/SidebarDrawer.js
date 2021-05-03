import { Drawer, DrawerContent, DrawerOverlay, DrawerCloseButton, DrawerBody, DrawerFooter } from "@chakra-ui/modal";
import { Button } from "@chakra-ui/button";
import { IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { FaBars } from "react-icons/fa";

import Sidebar from "./Sidebar";

function SidebarDrawer(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        fontSize="20px"
        d={{ sm: "inline-flex", lg: "none" }}
        icon={<FaBars />}
        onClick={onOpen}
        variant="ghost"
      />

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />

            <DrawerBody>
              <Sidebar {...props} />
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cerrar
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

export default SidebarDrawer;
