import React, { useState } from "react";
import "../css/members.css";
import SearchBar from "../components/MembersSearchBar";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import MemberCard from "../components/MemberCard";
import moment from "moment";
import Loader from "../components/Loader";
import OfflineError from "../components/OfflineError";

function Members(props) {
  const [month, setMonth] = useState("all");
  const [searchValue, setSetSearchValue] = useState("");
  const [serviceGroup, setServiceGroup] = useState("all");
  const [sortBy, setSortBy] = useState("");

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
            moment(member.createdAt.toDate()).month() === eval(month)
        );
    } else {
      members =
        props.members &&
        props.members.filter((member) =>
          member.name.toLowerCase().includes(searchValue.toLowerCase())
        );
    }
    if (sortBy === "soulsWon") {
      return (
        props.members &&
        members.sort((a, b) => (a.soulsWon < b.soulsWon ? 1 : -1))
      );
    } else if (sortBy === "name") {
      return (
        props.members &&
        members.sort((a, b) =>
          a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
        )
      );
    } else {
      return props.members && members;
    }
  };

  const totalMembers = props.members && displayedMembers().length;

  return (
    <div>
      <div className="members soulsWonContainer">
        <div className=" row section">
          <div className="mobileContainer col-12">
            <Header {...props} page="Members" />
          </div>
          <div className="mobileContainer col-lg-2">
            <SideNav page="members" {...props} />
          </div>
          {/* loader */}
          <div
            className="mobileContainer col-lg-10 pr-lg-0 scrollContainer"
            style={{ display: props.members && "none" }}
          >
            {navigator.onLine && !props.members && (
              <div className="loaderContainer">
                <Loader />
              </div>
            )}
            {!navigator.onLine && !props.members && <OfflineError />}
          </div>
          {/* main content */}
          <div
            className="mobileContainer col-lg-10 pr-lg-0 scrollContainer"
            style={{ display: !props.members && "none" }}
          >
            <SearchBar
              {...props}
              searchValue={searchValue}
              changeSearchValue={(value) => setSetSearchValue(value)}
              changeMonth={(value) => {
                setMonth(value);
              }}
              totalMembers={totalMembers}
              serviceGroup={serviceGroup}
              setServiceGroup={(value) => setServiceGroup(value)}
              sortBy={sortBy}
              setSortType={(value) => setSortBy(value)}
            />
            <div className="membersContainer row section">
              {props.members && displayedMembers().length > 0 ? (
                displayedMembers()
                  .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                  .map((member, i) => (
                    <MemberCard key={i} {...member} store={props} />
                  ))
              ) : (
                <div className="emptyDisplayText">no member found...</div>
              )}
            </div>
          </div>
          <div className="mobileContainer col-12">
            <Navbar page="members" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Members;
