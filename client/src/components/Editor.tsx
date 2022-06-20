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

    const workingDay = fixDates.filter(
      (note) => note.date.getDate() === calendarValue.getDate()
    );

    const workingDate = workingDay.filter(
      (note) => note.date.getMonth() === calendarValue.getMonth()
    );

    if (workingDate.length > 0) {
      setValue(workingDate[0].body);
      refEditor.current?.setEditorContents(
        refEditor.current.getEditor(),
        workingDate[0].body
      );
    } else {
      setValue("");
      refEditor.current?.setEditorContents(refEditor.current.getEditor(), "");
    }
  }, [calendarValue]);

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
