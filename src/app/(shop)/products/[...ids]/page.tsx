import { IProduct } from '@/interfaces/product.interface';
import { getProductDetails, getProducts } from '@/services/product.service';
import Footer from '@/components/layout/Footer';
import ProductDetailsClient from "./ProductDetailsClients"; 

export default async function Page({
  params: { ids },
}: {
  params: { ids: string[] };
}) {
  const [productId, categoryId] = ids;

  const product: IProduct = await getProductDetails(productId);
  const {data:products }:{data: IProduct[]} =await getProducts(8, categoryId);

  return (
    <>
      <ProductDetailsClient product={product} products={products} />
      <Footer />
    </>
  );
}
