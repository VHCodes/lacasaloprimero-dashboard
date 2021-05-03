import { Image } from "@chakra-ui/image";
import { Box } from "@chakra-ui/layout";

function PhotoForm(props) {
  return (
    <Box align="center">
      <Image src={props.photo} fallbackSrc={`${process.env.PUBLIC_URL}/img/image-150.png`} maxHeight="350px" />
    </Box>
  );
}

export default PhotoForm;
