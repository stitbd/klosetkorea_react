import React from "react";

const TrustBadges = ({ badges = [] }) => {
  if (!badges.length) return null;

  return (
    <section className="border-b border-gray-100 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          {badges.map((badge) => (
            <div key={badge.id} className="flex items-center gap-4 py-4 px-4 sm:px-6">
              <span className="text-3xl flex-shrink-0">{badge.icon}</span>
              <div>
                <p className="text-sm font-bold text-gray-800">{badge.title}</p>
                <p className="text-xs text-gray-500">{badge.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
