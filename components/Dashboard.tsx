"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { Activity, AlertTriangle, CheckCircle, File } from "lucide-react";

interface DashboardProps {
  fileProblems: { [key: string]: number };
  totalScore: number;
  oneScore: number;
  twoScore: number;
  threeScore: number;
  fourScore: number;
  repoUrl: string;
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"];

export default function Dashboard({
  fileProblems,
  totalScore,
  oneScore,
  twoScore,
  threeScore,
  fourScore,
  repoUrl,
}: DashboardProps) {
  console.log("Repo URL: ");
  console.log(repoUrl);
  console.log(totalScore);
  const repoData = new URL(repoUrl);
  const [, owner = "Unknown", repo = "Unknown"] = repoData.pathname.split("/");

  const chartData = Object.entries(fileProblems).map(([filename, score]) => ({
    filename,
    score,
  }));

  const severityData = [
    { name: "Low", value: oneScore },
    { name: "Medium", value: twoScore },
    { name: "High", value: threeScore },
    { name: "Critical", value: fourScore },
  ];

  const trendData = [
    { name: "Mon", score: 4 },
    { name: "Tue", score: 3 },
    { name: "Wed", score: 5 },
    { name: "Thu", score: 2 },
    { name: "Fri", score: 3 },
    { name: "Sat", score: 1 },
    { name: "Sun", score: 0 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      <Sidebar owner={owner} repo={repo} />
      <div className="ml-64 p-8 space-y-8">
        <motion.h1
          className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Repository Analysis Dashboard
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-black/50 border-purple-500/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 text-purple-400" />
                Total Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-purple-400">{totalScore}</p>
            </CardContent>
          </Card>
          <Card className="bg-black/50 border-purple-500/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 text-green-400" />
                Low Severity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-400">{oneScore}</p>
            </CardContent>
          </Card>
          <Card className="bg-black/50 border-purple-500/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 text-yellow-400" />
                High Severity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-yellow-400">{threeScore}</p>
            </CardContent>
          </Card>
          <Card className="bg-black/50 border-purple-500/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <File className="mr-2 text-blue-400" />
                Total Files
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-blue-400">
                {Object.keys(fileProblems).length}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-black/50 border-purple-500/30 backdrop-blur-md">
              <CardHeader>
                <CardTitle>File Problems</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis
                        dataKey="filename"
                        angle={-45}
                        textAnchor="end"
                        interval={0}
                        height={80}
                        stroke="#888"
                      />
                      <YAxis stroke="#888" />
                      <Tooltip />
                      <Bar dataKey="score" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="bg-black/50 border-purple-500/30 backdrop-blur-md">
              <CardHeader>
                <CardTitle>Severity Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={severityData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {severityData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card className="bg-black/50 border-purple-500/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle>Weekly Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={trendData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
