import Image from "next/image";
import { deleteAnnouncement } from "@/app/lib/serverActions";

const deleteAnnouncementClient = async (announcementId, event) => {
  deleteAnnouncement(announcementId);
};

const DeleteAnnouncementButton = ({ announcementId }) => {
  return (
    <button
      className="bg-secondary-blue rounded-full flex w-fit p-8 space-x-8"
      tyupe="button"
      onClick={(event) => deleteAnnouncementClient(announcementId, event)}
    >
      <Image src="/icons/delete.svg" alt="Icon" width={50} height={50} />
      <span className="flex-grow m-auto">Delete</span>
    </button>
  );
};

export default DeleteAnnouncementButton;
