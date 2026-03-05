import React, { useState, useEffect } from "react";

interface Props {
  text: string;
}

const TypingCode: React.FC<Props> = ({ text }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setDisplayText(text.substring(0, i));
      i++;

      if (i > text.length) clearInterval(interval);
    }, 20);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <pre className="text-portfolio-teal font-fira-code text-sm bg-black p-4 rounded border border-portfolio-teal">
      {displayText}
      <span className="animate-pulse">█</span>
    </pre>
  );
};

export default TypingCode;