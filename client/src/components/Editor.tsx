import { useState } from "react";
import { RichTextEditor } from "@mantine/rte";

const initialValue =
  "<p>Your initial <b>html value</b> or an empty string to init editor without value</p>";

function Editor() {
  const [value, onChange] = useState(initialValue);

  return (
    <RichTextEditor
      radius="md"
      className=" w-full h-full "
      value={value}
      onChange={onChange}
    />
  );
}

export default Editor;
