const AnnouncementBodyInput = ({ value, onChange }) => {
  return (
    <textarea
      name="body"
      placeholder="Description here..."
      className="rounded bg-transparent focus:outline-none flex-grow"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default AnnouncementBodyInput;
