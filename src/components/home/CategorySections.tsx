import { get } from 'http';
import React from 'react';
import { getCategories } from '@/services/categories.service';
import { ICategory } from '@/interfaces/category.interface';
import CategorySlider from './CategorySlider';
import SectionTitle from '../shared/SectionTitle';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';

export default async function CategorySections() {
    const {data:categories}:{data:ICategory[]} = await getCategories();
    console.log(categories);

    return (
        <section className='py-10'>
            <div className="container mx-auto py-6 px-4 md:px-8 lg:px-16">  
                <div className="flex items-center justify-between mb-6">
                    <SectionTitle title={"Categories"} subtitle={"Shop by Category"} />
                    {/* Arrows */}
                    <div className="flex items-center gap-2">
                        <Button className="swiper-button-prev w-8 h-8 flex items-center justify-center rounded-full border hover:bg-gray-100">
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <Button className="swiper-button-next w-8 h-8 flex items-center justify-center rounded-full border hover:bg-gray-100">
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
                <CategorySlider categories={categories}/>
                <Separator />
            </div>
        </section>
    );
}