import AddAnnounceInputs from "./announcements/add/AddAnnounceInputs";
import { useActionState, useEffect } from "react";
import { addAnnouncement } from "../lib/serverActions";
import AddAnnounceButton from "./announcements/add/button/AnnouncementAddButton";
import { Toaster, toast } from "sonner";

const EmptyAnnouncementForm = () => {
  const [formState, formAction, isPending] = useActionState(
    addAnnouncement,
    {}
  );

  useEffect(() => {
    let toastId;

    if (isPending) {
      toastId = toast.loading("Adding your announcement... Just a moment!");
      console.log("loading");
    } else if (formState.success) {
      toast.dismiss(toastId);
      toast.success("Announcement added successfully!", { id: toastId });
      console.log("success");
    } else if (formState.error) {
      toast.dismiss(toastId);
      formState.error.forEach((error) => toast.error(`Oops! ${error.message}`));
      console.log("error");
    }
  }, [isPending, formState]);

  return (
    <>
      <form action={formAction} className="flex flex-grow flex-col">
        <AddAnnounceInputs />
        <AddAnnounceButton />
      </form>
      <Toaster theme="dark" richColors position="top-center" expand />
    </>
  );
};

export default EmptyAnnouncementForm;
