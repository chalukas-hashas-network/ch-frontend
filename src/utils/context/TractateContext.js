import { useContext, createContext, useState } from "react";
import { getAllTractates } from "../API/GoalAPI";

const TractateContext = createContext();

export const TractateProvider = ({ children }) => {
  const [allTractates, setAllTractates] = useState([]);

  const getAllTractateData = async () => {
    console.log("hit tractate fetch")
    if (allTractates.length === 0) {console.log("getting tractates")
      try {
        const results = await getAllTractates();
        setAllTractates(results);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  };

  return (
    <TractateContext.Provider value={{ allTractates, getAllTractateData }}>
      {children}
    </TractateContext.Provider>
  );
};

export const useTractate = () => {
  return useContext(TractateContext);
};
