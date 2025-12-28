import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { signUpWithEmail, signInWithGoogle } from "@/lib/supabase-auth";
import { validateRegistration, sanitizeString } from "@/lib/validation";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const clearFieldError = (field: string) => {
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    // Sanitize and prepare form data
    const formData = {
      name: sanitizeString(name),
      email: sanitizeString(email),
      password,
      confirmPassword,
    };

    // Validate using zod schema
    const validation = validateRegistration(formData);

    if (validation.success === false) {
      // Map errors to field names
      const errors: Record<string, string> = {};
      validation.errors.forEach(err => {
        errors[err.field] = err.message;
      });
      setFieldErrors(errors);

      // Show first error as toast
      toast({
        title: "Validation Error",
        description: validation.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Use validated and sanitized data
    const { data, error } = await signUpWithEmail(
      validation.data.email, 
      validation.data.password, 
      validation.data.name
    );

    setIsLoading(false);

    if (error) {
      // Generic error message to prevent user enumeration
      toast({
        title: "Registration failed",
        description: "Unable to create account. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Welcome to FeedHope!",
      description: "Your account has been created successfully.",
    });
    navigate("/donate");
  };

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    
    const { error } = await signInWithGoogle();

    if (error) {
      setIsGoogleLoading(false);
      toast({
        title: "Google sign up failed",
        description: error.message,
        variant: "destructive",
      });
    }
    // Note: On success, the user will be redirected by Supabase
  };

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex flex-1 gradient-secondary items-center justify-center p-12">
        <div className="text-center text-secondary-foreground max-w-md">
          <div className="w-24 h-24 rounded-full bg-secondary-foreground/20 flex items-center justify-center mx-auto mb-8">
            <Heart className="w-12 h-12" />
          </div>
          <h2 className="font-display text-3xl font-bold mb-4">
            Be the Change
          </h2>
          <p className="text-secondary-foreground/80 text-lg">
            Join 150,000+ donors and volunteers who are making a real difference in the fight against hunger.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              Feed<span className="text-primary">Hope</span>
            </span>
          </Link>

          <div className="bg-card rounded-2xl p-8 shadow-lg">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Create Account
            </h1>
            <p className="text-muted-foreground mb-6">
              Start your journey to end hunger today
            </p>

            {/* Google Sign Up */}
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full mb-6 gap-3"
              onClick={handleGoogleSignUp}
              disabled={isGoogleLoading}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {isGoogleLoading ? "Connecting..." : "Continue with Google"}
            </Button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-4 text-muted-foreground">or register with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => {
                      setName(sanitizeString(e.target.value));
                      clearFieldError('name');
                    }}
                    className={`pl-10 h-12 ${fieldErrors.name ? 'border-destructive' : ''}`}
                    maxLength={100}
                    required
                  />
                </div>
                {fieldErrors.name && (
                  <p className="text-destructive text-xs">{fieldErrors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(sanitizeString(e.target.value));
                      clearFieldError('email');
                    }}
                    className={`pl-10 h-12 ${fieldErrors.email ? 'border-destructive' : ''}`}
                    maxLength={255}
                    required
                  />
                </div>
                {fieldErrors.email && (
                  <p className="text-destructive text-xs">{fieldErrors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      clearFieldError('password');
                    }}
                    className={`pl-10 pr-10 h-12 ${fieldErrors.password ? 'border-destructive' : ''}`}
                    maxLength={72}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="text-destructive text-xs">{fieldErrors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      clearFieldError('confirmPassword');
                    }}
                    className={`pl-10 h-12 ${fieldErrors.confirmPassword ? 'border-destructive' : ''}`}
                    maxLength={72}
                    required
                  />
                </div>
                {fieldErrors.confirmPassword && (
                  <p className="text-destructive text-xs">{fieldErrors.confirmPassword}</p>
                )}
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" id="terms" className="mt-1 rounded border-input" required />
                <label htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                </label>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center text-muted-foreground text-sm mt-8">
            <Link to="/" className="hover:text-primary">← Back to home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
