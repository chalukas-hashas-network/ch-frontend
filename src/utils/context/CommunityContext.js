import { useState, useContext, createContext, useMemo, useCallback } from "react";
import { useUser } from "./UserContext";
import { getCommunities } from "../API/CommunityAPI";

const CommunityContext = createContext();

export const CommunityProvider = ({ children }) => {
  const [allCommunities, setAllCommunities] = useState([]);

  const { setIsLoading } = useUser();

  const getAllCommunityData = useCallback(async () => {
    if (allCommunities.length === 0) {
      try {
        setIsLoading(true);
        const communities = await getCommunities({}, ["community_goal", "members"]);
        setAllCommunities(communities);
      } catch (err) {
        console.log("Error: ", err);
      } finally {
        setIsLoading(false);
      }
    }
  }, [allCommunities]);

  const value = useMemo(
    () => ({
      allCommunities,
      setAllCommunities,
      getAllCommunityData
    }),
    [allCommunities]
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
