import { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from "@/components/ui/toggle-group";
import { FilterIcon } from "lucide-react";

interface JobFilterProps {
  onFilterChange: (filters: JobFilters) => void;
}

export interface JobFilters {
  type: string[];
  salary: string | null;
  experience: string | null;
}

const JobFilter = ({ onFilterChange }: JobFilterProps) => {
  const [jobType, setJobType] = useState<string[]>([]);
  const [salary, setSalary] = useState<string | null>(null);
  const [experience, setExperience] = useState<string | null>(null);
  
  const handleTypeChange = (value: string[]) => {
    setJobType(value);
    onFilterChange({ type: value, salary, experience });
  };
  
  const handleSalaryChange = (value: string) => {
    setSalary(value);
    onFilterChange({ type: jobType, salary: value, experience });
  };
  
  const handleExperienceChange = (value: string) => {
    setExperience(value);
    onFilterChange({ type: jobType, salary, experience: value });
  };
  
  const resetFilters = () => {
    setJobType([]);
    setSalary(null);
    setExperience(null);
    onFilterChange({ type: [], salary: null, experience: null });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-1">
          <FilterIcon className="h-4 w-4" /> Filters
        </h3>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="text-sm">
          Reset
        </Button>
      </div>
      
      <div className="space-y-5">
        <div>
          <label className="text-sm font-medium block mb-2">Job Type</label>
          <ToggleGroup 
            type="multiple" 
            variant="outline"
            className="flex flex-wrap gap-2"
            value={jobType}
            onValueChange={handleTypeChange}
          >
            <ToggleGroupItem value="Full-time" size="sm" className="text-xs">Full-time</ToggleGroupItem>
            <ToggleGroupItem value="Part-time" size="sm" className="text-xs">Part-time</ToggleGroupItem>
            <ToggleGroupItem value="Contract" size="sm" className="text-xs">Contract</ToggleGroupItem>
            <ToggleGroupItem value="Remote" size="sm" className="text-xs">Remote</ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div>
          <label className="text-sm font-medium block mb-2">Salary Range</label>
          <Select value={salary || ""} onValueChange={handleSalaryChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select salary range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-50000">$0 - $50,000</SelectItem>
              <SelectItem value="50000-80000">$50,000 - $80,000</SelectItem>
              <SelectItem value="80000-100000">$80,000 - $100,000</SelectItem>
              <SelectItem value="100000-150000">$100,000 - $150,000</SelectItem>
              <SelectItem value="150000+">$150,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium block mb-2">Experience Level</label>
          <Select value={experience || ""} onValueChange={handleExperienceChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">Entry Level</SelectItem>
              <SelectItem value="junior">Junior (1-3 years)</SelectItem>
              <SelectItem value="mid">Mid-Level (3-5 years)</SelectItem>
              <SelectItem value="senior">Senior (5+ years)</SelectItem>
              <SelectItem value="expert">Expert/Lead</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default JobFilter;
