import React from "react";

const SectionHeader = ({ title, seeAllLink = "#", seeAllText = "See All" }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="section-title">{title}</h2>
    <a
      href={seeAllLink}
      className="text-xs font-semibold text-white bg-red-600 px-3 py-1.5 rounded hover:bg-red-700 transition-colors"
    >
      {seeAllText}
    </a>
  </div>
);

export default SectionHeader;
