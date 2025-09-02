// src/ToastNotification.js
import React, { useEffect, useState } from "react";

function ToastNotification({ message, show }) {
  const [visible, setVisible] = useState(false);

  // This useEffect handles the fade-in/fade-out transition
  useEffect(() => {
    if (show) {
      setVisible(true); // Make it visible to start the fade-in animation
    } else {
      // When `show` becomes false, we wait for the fade-out animation to complete before removing it
      const timer = setTimeout(() => setVisible(false), 300); // Duration should match the transition
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!visible) return null; // Don't render anything if it's not visible

  return (
    // This container positions the toast at the bottom-center of the screen
    <div
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="bg-[#2e77d0] text-white font-semibold px-4 py-2 rounded-md shadow-lg">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default ToastNotification;