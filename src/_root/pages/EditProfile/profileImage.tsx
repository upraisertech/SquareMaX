// import { useState, useRef, FC, ReactElement, SyntheticEvent } from "react";
// import AvatarEditor from "react-avatar-editor";
// import { TbArrowsMaximize, TbArrowsMinimize } from "react-icons/tb";
// import { FaArrowRotateLeft, FaArrowRotateRight } from "react-icons/fa6";
// // import { useNavigate } from "react-router-dom";

// interface Props {
//   profileImage: any;
//   editedImageUrl: string;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   open: boolean;
//   fieldChange: (files: File[]) => void;
// }

// const Test: FC<Props> = ({ profileImage, setOpen, open, fieldChange }): ReactElement => {
//   const [loading, setLoading] = useState(false);
//   const [scale, setScale] = useState(1);
//   const [rotate, setRotate] = useState(0);
//   const [editedImageUrl, setEditedImageUrl] = useState<string>("");
//   const [error, setError] = useState<string>(""); // Define error as a string
//   const editor = useRef<AvatarEditor | null>(null); // Ref to the AvatarEditor component
//   // const navigate = useNavigate();

//   const handleImageUpload = (event: SyntheticEvent) => {
//     event.preventDefault();
//     setLoading(true);
//     if (editor.current && profileImage) {
//       const formData = new FormData();
//       const canvas = editor.current.getImage();
//       canvas.toBlob((blob: Blob | null) => {
//         if (blob) {
//           formData.append("profile_image", blob, "edited_image.png");
//           const url = URL.createObjectURL(blob);
//           setEditedImageUrl(url);
//           localStorage.setItem('imageUrl', JSON.stringify(url));
//           console.log("Edited Image URL:", url);
//           setLoading(false);
//           setOpen(!open);
//         } else {
//           setError("Error processing image");
//           setLoading(false);
//         }
//       }, "image/*");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center mt-8">
//       {profileImage && ( // Check if profileImage is available
//         <AvatarEditor
//           ref={editor}
//           image={profileImage} // Ensure profileImage is a Blob
//           width={200}
//           height={200}
//           className="mt-4 bg-gray-200"
//           color={[255, 255, 255, 0.6]}
//           scale={scale}
//           borderRadius={500}
//           rotate={rotate}
//         />
//       )}

//       {error && <p className="mt-2 text-[15px] text-[red]">{error}</p>}

//       <div className="flex mt-5 text-center items-center text-black justify-center gap-7">
//         <div
//           className="cursor-pointer border rounded-full p-1"
//           onClick={() => setRotate(rotate - 90)}>
//           <FaArrowRotateLeft />
//         </div>
//         <div
//           className="cursor-pointer border rounded-full p-1"
//           onClick={() => setScale(scale - 0.1)}>
//           <TbArrowsMinimize />
//         </div>
//         <div
//           className="cursor-pointer border rounded-full p-1"
//           onClick={() => setScale(scale + 0.1)}>
//           <TbArrowsMaximize />
//         </div>
//         <div
//           className="cursor-pointer border rounded-full p-1"
//           onClick={() => setRotate(rotate + 90)}>
//           <FaArrowRotateRight />
//         </div>
//       </div>
//       <form
//         onSubmit={handleImageUpload}
//         className="flex mt-5 text-center items-center justify-center gap-3 w-full">
//         <button
//           onClick={() => setOpen(!open)}
//           className="font-bold border border-primary-A1 rounded-[50px] p-4 w-[90%] text-primary-A1 text-[15px] text-center">
//           Cancel
//         </button>

//         {loading ? (
//           <div className="h-12 text-black w-[90%]">Loading...</div>
//         ) : (
//           <button
//             onClick={handleImageUpload}
//             type="submit"
//             className="font-bold bg-primary-A1 rounded-[50px] p-4 w-[90%] text-[white] text-[15px] text-center">
//             Submit
//           </button>
//         )}
//       </form>
//     </div>
//   );
// };

// export default Test;
