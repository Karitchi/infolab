const   AddAnnounceInputs = () => {
  return (
    <div className="bg-secondary-blue rounded-3xl flex flex-col flex-grow p-8 space-y-8">
      <input
        name="title"
        type="text"
        placeholder="Title here..."
        // required
        className=" p-2 rounded bg-transparent focus:outline-none "
      />
      <textarea
        name="body"
        placeholder="Description here..."
        // required
        className="p-2 rounded bg-transparent focus:outline-none flex-grow"
      />
      <input
        name="author"
        type="text"
        placeholder="Author here..."
        // required
        className="p-2 rounded bg-transparent focus:outline-none text-right"
      />
    </div>
  );
};

export default AddAnnounceInputs;
