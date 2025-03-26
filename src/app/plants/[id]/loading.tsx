import HeaderWithImgBg from "@/components/SectionTitle/HeaderWithImgBg";

export default function Loading(){
    return (
          <div className="p-10 flex flex-col items-center justify-center min-h-screen">
            <HeaderWithImgBg title="Our Plants" />
            <span className="verde text-9xl mx-auto my-auto">Loading...</span>
          </div>
        );
}