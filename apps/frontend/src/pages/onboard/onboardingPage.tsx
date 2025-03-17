import { useState } from "react";
import { SignUp } from "./sign-up";
import { SignIn } from "./sign-in";

export default function OnboardPage() {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {isSignUp ? (
        <SignUp onToggle={() => setIsSignUp(false)} />
      ) : (
        <SignIn onToggle={() => setIsSignUp(true)} />
      )}
    </div>
  );
}
