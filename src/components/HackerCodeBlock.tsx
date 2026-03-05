import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";

interface Props {
  code: string;
  language?: string;
}

const HackerCodeBlock: React.FC<Props> = ({ code, language = "bash" }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="my-6 rounded-lg border border-portfolio-teal bg-black shadow-lg">
      
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-2 bg-portfolio-light-navy border-b border-portfolio-teal">
        <div className="flex space-x-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>

        <span className="text-xs text-portfolio-teal font-fira-code">
          terminal
        </span>
      </div>

      {/* Code */}
      <pre className="p-4 overflow-x-auto text-sm font-fira-code">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

export default HackerCodeBlock;