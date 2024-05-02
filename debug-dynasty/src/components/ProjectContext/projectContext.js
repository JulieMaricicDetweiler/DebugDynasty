import React, { createContext, useState, useContext } from 'react';

const CurrentProjectContext = createContext();

export const useCurrentProject = () => useContext(CurrentProjectContext);

export const CurrentProjectProvider = ({ children }) => {
    const [currentProject, setCurrentProject] = useState(null);

    const checkOutProject = (project) => {
        setCurrentProject(project);
    };

    return (
        <CurrentProjectContext.Provider value={{ currentProject, checkOutProject }}>
            {children}
        </CurrentProjectContext.Provider>
    );
};