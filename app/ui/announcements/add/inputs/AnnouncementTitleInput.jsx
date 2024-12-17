const AnnouncementTitleInput = ({ value, onChange }) => {
  return (
    <input
      name="title"
      type="text"
      placeholder="Title here..."
      className="rounded bg-transparent focus:outline-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default AnnouncementTitleInput;
