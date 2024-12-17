const AnnouncementAuthorInput = ({ value, onChange }) => {

  return (
    <input
      name="author"
      type="text"
      placeholder="Author here..."
      className="rounded bg-transparent focus:outline-none text-right"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default AnnouncementAuthorInput;
