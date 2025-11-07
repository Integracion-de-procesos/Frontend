import React, { createContext, useContext, useState, ReactNode } from "react";

interface ProfileContextProps {
    changed: boolean;
    toggleChanged: () => void;
}

const ProfileContext = createContext<ProfileContextProps>({
    changed: false,
    toggleChanged: () => { },
});

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const [changed, setChanged] = useState(false);

    const toggleChanged = () => setChanged((prev) => !prev);

    return (
        <ProfileContext.Provider value={{ changed, toggleChanged }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);