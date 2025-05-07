
import { OnboardingProvider } from "@/components/signup/OnboardingContext";
import SignUpContent from "@/components/signup/SignupContent";

const SignUp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100/30 via-white to-violet-100/30 flex items-center justify-center p-4">
      <OnboardingProvider>
        <SignUpContent />
      </OnboardingProvider>
    </div>
  );
};

export default SignUp;
