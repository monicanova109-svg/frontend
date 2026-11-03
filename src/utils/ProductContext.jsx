import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "./apiClient";

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const queryClient = useQueryClient();

  // GET ALL PRODUCTS (tanpa filter)
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await apiClient.get("/products");
      const d = res.data;
      if (Array.isArray(d)) return d;
      if (Array.isArray(d.data)) return d.data;
      return [];
    },
  });

  // GET PRODUCTS + PAGINATION + FILTER
  const getProducts = async ({ page = 1, limit = 10, category_id = "", keyword = "" } = {}) => {
    const res = await apiClient.get("/products", {
      params: { page, limit, category_id, keyword },
    });
    // bentuk: { data: [...], current_page, last_page, total, ... }
    return res.data;
  };

  // SHOW PRODUCT DETAIL
  const getProductById = async (id) => {
    const res = await apiClient.get(`/products/${id}`);
    return res.data.data ?? res.data;
  };

  // STORE PRODUCT
  const addProduct = async (formData) => {
    const response = await apiClient.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    queryClient.invalidateQueries({ queryKey: ["products"] });
    return response;
  };

  // UPDATE PRODUCT
  const updateProduct = async (id, formData) => {
    const response = await apiClient.post(`/products/${id}?_method=PUT`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    queryClient.invalidateQueries({ queryKey: ["products"] });
    return response;
  };

  // DELETE PRODUCT
  const deleteProduct = useMutation({
    mutationFn: (id) => apiClient.delete(`/products/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  // GET CATEGORIES
  const getCategories = async () => {
    const res = await apiClient.get("/categories");
    return res.data;
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoading,
        isError,
        getProducts,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,
        getCategories,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}