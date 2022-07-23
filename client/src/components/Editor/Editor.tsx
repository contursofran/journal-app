import { useEffect, useRef, useState } from "react";
import { RichTextEditor, Editor as EditorRef } from "@mantine/rte";
import { useIdle } from "@mantine/hooks";
import { useStore } from "../../store";
import { updateNote, createNote, getNotes } from "../../services/notesService";
import { useStyles } from "./Editor.styles";

function Editor() {
  const [editorValue, setEditorValue] = useState("");
  const { classes } = useStyles();

  const calendarValue = useStore((state) => state.calendarValue);
  const notes = useStore((state) => state.notes);
  const setNoteModified = useStore((state) => state.setNoteModified);
  const noteModified = useStore((state) => state.noteModified);
  const setStatus = useStore((state) => state.setStatus);
  const editorFontSize = useStore((state) => state.editorFontSize);
  const activeNoteId = useStore((state) => state.activeNoteId);

  const refEditor = useRef<EditorRef>(null);
  const idle = useIdle(2000, { events: ["keypress"] });

  useEffect(() => {
    const selectedDate = notes.filter(
      (note) =>
        note.createdAt.getDate() === calendarValue.getDate() &&
        note.createdAt.getMonth() === calendarValue.getMonth()
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
    } else {
      setNoteModified(false);
    }
  };
  useEffect(() => {
    if (idle && noteModified) {
      setStatus("saving");
      setTimeout(() => {
        if (activeNoteId) {
          updateNote(activeNoteId, editorValue);
          const findNote = notes.find((note) => note._id === activeNoteId);
          if (findNote) {
            findNote.body = editorValue;
          }
        } else {
          createNote(editorValue, calendarValue);
        }

        setStatus("saved");
        setNoteModified(false);
      }, 3000);
    }
  }, [
    idle,
    noteModified,
    activeNoteId,
    editorValue,
    setNoteModified,
    notes,
    setStatus,
    calendarValue,
  ]);

  return (
    <div className={classes.wrapper}>
      <RichTextEditor
        data-testid="Editor"
        radius="md"
        className={classes.editor}
        sx={() => ({
          fontSize: editorFontSize,
        })}
        value={editorValue}
        ref={refEditor}
        onChange={(text) => handleChange(text)}
      />
    </div>
  );
}

export { Editor };
