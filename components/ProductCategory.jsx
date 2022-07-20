import Link from "next/link";
import React from "react";

function ProductCategory({ category }) {
  return (
    <div className="w-full mx-auto max-w-xs text-center pt-10">
      <Link href={`/category/${category.slug}`}>
        <img
          className="object-cover w-full h-80 mx-auto rounded-lg hover:opacity-80 cursor-pointer"
          src={category.image}
          alt={category.slug}
        />
      </Link>
      <div className="mt-2">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
          {category.name}
        </h3>
      </div>
    </div>
  );
}

export default ProductCategory;
