const defaultImgeUrl =
  "https://zrjoqoqiqwdlhbqwvxwb.supabase.co/storage/v1/object/public/verde-product-images//backdrop-green.webp";

export default function HeaderWithImgBg({
  title,
  imgUrl = defaultImgeUrl,
}: {
  title: string;
  imgUrl?: string;
}) {
  return (
    <>
      <div className="relative w-full h-50 group">
        {/* Background with opacity */}
        <div
          className="absolute inset-0 opacity-30 group-hover:opacity-100 transition duration-300 ease-in" // Ensures the background spans the parent
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundSize: "cover", // Ensures the image fits parent dimensions
            backgroundPosition: "center", // Centers the image within the parent
            backgroundRepeat: "no-repeat", // Prevents tiling of the image
            borderRadius: "10px",
            zIndex: 2, // Z-index for background
          }}
        ></div>

        {/* Header Title, different ui group-hover:text-white group-hover:bg-[#768468] transition duration-300 ease-in */}
        {/* <h1 className="absolute inset-0 flex items-center text-[3.5rem] w-fit md:text-[7.5rem] p-10 font-extrabold verde z-[3] group-hover:bg-[#768468] group-hover:text-[#CC8977] transition duration-300 ease-in ">
          {title}
        </h1> */}
        <h1 className="absolute inset-0 flex items-center text-[3.5rem] w-fit md:text-[7.5rem] p-10 font-extrabold verde z-[3]  transition duration-300 ease-in ">
          {title}
        </h1>
      </div>
    </>
  );
}
