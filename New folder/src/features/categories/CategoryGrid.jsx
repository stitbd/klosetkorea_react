import React from "react";
import CategoryCard from "./CategoryCard";

const COL_MAP = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

const CategoryGrid = ({
  categories = [],
  cols = { mobile: 2, sm: 4, md: 4, lg: 4 },
}) => {
  if (!categories.length) {
    return (
      <p className="text-sm text-gray-400 py-6 text-center">
        No categories found.
      </p>
    );
  }

  const gridCls = [
    "grid gap-3 sm:gap-4",
    COL_MAP[cols.mobile] ?? "grid-cols-2",
    cols.sm  ? `sm:${COL_MAP[cols.sm]}`  : "",
    cols.md  ? `md:${COL_MAP[cols.md]}`  : "",
    cols.lg  ? `lg:${COL_MAP[cols.lg]}`  : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={gridCls}>
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryGrid;