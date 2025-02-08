import { Github } from "lucide-react";

interface NavbarProps {
  owner: string;
  repo: string;
}

export default function Navbar({ owner, repo }: NavbarProps) {
  return (
    <nav className="bg-gray-800 border-b border-gray-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Github className="h-8 w-8" />
          <span className="text-xl font-bold">
            {owner}/{repo}
          </span>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-300 hover:text-white">
            Dashboard
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            Reports
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            Settings
          </a>
        </div>
      </div>
    </nav>
  );
}
