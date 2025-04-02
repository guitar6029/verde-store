import HeaderWithImgBg from "@/components/SectionTitle/HeaderWithImgBg";
import LoadingDotsAnimated from "@/components/Loading/LoadingDotsAnimated";
export default function Loading(){
    return (
          <div className="p-10 flex flex-col items-center justify-center min-h-screen">
            <HeaderWithImgBg title="Our Plants" />
            <LoadingDotsAnimated loadingText="Loading Plant" />
          </div>
        );
}