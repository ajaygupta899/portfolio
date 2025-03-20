
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface DownloadButtonProps {
  text?: string;
  className?: string;
}

export default function DownloadButton({ 
  text = "Download Resume",
  className = ""
}: DownloadButtonProps) {
  return (
    <Button 
      className={`group relative overflow-hidden rounded-full px-6 py-3 ${className}`}
      onClick={() => {
        // In a real implementation, this would be a link to the actual resume PDF
        // For now, let's create a mock alert
        alert("This would download your resume PDF in a real implementation.");
      }}
    >
      <span className="relative flex items-center gap-2">
        <Download className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:scale-110 duration-300" />
        {text}
      </span>
      <span className="absolute inset-0 translate-y-[105%] bg-white/10 transition-transform duration-300 group-hover:translate-y-0"></span>
    </Button>
  );
}
