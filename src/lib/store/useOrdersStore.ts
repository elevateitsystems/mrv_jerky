// src/lib/store/useOrdersStore.ts
import { create } from "zustand";
import { apiRequest } from "@/lib/api";

interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerEmail: string;
  customerPhone: string;
  shippingCountry: string;
  totalAmount: string | number;
  orderStatus: string;
  paymentStatus: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface OrdersFilters {
  search: string;
  status: string;
  fromDate: string;
  toDate: string;
}

interface OrdersState {
  orders: Order[];
  pagination: Pagination | null;

  page: number;
  limit: number;

  filters: OrdersFilters;

  isInitialLoading: boolean;
  isFetching: boolean;

  error: string | null;

  // actions
  setFilters: (filters: Partial<OrdersFilters>) => void;
  setPage: (page: number) => void;

  fetchOrders: (opts?: { silent?: boolean }) => Promise<void>;
  resetFilters: () => void;
}

export const useOrdersStore = create<OrdersState>((set, get) => ({
  orders: [],
  pagination: null,

  page: 1,
  limit: 20,

  filters: {
    search: "",
    status: "",
    fromDate: "",
    toDate: "",
  },

  isInitialLoading: true,
  isFetching: false,
  error: null,

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      page: 1, // reset page automatically
    }));

    // background fetch (NO skeleton reload)
    get().fetchOrders({ silent: true });
  },

  setPage: (page) => {
    set({ page });
    get().fetchOrders({ silent: true });
  },

  resetFilters: () => {
    set({
      filters: {
        search: "",
        status: "",
        fromDate: "",
        toDate: "",
      },
      page: 1,
    });

    get().fetchOrders({ silent: true });
  },

  fetchOrders: async ({ silent = false } = {}) => {
    const { page, limit, filters } = get();

    set({
      isFetching: true,
      isInitialLoading: silent ? false : true,
      error: null,
    });

    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });

      if (filters.search) params.append("search", filters.search);
      if (filters.status) params.append("status", filters.status);
      if (filters.fromDate) params.append("fromDate", filters.fromDate);
      if (filters.toDate) params.append("toDate", filters.toDate);

      const response = await apiRequest(
        `order?${params.toString()}`
      );

      const data = response.data || response;

      set({
        orders: Array.isArray(data) ? data : [],
        pagination: response.meta?.pagination ?? null,
        isInitialLoading: false,
        isFetching: false,
      });
    } catch (err: any) {
      set({
        error: err.message || "Failed to fetch orders",
        isInitialLoading: false,
        isFetching: false,
      });
    }
  },
}));