import { Industry, Region } from "@/data/leads";

type FilterBarProps = {
  industries: Industry[];
  regions: Region[];
  selectedIndustry: Industry | "All";
  selectedRegion: Region | "All";
  searchTerm: string;
  highlightHighValue: boolean;
  onIndustryChange: (value: Industry | "All") => void;
  onRegionChange: (value: Region | "All") => void;
  onSearchChange: (value: string) => void;
  onToggleHighValue: () => void;
  onReset: () => void;
};

export function FilterBar({
  industries,
  regions,
  selectedIndustry,
  selectedRegion,
  searchTerm,
  highlightHighValue,
  onIndustryChange,
  onRegionChange,
  onSearchChange,
  onToggleHighValue,
  onReset
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-zinc-900/70 p-6 text-white shadow-lg backdrop-blur-lg dark:border-white/15">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-red-300">
          Signal Filters
        </span>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
        >
          Reset
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
        <div className="flex flex-col gap-3">
          <label className="text-xs uppercase tracking-[0.2em] text-zinc-300">
            Search Brands
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by brand, signals, opportunity..."
            className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-zinc-400 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/40"
          />
        </div>
        <button
          type="button"
          onClick={onToggleHighValue}
          className={`rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition ${
            highlightHighValue
              ? "bg-red-500 text-white shadow-lg shadow-red-500/40"
              : "border border-white/15 bg-white/10 text-white hover:border-red-400 hover:bg-red-400/20"
          }`}
        >
          {highlightHighValue ? "Showing 8.5+ Fits" : "Highlight Top Fits"}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <label className="text-xs uppercase tracking-[0.2em] text-zinc-300">
            Industry
          </label>
          <div className="flex flex-wrap gap-2">
            <FilterPill
              label="All"
              active={selectedIndustry === "All"}
              onClick={() => onIndustryChange("All")}
            />
            {industries.map((industry) => (
              <FilterPill
                key={industry}
                label={industry}
                active={selectedIndustry === industry}
                onClick={() => onIndustryChange(industry)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-xs uppercase tracking-[0.2em] text-zinc-300">
            Region
          </label>
          <div className="flex flex-wrap gap-2">
            <FilterPill
              label="All"
              active={selectedRegion === "All"}
              onClick={() => onRegionChange("All")}
            />
            {regions.map((region) => (
              <FilterPill
                key={region}
                label={region}
                active={selectedRegion === region}
                onClick={() => onRegionChange(region)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
        active
          ? "bg-white text-zinc-900 shadow-lg"
          : "border border-white/20 bg-white/10 text-white hover:border-red-300 hover:bg-red-300/20"
      }`}
    >
      {label}
    </button>
  );
}
