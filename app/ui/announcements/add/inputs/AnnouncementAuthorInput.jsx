import { useState } from "react";

const AnnouncementAuthorInput = ({ initialAuthor }) => {
  const [author, setAuthor] = useState(initialAuthor); // Declare a state variable...

  return (
    <input
      name="author"
      type="text"
      placeholder="Author here..."
      className="rounded bg-transparent focus:outline-none text-right"
      value={author ? author : ""}
      onChange={(e) => setAuthor(e.target.value)}
    />
  );
};

export default AnnouncementAuthorInput;
