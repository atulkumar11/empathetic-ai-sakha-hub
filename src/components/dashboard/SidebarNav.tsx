
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  CalendarDays,
  GraduationCap,
  BookOpen,
  FileText,
  Bell,
  User,
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/auth/AuthContext';
import PrepzrLogo from '@/components/common/PrepzrLogo';

interface SidebarNavProps {
  userType: string;
  userName: string;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ userType, userName, activeTab = 'overview', onTabChange }) => {
  const { logout } = useAuth();
  const [expanded, setExpanded] = useState(true);
  
  const handleTabClick = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'today', label: 'Today\'s Plan', icon: CalendarDays },
    { id: 'academic', label: 'Academic Advisor', icon: GraduationCap },
    { id: 'concepts', label: 'Concept Cards', icon: BookOpen },
    { id: 'practice-exam', label: 'Practice Exams', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];
  
  const accountItems = [
    { id: 'profile', label: 'Profile', icon: User, path: `/dashboard/${userType}/profile` },
    { id: 'settings', label: 'Settings', icon: Settings, path: `/dashboard/${userType}/settings` }
  ];

  return (
    <nav className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 hidden md:block ${expanded ? 'w-64' : 'w-16'}`}>
      <div className="h-full bg-white dark:bg-gray-900 border-r dark:border-gray-800 shadow-sm flex flex-col">
        {/* Logo */}
        <div className={`p-4 border-b dark:border-gray-800 flex ${expanded ? 'justify-between' : 'justify-center'} items-center`}>
          <Link to="/" className={`flex items-center ${!expanded && 'justify-center'} -ml-2`}>
            <PrepzrLogo width={expanded ? 110 : 40} height={expanded ? 40 : 40} showText={false} />
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setExpanded(!expanded)}
            className={`${!expanded && 'hidden'}`}
          >
            {expanded ? '←' : '→'}
          </Button>
        </div>
        
        {/* Main Navigation */}
        <div className="flex-1 py-4 overflow-y-auto">
          <div className="px-3 space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "secondary" : "ghost"}
                className={`w-full justify-${expanded ? 'start' : 'center'} mb-1`}
                onClick={() => handleTabClick(item.id)}
              >
                <item.icon className={`h-5 w-5 ${expanded ? 'mr-2' : ''}`} />
                {expanded && <span>{item.label}</span>}
              </Button>
            ))}
          </div>
          
          <div className="mt-8 px-3 space-y-1">
            <p className={`px-3 mb-2 text-xs font-medium text-gray-400 ${!expanded && 'sr-only'}`}>
              Account
            </p>
            {accountItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={`w-full justify-${expanded ? 'start' : 'center'} mb-1`}
                asChild
              >
                <Link to={item.path}>
                  <item.icon className={`h-5 w-5 ${expanded ? 'mr-2' : ''}`} />
                  {expanded && <span>{item.label}</span>}
                </Link>
              </Button>
            ))}
            
            <Button
              variant="ghost"
              className={`w-full justify-${expanded ? 'start' : 'center'} text-red-500 hover:text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20`}
              onClick={() => logout()}
            >
              <LogOut className={`h-5 w-5 ${expanded ? 'mr-2' : ''}`} />
              {expanded && <span>Logout</span>}
            </Button>
          </div>
        </div>
        
        {/* User Profile */}
        <div className={`p-3 border-t dark:border-gray-800 ${!expanded && 'flex justify-center'}`}>
          <div className={`flex items-center ${expanded ? 'justify-between' : 'justify-center'}`}>
            <div className={`flex items-center ${!expanded && 'flex-col'}`}>
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                {userName.charAt(0)}
              </div>
              {expanded && (
                <div className="ml-2">
                  <p className="text-sm font-medium truncate max-w-[120px]">{userName}</p>
                  <p className="text-xs text-muted-foreground capitalize">{userType}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SidebarNav;
