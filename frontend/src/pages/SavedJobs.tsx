import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bookmark,
  MapPin,
  Building,
  Calendar,
  Heart,
  BuildingIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";

interface SavedJob {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  savedDate: string;
  logoUrl: string;
}

const SavedJobs = () => {
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // Get saved jobs from localStorage
    const savedJobsData = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    setSavedJobs(savedJobsData);
    setIsLoading(false);
  }, [navigate]);

  const handleRemoveFromSaved = (jobId: number) => {
    // Update savedJobIds
    const savedJobIds = JSON.parse(localStorage.getItem("savedJobIds") || "[]");
    const newSavedJobIds = savedJobIds.filter((id: number) => id !== jobId);
    localStorage.setItem("savedJobIds", JSON.stringify(newSavedJobIds));

    // Update savedJobs
    const updatedJobs = savedJobs.filter((job) => job.id !== jobId);
    localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));

    // Update state
    setSavedJobs(updatedJobs);
  };

  const handleApplyNow = (jobId: number) => {
    console.log("Applying to job:", jobId);
    navigate(`/job/${jobId}`);
    // Add application logic here
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <Navbar />
        <div className="container mx-auto px-4 py-12 max-w-6xl text-center">
          <p>Loading saved jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <Heart className="w-8 h-8 text-red-500" />
            Saved Jobs
          </h1>
          <p className="text-gray-600">Your bookmarked job opportunities</p>
        </div>

        {savedJobs.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No saved jobs yet
              </h3>
              <p className="text-gray-500 mb-6">
                Start saving jobs that interest you to view them here
              </p>
              <Button
                onClick={() => navigate("/jobs")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Browse Jobs
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {savedJobs.map((job, index) => (
              <Card
                key={job.id}
                className="hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                          <BuildingIcon className="h-10 w-10 text-blue-500" />
                        </div>
                        {/* <img
                          src={job.logoUrl}
                          alt={`${job.company} logo`}
                          className="w-12 h-12 rounded-full border-2 border-blue-100 group-hover:border-blue-300 group-hover:scale-110 transition-all duration-300"
                        /> */}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <span className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            {job.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Saved {job.savedDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary">{job.type}</Badge>
                          <Badge variant="outline">{job.salary}</Badge>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {job.description || "No description available"}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 md:flex-col">
                      <Button
                        onClick={() => handleApplyNow(job.id)}
                        className="bg-blue-600 hover:bg-blue-700 flex-1 md:flex-none"
                      >
                        See Details
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleRemoveFromSaved(job.id)}
                        className="text-red-600 border-red-200 hover:bg-red-50 flex-1 md:flex-none"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
