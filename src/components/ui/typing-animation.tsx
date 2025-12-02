"use client";

import { useState, useEffect } from "react";

type TypingAnimationProps = {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
};

export function TypingAnimation({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  className,
}: TypingAnimationProps) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingTimeout, setTypingTimeout] = useState(typingSpeed);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % texts.length;
      const fullText = texts[i];

      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
        setTypingTimeout(deletingSpeed);
      } else {
        setText(fullText.substring(0, text.length + 1));
        setTypingTimeout(typingSpeed);
      }

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingTimeout);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, texts, typingSpeed, deletingSpeed, pauseDuration, typingTimeout]);

  return (
    <span className={className}>
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}
