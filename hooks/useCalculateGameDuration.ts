interface GameDurationProps {
    startTime: Date | undefined;
    endTime: Date | undefined;
}


const useCalculateGameDuration = ({startTime, endTime}: GameDurationProps) => {
    const now = new Date();

    const formattedStartTime = startTime ? new Date(startTime) : now;
    const formattedEndTime = endTime ? new Date(endTime) : now;

    const duration = Math.abs(formattedEndTime.getTime() - formattedStartTime.getTime());

    const hours = Math.floor(duration / 3600000);
    const minutes = Math.floor((duration % 3600000) / 60000);

    return hours > 0 ? `${hours} saat ${minutes} dakika` : `${minutes} dakika`;
};

export default useCalculateGameDuration;