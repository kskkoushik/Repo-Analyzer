import { useVulnerability } from "@/app/context/problemcon";

const FetchVulnerabilities: React.FC = () => {
  const { setData } = useVulnerability();

  const fetchData = async () => {
    try {
      const response = await fetch("/api/vulnerabilities"); // Flask API route
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return <button onClick={fetchData}>Fetch Vulnerabilities</button>;
};

export default FetchVulnerabilities;
