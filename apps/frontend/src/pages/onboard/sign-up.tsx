import type React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { ReadingIllustration } from './reading-illustration';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// import { Checkbox } from "@/components/ui/checkbox";
import { Label } from '@/components/ui/label';
// import { Separator } from "@/components/ui/separator";
import { supabase } from '@/lib/supabaseClient';

interface SignUpProps {
  onToggle: () => void;
}

export function SignUp({ onToggle }: SignUpProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  // Add state for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleCheckboxChange = (checked: boolean) => {
  //   setFormData((prev) => ({ ...prev, agreeToTerms: checked }));
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { displayName: formData.name },
        },
      });
      if (error) {
        throw new Error(error.message);
        return;
      }

      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/onboard-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data?.session?.access_token}`,
        },
      });

      // const result = await response.json();
      // console.log("Backend response:", result);
      navigate({
        to: '/dashboard',
      });
    } catch (err: unknown) {
      console.error('Error:', err);
    }
  };

  // const handleSocialSignUp = (provider: string) => {
  //   console.log(`Sign up with ${provider}`);
  // };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-20">
        <div className="absolute top-8 left-8"></div>

        <div className="max-w-md w-full mx-auto space-y-6 bg-white p-8 rounded-xl shadow-xl">
          <div>
            <h2 className="text-3xl font-bold text-black">Sign Up</h2>
          </div>

          {/* Social Sign Up Buttons */}
          {/* <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center space-x-2 border-gray-300 hover:bg-gray-50"
              onClick={() => handleSocialSignUp("Google")}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Sign up with Google</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center space-x-2 border-gray-300 hover:bg-gray-50"
              onClick={() => handleSocialSignUp("GitHub")}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                />
              </svg>
              <span>Sign up with GitHub</span>
            </Button>
          </div> */}

          {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div> */}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 text-black">
              <div>
                <Label htmlFor="name" className="text-sm text-muted-foreground">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                  required
                  className="mt-1 border-b  border-t-0 border-l-0 border-r-0 rounded-none px-2 shadow-none focus-visible:ring-0 focus-visible:border-primary"
                />
              </div>

              <div>
                <Label
                  htmlFor="email"
                  className="text-sm text-muted-foreground"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  required
                  className="mt-1 border-b border-t-0 border-l-0 border-r-0 rounded-none px-2 shadow-none focus-visible:ring-0 focus-visible:border-primary"
                />
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="text-sm text-muted-foreground"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Your Password"
                    required
                    className="mt-1 border-b border-t-0 border-l-0 border-r-0 rounded-none px-2 pr-10 shadow-none focus-visible:ring-0 focus-visible:border-primary"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-1 text-muted-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm text-muted-foreground"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Enter Your Password"
                    required
                    className="mt-1 border-b border-t-0 border-l-0 border-r-0 rounded-none px-2 pr-10 shadow-none focus-visible:ring-0 focus-visible:border-primary"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-1 text-muted-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="terms" className="text-sm">
                I agree the terms and conditions
              </Label>
            </div> */}

            <div>
              <Button type="submit" className="w-full text-white">
                Create Account
              </Button>
            </div>
          </form>

          <div className="text-center text-black">
            <p className="text-sm">
              Already have an account?{' '}
              <Button
                variant="link"
                onClick={onToggle}
                className="text-sm text-primary inline p-0 m-0"
              >
                Login
              </Button>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-100 items-center justify-center">
        <div className="p-12">
          <ReadingIllustration />
        </div>
      </div>
    </div>
  );
}
