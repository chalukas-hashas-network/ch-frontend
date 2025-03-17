import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CommunityList from "../components/CommunityList";
import CommunityMembersList from "../components/CommunityMembersList";
import { getCommunities } from "../utils/API/CommunityAPI";

// TODO: get new fetch for specific community with members and goal to send to members list

function Community() {
  const [listSelected, setListSelected] = useState("community");
  const [selectedCommunity, setSelectedCommunity] = useState({});
  const [communities, setCommunities] = useState([]);
  const [communityData, setCommunityData] = useState([]);

  useEffect(function getAllCommunities() {
    getCommunities().then((data) => {
      setCommunities(data);
      setCommunityData(data);
    });
  }, []);

  return (
    <div>
      {listSelected === "community" && (
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to="/home"
          underline="none"
      >
          {"< Back"}
        </Link>
      )}
      {listSelected === "members" && (
        <Link
          style={{ textDecoration: "none", color: "black" }}
          underline="none"
          onClick={() => {
            setListSelected("community");
          }}
        >
          {"< Back"}
        </Link>
      )}
      {listSelected === "community" && (
        <CommunityList
          setListSelected={setListSelected}
          setSelectedCommunity={setSelectedCommunity}
          communities={communities}
          communityData={communityData}
          setCommunityData={setCommunityData}
          setCommunities={setCommunities}
        />
      )}
      {listSelected === "members" && (
        <CommunityMembersList
          selectedCommunity={selectedCommunity}
          />
      )}
    </div>
  );
}

export default Community;
