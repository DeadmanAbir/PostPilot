import { useNavigate } from "@tanstack/react-router";
import React, { useEffect } from "react";

const LinkedInCallback: React.FC = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   // After handling the callback, redirect to account page
  //   const timer = setTimeout(() => {
  //     navigate({
  //       to: "/profile",
  //     });
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, [navigate]);

  return (
    <div className="linkedin-callback">
      <h2>Connecting to LinkedIn...</h2>
      <p>Please wait while we complete the process.</p>
    </div>
  );
};

export default LinkedInCallback;
