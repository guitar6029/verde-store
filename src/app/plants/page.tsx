import Plants from "@/components/Plants/Plants";
import TanstackProviderWrapper from "@/components/Wrapper/TanstackProviderWrapper";

export default function PageMain() {
  return (
    <TanstackProviderWrapper>
      <Plants />
    </TanstackProviderWrapper>
  );
}