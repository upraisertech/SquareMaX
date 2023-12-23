import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

import { convertFileToUrl } from "@/lib/utils";
import ProfileImage from "@/_root/pages/EditProfile/profileImage";
import { Modal } from "@material-ui/core";

type ProfileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
  profileImage: string;
};

const ProfileUploader = ({ fieldChange, mediaUrl, profileImage }: ProfileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);
  const [open, setOpen] = useState(false);

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

      <Modal
        open={open}
        className="md:flex md:relative text-center items-end md:items-center justify-center w-[100%]">
        <div className="text-center items-center justify-center">
          <form
            className={`absolute md:relative bg-[white] c-black overflow-y-auto py-8 px-7 gap-3 bottom-0 rounded-t-[50px] 
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
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ProfileUploader;
