"use client";
import React, { useEffect, useState } from "react";
import VulnerabilityDashboard from "@/components/vulnerability-dashboard";

const Page = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div>
      {user ? (
        <VulnerabilityDashboard data={user} />
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default Page;
