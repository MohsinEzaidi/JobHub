import { useState } from "react";
import { jobs } from "@/data/jobs";
import JobCard from "./JobCard";
import { Button } from "@/components/ui/button";

const FeaturedJobs = () => {
  const [visibleJobs, setVisibleJobs] = useState(4);

  const loadMoreJobs = () => {
    setVisibleJobs((prev) => Math.min(prev + 4, jobs.length));
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Featured Jobs</h2>
        
        <div className="grid grid-cols-1 gap-4">
          {jobs.slice(0, visibleJobs).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        
        {visibleJobs < jobs.length && (
          <div className="mt-8 text-center">
            <Button 
              variant="outline" 
              onClick={loadMoreJobs}
              className="px-8"
            >
              Load More Jobs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedJobs;
