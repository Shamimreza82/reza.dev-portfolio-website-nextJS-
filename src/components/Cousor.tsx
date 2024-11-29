"use client"
import { useEffect, useState } from "react";

const Cursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setCursorPosition({ x: clientX, y: clientY });

      setTimeout(() => {
        setFollowerPosition({ x: clientX, y: clientY });
      }, 50);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.querySelectorAll("a, button").forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.querySelectorAll("a, button").forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Cursor (small dot) */}
      <div
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 ${
          isHovering ? "bg-blue-500 scale-150" : "bg-white"
        } mix-blend-difference transition-all duration-150 ease-out`}
        style={{
          transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
        }}
      ></div>

      {/* Follower (larger circle) */}
      <div
        className={`fixed top-0 left-0 w-10 h-10 border-2 rounded-full pointer-events-none z-[9998] transform -translate-x-1/2 -translate-y-1/2 ${
          isHovering ? "border-blue-500 scale-125" : "border-white"
        } transition-all duration-150 ease-out`}
        style={{
          transform: `translate(${followerPosition.x}px, ${followerPosition.y}px)`,
        }}
      ></div>
    </>
  );
};

export default Cursor;