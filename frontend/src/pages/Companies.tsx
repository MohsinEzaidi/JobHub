
import Navbar from "@/components/Navbar";
import { BriefcaseIcon, BuildingIcon, UsersIcon } from "lucide-react";
import { useNotification } from "@/contexts/NotificationContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Companies = () => {
  const { addNotification } = useNotification();
  
  const handleCompanyExplore = (companyId: number) => {
    addNotification('info', 'Company profile', 'Exploring company details');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <div className="bg-blue-600 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Discover Great Companies
          </h1>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex gap-2">
              <Input 
                placeholder="Search companies..." 
                className="flex-grow"
              />
              <Button>
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-6">Featured Companies</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                  <BuildingIcon className="h-10 w-10 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Company {item}</h3>
                  <p className="text-slate-500">Tech Industry</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                <div className="flex items-center gap-1">
                  <UsersIcon className="h-4 w-4" />
                  <span>50-200 employees</span>
                </div>
                <div>New York, NY</div>
              </div>
              <Link to={`/company/${item}`}>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleCompanyExplore(item)}
                >
                  View Profile
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Companies;
