const modifyAnnouncementsInputs = ({ announcement }) => {
  return (
    <div className="bg-secondary-blue rounded-3xl flex flex-col flex-grow space-y-8 p-8 mb-8">
      <input
        name="title"
        type="text"
        placeholder="Title here..."
        className="rounded bg-transparent focus:outline-none"
        value={announcement.title}
      />
      <textarea
        name="body"
        placeholder="Description here..."
        className="rounded bg-transparent focus:outline-none flex-grow"
        value={announcement.body}
      />
      <input
        name="author"
        type="text"
        placeholder="Author here..."
        className="rounded bg-transparent focus:outline-none text-right"
        value={announcement.author}
      />
    </div>
  );
};

export default modifyAnnouncementsInputs;
