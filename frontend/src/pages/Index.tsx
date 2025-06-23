
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import FeaturedJobs from "@/components/FeaturedJobs";
import { BriefcaseIcon, TrendingUpIcon, UserIcon } from "lucide-react";
import { useNotification } from "@/contexts/NotificationContext";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { addNotification } = useNotification();
  
  const handleSearch = (query: string, location: string) => {
    console.log("Search from home page:", query, location);
    // Show a notification when user searches
    addNotification('info', 'Search started', `Searching for ${query} jobs in ${location || 'all locations'}`);
  };

  useEffect(() => {
    // Show a welcome notification when the page loads
    const timer = setTimeout(() => {
      addNotification('success', 'Welcome to JobHub!', 'Discover thousands of job opportunities.');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [addNotification]);

  const showSampleNotifications = () => {
    addNotification('info', 'New job alert!', 'A new job matching your skills was just posted.');
    setTimeout(() => {
      addNotification('success', 'Application submitted', 'Your application was successfully submitted.');
    }, 1000);
    setTimeout(() => {
      addNotification('warning', 'Complete your profile', 'Add more details to your profile to improve visibility.');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <div className="bg-blue-600 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Find Your Dream Job Today
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Search through thousands of job listings to find the perfect match for your skills and experience.
            </p>
          </div>
          
          <SearchBar onSearch={handleSearch} />
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center text-white">
              <BriefcaseIcon className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold">6,000+ Jobs</h3>
              <p className="text-sm text-blue-100">Fresh opportunities daily</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center text-white">
              <UserIcon className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold">4,000+ Companies</h3>
              <p className="text-sm text-blue-100">Hiring on our platform</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center text-white">
              <TrendingUpIcon className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold">Millions of Candidates</h3>
              <p className="text-sm text-blue-100">Have found success</p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Button 
              onClick={showSampleNotifications}
              variant="outline"
              className="bg-white/20 hover:bg-white/30 text-white hover:text-white"
            >
              Show Sample Notifications
            </Button>
          </div>
        </div>
      </div>
      
      <FeaturedJobs />
      
      <footer className="mt-auto bg-slate-800 text-slate-300 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <BriefcaseIcon className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold text-white">JobHub</span>
            </div>
            <div className="text-sm">
              © {new Date().getFullYear()} JobHub. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
