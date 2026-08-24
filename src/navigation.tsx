import React, { createContext, useContext } from 'react';

/**
 * The three top-level pages of the merged site:
 *  - `holding`  — Orthodox Holdings landing page
 *  - `business` — Orthodox Business Solutions
 *  - `wealth`   — Orthodox Wealth Management (previously a separate site)
 */
export type View = 'holding' | 'business' | 'wealth';

interface NavigationContextValue {
  currentView: View;
  /** Switches the top-level view; optionally scrolls to an element id afterwards. */
  navigateView: (view: View, anchorId?: string) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export const NavigationProvider: React.FC<{
  value: NavigationContextValue;
  children: React.ReactNode;
}> = ({ value, children }) => (
  <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
);

export const useNavigation = (): NavigationContextValue => {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error('useNavigation must be used within a <NavigationProvider>');
  }
  return ctx;
};
