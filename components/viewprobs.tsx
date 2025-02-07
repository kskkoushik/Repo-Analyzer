"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Vulnerability {
  vulnerability: string;
  suggestion: string;
  improved_code: string;
  rating: number;
}

interface FileContent {
  file_name: string;
  content: Vulnerability[];
  score: number;
}

// Correcting the structure to match the description
type VulnerabilityData = [
  { [filename: string]: FileContent[] }, // First element is an array of objects with filename as key
  number, // Second element (integer)
  number, // Third element (integer)
  number, // Fourth element (integer)
  number, // Fifth element (integer)
  number, // Sixth element (integer)
  number // Seventh element (integer)
];

const VulnerabilityDashboard: React.FC<{ data: VulnerabilityData }> = ({
  data,
}) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [showImprovedCode, setShowImprovedCode] = useState<string | null>(null);

  const getRatingColor = (rating: number) => {
    const colors = ["#4ade80", "#fbbf24", "#fb923c", "#f87171"];
    return colors[Math.min(Math.floor(rating) - 1, 3)];
  };

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
    setShowImprovedCode(null);
  };

  const toggleImprovedCode = (cardId: string) => {
    setShowImprovedCode(showImprovedCode === cardId ? null : cardId);
  };

  // Extract the file data from the first element of VulnerabilityData
  const fileData = data[0];

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-white">
        Vulnerability Dashboard
      </h1>
      {Object.entries(fileData).map(([filename, fileContents]) => (
        <div key={filename} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">{filename}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fileContents.map((content, contentIndex) =>
              content.content.map((vulnerability, vulIndex) => (
                <motion.div
                  key={`${filename}-${contentIndex}-${vulIndex}`}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-gray-800 text-white overflow-hidden">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold">
                          {content.file_name}
                        </h3>
                        <span
                          className="text-sm font-medium px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: getRatingColor(
                              vulnerability.rating
                            ),
                          }}
                        >
                          Rating: {vulnerability.rating}
                        </span>
                      </div>
                      <Button
                        onClick={() =>
                          toggleCard(`${filename}-${contentIndex}-${vulIndex}`)
                        }
                        variant="outline"
                        className="w-full mt-2"
                      >
                        {expandedCard ===
                        `${filename}-${contentIndex}-${vulIndex}`
                          ? "Close"
                          : "Open"}
                      </Button>
                    </div>
                    <AnimatePresence>
                      {expandedCard ===
                        `${filename}-${contentIndex}-${vulIndex}` && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 border-t border-gray-700">
                            <h4 className="text-lg font-semibold mb-2 text-red-400">
                              Vulnerability:
                            </h4>
                            <p className="mb-4">
                              {vulnerability.vulnerability}
                            </p>
                            <h4 className="text-lg font-semibold mb-2 text-green-400">
                              Suggestion:
                            </h4>
                            <p className="mb-4">{vulnerability.suggestion}</p>
                            <Button
                              onClick={() =>
                                toggleImprovedCode(`${filename}-${vulIndex}`)
                              }
                              variant="outline"
                              className="w-full"
                            >
                              {showImprovedCode === `${filename}-${vulIndex}`
                                ? "Hide"
                                : "View"}{" "}
                              Improved Code
                            </Button>
                            <AnimatePresence>
                              {showImprovedCode ===
                                `${filename}-${vulIndex}` && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="mt-4"
                                >
                                  <SyntaxHighlighter
                                    language="javascript"
                                    style={atomDark}
                                    customStyle={{
                                      margin: 0,
                                      borderRadius: "0.5rem",
                                      maxHeight: "300px",
                                      overflow: "auto",
                                    }}
                                  >
                                    {vulnerability.improved_code}
                                  </SyntaxHighlighter>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VulnerabilityDashboard;
