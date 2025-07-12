import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  BriefcaseIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  DollarSignIcon,
  BuildingIcon,
  ChevronLeftIcon,
  SendIcon,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotification } from "@/contexts/NotificationContext";
import Navbar from "@/components/Navbar";
import { Job } from "@/data/jobs";
import api from "@/api/axios";

const JobDetails = () => {
  const { id } = useParams();
  const { addNotification } = useNotification();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/jobs/${id}/`);
        setJob(response.data);

        // Check if job is saved
        const savedJobIds = JSON.parse(
          localStorage.getItem("savedJobIds") || "[]"
        );
        setIsSaved(savedJobIds.includes(response.data.id));
      } catch (error) {
        addNotification("error", "Error", "Failed to load job details");
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  const handleApply = () => {
    addNotification(
      "success",
      "navigating ...",
      "You navigated successfully to the apply page"
    );
    // setApplied(true);
     window.open(`https://www.rekrute.com${job.lien}`, '_blank');
  };

  const toggleSaveJob = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      addNotification("info", "Login Required", "Please log in to save jobs");
      return;
    }

    if (!job) return;

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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex-1 flex flex-col items-center justify-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mb-8"></div>
            <div className="h-12 bg-gray-200 rounded w-40"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex-1 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-8">
            The job you are looking for does not exist or has been removed.
          </p>
          <Button
            onClick={() => navigate("/jobs")}
            className="flex items-center gap-2"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-1">
        <Button
          variant="link"
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-blue-600 hover:underline mb-6 pl-0"
        >
          <ChevronLeftIcon className="w-4 h-4 mr-1" />
          Back to Jobs
        </Button>

        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6 border-b pb-6 mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
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
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/150?text=' + job.entreprise.charAt(0);
                }}
              /> */}
            </div>

            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {job.titre}
              </h1>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-gray-600">
                <div className="flex items-center">
                  <BuildingIcon className="w-4 h-4 mr-1 text-gray-500" />
                  {job.entreprise}
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 mr-1 text-gray-500" />
                  {job.localisation}
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-1 text-gray-500" />
                  Published:{" "}
                  {new Date(job.date_publication).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              {/* Save Button */}
              <Button
                variant="outline"
                onClick={toggleSaveJob}
                className="flex items-center justify-center"
              >
                {isSaved ? (
                  <BookmarkCheck className="w-5 h-5 text-yellow-500 fill-current mr-2" />
                ) : (
                  <Bookmark className="w-5 h-5 text-gray-400 mr-2" />
                )}
                {isSaved ? "Saved" : "Save Job"}
              </Button>

              {applied ? (
                <Button disabled className="bg-green-600 hover:bg-green-700">
                  Application Submitted
                </Button>
              ) : (
                <Button onClick={handleApply}>
                  <SendIcon className="w-4 h-4 mr-2" />
                  Apply Now
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col p-4 bg-blue-50 rounded-lg border border-blue-100">
              <span className="text-sm text-blue-600 font-medium">Salary</span>
              <div className="flex items-center mt-1">
                <DollarSignIcon className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-lg font-semibold">
                  {job.salaire || "Not specified"}
                </span>
              </div>
            </div>

            <div className="flex flex-col p-4 bg-blue-50 rounded-lg border border-blue-100">
              <span className="text-sm text-blue-600 font-medium">
                Job Type
              </span>
              <div className="flex items-center mt-1">
                <ClockIcon className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-lg font-semibold">
                  {job.type_emploi || job.contrat || "Full-time"}
                </span>
              </div>
            </div>

            <div className="flex flex-col p-4 bg-blue-50 rounded-lg border border-blue-100">
              <span className="text-sm text-blue-600 font-medium">
                Experience
              </span>
              <div className="flex items-center mt-1">
                <BriefcaseIcon className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-lg font-semibold">
                  {job.experience || "Not specified"}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Job Description</h2>
            <div className="prose max-w-none">
              <p className="mb-4">
                {job.description ||
                  "We are looking for a talented professional to join our team. The ideal candidate will have experience in this field and be passionate about making a difference."}
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Requirements:</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                {job.niveau_etudes && (
                  <li>
                    <strong>Education:</strong> {job.niveau_etudes}
                  </li>
                )}
                {job.experience && (
                  <li>
                    <strong>Experience:</strong> {job.experience}
                  </li>
                )}
                <li>Proven work experience in this field</li>
                <li>Strong proficiency with required tools and technologies</li>
                <li>A solid understanding of industry best practices</li>
                <li>Excellent communication and teamwork skills</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-3">
                Contract Details:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p>
                    <strong>Type:</strong> {job.contrat}
                  </p>
                  <p>
                    <strong>Remote Work:</strong>{" "}
                    {job.teletravail === "True" ? "Available" : "Not available"}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Sector:</strong> {job.secteur}
                  </p>
                  <p>
                    <strong>Function:</strong> {job.fonction}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={toggleSaveJob}
              className="flex items-center"
            >
              {isSaved ? (
                <BookmarkCheck className="w-5 h-5 text-yellow-500 fill-current mr-2" />
              ) : (
                <Bookmark className="w-5 h-5 text-gray-400 mr-2" />
              )}
              {isSaved ? "Remove from Saved" : "Save for Later"}
            </Button>

            {applied ? (
              <Button disabled className="bg-green-600 hover:bg-green-700">
                Application Submitted
              </Button>
            ) : (
              <Button onClick={handleApply}>
                <SendIcon className="w-4 h-4 mr-2" />
                Apply Now
              </Button>
            )}
          </div>
        </div>
      </div>

      <footer className="bg-slate-800 text-slate-300 py-8">
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

export default JobDetails;
