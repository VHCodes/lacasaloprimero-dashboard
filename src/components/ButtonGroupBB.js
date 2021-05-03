import { Button } from "@chakra-ui/button";
import { ButtonGroup } from "@chakra-ui/button";

function ButtonGroupBB(props) {
  function insertTag(textarea, tag1, tag2 = "") {
    var nav = navigator.userAgent.toLowerCase();

    if (nav.indexOf("firefox") !== -1 || nav.indexOf("chrome") !== -1 || nav.indexOf("opera") !== -1) {
      const initialPos = textarea.selectionStart;
      const finalPos = textarea.selectionEnd;
      const before = textarea.value.substr(0, initialPos);
      const selected = textarea.value.substr(initialPos, finalPos - initialPos);
      const after = textarea.value.substr(finalPos, textarea.value.length - finalPos);

      if (tag2 === "") {
        props.setValue(before + tag1 + after);
      } else {
        props.setValue(before + tag1 + selected + tag2 + after);
      }
    }
  }

  return (
    <ButtonGroup variant="outline" spacing="2">
      <Button onClick={() => insertTag(props.textarea.current, "[h3]", "[/h3]")}>H3</Button>
      <Button onClick={() => insertTag(props.textarea.current, "[h4]", "[/h4]")}>H4</Button>
      <Button onClick={() => insertTag(props.textarea.current, "[list]", "[/list]")}>Lista</Button>
      <Button onClick={() => insertTag(props.textarea.current, "[item]", "[/item]")}>Item</Button>
      <Button onClick={() => insertTag(props.textarea.current, "[enter]")}>Enter</Button>
    </ButtonGroup>
  );
}

export default ButtonGroupBB;
