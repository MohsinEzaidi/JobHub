import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FilterIcon } from "lucide-react";

interface JobFilterProps {
  onFilterChange: (filters: JobFilters) => void;
}

export interface JobFilters {
  contrat: string[]; // Changed from 'type'
  experience: string | null;
  teletravail: boolean | null;
}

const JobFilter = ({ onFilterChange }: JobFilterProps) => {
  const [contrat, setContrat] = useState<string[]>([]);
  const [experience, setExperience] = useState<string | null>(null);
  const [teletravail, setTeletravail] = useState<boolean | null>(null);

  const handleContratChange = (value: string[]) => {
    setContrat(value);
    onFilterChange({ contrat: value, experience, teletravail });
  };

  const handleExperienceChange = (value: string) => {
    const newValue = value === "any" ? null : value;
    setExperience(newValue);
    onFilterChange({ contrat, experience: newValue, teletravail });
  };

  const handleTeletravailChange = (value: boolean | null) => {
    setTeletravail(value);
    onFilterChange({ contrat, experience, teletravail: value });
  };

  const resetFilters = () => {
    setContrat([]);
    setExperience(null);
    setTeletravail(null);
    onFilterChange({ contrat: [], experience: null, teletravail: null });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-1">
          <FilterIcon className="h-4 w-4" /> Filters
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="text-sm"
        >
          Reset
        </Button>
      </div>

      <div className="space-y-5">
        <div>
          <label className="text-sm font-medium block mb-2">
            Contract Type
          </label>
          <ToggleGroup
            type="multiple"
            variant="outline"
            className="flex flex-wrap gap-2"
            value={contrat}
            onValueChange={handleContratChange}
          >
            <ToggleGroupItem value="CDI" size="sm" className="text-xs">
              Permanent
            </ToggleGroupItem>
            <ToggleGroupItem value="CDD" size="sm" className="text-xs">
              Fixed-term
            </ToggleGroupItem>
            <ToggleGroupItem value="Stage" size="sm" className="text-xs">
              Internship
            </ToggleGroupItem>
            <ToggleGroupItem value="Freelance" size="sm" className="text-xs">
              Freelance
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div>
          <label className="text-sm font-medium block mb-2">
            Experience Level
          </label>
          <Select
            value={experience || ""}
            onValueChange={(value) => {
              const val = value === "" ? null : value;
              handleExperienceChange(val);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Moins de 1 an">Entry Level</SelectItem>
              <SelectItem value="1 à 3 ans">Junior (1-3 years)</SelectItem>
              <SelectItem value="3 à 5 ans">Mid-Level (3-5 years)</SelectItem>
              <SelectItem value="5 à 10 ans">Senior (5-10 years)</SelectItem>
              <SelectItem value="Plus de 10 ans">Expert (10+ years)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium block mb-2">Remote Work</label>
          <Select
            value={
              teletravail === null ? "any" : teletravail ? "true" : "false"
            }
            onValueChange={(value) => {
              const val =
                value === "true" ? true : value === "false" ? false : null;
              handleTeletravailChange(val);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select remote option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Remote Only</SelectItem>
              <SelectItem value="false">On-site Only</SelectItem>
              <SelectItem value="any">Any</SelectItem>{" "}
              {/* Changed from "" to "any" */}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default JobFilter;
