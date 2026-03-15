import React from 'react';
import { Link } from 'react-router-dom';
import './SectionHeader.scss';

/**
 * Reusable section header used across all product sections.
 * Matches the Fimon design: bold left title + red "See All" badge on right.
 */
const SectionHeader = ({ title, viewAllLink = '#', viewAllText = 'See All' }) => (
  <div className="section-header d-flex align-items-center justify-content-between mb-3">
    <h2 className="section-header__title">{title}</h2>
    {viewAllLink && (
      <Link to={viewAllLink} className="section-header__badge">
        {viewAllText}
      </Link>
    )}
  </div>
);

export default SectionHeader;
