import { Provider as JotaiProviderBase } from "jotai";
import { jotaiStore } from "@/stores/jotaiStore";

const JotaiProvider = ({ children }: { children: React.ReactNode }) => {
  return <JotaiProviderBase store={jotaiStore}>{children}</JotaiProviderBase>;
};

export default JotaiProvider;
