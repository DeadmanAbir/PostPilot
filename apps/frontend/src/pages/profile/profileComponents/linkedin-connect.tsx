// src/components/LinkedInConnect.tsx
import React, { useState } from "react";
import { LinkedIn } from "react-linkedin-login-oauth2";
import linkedinIcon from "react-linkedin-login-oauth2/assets/linkedin.png";
import axios from "axios";

interface LinkedInConnectProps {
  onSuccess: () => void;
  onFailure: (error: string) => void;
}

const LinkedInConnect: React.FC<LinkedInConnectProps> = ({
  onSuccess,
  onFailure,
}) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleSuccess = async (code: string) => {
    try {
      setIsConnecting(true);

      // Send the code to your backend
      await axios.post("/api/linkedin/credentials", {
        code,
        redirectUri: window.location.origin + "/linkedin-callback",
      });

      onSuccess();
    } catch (error) {
      console.error("LinkedIn connection error:", error);
      onFailure((error as string) || "Failed to connect LinkedIn account");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleFailure = (error: { error: string; errorMessage: string }) => {
    console.error("LinkedIn auth failure:", error);
    onFailure(error.errorMessage || "LinkedIn authorization failed");
  };

  return (
    <div className="linkedin-connect-container">
      <LinkedIn
        clientId={import.meta.env.VITE_LINKEDIN_CLIENT_ID as string}
        redirectUri={`${window.location.origin}/linkedin-callback`}
        onSuccess={(code) => handleSuccess(code)}
        onError={(error) => {
          console.log(error);
          handleFailure(error);
        }}
      >
        {({ linkedInLogin }) => (
          <button
            className="linkedin-button"
            disabled={isConnecting}
            onClick={linkedInLogin}
          >
            {isConnecting ? "Connecting..." : "Connect LinkedIn Account"}
            <img src={linkedinIcon} alt="LinkedIn" width="20" height="20" />
          </button>
        )}
      </LinkedIn>
    </div>
  );
};

export default LinkedInConnect;
