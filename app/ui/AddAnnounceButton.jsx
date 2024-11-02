import Image from "next/image";

const AddAnnounceButton = () => {
  return (
    <button
      type="submit"
      className="bg-secondary-blue rounded-full flex w-fit p-8 space-x-8"
    >
      <span className="flex-grow m-auto">Add this new announcement</span>
      <Image src="/icons/save.svg" alt="Icon" width={150} height={150} />
    </button>
  );
};

export default AddAnnounceButton;
