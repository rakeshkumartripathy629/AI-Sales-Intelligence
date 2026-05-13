import {
  useEffect,
  useState,
  useCallback
} from "react";

import LeadCard from "./LeadCard";

import { CardSkeleton } from "./Loader";

import { leadService } from "../servises/Lead.servises";

export default function LeadList({
  newLeads = [],
  refreshTrigger
}) {
  const [savedLeads, setSavedLeads] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [filter, setFilter] =
    useState("all");

  // FETCH LEADS
  const fetchLeads = useCallback(
    async () => {
      setLoading(true);

      setError(null);

      try {
        const data =
          await leadService.fetchAll();

        setSavedLeads(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (err) {
        console.error(err);

        setError(
          err.message ||
            "Failed to fetch leads"
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads, refreshTrigger]);

  /*
    FRONTEND ONLY DELETE
  */

  const handleDelete = (id) => {
    setSavedLeads((prev) =>
      prev.filter(
        (lead) => lead._id !== id
      )
    );
  };

  /*
    NEW LEADS ON TOP
  */

  const allLeads = [
    ...newLeads,

    ...savedLeads.filter(
      (savedLead) =>
        !newLeads.some(
          (newLead) =>
            newLead._id ===
            savedLead._id
        )
    )
  ];

  /*
    SEARCH + FILTER
  */

  const filteredLeads =
    allLeads.filter((lead) => {
      const text = (
        lead.website ||
        lead.input ||
        ""
      ).toLowerCase();

      const matchesSearch =
        text.includes(
          searchTerm.toLowerCase()
        );

      const matchesFilter =
        filter === "all" ||
        (filter === "b2b" &&
          lead.b2bQualification) ||
        (filter ===
          "non-b2b" &&
          !lead.b2bQualification);

      return (
        matchesSearch &&
        matchesFilter
      );
    });

  const b2bCount = allLeads.filter(
    (lead) => lead.b2bQualification
  ).length;

  const nonB2bCount =
    allLeads.filter(
      (lead) =>
        !lead.b2bQualification
    ).length;

  return (
    <section className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Lead Results
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            {allLeads.length} total
            • {b2bCount} B2B
            • {nonB2bCount} Non-B2B
          </p>
        </div>

        <button
          onClick={fetchLeads}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 transition px-4 py-2 rounded-lg text-black font-semibold"
        >
          {loading
            ? "Refreshing..."
            : "Refresh"}
        </button>
      </div>

      {/* SEARCH + FILTERS */}
      {allLeads.length > 0 && (
        <div className="flex flex-col md:flex-row gap-4">
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
          />

          {/* FILTERS */}
          <div className="flex gap-2">
            <button
              onClick={() =>
                setFilter("all")
              }
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                filter === "all"
                  ? "bg-green-500 text-black"
                  : "bg-slate-800 text-gray-300"
              }`}
            >
              All
            </button>

            <button
              onClick={() =>
                setFilter("b2b")
              }
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                filter === "b2b"
                  ? "bg-emerald-500 text-black"
                  : "bg-slate-800 text-gray-300"
              }`}
            >
              B2B
            </button>

            <button
              onClick={() =>
                setFilter(
                  "non-b2b"
                )
              }
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                filter ===
                "non-b2b"
                  ? "bg-pink-500 text-white"
                  : "bg-slate-800 text-gray-300"
              }`}
            >
              Non-B2B
            </button>
          </div>
        </div>
      )}

      {/* LOADING */}
      {loading &&
        allLeads.length ===
          0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3].map(
              (item) => (
                <CardSkeleton
                  key={item}
                />
              )
            )}
          </div>
        )}

      {/* ERROR */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
          <p className="text-red-400 font-medium">
            {error}
          </p>
        </div>
      )}

      {/* EMPTY */}
      {!loading &&
        !error &&
        allLeads.length ===
          0 && (
          <div className="border border-dashed border-slate-700 rounded-3xl py-16 text-center">
            <h3 className="text-xl font-semibold text-gray-300">
              No leads analyzed yet
            </h3>

            <p className="text-gray-500 mt-2">
              Analyze your first
              lead above.
            </p>
          </div>
        )}

      {/* NO FILTER RESULTS */}
      {!loading &&
        filteredLeads.length ===
          0 &&
        allLeads.length >
          0 && (
          <div className="text-center py-10">
            <p className="text-gray-400">
              No leads match your
              filters.
            </p>
          </div>
        )}

      {/* LEAD CARDS */}
      {filteredLeads.length >
        0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredLeads.map(
            (lead, index) => (
              <LeadCard
                key={
                  lead._id ||
                  `${lead.website}-${index}`
                }
                lead={lead}
                index={index}
                onDelete={
                  handleDelete
                }
              />
            )
          )}
        </div>
      )}
    </section>
  );
}