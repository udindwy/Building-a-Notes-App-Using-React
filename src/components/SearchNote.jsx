import React from "react";

function SearchNote({ titleSearch, onSearch }) {
  return (
    <div className="note-search">
      <input
        type="text"
        placeholder="Cari catatan..."
        value={titleSearch}
        onChange={(event) => onSearch(event.target.value)}
      />
    </div>
  );
}

export default SearchNote;
