import { useState } from "react";

const AnnouncementBodyInput = ({ initialBody }) => {
  const [body, setBody] = useState(initialBody); // Declare a state variable...

  return (
    <textarea
      name="body"
      placeholder="Description here..."
      className="rounded bg-transparent focus:outline-none flex-grow"
      value={body ? body : ""}
      onChange={(e) => setBody(e.target.value)}
    />
  );
};

export default AnnouncementBodyInput;
