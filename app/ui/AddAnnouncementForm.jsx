import { addAnnouncement } from "../lib/serverActions";

const AddAnnouncementForm = () => {
  return (
    <form
      action={addAnnouncement}
      className="flex flex-col space-y-4 w-full h-full flex-grow"
    >
      <div
        className="flex flex-col space-y-2 rounded-lg h-full p-4"
        style={{ backgroundColor: "#172937" }}
      >
        <input
          name="title"
          type="text"
          placeholder="Title here..."
          required
          className="p-2 rounded bg-transparent focus:outline-none border border-gray-600"
        />
        <textarea
          name="body"
          placeholder="Description here..."
          required
          className="p-2 rounded h-full bg-transparent focus:outline-none flex-1 border border-gray-600 resize-none"
        />
        <input
          name="author"
          type="text"
          placeholder="Author here..."
          required
          className="p-2 rounded bg-transparent focus:outline-none border border-gray-600"
        />
      </div>
      <button
        type="submit"
        className="p-2 rounded-lg w-full"
        style={{ backgroundColor: "#172937" }}
      >
        Add this new announcement
      </button>
    </form>
  );
};

export default AddAnnouncementForm;
