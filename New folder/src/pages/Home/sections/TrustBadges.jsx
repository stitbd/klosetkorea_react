import React from "react";
import Container from "../../../components/layout/Container/Container";

/**
 * TrustBadges — delivery / security / returns strip below the hero.
 */
const TrustBadges = ({ badges = [] }) => {
  if (!badges.length) return null;

  return (
    <section className="border-y border-gray-100 bg-white" aria-label="Store promises">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          {badges.map((badge) => (
            <div key={badge.id} className="flex items-center gap-4 py-4 px-4 sm:px-6">
              <span className="text-3xl flex-shrink-0" aria-hidden="true">
                {badge.icon}
              </span>
              <div>
                <p className="text-sm font-bold text-gray-800">{badge.title}</p>
                <p className="text-xs text-gray-500">{badge.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TrustBadges;
