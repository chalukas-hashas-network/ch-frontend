import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CommunityList from "../components/CommunityList";
import CommunityMembersList from "../components/CommunityMembersList";
import { getCommunities } from "../utils/API/CommunityAPI";
import { ArrowBackIcon } from "../utils/dataExports/muiExports";

function Community() {
  const [listSelected, setListSelected] = useState("community");
  const [selectedCommunity, setSelectedCommunity] = useState({});
  const [communities, setCommunities] = useState([]);
  const [communityData, setCommunityData] = useState([]);

  useEffect(function getAllCommunities() {
    getCommunities({}, ["community_goal"]).then((data) => {
      setCommunities(data);
      setCommunityData(data);
    });
  }, []);

  return (
    <div style={{ marginTop: "2em" }}>
      {listSelected === "members" && (
        <Link
          style={{
            textDecoration: "none",
            color: "black",
            marginLeft: "2em",
            position: "relative",
          }}
          underline="none"
          onClick={() => {
            setListSelected("community");
          }}
        >
          <ArrowBackIcon />
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
        <CommunityMembersList selectedCommunity={selectedCommunity} />
      )}
    </div>
  );
}

export default Community;
