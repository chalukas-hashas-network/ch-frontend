import { useState, useContext, createContext, useMemo, useCallback } from "react";
import { useUser } from "./UserContext";
// import { getCommunities } from "../API/CommunityAPI";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [allEvents, setAllEvents] = useState([{
    title: "test title",
    description: "test description",
    host: "benny",
    address: "123 test st",
    date: "05/01/2023",
    time: "8:30PM",
    dateTime: "",
    rsvp: "https://collive.com",
  }]);

  const { setIsLoading } = useUser();

  const getAllEventData = useCallback(async () => {
    console.log("getAllEventData");
    if (allEvents.length === 0) {
      try {
        setIsLoading(true);
        // const Events = await getEvents({}, ["Event_goal", "members", "admins"]);
        // setAllEvents(Events);
      } catch (err) {
        console.log("Error: ", err);
      } finally {
        setIsLoading(false);
      }
    }
  }, [allEvents]);

  const value = useMemo(
    () => ({
      allEvents,
      setAllEvents,
      getAllEventData
    }),
    [allEvents]
  );

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  return useContext(EventContext);
};
