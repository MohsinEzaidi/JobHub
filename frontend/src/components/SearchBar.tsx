import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, MapPin } from "lucide-react";
import { FormEvent, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface SearchBarProps {
  onSearch: (query: string, location: string, remoteOnly: boolean) => void;
  initialQuery?: string;
  initialLocation?: string;
}

const SearchBar = ({
  onSearch,
  initialQuery = "",
  initialLocation = "",
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const [remoteOnly, setRemoteOnly] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query, location, remoteOnly);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Job title, keywords, or company"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 py-6 text-base"
            />
          </div>
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="City, state, or region"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 py-6 text-base"
            />
          </div>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 py-6 px-8"
          >
            Search Jobs
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="remote-only"
            checked={remoteOnly}
            onCheckedChange={(checked) => setRemoteOnly(checked === true)}
          />
          <label
            htmlFor="remote-only"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Show remote positions only
          </label>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
