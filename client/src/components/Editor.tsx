import { useEffect, useRef, useState } from "react";
import { RichTextEditor, Editor as EditorRef } from "@mantine/rte";
import { useIdle } from "@mantine/hooks";
import useStore from "../store/store";

function Editor() {
  const [editorValue, setEditorValue] = useState("");

  const calendarValue = useStore((state) => state.calendarValue);
  const notes = useStore((state) => state.notes);
  const setNoteModified = useStore((state) => state.setNoteModified);
  const noteModified = useStore((state) => state.noteModified);
  const setStatus = useStore((state) => state.setStatus);

  const refEditor = useRef<EditorRef>(null);
  const idle = useIdle(2000, { events: ["keypress"] });

  useEffect(() => {
    const selectedDate = notes.filter(
      (note) =>
        note.date.getDate() === calendarValue.getDate() &&
        note.date.getMonth() === calendarValue.getMonth()
    );

    if (selectedDate.length) {
      setEditorValue(selectedDate[0].body);

      refEditor.current?.setEditorContents(
        refEditor.current.getEditor(),
        selectedDate[0].body
      );
    } else {
      setEditorValue("");
      refEditor.current?.setEditorContents(refEditor.current.getEditor(), "");
    }
  }, [calendarValue, notes]);

  const handleChange = (text: string) => {
    setEditorValue(text);

    if (refEditor.current?.getEditor().hasFocus()) {
      setNoteModified(true);
    }
  };

  useEffect(() => {
    if (idle && noteModified) {
      setStatus("saving");

      setTimeout(() => {
        setStatus("saved");
      }, 3000);
    }
  }, [idle, noteModified, setStatus]);

  return (
    <RichTextEditor
      data-testid="Editor"
      radius="md"
      className=" h-full w-full "
      value={editorValue}
      ref={refEditor}
      onChange={(text) => handleChange(text)}
    />
  );
}

export default Editor;
