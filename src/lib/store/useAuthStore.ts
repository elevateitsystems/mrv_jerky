// // src/lib/store/useAuthStore.ts
// import { create } from "zustand";
// import { apiRequest } from "../api";

// interface User {
//   id: string;
//   email: string;
//   username?: string;
//   firstName: string;
//   lastName: string;
//   role: "admin" | "user";
//   status: string;
//   avatar?: { url: string } | null;
// }

// interface PaginationMeta {
//   page: number;
//   limit: number;
//   total: number;
//   totalPages: number;
//   hasNext: boolean;
//   hasPrevious: boolean;
// }

// interface UserQuery {
//   search?: string;
//   page?: number;
//   limit?: number;
//   role?: string;
// }

// interface AuthState {
//   token: string | null;
//   user: User | null;
//   users: User[];
//   usersPagination: PaginationMeta | null;
//   usersQuery: UserQuery;
//   isLoading: boolean;
//   error: string | null;

//   // Auth actions
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
//   checkAuth: () => Promise<void>;

//   // Forgot Password actions
//   forgotPassword: (email: string) => Promise<void>;
//   verifyResetOtp: (email: string, code: string) => Promise<void>;
//   resetPassword: (email: string, newPassword: string) => Promise<void>;

//   // Profile settings actions
//   updateProfile: (data: { firstName?: string; lastName?: string; username?: string }) => Promise<void>;
//   changePassword: (data: any) => Promise<void>;

//   // Admin user management actions
//   fetchUsers: (params?: UserQuery) => Promise<{ users: User[]; pagination: PaginationMeta | null }>;
//   updateUserRole: (userId: string, role: "admin" | "user") => Promise<void>;
//   deleteUser: (userId: string) => Promise<void>;
// }

// export const useAuthStore = create<AuthState>((set, get) => ({
//   token: typeof window !== "undefined" ? localStorage.getItem("admin_token") : null,
//   user: null,
//   users: [],
//   usersPagination: null,
//   usersQuery: { page: 1, limit: 10 },
//   isLoading: false,
//   error: null,

//   login: async (email, password) => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await apiRequest("auth/login", {
//         method: "POST",
//         body: JSON.stringify({ email, password }),
//       });
//       // The API response structure typically has data: { token, user } or similar
//       const token = response.data?.token || response.token;
//       const user = response.data?.user || response.user;

//       if (!token) {
//         throw new Error("No token returned from server");
//       }

//       if (user.role !== "admin") {
//         throw new Error("Access denied. Only administrators are allowed.");
//       }

//       localStorage.setItem("admin_token", token);
//       set({ token, user, isLoading: false });
//     } catch (err: any) {
//       set({ error: err.message || "Login failed", isLoading: false });
//       throw err;
//     }
//   },

//   logout: () => {
//     localStorage.removeItem("admin_token");
//     set({ token: null, user: null, users: [] });
//   },

//   checkAuth: async () => {
//     const token = get().token;
//     if (!token) return;
//     set({ isLoading: true });
//     try {
//       const response = await apiRequest("auth/profile");
//       const user = response.data || response;
//       set({ user, isLoading: false });
//     } catch (err) {
//       // Token is invalid/expired
//       localStorage.removeItem("admin_token");
//       set({ token: null, user: null, isLoading: false });
//     }
//   },

//   forgotPassword: async (email) => {
//     set((state) => ({
//   ...state,
//   usersLoading: state.users.length === 0,
//   usersFetching: state.users.length > 0,
//   error: null,
// }));
//     try {
//       await apiRequest("auth/forgot-password", {
//         method: "POST",
//         body: JSON.stringify({ email }),
//       });
//       set({ isLoading: false });
//     } catch (err: any) {
//       set({ error: err.message, isLoading: false });
//       throw err;
//     }
//   },

//   verifyResetOtp: async (email, code) => {
//     set({ isLoading: true, error: null });
//     try {
//       await apiRequest("auth/verify-reset-password-otp", {
//         method: "POST",
//         body: JSON.stringify({ email, code }),
//       });
//       set({ isLoading: false });
//     } catch (err: any) {
//       set({ error: err.message, isLoading: false });
//       throw err;
//     }
//   },

//   resetPassword: async (email, newPassword) => {
//     set({ isLoading: true, error: null });
//     try {
//       await apiRequest("auth/reset-password", {
//         method: "POST",
//         body: JSON.stringify({ email, newPassword }),
//       });
//       set({ isLoading: false });
//     } catch (err: any) {
//       set({ error: err.message, isLoading: false });
//       throw err;
//     }
//   },

//   updateProfile: async (data) => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await apiRequest("auth/update-profile", {
//         method: "PATCH",
//         body: JSON.stringify(data),
//       });
//       const updatedUser = response.data || response;
//       set((state) => ({
//         user: state.user ? { ...state.user, ...updatedUser } : null,
//         isLoading: false
//       }));
//     } catch (err: any) {
//       set({ error: err.message, isLoading: false });
//       throw err;
//     }
//   },

//   changePassword: async (data) => {
//     set({ isLoading: true, error: null });
//     try {
//       await apiRequest("auth/change-password", {
//         method: "POST",
//         body: JSON.stringify({
//           currentPassword: data.currentPassword,
//           newPassword: data.newPassword,
//           confirmNewPassword: data.confirmNewPassword,
//         }),
//       });
//       set({ isLoading: false });
//     } catch (err: any) {
//       set({ error: err.message, isLoading: false });
//       throw err;
//     }
//   },

//   fetchUsers: async (params: UserQuery = {}) => {
//     const page = params.page || 1;
//     const limit = params.limit || 10;
//     const searchQuery = params.search ? `&search=${encodeURIComponent(params.search)}` : "";
//     const roleQuery = params.role ? `&role=${encodeURIComponent(params.role)}` : "";

//     set({ isLoading: true, error: null });
//     try {
//       const response = await apiRequest(`users?page=${page}&limit=${limit}${searchQuery}${roleQuery}`);
//       const usersList = response.data || response;
//       const pagination = response.meta?.pagination ?? null;
//       set({
//         users: Array.isArray(usersList) ? usersList : [],
//         usersPagination: pagination,
//         usersQuery: { page, limit, search: params.search, role: params.role },
//         isLoading: false,
//       });
//       return { users: Array.isArray(usersList) ? usersList : [], pagination };
//     } catch (err: any) {
//       set({ error: err.message, isLoading: false });
//       return { users: [], pagination: null };
//     }
//   },

//   updateUserRole: async (userId, role) => {
//     set({ isLoading: true, error: null });
//     try {
//       await apiRequest(`auth/users/${userId}/role`, {
//         method: "PUT",
//         body: JSON.stringify({ role }),
//       });
//       // Refresh user list after updating
//       await get().fetchUsers(get().usersQuery);
//     } catch (err: any) {
//       set({ error: err.message, isLoading: false });
//       throw err;
//     }
//   },

//   deleteUser: async (userId) => {
//     set({ isLoading: true, error: null });
//     try {
//       // Soft delete user via PUT /users/:id (matches Backend API UserRoutes)
//       await apiRequest(`users/${userId}`, {
//         method: "PUT",
//         body: JSON.stringify({ isDeleted: true }),
//       });
//       // Refresh user list
//       await get().fetchUsers(get().usersQuery);
//     } catch (err: any) {
//       set({ error: err.message, isLoading: false });
//       throw err;
//     }
//   },
// }));

// src/lib/store/useAuthStore.ts
import { create } from "zustand";
import { apiRequest } from "../api";

interface User {
  id: string;
  email: string;
  username?: string;
  firstName: string;
  lastName: string;
  role: "admin" | "user";
  status: string;
  avatar?: { url: string } | null;
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface UserQuery {
  search?: string;
  page?: number;
  limit?: number;
  role?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;

  users: User[];
  usersPagination: PaginationMeta | null;
  usersQuery: UserQuery;

  // ✅ split loading states (IMPORTANT FIX)
  isLoading: boolean; // auth/global
  usersLoading: boolean; // first load only
  usersFetching: boolean; // background refetch

  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;

  forgotPassword: (email: string) => Promise<void>;
  verifyResetOtp: (email: string, code: string) => Promise<void>;
  resetPassword: (email: string, newPassword: string) => Promise<void>;

  updateProfile: (data: {
    firstName?: string;
    lastName?: string;
    username?: string;
  }) => Promise<void>;

  changePassword: (data: any) => Promise<void>;

  fetchUsers: (
    params?: UserQuery,
  ) => Promise<{ users: User[]; pagination: PaginationMeta | null }>;

  updateUserRole: (userId: string, role: "admin" | "user") => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token:
    typeof window !== "undefined" ? localStorage.getItem("admin_token") : null,

  user: null,

  users: [],
  usersPagination: null,
  usersQuery: { page: 1, limit: 10 },

  isLoading: false,
  usersLoading: false,
  usersFetching: false,

  error: null,

  // ================= AUTH =================

  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await apiRequest("auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const token = response.data?.token || response.token;
      const user = response.data?.user || response.user;

      if (!token) throw new Error("No token returned from server");
      if (user.role !== "admin")
        throw new Error("Access denied. Only administrators are allowed.");

      localStorage.setItem("admin_token", token);

      set({ token, user, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Login failed", isLoading: false });
      throw err;
    }
  },
  logout: () => {
    localStorage.removeItem("admin_token");

    set({
      token: null,
      user: null,
      users: [],
      usersPagination: null,
      usersQuery: { page: 1, limit: 10 },
    });
  },

  checkAuth: async () => {
    const token = get().token;
    if (!token) return;

    set({ isLoading: true });

    try {
      const response = await apiRequest("auth/profile");
      const user = response.data || response;
      set({ user, isLoading: false });
    } catch {
      localStorage.removeItem("admin_token");
      set({
        token: null,
        user: null,
        isLoading: false,
      });
    }
  },

  // ================= PASSWORD =================

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });

    try {
      await apiRequest("auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      set({ isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  verifyResetOtp: async (email, code) => {
    set({ isLoading: true, error: null });

    try {
      await apiRequest("auth/verify-reset-password-otp", {
        method: "POST",
        body: JSON.stringify({ email, code }),
      });

      set({ isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  resetPassword: async (email, newPassword) => {
    set({ isLoading: true, error: null });

    try {
      await apiRequest("auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ email, newPassword }),
      });

      set({ isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  // ================= PROFILE =================

  updateProfile: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const response = await apiRequest("auth/update-profile", {
        method: "PATCH",
        body: JSON.stringify(data),
      });

      const updatedUser = response.data || response;

      set((state) => ({
        user: state.user ? { ...state.user, ...updatedUser } : null,
        isLoading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  changePassword: async (data) => {
    set({ isLoading: true, error: null });

    try {
      await apiRequest("auth/change-password", {
        method: "POST",
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
          confirmNewPassword: data.confirmNewPassword,
        }),
      });

      set({ isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  // ================= USERS (FIXED CORE PROBLEM) =================

  fetchUsers: async (params: UserQuery = {}) => {
    const page = params.page || 1;
    const limit = params.limit || 10;

    const searchQuery = params.search
      ? `&search=${encodeURIComponent(params.search)}`
      : "";

    const roleQuery = params.role
      ? `&role=${encodeURIComponent(params.role)}`
      : "";

    const isFirstLoad = get().users.length === 0;

    set({
      error: null,
      usersLoading: isFirstLoad,
      usersFetching: !isFirstLoad,
    });

    try {
      const response = await apiRequest(
        `users?page=${page}&limit=${limit}${searchQuery}${roleQuery}`,
      );

      const usersList = response.data || response;
      const pagination = response.meta?.pagination ?? null;

      set({
        users: Array.isArray(usersList) ? usersList : [],
        usersPagination: pagination,
        usersQuery: { page, limit, search: params.search, role: params.role },
        usersLoading: false,
        usersFetching: false,
      });

      return {
        users: Array.isArray(usersList) ? usersList : [],
        pagination,
      };
    } catch (err: any) {
      set({
        error: err.message,
        usersLoading: false,
        usersFetching: false,
      });

      return { users: [], pagination: null };
    }
  },

  updateUserRole: async (userId, role) => {
    set({ usersFetching: true, error: null });

    try {
      await apiRequest(`auth/users/${userId}/role`, {
        method: "PUT",
        body: JSON.stringify({ role }),
      });

      await get().fetchUsers(get().usersQuery);
    } catch (err: any) {
      set({ error: err.message, usersFetching: false });
      throw err;
    }
  },

  deleteUser: async (userId) => {
    set({ usersFetching: true, error: null });

    try {
      await apiRequest(`users/${userId}`, {
        method: "PUT",
        body: JSON.stringify({ isDeleted: true }),
      });

      await get().fetchUsers(get().usersQuery);
    } catch (err: any) {
      set({ error: err.message, usersFetching: false });
      throw err;
    }
  },
}));
