import React from "react";
import { SectionSkeleton } from "../../../components/ui/Loader/Loader";
import CategoryList from "../../../components/data/CategoryList";
import CategoryGrid from "../../../features/categories/CategoryGrid";
import SectionHeader from "./SectionHeader";

const FeaturedCategories = ({ loading = false }) => {
  if (loading) return <SectionSkeleton count={8} />;

  return (
    <section className="py-5 lg:py-8" aria-labelledby="featured-categories-heading">
      <SectionHeader title="Featured Categories" slug="categories" />

      <CategoryGrid
        categories={CategoryList}
        cols={{ mobile: 2, sm: 4, md: 4, lg: 4 }}
      />
    </section>
  );
};

export default FeaturedCategories;
