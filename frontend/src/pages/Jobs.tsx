import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import JobCard from "@/components/JobCard";
import { BriefcaseIcon } from "lucide-react";
import { useNotification } from "@/contexts/NotificationContext";
import JobFilter, { JobFilters } from "@/components/JobFilter";
import Footer from "@/components/Footer";
import { useLocation } from "react-router-dom";

const Jobs = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [searchLocation, setSearchLocation] = useState(
    searchParams.get("loc") || ""
  );
  const [jobs, setJobs] = useState<any[]>([]);
  const { addNotification } = useNotification();
const [filters, setFilters] = useState<JobFilters>({
  contrat: [],
  experience: null,
  teletravail: null,
});
  const [loading, setLoading] = useState(true);

const fetchJobs = async () => {
  setLoading(true);
  try {
    const params = new URLSearchParams();
    
    // Add search query if it exists
    if (searchQuery && searchQuery.trim() !== '') {
      params.append('titre', searchQuery.trim());
    }
    
    // Add location filter if it exists
    if (searchLocation && searchLocation.trim() !== '') {
      params.append('localisation', searchLocation.trim());
    }
    
    // Add contract type filters if they exist
    if (filters.contrat && filters.contrat.length > 0) {
      filters.contrat.forEach(type => {
        if (type) params.append('contrat', type);
      });
    }
    
    // Add experience filter if it exists
    if (filters.experience) {
      params.append('experience', filters.experience);
    }
    
    // Add remote work filter if it's set
    if (filters.teletravail !== null && filters.teletravail !== undefined) {
      params.append('teletravail', filters.teletravail.toString());
    }

    const url = `https://mohsin123.pythonanywhere.com/api/jobs/?${params.toString()}`;
    console.log('Fetching jobs from:', url); // Debugging
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setJobs(Array.isArray(data) ? data : data.results || []);
  } catch (error) {
    console.error("Error loading jobs:", error);
    addNotification(
      "error",
      "API Error",
      "Failed to load jobs. Please try again later."
    );
    setJobs([]); // Set empty array on error
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchJobs();
  }, [searchQuery, searchLocation, filters]);
  useEffect(() => {
  const timer = setTimeout(() => {
    fetchJobs();
  }, 500); // 500ms delay
  
  return () => clearTimeout(timer);
}, [searchQuery, searchLocation, filters]);

  const handleSearch = (query: string, location: string) => {
    setSearchQuery(query);
    setSearchLocation(location);
    addNotification(
      "info",
      "Search started",
      `Searching for ${query} jobs in ${location || "all locations"}`
    );
  };

  const handleFilterChange = (newFilters: JobFilters) => {
    setFilters(newFilters);
  };

  // Simple search function using only the essential fields
  const filteredJobs = jobs.filter((job) => {
    // Search by job title and company name
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !job.titre?.toLowerCase().includes(query) &&
        !job.entreprise?.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // Search by location
    if (
      searchLocation &&
      !job.localisation?.toLowerCase().includes(searchLocation.toLowerCase())
    ) {
      return false;
    }

    return true;
  });
  console.log(jobs);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="bg-blue-600 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Find Your Next Career Opportunity
          </h1>
          <SearchBar
            onSearch={handleSearch}
            initialQuery={searchQuery}
            initialLocation={searchLocation}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <JobFilter onFilterChange={handleFilterChange} />
          </div>
          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Browse All Jobs</h2>
              <span className="text-sm text-gray-500">
                {filteredJobs.length} jobs found
              </span>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="p-6 bg-white rounded-lg shadow-sm animate-pulse"
                  >
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                  </div>
                ))}
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={{
                      ...job,
                      // Map backend properties to frontend names
                      title: job.titre,
                      company: job.entreprise,
                      location: job.localisation,
                      salary: job.salaire || "Salary not specified",
                      type: job.type_emploi || job.contrat || "Full-time",
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
                <BriefcaseIcon className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-900">
                  No jobs found
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Jobs;
