"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Package, Loader2 } from "lucide-react";
import { AsyncGenericList } from "@/components/AsyncGenericList";
import { ProductSkeleton } from "@/components/ProductSkeleton";
import { useGetProductsWithPaginationQuery } from "@/generated/graphql";

// Type for products from the pagination query
type ProductFromQuery = {
  __typename?: "ProductWithBrand";
  id: number;
  name: string;
  brandId: number;
  createdAt: string;
  type: any;
  updatedAt: string;
  brand: {
    __typename?: "Brand";
    name: string;
  };
};

const take = 5;

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState<{
    rows: ProductFromQuery[];
    total: number;
  }>({ rows: [], total: 0 });

  const { loading, error, data, refetch, fetchMore } =
    useGetProductsWithPaginationQuery({
      skip: true,
      fetchPolicy: "network-only",
      variables: {
        query: {
          skip: 0,
          take,
          search: searchTerm || undefined,
        },
      },
    });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const loadMore = async (
    skip: number,
    take: number
  ): Promise<{ rows: ProductFromQuery[]; total: number }> => {
    try {
      const result = await fetchMore({
        variables: {
          query: {
            skip: skip,
            take: take,
            search: searchTerm || undefined,
          },
        },
      });

      if (result.data?.productsWithPagination?.rows) {
        const newProducts =
          result.data.productsWithPagination.rows.filter(Boolean);
        setAllProducts((prev) => ({
          rows: [...prev.rows, ...newProducts],
          total: result.data?.productsWithPagination?.total || prev.total,
        }));
      }

      return {
        rows: result.data?.productsWithPagination?.rows || [],
        total: result.data?.productsWithPagination?.total || 0,
      };
    } catch (error) {
      console.error("Error loading more products:", error);
      return {
        rows: [],
        total: 0,
      };
    }
  };

  useEffect(() => {
    if (data?.productsWithPagination) {
      setAllProducts(data.productsWithPagination);
    }
  }, [data]);

  const renderProduct = (product: ProductFromQuery) => (
    <Card key={product.id} className="overflow-hidden">
      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
        <Package className="h-16 w-16 text-gray-400" />
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Brand: {product.brand.name} | ID: {product.id}
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-semibold text-foreground">Product</span>
          <span className="text-sm text-muted-foreground">Available</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            Edit
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (error) {
    return (
      <div className="min-h-screen bg-muted/50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Products
          </h2>
          <p className="text-muted-foreground mb-4">{error.message}</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-muted/50">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Products</h1>
            <p className="text-muted-foreground mt-2">
              Manage your product catalog and inventory ({allProducts.total}{" "}
              products)
            </p>
          </div>

          {/* Actions Bar */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-2 text-muted-foreground">
                Loading products...
              </span>
            </div>
          )}

          {!loading && (
            <AsyncGenericList<ProductFromQuery>
              items={allProducts}
              loadMore={loadMore}
              renderItem={renderProduct}
              skeletonComponent={<ProductSkeleton />}
              take={take}
              gridCols={{
                xs: 1,
                sm: 2,
                md: 3,
                lg: 4,
                xl: 4,
              }}
              spacing={6}
            />
          )}

          {!loading && allProducts.rows.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No products found
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm
                  ? `No products match "${searchTerm}"`
                  : "Get started by adding your first product"}
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
