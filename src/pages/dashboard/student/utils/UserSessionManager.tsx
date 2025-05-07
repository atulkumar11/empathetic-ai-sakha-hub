
import { Location, NavigateFunction } from "react-router-dom";

interface UserSessionResult {
  shouldShowOnboarding: boolean;
  shouldShowWelcomeTour: boolean;
}

export const handleNewUser = (
  location: Location,
  navigate: NavigateFunction
): UserSessionResult => {
  const userData = localStorage.getItem("userData");
  const searchParams = new URLSearchParams(location.search);
  const completedOnboarding = searchParams.get('completedOnboarding');
  const isNew = searchParams.get('new');
  
  let shouldShowOnboarding = false;
  let shouldShowWelcomeTour = false;
  
  console.log("UserSessionManager - Current URL params:", location.search);
  console.log("UserSessionManager - completedOnboarding param:", completedOnboarding);
  console.log("UserSessionManager - isNew param:", isNew);
  console.log("UserSessionManager - userData:", userData);
  
  // If first time login flow (coming from signup)
  if (completedOnboarding === 'true' || isNew === 'true') {
    console.log("UserSessionManager - New user detected from URL parameters");
    shouldShowOnboarding = true;
    // Clean the URL to remove the query param
    navigate(location.pathname, { replace: true });
  }
  // Check if user data exists
  else if (userData) {
    const parsedUserData = JSON.parse(userData);
    console.log("UserSessionManager - parsedUserData:", parsedUserData);
    
    // For returning users who have completed onboarding, skip both flows
    if (parsedUserData.completedOnboarding === true) {
      shouldShowOnboarding = false;
      shouldShowWelcomeTour = parsedUserData.sawWelcomeTour !== true; // Only show welcome tour if they haven't seen it
    } 
    // For new users who haven't completed onboarding, show onboarding
    else {
      shouldShowOnboarding = true;
    }
  }
  // First time user with no data
  else {
    shouldShowOnboarding = true;
  }

  console.log("UserSessionManager - Result:", { shouldShowOnboarding, shouldShowWelcomeTour });
  return {
    shouldShowOnboarding,
    shouldShowWelcomeTour
  };
};
