import React, { useState } from "react";
import "../css/leaderBoard.css";
import SearchBar from "../components/MembersSearchBar";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import LeaderBoardCard from "../components/LeaderBoardCard";
import moment from "moment";
import Loader from "../components/Loader";
import OfflineError from "../components/OfflineError";

function LeaderBoard(props) {
  const [month, setMonth] = useState("all");
  const [searchValue, setSetSearchValue] = useState("");
  const [serviceGroup, setServiceGroup] = useState("all");
  const displayedMembers = () => {
    let members;
    if (month !== "all" && serviceGroup !== "all") {
      members =
        props.members &&
        props.members.filter(
          (member) =>
            member.name.toLowerCase().includes(searchValue.toLowerCase()) &&
            moment(member.createdAt).month() === eval(month) &&
            member.serviceGroup.toLowerCase() === serviceGroup.toLowerCase()
        );
    } else if (month === "all" && serviceGroup !== "all") {
      members =
        props.members &&
        props.members.filter(
          (member) =>
            member.name.toLowerCase().includes(searchValue.toLowerCase()) &&
            member.serviceGroup.toLowerCase() === serviceGroup.toLowerCase()
        );
    } else if (month !== "all" && serviceGroup === "all") {
      members =
        props.members &&
        props.members.filter(
          (member) =>
            member.name.toLowerCase().includes(searchValue.toLowerCase()) &&
            moment(member.createdAt).month() === eval(month)
        );
    } else {
      members =
        props.members &&
        props.members.filter((member) =>
          member.name.toLowerCase().includes(searchValue.toLowerCase())
        );
    }

    return (
      props.members &&
      members.sort((a, b) => (a.soulsWon < b.soulsWon ? 1 : -1))
    );
  };
  const totalMembers = props.members && displayedMembers().length;

  return (
    <div>
      <div className="members soulsWonContainer">
        <div className=" row section">
          <div className="mobileContainer col-12">
            <Header {...props} page="Leader Board" />
          </div>
          <div className="mobileContainer col-lg-2">
            <SideNav page="leaderBoard" {...props} />
          </div>
          {/* loader */}
          <div
            className="mobileContainer col-lg-10 pr-lg-0 scrollContainer"
            style={{ display: props.members && "none" }}
          >
            {/* loading component */}
            {navigator.onLine && !props.members && (
              <div className="loaderContainer">
                <Loader />
              </div>
            )}
            {/* offline compoent */}
            {!navigator.onLine && !props.members && <OfflineError />}
          </div>
          <div
            className="mobileContainer col-lg-10 pr-lg-0 scrollContainer"
            style={{ display: !props.members && "none" }}
          >
            <SearchBar
              {...props}
              searchValue={searchValue}
              changeSearchValue={(value) => setSetSearchValue(value)}
              changeMonth={(value) => setMonth(value)}
              totalMembers={totalMembers}
              serviceGroup={serviceGroup}
              setServiceGroup={(value) => setServiceGroup(value)}
              page="leaderBoard"
            />
            <div className="membersContainer row section">
              {props.members && displayedMembers().length > 0 ? (
                displayedMembers().map((member, i) => (
                  <LeaderBoardCard key={i} {...member} rank={i} />
                ))
              ) : (
                <div className="emptyDisplayText">no member found...</div>
              )}
            </div>
          </div>
          <div className="mobileContainer col-12">
            <Navbar page="leaderBoard" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;
