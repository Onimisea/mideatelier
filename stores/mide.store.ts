import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface GlobalAppState {
  mobileNav: {
    isOpen: boolean;
  };
  isScrolled: boolean;

  toggleMobileNav: () => void;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  setMobileNavOpen: (isOpen: boolean) => void;
  setScrolled: (isScrolled: boolean) => void;
}

export const useGlobalStore = create<GlobalAppState>()(
  persist(
    (set) => ({
      mobileNav: {
        isOpen: false,
      },
      isScrolled: false,

      toggleMobileNav: () =>
        set((state) => ({
          mobileNav: { ...state.mobileNav, isOpen: !state.mobileNav.isOpen },
        })),
      openMobileNav: () =>
        set((state) => ({
          mobileNav: { ...state.mobileNav, isOpen: true },
        })),
      closeMobileNav: () =>
        set((state) => ({
          mobileNav: { ...state.mobileNav, isOpen: false },
        })),
      setMobileNavOpen: (isOpen: boolean) =>
        set((state) => ({
          mobileNav: { ...state.mobileNav, isOpen },
        })),
      setScrolled: (isScrolled: boolean) => set(() => ({ isScrolled })),
    }),
    {
      name: "mide-store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        mobileNav: state.mobileNav,
        isScrolled: state.isScrolled,
      }),
    }
  )
);

// Selector for isScrolled
export const useIsScrolled = () => useGlobalStore((state) => state.isScrolled);
export const useSetScrolled = () =>
  useGlobalStore((state) => state.setScrolled);

// Optimized selectors for mobile nav (prevents unnecessary re-renders)
export const useMobileNavOpen = () =>
  useGlobalStore((state) => state.mobileNav.isOpen);
export const useMobileNavToggle = () =>
  useGlobalStore((state) => state.toggleMobileNav);
export const useMobileNavClose = () =>
  useGlobalStore((state) => state.closeMobileNav);
export const useMobileNavActions = () =>
  useGlobalStore((state) => ({
    toggle: state.toggleMobileNav,
    open: state.openMobileNav,
    close: state.closeMobileNav,
    setOpen: state.setMobileNavOpen,
  }));
