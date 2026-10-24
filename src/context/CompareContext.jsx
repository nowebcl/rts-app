import React, { createContext, useContext, useState } from 'react';

const CompareContext = createContext();

export function CompareProvider({ children }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleCompare = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 3) {
        alert("Puedes comparar hasta un máximo de 3 mini excavadoras simultáneamente.");
        return prev;
      }
      return [...prev, id];
    });
  };

  const removeCompare = (id) => {
    setSelectedIds((prev) => prev.filter(item => item !== id));
  };

  const clearCompare = () => {
    setSelectedIds([]);
  };

  return (
    <CompareContext.Provider value={{
      selectedIds,
      toggleCompare,
      removeCompare,
      clearCompare,
      isDrawerOpen,
      setIsDrawerOpen
    }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
