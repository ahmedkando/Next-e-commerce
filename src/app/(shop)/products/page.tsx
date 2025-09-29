import React from 'react';
import { getProducts } from '@/services/product.service';
import { IProduct } from '@/interfaces/product.interface';
import Productitem from '@/components/products/Productitem';

export default async function ProductsPage({
  params: { categoryId },
}: {
  params: { categoryId: string };
}) {
  const { data: products }: { data: IProduct[] } = await getProducts(8, categoryId);

  return (
    <section className="py-10">
      <div className="container mx-auto py-6 px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-15 mb-15">
          {products &&
            products.map((product) => (
              <Productitem key={product._id} product={product} />
            ))}
        </div>
      </div>
    </section>
  );
}
