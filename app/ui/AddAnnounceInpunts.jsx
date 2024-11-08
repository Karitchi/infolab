const   AddAnnounceInputs = () => {
  return (
    <div className="bg-secondary-blue rounded-3xl flex flex-col flex-grow space-y-8 p-8 mb-8">
      <input
        name="title"
        type="text"
        placeholder="Title here..."
        // required
        className="rounded bg-transparent focus:outline-none"
      />
      <textarea
        name="body"
        placeholder="Description here..."
        // required
        className="rounded bg-transparent focus:outline-none flex-grow"
      />
      <input
        name="author"
        type="text"
        placeholder="Author here..."
        // required
        className="rounded bg-transparent focus:outline-none text-right"
      />
    </div>
  );
};

export default AddAnnounceInputs;
