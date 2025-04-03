import Plants from "@/components/Plants/Plants";
import HeaderWithImgBg from "@/components/SectionTitle/HeaderWithImgBg";
import TanstackProviderWrapper from "@/components/Wrapper/TanstackProviderWrapper";
import { getPlants } from "@/lib/db/plants";

export const metadata = {
  title: "Plants",
  description: "Plants",
};

export default async function PageMain() {
  const { success, data, error } = await getPlants();
  if (!success) {
    console.error(error);
    return (
      <div className="p-10 min-h-screen">
        <HeaderWithImgBg title="Plants" />
        <h1 className="text-7xl verde m-auto">Error Fetching Plants</h1>
      </div>
    );
  }

  if (!data) {
    console.error(error);
    return (
      <div className="p-10 min-h-screen">
        <HeaderWithImgBg title="Plants" />
        <h1 className="text-7xl verde m-auto">Error Fetching Plants</h1>
      </div>
    );
  }

  return (
    <TanstackProviderWrapper>
      <div className="p-10 min-h-screen">
        <HeaderWithImgBg title="Plants" />
        <Plants plants={data} />
      </div>
    </TanstackProviderWrapper>
  );
}
