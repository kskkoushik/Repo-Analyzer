"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/hamster";
import { useVulnerability } from "@/app/context/problemcon";

export function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
    "Analyze your Repository",
    "Enter the Repository URL",
    "Chat with the repository",
    "Get detailed Analysis",
    "Get the Repository Insights",
  ];

  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const { setData } = useVulnerability();

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepoUrl(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!repoUrl.trim()) {
      console.error("Repository URL is empty");
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await fetch("http://localhost:5000/analyze-repo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: repoUrl }),
      });

      const data = await response.json();
      setData(data);
      localStorage.setItem("user", JSON.stringify(data));
      console.log("Response from server:", data);

      setLoading(false); // Stop loading after response
      router.push("/dashboard"); // Redirect to results page
    } catch (error) {
      console.error("Error submitting repository URL:", error);
      setLoading(false); // Stop loading in case of error
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
}
