import { useState } from "react";

function formatDate(dateStr) {
  if (!dateStr) return "N/A";

  return new Date(
    dateStr
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });
}

function getDomain(url) {
  try {
    return new URL(url).hostname.replace(
      "www.",
      ""
    );
  } catch {
    return url;
  }
}

export default function LeadCard({
  lead,
  onDelete
}) {
  const [expanded, setExpanded] =
    useState(false);

  const {
    _id,
    website,
    input,
    companyOverview,
    coreServices = [],
    targetAudience,
    qualificationReason,
    salesQuestions = [],
    b2bQualification,
    createdAt,
    pagesScraped
  } = lead || {};

  const domain = getDomain(
    website || input || ""
  );

  const isB2B =
    b2bQualification === true;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        isB2B
          ? "border-emerald-500/20 bg-gradient-to-br from-slate-900 to-slate-950"
          : "border-pink-500/20 bg-gradient-to-br from-slate-900 to-slate-950"
      }`}
    >
      {/* TOP BAR */}
      <div
        className={`h-1 w-full ${
          isB2B
            ? "bg-gradient-to-r from-emerald-400 to-transparent"
            : "bg-gradient-to-r from-pink-400 to-transparent"
        }`}
      />

      <div className="p-4">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            {/* ICON */}
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                isB2B
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-pink-500/20 text-pink-400"
              }`}
            >
              {domain
                ?.charAt(0)
                ?.toUpperCase()}
            </div>

            <div className="min-w-0">
              <h2 className="text-white font-semibold truncate">
                {domain}
              </h2>

              <p className="text-xs text-gray-500 truncate">
                {formatDate(createdAt)}
              </p>
            </div>
          </div>

          {/* BADGE */}
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              isB2B
                ? "bg-emerald-500 text-black"
                : "bg-pink-500 text-white"
            }`}
          >
            {isB2B
              ? "B2B"
              : "NON-B2B"}
          </span>
        </div>

        {/* OVERVIEW */}
        <p className="text-sm text-gray-300 leading-relaxed mb-4">
          {expanded
            ? companyOverview
            : `${companyOverview?.slice(
                0,
                120
              )}${
                companyOverview
                  ?.length > 120
                  ? "..."
                  : ""
              }`}
        </p>

        {/* SERVICES */}
        <div className="flex flex-wrap gap-2 mb-4">
          {coreServices
            .slice(
              0,
              expanded ? 8 : 3
            )
            .map(
              (
                service,
                index
              ) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded-lg text-xs ${
                    isB2B
                      ? "bg-emerald-500/10 text-emerald-300"
                      : "bg-pink-500/10 text-pink-300"
                  }`}
                >
                  {service}
                </span>
              )
            )}
        </div>

        {/* EXTRA CONTENT */}
        {expanded && (
          <div className="space-y-4">
            {/* TARGET */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                Target Audience
              </h3>

              <p className="text-sm text-gray-300">
                {targetAudience}
              </p>
            </div>

            {/* REASON */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1">
                Qualification
              </h3>

              <p className="text-sm text-gray-300">
                {
                  qualificationReason
                }
              </p>
            </div>

            {/* QUESTIONS */}
            {salesQuestions.length >
              0 && (
              <div>
                <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Sales Questions
                </h3>

                <div className="space-y-2">
                  {salesQuestions.map(
                    (
                      question,
                      index
                    ) => (
                      <div
                        key={index}
                        className="flex gap-2"
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                            isB2B
                              ? "bg-emerald-500 text-black"
                              : "bg-pink-500 text-white"
                          }`}
                        >
                          {index + 1}
                        </div>

                        <p className="text-sm text-gray-300 leading-relaxed">
                          {question}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* FOOTER */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
          <div className="text-xs text-gray-500">
            {pagesScraped || 0} pages
          </div>

          <div className="flex items-center gap-2">
            {/* MORE */}
            <button
              onClick={() =>
                setExpanded(
                  !expanded
                )
              }
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                isB2B
                  ? "bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25"
                  : "bg-pink-500/15 text-pink-300 hover:bg-pink-500/25"
              }`}
            >
              {expanded
                ? "Less"
                : "More"}
            </button>

            {/* DELETE */}
            <button
              onClick={() =>
                onDelete(_id)
              }
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/15 text-red-300 hover:bg-red-500/25 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}