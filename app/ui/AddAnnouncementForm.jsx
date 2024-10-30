import { addAnnoucement } from "../lib/serverActions";

const AddAnnouncementForm = () => {
  return (
    <form action={addAnnoucement}>
      <input name="title" type="text" placeholder="Title here..." required />
      <textarea name="body" placeholder="Description here..." required />
      <input name="author" type="text" placeholder="Author here..." required />
      <button type="submit">Add this new announcement</button>
    </form>
  );
};

export default AddAnnouncementForm;
