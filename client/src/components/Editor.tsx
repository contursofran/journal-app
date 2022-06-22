import { useEffect, useRef, useState } from "react";
import { RichTextEditor, Editor as EditorRef } from "@mantine/rte";
import useStore from "../store/store";

function Editor() {
  const [value, setValue] = useState("");
  const { calendarValue, notes, setNotes } = useStore();
  const refEditor = useRef<EditorRef>(null);

  useEffect(() => {
    const selectedDate = notes.filter(
      (note) =>
        note.date.getDate() === calendarValue.getDate() &&
        note.date.getMonth() === calendarValue.getMonth()
    );

    if (selectedDate.length) {
      setValue(selectedDate[0].body);

      refEditor.current?.setEditorContents(
        refEditor.current.getEditor(),
        selectedDate[0].body
      );
    } else {
      setValue("");
      refEditor.current?.setEditorContents(refEditor.current.getEditor(), "");
    }
  }, [calendarValue, notes]);

  return (
    <RichTextEditor
      data-testid="Editor"
      radius="md"
      className=" h-full w-full "
      value={value}
      ref={refEditor}
      onChange={setValue}
    />
  );
}

export default Editor;
