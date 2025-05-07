
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/auth/AuthContext';
import PrepzrLogo from '@/components/common/PrepzrLogo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center -ml-4">
            <Link to="/" className="flex items-center">
              <PrepzrLogo width={160} height={50} />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <div className="flex space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/dashboard/student">Dashboard</Link>
                </Button>
                <Button variant="ghost" onClick={() => logout()}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="default" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-2">
              <ThemeToggle />
              {user ? (
                <>
                  <Button variant="ghost" asChild className="justify-start">
                    <Link to="/dashboard/student">Dashboard</Link>
                  </Button>
                  <Button variant="ghost" onClick={() => logout()} className="justify-start">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild className="justify-start">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button variant="default" asChild className="justify-start">
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
