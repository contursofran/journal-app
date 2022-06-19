import { useEffect, useRef, useState } from "react";
import { RichTextEditor, Editor as EditorRef } from "@mantine/rte";
import useStore from "../store/store";

function Editor() {
  const [value, setValue] = useState("");
  const { calendarValue, notes, setNotes } = useStore();
  const refEditor = useRef<EditorRef>(null);

  useEffect(() => {
    let fixDates = notes.map((note) => ({
      ...note,
      date: new Date(note.date),
    }));

    fixDates.map((note) => {
      note.date.setDate(note.date.getDate() + 1);
    });

    const workingDate = fixDates.filter(
      (note) => note.date.getDay() === calendarValue.getDay()
    );

    if (workingDate.length > 0) {
      console.log(workingDate);
      setValue(workingDate[0].body);
      refEditor.current?.setEditorContents(
        refEditor.current.getEditor(),
        workingDate[0].body
      );
    }
  }, [calendarValue]);

  console.log(value);
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
