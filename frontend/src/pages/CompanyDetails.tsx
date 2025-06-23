
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { BriefcaseIcon, BuildingIcon, MapPinIcon, UsersIcon, GlobeIcon, CalendarIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotification } from "@/contexts/NotificationContext";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

// Mock company data - In a real app, this would come from an API
const companyDetails = {
  id: 1,
  name: "TechCorp Solutions",
  logo: "https://via.placeholder.com/150?text=TS",
  location: "San Francisco, CA",
  industry: "Technology",
  website: "https://techcorp.example.com",
  founded: "2010",
  size: "500-1000 employees",
  description: "TechCorp Solutions is a leading technology company specializing in innovative software solutions for enterprises. Our mission is to transform businesses through cutting-edge technology and exceptional service.",
  benefits: ["Flexible working hours", "Health insurance", "401(k) matching", "Professional development"],
  openPositions: 8
};

const CompanyDetails = () => {
  const { id } = useParams();
  const { addNotification } = useNotification();
  
  const handleApply = () => {
    addNotification('info', 'Application started', 'You are applying to work at ' + companyDetails.name);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/companies">Companies</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>{companyDetails.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 h-32 relative">
            <div className="absolute bottom-0 left-8 transform translate-y-1/2 bg-white p-3 rounded-lg shadow-md">
              <div className="w-20 h-20 flex items-center justify-center bg-slate-100 rounded-lg">
                <BuildingIcon className="h-12 w-12 text-blue-500" />
              </div>
            </div>
          </div>
          
          <div className="pt-16 pb-8 px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">{companyDetails.name}</h1>
                <div className="flex items-center text-slate-500">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  <span>{companyDetails.location}</span>
                  <span className="mx-2">•</span>
                  <span>{companyDetails.industry}</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <Button onClick={handleApply}>
                  View Open Positions ({companyDetails.openPositions})
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">About the Company</h2>
                  <p className="text-slate-600">
                    {companyDetails.description}
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Benefits & Perks</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {companyDetails.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <CheckIcon className="h-5 w-5 mr-2 text-green-500" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-4">Company Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <GlobeIcon className="h-5 w-5 mr-3 text-slate-400" />
                    <div>
                      <div className="text-sm text-slate-500">Website</div>
                      <a href={companyDetails.website} className="text-blue-600 hover:underline">
                        {companyDetails.website.replace('https://', '')}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-3 text-slate-400" />
                    <div>
                      <div className="text-sm text-slate-500">Founded</div>
                      <div>{companyDetails.founded}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <UsersIcon className="h-5 w-5 mr-3 text-slate-400" />
                    <div>
                      <div className="text-sm text-slate-500">Company Size</div>
                      <div>{companyDetails.size}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <BriefcaseIcon className="h-5 w-5 mr-3 text-slate-400" />
                    <div>
                      <div className="text-sm text-slate-500">Open Positions</div>
                      <div>{companyDetails.openPositions} jobs</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
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

export default CompanyDetails;
