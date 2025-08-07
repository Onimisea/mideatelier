import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AppState {
  // Persistent state
  authToken: string | null;
  user: { id: string; email: string; name: string } | null;

  // Session state (not persisted)
  isMobileNavOpen: boolean;
  isScrolled: boolean;
  isHydrated: boolean;

  // Auth actions
  setAuthToken: (token: string | null) => void;
  setUser: (user: AppState["user"]) => void;
  logout: () => void;

  // UI actions
  setMobileNavOpen: (isOpen: boolean) => void;
  toggleMobileNav: () => void;
  setScrolled: (isScrolled: boolean) => void;
  setHydrated: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Persistent state - will be saved to localStorage
      authToken: null,
      user: null,

      // Session state - reset on page reload
      isMobileNavOpen: false,
      isScrolled: false,
      isHydrated: false,

      // Auth actions
      setAuthToken: (token: string | null) => set({ authToken: token }),

      setUser: (user: AppState["user"]) => set({ user }),

      logout: () => set({ authToken: null, user: null }),

      // UI actions
      setMobileNavOpen: (isOpen: boolean) => set({ isMobileNavOpen: isOpen }),

      toggleMobileNav: () =>
        set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),

      setScrolled: (isScrolled: boolean) => set({ isScrolled }),

      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "app-store", // storage key
      storage: createJSONStorage(() => localStorage),

      // Only persist specific keys
      partialize: (state) => ({
        authToken: state.authToken,
        user: state.user,
      }),

      // Called when store is hydrated from localStorage
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);

// Utility hook to check if store is ready to use
export const useIsHydrated = () => useAppStore((state) => state.isHydrated);

// Usage examples:

// Check if hydrated before using persisted data:
// const isHydrated = useIsHydrated()
// const authToken = useAppStore((state) => state.authToken)
//
// if (!isHydrated) {
//   return <div>Loading...</div>
// }

// Auth usage:
// const { authToken, user, setAuthToken, setUser, logout } = useAppStore()

// UI state usage:
// const { isMobileNavOpen, setMobileNavOpen, toggleMobileNav } = useAppStore()
// const { isScrolled, setScrolled } = useAppStore()

// Login flow:
// const handleLogin = async (credentials) => {
//   const response = await api.login(credentials)
//   setAuthToken(response.token)
//   setUser(response.user)
// }

// Logout flow:
// const handleLogout = () => {
//   logout()
//   // Redirect to login page
// }

// Example scroll listener with hydration check:
// useEffect(() => {
//   if (!isHydrated) return
//
//   const handleScroll = () => {
//     setScrolled(window.scrollY > 50)
//   }
//
//   window.addEventListener('scroll', handleScroll)
//   return () => window.removeEventListener('scroll', handleScroll)
// }, [setScrolled, isHydrated])
