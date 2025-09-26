// app/orders/page.tsx
import { getUseOrders } from "@/services/order.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";

export default async function OrderPage() {
  const { data, success, message } = await getUseOrders();

  if (!success || !data) {
    return (
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-red-500" />
          My Orders
        </h1>
        <p className="text-red-500">{message}</p>
      </section>
    );
  }

  const orders = data.orders || data; 

  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <ShoppingBag className="w-6 h-6 text-red-500" />
        My Orders
      </h1>

      {(!orders || orders.length === 0) ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order: any) => (
            <Card
              key={order._id}
              className="rounded-xl shadow-md border border-gray-200"
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Order #{order._id?.slice(-6)}</span>
                  <Badge
                    variant={
                      order.status === "delivered"
                        ? "default"
                        : order.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {order.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  <span className="font-medium">Total:</span>{" "}
                  {order.totalOrderPrice || order.totalPrice} EGP
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <div>
                  <span className="font-medium">Items:</span>
                  <ul className="list-disc list-inside text-gray-600">
                    {order.cartItems?.map((item: any) => (
                      <li key={item._id}>
                        {item.product?.title} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
