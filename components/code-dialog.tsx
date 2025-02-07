import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CodeBlockDemo } from "./code_viewer";

interface CodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  unchangedCode: string;
  fileName: string;
}

export const CodeDialog: React.FC<CodeDialogProps> = ({
  isOpen,
  onClose,
  code,
  unchangedCode,
  fileName,
}) => {
  console.log("CodeDialog");
  console.log(fileName);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[80vw] max-h-[90vh] bg-gray-900 border border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-300">
            {fileName}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="mt-4 h-[calc(90vh-100px)]">
          <CodeBlockDemo
            code={code}
            file_name={fileName}
            unchangedcode={unchangedCode}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
