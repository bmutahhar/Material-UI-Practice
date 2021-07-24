import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleDelete = async (id) => {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const breakpoints = {
    default: 3,
    1100: 2,
    767: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((note) => (
          <div key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </div>
        ))}
      </Masonry>
    </Container>
  );
};

export default Notes;
