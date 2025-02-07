"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
    "Analyze your Repository",
    "Enter the Repository URL",
    "Chat with the repository",
    "Get detailed Analysis",
    "Get the Repository Insights",
  ];

  const [repoUrl, setRepoUrl] = useState("");

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

    try {
      const response = await fetch("http://localhost:5000/analyze-repo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: repoUrl }),
      });

      const data = await response.json();
      console.log("Response from server:", data);
      router.push("/dashboard"); // Redirect to results page with the analyzed repository URL
    } catch (error) {
      console.error("Error submitting repository URL:", error);
    }
  };

  return (
    <PlaceholdersAndVanishInput
      placeholders={placeholders}
      onChange={handleChange}
      onSubmit={onSubmit}
    />
  );
}
