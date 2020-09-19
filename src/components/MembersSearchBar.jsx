import React from "react";
import { MdSearch } from "react-icons/md";

function MembersSearchBar(props) {
  return (
    <div className="searchBarContainer">
      <div className="searchBar">
        <input
          type="text"
          name="soulsWonSearchBar"
          placeholder="search..."
          value={props.searchValue}
          onChange={(e) => props.changeSearchValue(e.target.value)}
        />
        <MdSearch />
      </div>
      <div className="sortMenuContainer">
        <span
          className="sortMenu"
          style={{
            display: props.page && props.page === "leaderBoard" && "none",
          }}
        >
          <select
            name="sortType"
            value={props.sortBy}
            onChange={(e) => props.setSortType(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="soulsWon">Souls won</option>
            <option value="name">Name</option>
          </select>
        </span>
        <span className="sortMenu">
          <select
            name="sortType"
            value={props.serviceGroup.toLowerCase()}
            onChange={(e) => props.setServiceGroup(e.target.value)}
          >
            <option value="all">All Units</option>
            {props.defaults.serviceGroups.map((serviceGroup, i) => (
              <option value={serviceGroup.toLowerCase()} key={i}>
                {serviceGroup}
              </option>
            ))}
          </select>
        </span>
        <span
          className="sortMenu"
          style={{
            display: props.page && props.page === "leaderBoard" && "none",
          }}
        >
          <select
            name="sortType"
            className="monthOptions"
            value={props.selectedMonth}
            onChange={(e) => props.changeMonth(e.target.value)}
          >
            <option value="all">Month</option>
            <option value="0">Jan</option>
            <option value="1">Feb</option>
            <option value="2">Mar</option>
            <option value="3">Apr</option>
            <option value="4">May</option>
            <option value="5">Jun</option>
            <option value="6">Jul</option>
            <option value="7">Aug</option>
            <option value="8">Sep</option>
            <option value="9">Oct</option>
            <option value="10">Nov</option>
            <option value="11">Dec</option>
          </select>
        </span>
        <span className="totalSoulsWonContainer sortMenu">
          <span className="totalSoulsWonText">Total </span>
          <span className="totalSoulsWonCount">{props.totalMembers}</span>
        </span>
      </div>
    </div>
  );
}

export default MembersSearchBar;
