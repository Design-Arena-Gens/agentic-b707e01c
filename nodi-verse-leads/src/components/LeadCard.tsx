import { Lead } from "@/data/leads";

const formatScore = (value: number) => Math.round(value * 10) / 10;

export function LeadCard({ lead }: { lead: Lead }) {
  const averageScore =
    (lead.metrics.design +
      lead.metrics.storytelling +
      lead.metrics.innovation +
      lead.metrics.responsiveness) /
    4;

  return (
    <article className="group flex flex-col gap-5 rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl dark:border-white/10 dark:bg-zinc-900/80 dark:hover:border-white/20">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
              {lead.name}
            </h3>
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.08em] text-red-600 dark:bg-red-500/20 dark:text-red-200">
              {lead.industry}
            </span>
            <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium uppercase tracking-[0.1em] text-white dark:bg-white dark:text-zinc-900">
              {lead.location}
            </span>
          </div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            {lead.description}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <div className="rounded-2xl bg-zinc-900 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white dark:bg-white dark:text-zinc-900">
            Fit Score {formatScore(averageScore)}/10
          </div>
          <a
            href={lead.website}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-red-600 transition hover:text-red-700 dark:text-red-300 dark:hover:text-red-200"
          >
            Website ↗
          </a>
          {lead.instagram ? (
            <a
              href={lead.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-zinc-500 transition hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-white"
            >
              Instagram ↗
            </a>
          ) : null}
        </div>
      </header>

      <section className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl bg-zinc-50 p-4 text-sm dark:bg-zinc-800/80">
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            Audience Pulse
          </h4>
          <p className="mt-2 text-zinc-700 dark:text-zinc-200">{lead.audience}</p>
        </div>
        <div className="rounded-2xl bg-zinc-50 p-4 text-sm dark:bg-zinc-800/80">
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            Activity & Signals
          </h4>
          <p className="mt-2 text-zinc-700 dark:text-zinc-200">
            {lead.activity}
          </p>
          <ul className="mt-2 space-y-1 text-zinc-600 dark:text-zinc-300">
            {lead.signals.map((signal) => (
              <li key={signal} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500" />
                <span>{signal}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-red-900/80 p-5 text-sm text-white dark:from-zinc-800 dark:via-zinc-800 dark:to-red-900/60">
        <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-red-200">
          Strategic Angle
        </h4>
        <p className="mt-2 text-base font-medium">{lead.collaborationHook}</p>
        <p className="mt-2 text-zinc-200">{lead.opportunity}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {lead.contentIdeas.map((idea) => (
            <li
              key={idea}
              className="rounded-full border border-white/20 px-3 py-1 text-xs text-zinc-100"
            >
              {idea}
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl bg-red-50/70 p-4 text-sm dark:bg-red-500/10">
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600 dark:text-red-300">
            Why It Matters Now
          </h4>
          <p className="mt-2 text-zinc-700 dark:text-zinc-200">{lead.whyItMatters}</p>
        </div>
        <div className="rounded-2xl bg-zinc-50 p-4 text-sm dark:bg-zinc-800/80">
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            Lead Notes
          </h4>
          <p className="mt-2 text-zinc-700 dark:text-zinc-200">{lead.notes}</p>
        </div>
      </section>

      <footer className="mt-2 grid gap-3 text-xs uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400 sm:grid-cols-4">
        {Object.entries(lead.metrics).map(([key, value]) => (
          <div key={key} className="flex flex-col gap-1">
            <span className="font-semibold text-zinc-600 dark:text-zinc-300">
              {key}
            </span>
            <div className="h-1.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-700">
              <div
                className="h-1.5 rounded-full bg-gradient-to-r from-red-500 to-red-700 dark:from-red-400 dark:to-red-500"
                style={{ width: `${(value / 10) * 100}%` }}
              />
            </div>
            <span className="text-zinc-500 dark:text-zinc-400">
              {formatScore(value)}/10
            </span>
          </div>
        ))}
      </footer>
    </article>
  );
}
