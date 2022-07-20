import Head from "next/head";
import Product from "../../models/ProductModel";
import db from "../../utils/db";
import ProductsSection from "../../components/ProductsSection";
import Link from "next/link";
import { API_BASE_URL } from "../../config";
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("../../components/Layout"), {
  ssr: false,
});

export default function Cat(props) {
  const { products, paramenterValue, categories } = props;

  console.log(products);

  if (products.length === 0) {
    return (
      <>
        <Layout categories={categories}>
          <div className="py-60">
            <h1 className="text-6xl text-center py-5">
              No Product Found in{" "}
              <span className="bg-red-500 p-1">{paramenterValue}</span>
            </h1>
            <div className="bg-center w-4/12 mx-auto my-10">
              <div className="rounded-md shadow">
                <Link href="/">
                  <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                    {"<-- Back to Store"}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
  return (
    <>
      <Layout categories={categories}>
        <ProductsSection
          products={products}
          heading={"Browse Products by " + paramenterValue}
          tagline="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus cum
          vitae, voluptas a perferendis nesciunt enim ipsa exercitationem id."
        />
      </Layout>
    </>
  );
}
export async function getServerSideProps(context) {
  const { params } = context;
  const { cat } = params;
  const paramenterValue = cat;
  const categoriesRes = await fetch(API_BASE_URL + "/categories");
  const categories = await categoriesRes.json();
  await db.connect();
  const products = await Product.find({ category: cat }).lean();
  // const products = JSON.parse(JSON.stringify(res));
  await db.disconnect();

  return {
    props: {
      products: products.map(db.convertDocToObj),
      paramenterValue,
      categories: categories.map(db.convertDocToObj),
    },
  };
}
