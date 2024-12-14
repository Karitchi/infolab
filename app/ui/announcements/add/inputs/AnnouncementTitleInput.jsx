import { useState } from "react";

const AnnouncementTitleInput = ({ initialTitle }) => {
  const [title, setTitle] = useState(initialTitle); // Declare a state variable...

  return (
    <input
      name="title"
      type="text"
      placeholder="Title here..."
      className="rounded bg-transparent focus:outline-none"
      value={title ? title : ""}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
};

export default AnnouncementTitleInput;
