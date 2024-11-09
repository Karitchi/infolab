import Image from "next/image";

const AddAnnounceButton = () => {
  return (
    <button
      type="submit"
      className="bg-secondary-blue rounded-full flex w-fit p-8 space-x-8"
    >
      <Image src="/icons/save.svg" alt="Icon" width={50} height={50} />
      <span className="flex-grow m-auto">Add this new announce</span>
    </button>
  );
};

export default AddAnnounceButton;
