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
      <div className="relative w-full h-50">
        {/* Background with opacity */}
        <div
          className="absolute inset-0" // Ensures the background spans the parent
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundSize: "cover", // Ensures the image fits parent dimensions
            backgroundPosition: "center", // Centers the image within the parent
            backgroundRepeat: "no-repeat", // Prevents tiling of the image
            opacity: "0.3",
            borderRadius: "10px",
            zIndex: 2, // Z-index for background
          }}
        ></div>

        {/* Header Title */}
        <h1 className="absolute inset-0 flex items-center  text-[7.5rem] p-10  verde z-[3]">
          {title}
        </h1>
      </div>
    </>
  );
}
