import { createContext, useContext, useState } from "react";

const VideoContext = createContext();

export function VideoProvider({ children }) {

    const [selectedVideo, setSelectedVideo] = useState(null);

    const [currentTime, setCurrentTime] = useState(0);

    return (

        <VideoContext.Provider
            value={{
                selectedVideo,
                setSelectedVideo,

                currentTime,
                setCurrentTime
            }}
        >

            {children}

        </VideoContext.Provider>

    );

}

export function useVideo() {

    return useContext(VideoContext);

}