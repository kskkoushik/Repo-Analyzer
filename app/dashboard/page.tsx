"use client";

import Dashboard from "@/components/Dashboard";
import { useEffect, useState } from "react";

interface Vulnerability {
  vulnerability: string;
  suggestion: string;
  improved_code: string;
  unchanged_code: string;
  rating: number;
}

interface FileContent {
  file_name: string;
  content: Vulnerability[];
  score: number;
}

type VulnerabilityData = [
  { [filename: string]: FileContent[] }[], // First element
  number,
  number,
  number,
  number,
  number,
  number,
  { [filename: string]: number } // Last element (file problems)
];

export default function Home() {
  const [data, setData] = useState<VulnerabilityData | null>(null);
  const [repourl, setRepourl] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedrurl = localStorage.getItem("rurl");

    if (storedUser) {
      try {
        setData(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    if (storedrurl) {
      try {
        setRepourl(JSON.parse(storedrurl || '""'));
      } catch (error) {
        console.error("Error parsing repo URL:", error);
      }
    }
  }, []);

  if (!data) {
    return <div>Loading...</div>; // Prevent errors if data is not loaded yet
  }

  const fp = data[7] || {};
  const ts = data[2] || 0;
  const os = data[3] || 0;
  const twos = data[4] || 0;
  const threes = data[5] || 0;
  const fours = data[6] || 0;

  const originalData = {
    fileProblems: fp,
    totalScore: ts,
    oneScore: os,
    twoScore: twos,
    threeScore: threes,
    fourScore: fours,
    repoUrl: repourl,
  };

  return (
    <main>
      <Dashboard {...originalData} />
    </main>
  );
}
