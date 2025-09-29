import MainSlider from "@/components/home/MainSlider";
import CategorySidebar from "@/components/home/CategorySidebar";
import { Cat, Grid } from "lucide-react";
import CategorySections from "@/components/home/CategorySections";
import React, { Suspense } from "react";
import ProductsSection  from "@/components/home/ProductsSection";
import GridSkelaton from "@/components/shared/GridSkelaton";
import Footer from "@/components/layout/Footer";
import NewArrivalSection from "@/components/home/NewArrival"
export default function Home() {
  return (
    <>
      <section className="w-full py-6 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto flex gap-6 items-stretch overflow-hidden" style={{minHeight: '22rem'}}>
          <CategorySidebar />
          <div className="flex-1 flex items-stretch overflow-hidden">
            <MainSlider />
          </div>
        </div>
      </section>
      <Suspense fallback={<GridSkelaton/>}>
      <CategorySections/>
      </Suspense>
      <Suspense fallback={<GridSkelaton/>}>
      <ProductsSection/>
      </Suspense>
      <NewArrivalSection/>
      <Footer/>
    </>
  );
}
