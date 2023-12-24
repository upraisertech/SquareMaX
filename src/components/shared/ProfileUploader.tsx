import { useState, useRef, useCallback, SyntheticEvent } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

import AvatarEditor from "react-avatar-editor";
import { TbArrowsMaximize, TbArrowsMinimize } from "react-icons/tb";
import { FaArrowRotateLeft, FaArrowRotateRight } from "react-icons/fa6";

import { convertFileToUrl } from "@/lib/utils";

type ProfileUploaderProps = {
  fieldChange: (files: File[]) => void;
  profileImage: string;
  editedImageUrl: string;
};

const ProfileUploader = ({
  fieldChange,
  profileImage
}: ProfileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(profileImage);
  const [open, setOpen] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [editedImageUrl, setEditedImageUrl] = useState<string>("");
  const [error, setError] = useState<string>(""); // Define error as a string
  const editor = useRef<AvatarEditor | null>(null); 

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      // console.log(convertFileToUrl(acceptedFiles[0]));
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

  const handleImageUpload = (event: SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    if (editor.current && profileImage) {
      const formData = new FormData();
      const canvas = editor.current.getImage();
      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          formData.append("profile_image", blob, "edited_image.png");
          const url = URL.createObjectURL(blob);
          setEditedImageUrl(url);
          localStorage.setItem('imageUrl', JSON.stringify(url));
          console.log("Edited Image URL:", url);
          setLoading(false);
          setOpen(!open);
        } else {
          setError("Error processing image");
          setLoading(false);
        }
      }, "image/*");
    }
  };

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} className="cursor-pointer" />

        <div
          className="cursor-pointer flex-center gap-4"
          onClick={() => setOpen(!open)}>
          <img
            src={editedImageUrl || "/assets/icons/profile-placeholder.svg"}
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

          {profileImage && (
            <div className="flex flex-col items-center mt-8">
              {profileImage && ( // Check if profileImage is available
                <AvatarEditor
                  ref={editor}
                  image={fileUrl} // Ensure profileImage is a Blob
                  width={200}
                  height={200}
                  className="mt-4 bg-gray-200"
                  color={[255, 255, 255, 0.6]}
                  scale={scale}
                  borderRadius={500}
                  rotate={rotate}
                />
              )}

              {error && <p className="mt-2 text-[15px] text-[red]">{error}</p>}

              <div className="flex mt-5 text-center items-center text-black justify-center gap-7">
                <div
                  className="cursor-pointer border rounded-full p-1"
                  onClick={() => setRotate(rotate - 90)}>
                  <FaArrowRotateLeft />
                </div>
                <div
                  className="cursor-pointer border rounded-full p-1"
                  onClick={() => setScale(scale - 0.1)}>
                  <TbArrowsMinimize />
                </div>
                <div
                  className="cursor-pointer border rounded-full p-1"
                  onClick={() => setScale(scale + 0.1)}>
                  <TbArrowsMaximize />
                </div>
                <div
                  className="cursor-pointer border rounded-full p-1"
                  onClick={() => setRotate(rotate + 90)}>
                  <FaArrowRotateRight />
                </div>
              </div>
              <form
                onSubmit={handleImageUpload}
                className="flex mt-5 text-center items-center justify-center gap-3 w-full">
                <button
                  onClick={() => setOpen(!open)}
                  className="font-bold border border-primary-A1 rounded-[50px] p-4 w-[90%] text-primary-A1 text-[15px] text-center">
                  Cancel
                </button>

                {loading ? (
                  <div className="h-12 text-black w-[90%]">Loading...</div>
                ) : (
                  <button
                    onClick={handleImageUpload}
                    type="submit"
                    className="font-bold bg-primary-A1 rounded-[50px] p-4 w-[90%] text-[white] text-[15px] text-center">
                    Submit
                  </button>
                )}
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProfileUploader;
