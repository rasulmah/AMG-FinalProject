import { useRef, useEffect } from "react";
import "../../assets/scss/components/buttons/_magneticbtn.scss"
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const MagneticButton = ({ text, href }) => {
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    
    const handleMouseMove = (event) => {
      if (!buttonRef.current) return;
      const button = buttonRef.current;
      const { left, top, width, height } = button.getBoundingClientRect();

      // Calculate the center of the button
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // Calculate distance from mouse to center
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;

      // Apply transformation only if within 100px range
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      if (distance < 100) {
        button.style.transform = `translate(${deltaX * 0.2}px, ${deltaY * 0.2}px)`;
      } else {
        button.style.transform = "translate(0, 0)";
      }
    };

    const resetPosition = () => {
      if (buttonRef.current) buttonRef.current.style.transform = "translate(0, 0)";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", resetPosition);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", resetPosition);
    };
  }, []);

  return (
    <a onClick={()=> navigate("/products")}
     href={href} 
      ref={buttonRef}
      className="magnetic-button"
    >
      {text}
    </a>
  );
};

export default MagneticButton;
