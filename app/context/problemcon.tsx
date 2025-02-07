import { createContext, useContext, useState, ReactNode } from "react";

interface Vulnerability {
  vulnerability: string;
  suggestion: string;
  imroved_code: string;
  rating: number;
}

interface FileContent {
  file_name: string;
  content: Vulnerability[];
  score: number;
}

interface VulnerabilityData {
  [filename: string]: FileContent[];
}

interface ContextData {
  data: [VulnerabilityData[], number, number, number, number, number] | null;
  setData: React.Dispatch<
    React.SetStateAction<
      [VulnerabilityData[], number, number, number, number, number] | null
    >
  >;
}

const VulnerabilityContext = createContext<ContextData | undefined>(undefined);

export const useVulnerability = () => {
  const context = useContext(VulnerabilityContext);
  if (!context) {
    throw new Error(
      "useVulnerability must be used within a VulnerabilityProvider"
    );
  }
  return context;
};

interface VulnerabilityProviderProps {
  children: ReactNode;
}

export const VulnerabilityProvider: React.FC<VulnerabilityProviderProps> = ({
  children,
}) => {
  const [data, setData] = useState<
    [VulnerabilityData[], number, number, number, number, number] | null
  >(null);

  return (
    <VulnerabilityContext.Provider value={{ data, setData }}>
      {children}
    </VulnerabilityContext.Provider>
  );
};
