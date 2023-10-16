import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

const ForceUpdateContext = createContext({
  value: true,
  forceUpdate: () => {},
});

export const useForceUpdate = () => {
  const { forceUpdate } = useContext(ForceUpdateContext);

  return forceUpdate;
};

export function ForceUpdateProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState(true);

  const forceUpdate = useCallback(() => {
    setValue((prev) => !prev);
    setTimeout(() => {
      setValue((prev) => !prev);
    }, 0);
  }, []);

  const contextValue = useMemo(() => ({ value, forceUpdate }), [value, forceUpdate]);

  if (!value) {
    return null;
  }

  return <ForceUpdateContext.Provider value={contextValue}>{children}</ForceUpdateContext.Provider>;
}
