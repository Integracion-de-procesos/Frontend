import React, { createContext, useContext, useState } from "react";
import { VideoInterface } from "../types/video.interface";

type VideosContextType = {
    videos: VideoInterface[];
    setVideos: React.Dispatch<React.SetStateAction<VideoInterface[]>>;
    clearVideos: () => void;
};

const VideosContext = createContext<VideosContextType | undefined>(undefined);

export const VideosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [videos, setVideos] = useState<VideoInterface[]>([]);

    const clearVideos = () => setVideos([]);

    return (
        <VideosContext.Provider value={{ videos, setVideos, clearVideos }}>
            {children}
        </VideosContext.Provider>
    );
};

export const useVideos = () => {
    const context = useContext(VideosContext);
    if (!context) {
        throw new Error("useVideos debe usarse dentro de un VideosProvider");
    }
    return context;
};
