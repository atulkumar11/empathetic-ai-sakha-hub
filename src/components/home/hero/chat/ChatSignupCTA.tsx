
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ChatSignupCTA = () => {
  return (
    <div className="mt-3 flex justify-center">
      <Button 
        className="bg-gradient-to-r from-violet-500 to-purple-600 text-white animate-pulse-subtle shadow-md"
        asChild
      >
        <Link to="/signup">Sign Up for Personalized Study Plan</Link>
      </Button>
    </div>
  );
};

export default ChatSignupCTA;
