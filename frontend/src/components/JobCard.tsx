import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/data/jobs";
import {
  CalendarIcon,
  MapPinIcon,
  Bookmark,
  BookmarkCheck,
  BuildingIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNotification } from "@/contexts/NotificationContext";
import { useState, useEffect } from "react";

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  const { addNotification } = useNotification();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedJobIds = JSON.parse(localStorage.getItem("savedJobIds") || "[]");
    setIsSaved(savedJobIds.includes(job.id));
  }, [job.id]);

  const toggleSaveJob = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      addNotification("info", "Login Required", "Please log in to save jobs");
      return;
    }

    // Get current saved state
    const savedJobIds = JSON.parse(localStorage.getItem("savedJobIds") || "[]");
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    const newSavedStatus = !isSaved;

    if (newSavedStatus) {
      // Add to saved jobs
      const jobToSave = {
        id: job.id,
        title: job.titre,
        company: job.entreprise,
        location: job.localisation,
        type: job.type_emploi || job.contrat || "Full-time",
        salary: job.salaire || "Salary not specified",
        description: job.description || "",
        savedDate: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        logoUrl:
          job.logoUrl ||
          `https://via.placeholder.com/150?text=${job.entreprise.charAt(0)}`,
      };

      // Update IDs and jobs
      const newSavedJobIds = [...savedJobIds, job.id];
      const newSavedJobs = [...savedJobs, jobToSave];

      localStorage.setItem("savedJobIds", JSON.stringify(newSavedJobIds));
      localStorage.setItem("savedJobs", JSON.stringify(newSavedJobs));
      addNotification(
        "success",
        "Job Saved",
        `${job.titre} has been saved to your list`
      );
    } else {
      // Remove from saved jobs
      const newSavedJobIds = savedJobIds.filter((id: number) => id !== job.id);
      const newSavedJobs = savedJobs.filter(
        (savedJob: any) => savedJob.id !== job.id
      );

      localStorage.setItem("savedJobIds", JSON.stringify(newSavedJobIds));
      localStorage.setItem("savedJobs", JSON.stringify(newSavedJobs));
      addNotification(
        "info",
        "Job Removed",
        `${job.titre} has been removed from your saved jobs`
      );
    }

    setIsSaved(newSavedStatus);
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-default overflow-hidden relative">
      {/* Save Button */}
      <button
        onClick={toggleSaveJob}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-gray-100 transition-colors"
        aria-label={isSaved ? "Unsave job" : "Save job"}
      >
        {isSaved ? (
          <BookmarkCheck className="w-5 h-5 text-yellow-500 fill-current" />
        ) : (
          <Bookmark className="w-5 h-5 text-gray-400" />
        )}
      </button>

      <CardContent className="p-0">
        <div className="flex p-4 md:p-6 gap-4">
          <div className="w-12 h-12 flex-shrink-0 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
            <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
              <BuildingIcon
                className="h-10 w-10 text-blue-500"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://via.placeholder.com/150?text=" +
                    job.entreprise.charAt(0);
                }}
              />
            </div>
            {/* <img 
              src={job.logoUrl} 
              alt={`${job.entreprise} logo`} 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/150?text=' + job.entreprise.charAt(0);
              }}
            /> */}
          </div>

          <div className="flex-1 min-w-0">
            {/* Only the title is clickable */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
              <Link to={`/job/${job.id}`} className="hover:underline">
                <h3 className="text-lg font-semibold text-slate-800 truncate">
                  {job.titre}
                </h3>
              </Link>
            </div>

            <div className="mt-1">
              <div className="text-md font-medium text-slate-700">
                {job.entreprise}
              </div>
            </div>

            <div className="flex flex-wrap mt-3 gap-2">
              <div className="flex items-center text-sm text-slate-500">
                <MapPinIcon className="h-4 w-4 mr-1" />
                {job.localisation}
              </div>
              <div className="flex items-center text-sm text-slate-500">
                <CalendarIcon className="h-4 w-4 mr-1" />
                Published: {new Date(job.date_publication).toLocaleDateString()}
              </div>
              <Badge variant="secondary" className="ml-auto">
                {job.type_emploi || job.type}
              </Badge>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {job.contrat && <Badge variant="outline">{job.contrat}</Badge>}
              {job.teletravail === "True" && (
                <Badge variant="outline">Remote</Badge>
              )}
              {job.experience && job.experience !== "Non spécifiée" && (
                <Badge variant="outline">{job.experience}</Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
