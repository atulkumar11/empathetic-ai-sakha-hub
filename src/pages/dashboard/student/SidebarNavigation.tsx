
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";
import { Home, Calendar, BookMarked, MessageSquare, Brain, BookOpen, LineChart, 
  Activity, Heart, Folder, Video, Users, Bell, LogOut, ChevronRight } from "lucide-react";

interface SidebarNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SidebarNavigation = ({ activeTab, onTabChange }: SidebarNavigationProps) => {
  const navigate = useNavigate();

  const navItems = [
    { icon: <Home size={20} />, title: "Dashboard", tab: "overview" },
    { icon: <Calendar size={20} />, title: "Today's Plan", tab: "today" },
    { icon: <BookMarked size={20} />, title: "Academic Advisor", tab: "academic" },
    { icon: <MessageSquare size={20} />, title: "Tutor", tab: "tutor" },
    { icon: <Brain size={20} />, title: "Flashcards", tab: "flashcards" },
    { icon: <BookOpen size={20} />, title: "Practice Exams", tab: "exams" },
    { icon: <LineChart size={20} />, title: "Progress", tab: "progress" },
    { icon: <Activity size={20} />, title: "Motivation", tab: "motivation" },
    { icon: <Heart size={20} />, title: "Mental Health", tab: "wellness" },
    { icon: <Folder size={20} />, title: "Materials", tab: "materials" },
    { icon: <Video size={20} />, title: "Videos", tab: "videos" },
    { icon: <Users size={20} />, title: "Study Groups", tab: "forum" },
    { icon: <Bell size={20} />, title: "Notifications", tab: "notifications" },
  ];

  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    navigate(`/dashboard/student/${tab}`);
  };
  
  return (
    <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-md overflow-hidden">
        <div className="p-3 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-sm">Navigation</h3>
        </div>
        
        <div className="p-2">
          {navItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => handleTabChange(item.tab)}
              className={`w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all ${
                activeTab === item.tab
                  ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-sm"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
              {activeTab === item.tab && (
                <ChevronRight size={16} className="ml-auto" />
              )}
            </button>
          ))}
          
          <Separator className="my-3" />
          
          <button 
            className="w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-500 dark:hover:text-red-400 transition-all"
            onClick={() => navigate('/login')}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarNavigation;
