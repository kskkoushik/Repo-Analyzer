import {
  Github,
  LayoutDashboard,
  FileText,
  Settings,
  HelpCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface SidebarProps {
  owner: string;
  repo: string;
}

export default function Sidebar({ owner, repo }: SidebarProps) {
  return (
    <motion.div
      className="fixed left-0 top-0 h-full w-64 bg-black/70 backdrop-blur-lg border-r border-purple-500/30 p-4"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-4 mb-8">
        <Github className="h-8 w-8 text-purple-400" />
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          {owner}/{repo}
        </span>
      </div>
      <nav className="space-y-4">
        <Link
          href="/vulnerability_dashboard"
          className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors"
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>Vulnerabilities</span>
        </Link>
        <Link
          href="/chatwithcode"
          className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors"
        >
          <FileText className="h-5 w-5" />
          <span>Talk with Repo</span>
        </Link>
        <a
          href="#"
          className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors"
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors"
        >
          <HelpCircle className="h-5 w-5" />
          <span>Help</span>
        </a>
      </nav>
    </motion.div>
  );
}
