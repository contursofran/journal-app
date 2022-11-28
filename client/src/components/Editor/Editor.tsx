import { ScrollArea } from "@mantine/core";
import { useIdle } from "@mantine/hooks";
import { Editor as EditorRef, RichTextEditor } from "@mantine/rte";
import { useEffect, useRef, useState } from "react";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../../services/notesService";
import { useStore } from "../../store";
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
  const activeUser = useStore((state) => state.activeUser);
  const refEditor = useRef<EditorRef>(null);
  const idle = useIdle(2000, { events: ["keypress"] });

  const handleChange = (text: string) => {
    setEditorValue(text);

    if (refEditor.current?.getEditor().hasFocus()) {
      setNoteModified(true);
    } else {
      setNoteModified(false);
    }
  };

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

  useEffect(() => {
    if (idle && noteModified) {
      setStatus("saving");
      setTimeout(() => {
        if (activeNoteId && editorValue !== "<p><br></p>") {
          updateNote(activeNoteId, editorValue);

          const findNote = notes.find((note) => note._id === activeNoteId);

          if (findNote) {
            findNote.body = editorValue;
          }
        } else if (activeNoteId && editorValue) {
          deleteNote(activeNoteId);

          const findNote = notes.find((note) => note._id === activeNoteId);

          if (findNote) {
            notes.splice(notes.indexOf(findNote), 1);
          }
        } else {
          createNote(editorValue, calendarValue).then((res) =>
            res
              ? notes.push({
                  _id: res._id,
                  body: res.body,
                  createdAt: new Date(
                    new Date(res.createdAt).getTime() + 86400000
                  ),
                })
              : null
          );
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
    activeUser,
    setStatus,
    calendarValue,
  ]);

  return (
    <div className={classes.wrapper}>
      <ScrollArea
        classNames={{ viewport: classes.scrollAreaViewport }}
        style={{ height: "calc(100vh - 215px)" }}
      >
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
      </ScrollArea>
    </div>
  );
}

export { Editor };
