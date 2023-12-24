import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

import { convertFileToUrl } from "@/lib/utils";
import ProfileImage from "@/_root/pages/EditProfile/profileImage";

type ProfileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
  profileImage: string;
};

const ProfileUploader = ({
  fieldChange,
  mediaUrl,
  profileImage,
}: ProfileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);
  // const [editedImageUrl, setEditedImageUrl] = useState<any>("");
  const [open, setOpen] = useState(false);
// console.log(fileUrl)
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });  
  // useEffect(() => {
  //   const storedUserimageUrl = localStorage.getItem('imageUrl');
  //     setEditedImageUrl(storedUserimageUrl);
  // }, []);

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} className="cursor-pointer" />

        <div
          className="cursor-pointer flex-center gap-4"
          onClick={() => setOpen(!open)}>
          <img
            src={profileImage || "/assets/icons/profile-placeholder.svg"}
            alt="image"
            className="h-24 w-24 rounded-full object-cover object-top"
          />
          <p className="text-primary-500 small-regular md:bbase-semibold">
            Change profile photo
          </p>
        </div>
      </div>
      {open && (
        <div
          className={`fixed left-0 right-0 bottom-12 z-50 bg-[white] c-black overflow-y-auto py-8 px-7 gap-3 bottom-0 rounded-t-[50px] 
            md:rounded-md w-[100%] md:w-[600px] m-auto text-center items-center justify-center`}>
          <div className="font-bold text-orange-A200 ml-5 text-[20px] text-left items-center justify-center">
            Position and size your avatar <br />
          </div>

          {ProfileImage && (
            <ProfileImage
              profileImage={fileUrl}
              setOpen={setOpen}
              open={open}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ProfileUploader;
