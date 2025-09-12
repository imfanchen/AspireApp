import { queryOptions, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getProducts } from "@/api/products";

export const Route = createFileRoute("/products")({
  component: ProductsComponent,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(productsQueryOptions),
});

const productsQueryOptions = queryOptions({
  queryKey: ["products"],
  queryFn: getProducts,
});

function ProductsComponent() {
  const productsQuery = useQuery(productsQueryOptions);
  const products = productsQuery.data ?? [];

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {products.map((product) => (
            <div
              key={product.productId}
              className="bg-muted/50 rounded-xl p-3 flex flex-col"
            >
              <div className="aspect-[4/3] bg-muted/30 rounded-lg mb-2" />
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-muted-foreground">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(product.price)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
