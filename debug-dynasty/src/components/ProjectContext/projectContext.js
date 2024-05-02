// Context creation and export
import React, { createContext, useContext, useState } from 'react';

const CurrentProjectContext = createContext();

export const useCurrentProject = () => useContext(CurrentProjectContext);

// Context Provider Component
export const CurrentProjectProvider = ({ children }) => {
    const [currentProject, setCurrentProject] = useState(null);

    return (
        <CurrentProjectContext.Provider value={{ currentProject, setCurrentProject }}>
            {children}
        </CurrentProjectContext.Provider>
    );
};
