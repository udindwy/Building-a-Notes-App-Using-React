import React from "react";
import NoteInput from "./NoteInput";
import NoteList from "./NoteList";
import SearchNote from "./SearchNote";
import { getInitialData } from "../utils/index";

class NoteApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      search: "",
    };
    this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }
  onDeleteNoteHandler(id) {
    const notes = this.state.notes.filter((notes) => notes.id !== id);
    this.setState({ notes });
  }
  onAddNoteHandler({ title, body }) {
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            body,
            createdAt: new Date().toISOString(),
            archived: false,
          },
        ],
      };
    });
  }
  onArchiveHandler(id) {
    const notes = this.state.notes.map((note) =>
      note.id === id
        ? {
            ...note,
            archived: !note.archived,
          }
        : note
    );
    this.setState({ notes });
  }
  onSearch(title) {
    this.setState(() => {
      return {
        search: title,
      };
    });
  }
  render() {
    //pengecekan karakter
    const notes = this.state.notes.filter((note) =>
      note.title.toLowerCase().includes(this.state.search.toLocaleLowerCase())
    );
    const createNotes = notes.filter((note) => {
      return note.archived === false;
    });
    const archivedNotes = notes.filter((note) => {
      return note.archived === true;
    });
    return (
      <div className="note-app">
        <div className="note-app__header">
          <h1>Notes</h1>
          <SearchNote onSearch={this.onSearch} />
        </div>
        <div className="note-app__body">
          <NoteInput addNote={this.onAddNoteHandler} />
          <h2>Catatan Aktif</h2>
          <NoteList
            notes={createNotes}
            onDelete={this.onDeleteNoteHandler}
            onArchive={this.onArchiveHandler}
          />
          <h2>Arsip</h2>
          <NoteList
            notes={archivedNotes}
            onDelete={this.onDeleteNoteHandler}
            onArchive={this.onArchiveHandler}
          />
        </div>
      </div>
    );
  }
}

export default NoteApp;
