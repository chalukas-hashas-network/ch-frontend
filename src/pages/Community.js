import { Link } from "react-router-dom";
import { useState } from "react";
import CommunityList from "../components/CommunityList";
import CommunityMembersList from "../components/CommunityMembersList";

// TODO: get new fetch for specific community with members and goal to send to members list

function Community() {
  const [listSelected, setListSelected] = useState("community");
  const [selectedCommunity, setSelectedCommunity] = useState({});

  return (
    <div>
      {listSelected === "community" && (
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to="/profile"
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
