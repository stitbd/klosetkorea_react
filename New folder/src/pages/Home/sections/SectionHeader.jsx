import React from "react";
import { Link } from "react-router-dom";

/**
 * SectionHeader — title + "See All" button used by every product section.
 *
 * @param {{ title: string, slug: string, seeAllText?: string }} props
 */
const SectionHeader = ({ title, slug, seeAllText = "See All" }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="section-title">{title}</h2>
    <Link
      to={`/collections/${slug}`}
      className="text-[11px] font-bold text-white bg-red-600 hover:bg-red-700
                 px-3 py-1.5 rounded transition-colors whitespace-nowrap"
    >
      {seeAllText}
    </Link>
  </div>
);

export default SectionHeader;
