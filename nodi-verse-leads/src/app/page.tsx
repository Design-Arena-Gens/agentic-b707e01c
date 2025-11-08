"use client";

import { useMemo, useState } from "react";

import { FilterBar } from "@/components/FilterBar";
import { LeadCard } from "@/components/LeadCard";
import { Industry, Region, leads } from "@/data/leads";

type ScoreSnapshot = {
  lead: (typeof leads)[number];
  score: number;
};

const industries = Array.from(
  new Set(leads.map((lead) => lead.industry))
) as Industry[];

const regions = Array.from(
  new Set(leads.map((lead) => lead.location))
) as Region[];

const computeScore = (lead: (typeof leads)[number]) =>
  (lead.metrics.design +
    lead.metrics.storytelling +
    lead.metrics.innovation +
    lead.metrics.responsiveness) /
  4;

export default function Home() {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | "All">(
    "All"
  );
  const [selectedRegion, setSelectedRegion] = useState<Region | "All">("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightHighValue, setHighlightHighValue] = useState(false);

  const filteredLeads = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return leads
      .filter((lead) => {
        if (selectedIndustry !== "All" && lead.industry !== selectedIndustry) {
          return false;
        }
        if (selectedRegion !== "All" && lead.location !== selectedRegion) {
          return false;
        }
        if (!term) {
          return true;
        }
        const haystack = [
          lead.name,
          lead.description,
          lead.opportunity,
          lead.collaborationHook,
          lead.whyItMatters,
          lead.signals.join(" "),
          lead.contentIdeas.join(" "),
          lead.notes
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(term);
      })
      .map<ScoreSnapshot>((lead) => ({
        lead,
        score: computeScore(lead)
      }))
      .filter(({ score }) => (highlightHighValue ? score >= 8.5 : true))
      .sort((a, b) => b.score - a.score);
  }, [highlightHighValue, searchTerm, selectedIndustry, selectedRegion]);

  const topOpportunities = filteredLeads.slice(0, 4);

  const regionBreakdown = useMemo(() => {
    return regions.map((region) => {
      const regionLeads = leads.filter((lead) => lead.location === region);
      const avgScore =
        regionLeads.reduce((sum, lead) => sum + computeScore(lead), 0) /
        regionLeads.length;
      return {
        region,
        count: regionLeads.length,
        avgScore: Math.round(avgScore * 10) / 10
      };
    });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-red-950 text-white">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-24 pt-16 sm:px-10 lg:px-16">
        <header className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.5em] text-red-300">
                Nodi Verse Lead Research Lab
              </span>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Premium Collaborations Pipeline
              </h1>
              <p className="mt-5 text-lg text-zinc-300">
                Curated pipeline of visually-driven brands aligned with Nodi
                Verse&apos;s hybrid AI + human animation craft. Review strategic
                signals, campaign opportunities, and social activity to prioritise
                high-fit outreach across India, UAE, UK, and USA.
              </p>
            </div>
            <div className="flex w-full max-w-xs flex-col gap-4 rounded-3xl bg-zinc-950/60 p-5 text-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.36em] text-zinc-500">
                  Snapshot
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {leads.length} Active Leads
                </p>
                <p className="text-zinc-400">
                  Weighted for design excellence, innovation, and
                  responsiveness.
                </p>
              </div>
              <div className="grid gap-2">
                {regionBreakdown.map((item) => (
                  <div
                    key={item.region}
                    className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3"
                  >
                    <span className="text-sm font-medium text-zinc-200">
                      {item.region}
                    </span>
                    <span className="text-xs text-zinc-400">
                      {item.count} leads • {item.avgScore}/10
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        <FilterBar
          industries={industries}
          regions={regions}
          selectedIndustry={selectedIndustry}
          selectedRegion={selectedRegion}
          searchTerm={searchTerm}
          highlightHighValue={highlightHighValue}
          onIndustryChange={setSelectedIndustry}
          onRegionChange={setSelectedRegion}
          onSearchChange={setSearchTerm}
          onToggleHighValue={() => setHighlightHighValue((prev) => !prev)}
          onReset={() => {
            setSelectedIndustry("All");
            setSelectedRegion("All");
            setSearchTerm("");
            setHighlightHighValue(false);
          }}
        />

        <section className="grid gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">
                Priority Activation Matrix
              </h2>
              <p className="text-sm text-zinc-400">
                Top four leads ranked by strategic fit after filters.
              </p>
            </div>
            <div className="text-sm text-zinc-400">
              Sort order • Composite fit score ≥ 7.0
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="min-w-full divide-y divide-white/10 text-left text-sm">
              <thead className="bg-white/5 uppercase tracking-[0.18em] text-zinc-400">
                <tr>
                  <th className="px-4 py-3">Brand</th>
                  <th className="px-4 py-3">Region</th>
                  <th className="px-4 py-3">Industry</th>
                  <th className="px-4 py-3">Strategic Hook</th>
                  <th className="px-4 py-3 text-right">Fit Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {topOpportunities.map(({ lead, score }) => (
                  <tr
                    key={lead.id}
                    className="bg-white/[0.02] transition hover:bg-red-500/10"
                  >
                    <td className="px-4 py-4 font-medium text-white">
                      {lead.name}
                    </td>
                    <td className="px-4 py-4 text-zinc-300">{lead.location}</td>
                    <td className="px-4 py-4 text-zinc-300">{lead.industry}</td>
                    <td className="px-4 py-4 text-zinc-400">
                      {lead.collaborationHook}
                    </td>
                    <td className="px-4 py-4 text-right font-semibold text-red-300">
                      {Math.round(score * 10) / 10}
                    </td>
                  </tr>
                ))}
                {topOpportunities.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-6 text-center text-sm text-zinc-400"
                    >
                      No leads match the current filters. Reset filters or adjust
                      parameters.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl backdrop-blur">
            <h2 className="text-2xl font-semibold">Outreach Recommendations</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Tailored sequencing suggestions grounded in social cadence and
              product roadmaps.
            </p>
            <div className="mt-6 grid gap-4 text-sm">
              <RecommendationBullet
                title="Week 1 · Deep fashion immersion"
                detail="Prioritise Perona, Nappa Dori, and The Giving Movement with a case-led deck showcasing AI-driven campaign worlds."
              />
              <RecommendationBullet
                title="Week 2 · Experiential F&B wave"
                detail="Target Subko, Mirzam, and Ghia with an immersive origin-to-experience storytelling bundle (hero film + projection pack)."
              />
              <RecommendationBullet
                title="Week 3 · Beauty & wellness sprint"
                detail="Engage Topicals and Haeckels via cinematic science capsules and interactive landing experiences."
              />
              <RecommendationBullet
                title="Parallel · Retainer candidates"
                detail="Kin Euphorics and Form Nutrition show recurring launch cadence—propose ongoing motion lab partnership."
              />
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-red-500/20 p-6 shadow-xl backdrop-blur">
            <h3 className="text-lg font-semibold text-white">
              Key Insight Signals
            </h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-white" />
                <span>
                  Sustainability and craftsmanship narratives dominate; lead with
                  AI-assisted storytelling that amplifies human craft.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-white" />
                <span>
                  Reels cadence is high but cinematic depth is low—offer
                  modular campaign assets that extend beyond quick edits.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-white" />
                <span>
                  Cross-market expansion (KSA, US retailers) signals budgets for
                  flagship launch films and interactive microsites.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-white" />
                <span>
                  Brands crave immersive event visuals—position Nodi Verse as the
                  partner for projection, AR, and in-store loops.
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6">
          <h2 className="text-2xl font-semibold">Lead Intelligence Deck</h2>
          <div className="grid gap-6">
            {filteredLeads.map(({ lead }) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
            {filteredLeads.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-white/20 p-16 text-center text-sm text-zinc-400">
                No leads available. Try resetting filters or expanding search
                criteria.
              </div>
            ) : null}
          </div>
        </section>
      </section>
    </main>
  );
}

function RecommendationBullet({
  title,
  detail
}: {
  title: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition hover:border-red-400/60">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-300">
        {title}
      </p>
      <p className="mt-2 text-sm text-zinc-200">{detail}</p>
    </div>
  );
}
