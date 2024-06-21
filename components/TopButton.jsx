import { useEffect, useState } from "react";

const TopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="go-to-top-button">
      {isVisible && (
        <button onClick={scrollToTop} className="go-to-top bg-pink-600">
          ↑
        </button>
      )}
    </div>
  );
};

export default TopButton;
