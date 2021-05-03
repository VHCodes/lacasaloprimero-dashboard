import { Box } from "@chakra-ui/layout";
import { SimpleGrid } from "@chakra-ui/layout";

import ModalDeletePhoto from "./modals/ModalDeletePhoto";

function Photo(props) {
  return (
    <SimpleGrid columns={{ base: 2, md: 3, lg: 3, xl: 5, "2xl": "6" }} spacing="10px">
      {props.photos.map((photo) => (
        <Box key={photo.id}>
          <ModalDeletePhoto {...props} id={photo.id} photo={photo.photo} />
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default Photo;
