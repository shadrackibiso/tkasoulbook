import React, { useState } from "react";
import { MdSearch, MdPersonAdd } from "react-icons/md";

function FoundationClassSearchBar(props) {
  const [totalSoulsWon, setTotalSoulsWon] = useState(
    props.soulsWon && props.soulsWon.length
  );
  return (
    <div className="soulsWonSearchBarContainer foundationClassSearchBarContainer">
      <div className="soulsWonAddSoulBtn" onClick={props.showModal}>
        <span className="soulsWonAddSoulBtnText">Add </span>
        <span className="soulsWonAddSoulBtnIcon">
          <MdPersonAdd />
        </span>
      </div>
      <div className="soulsWonSearchBar membersSearchBar">
        <input type="text" name="soulsWonSearchBar" placeholder="search..." />
        <MdSearch />
      </div>
      <div className="soulsWonSortMenu membersSortMenu">
        <span>Month</span>
        <select name="sortType">
          <option value="all">All</option>
          <option value="january">January</option>
          <option value="february">February</option>
          <option value="march">March</option>
          <option value="april">April</option>
          <option value="may">May</option>
          <option value="june">June</option>
          <option value="july">July</option>
          <option value="august">August</option>
          <option value="september">September</option>
          <option value="october">October</option>
          <option value="november">November</option>
          <option value="december">December</option>
        </select>
        <span className="selectLabel">Show</span>
        <select name="sortType">
          <option value="all">All</option>
          <option value="members">Members</option>
          <option value="serviceGroupMembers">Service group members</option>
        </select>
        <span className="totalSoulsWonContainer">
          <span className="totalSoulsWonText">total members</span>
          <span className="totalSoulsWonCount">{totalSoulsWon}</span>
        </span>
      </div>
    </div>
  );
}

export default FoundationClassSearchBar;
