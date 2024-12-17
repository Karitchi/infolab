import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import AnnouncementTitleInput from "./inputs/AnnouncementTitleInput";
import AnnouncementBodyInput from "./inputs/AnnouncementBodyInput";
import AnnouncementAuthorInput from "./inputs/AnnouncementAuthorInput";
import { addAnnouncement } from "@/app/lib/serverActions";
import AddAnnounceButton from "@/app/ui/announcements/add/button/AnnouncementAddButton.jsx";

const AddAnnouncementForm = ({ announcement }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");

  const [formState, formAction, isPending] = useActionState(
    addAnnouncement,
    {}
  );

  useEffect(() => {
    let toastId;

    if (isPending) {
      toastId = toast.loading("Adding your announcement... Just a moment!");
    } else if (formState.success) {
      toast.dismiss(toastId);
      toast.success("Announcement added successfully!", { id: toastId });

      // Clear the state when the form is successfully submitted
      setTitle("");
      setBody("");
      setAuthor("");

      console.log("Announcement added successfully!");
    } else if (formState.error) {
      toast.dismiss(toastId);
      formState.error.forEach((error) => toast.error(`Oops! ${error.message}`));
    }
  }, [isPending, formState]);

  return (
    <>
      <form action={formAction} className="flex flex-grow flex-col">
        <div className="bg-secondary-blue flex flex-col flex-grow rounded-3xl space-y-8 p-8 mb-8">
          {/* Pass state and setters */}
          <AnnouncementTitleInput value={title} onChange={setTitle} />
          <AnnouncementBodyInput value={body} onChange={setBody} />
          <AnnouncementAuthorInput value={author} onChange={setAuthor} />
        </div>
        <AddAnnounceButton />
      </form>
    </>
  );
};

export default AddAnnouncementForm;
