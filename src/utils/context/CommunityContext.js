import { useState, useContext, createContext, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "./UserContext";
import { getCommunities } from "../API/CommunityAPI";

const CommunityContext = createContext();

export const CommunityProvider = ({ children }) => {
  const [allCommunities, setAllCommunities] = useState([]);

  const location = useLocation();
  const { setIsLoading } = useUser();

  const getAllCommunityData = async () => {
    // gets all communities for community page without causing rerender on page load

    try {
      const communities = await getCommunities({}, [
        "community_goal",
        "members",
      ]);
      setIsLoading(true);
      setAllCommunities(communities);
      console.log("triggered community fetch");
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const shouldFetch =
      (location.pathname.includes("/community") ||
      location.pathname.includes("/dashboard")) &&
      allCommunities.length === 0;

    if (shouldFetch) {
      getAllCommunityData();
    }
  }, [location.pathname]);

  const value = useMemo(
    () => ({
      allCommunities,
      setAllCommunities,
    }),
    [allCommunities, setAllCommunities]
  );

  return (
    <CommunityContext.Provider value={value}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => {
  return useContext(CommunityContext);
};
