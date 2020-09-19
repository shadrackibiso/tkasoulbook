import React from "react";
import { MdNoteAdd, MdSearch } from "react-icons/md";

function TestimoniesSearchBar(props) {
  return (
    <div className="searchBarContainer">
      {/* Testimony Tab For Desktop */}
      <div className="tabMenu">
        <div
          className={
            props.selectedTab === "allTestimonies"
              ? "tabOption selectedTabOption"
              : "tabOption"
          }
          onClick={() => props.changeTab("allTestimonies")}
        >
          All Testimonies
        </div>
        <div
          className={
            props.selectedTab === "myTestimonies"
              ? "tabOption selectedTabOption"
              : "tabOption"
          }
          onClick={() => props.changeTab("myTestimonies")}
        >
          My Testimonies
        </div>
      </div>
      <div className="searchBar">
        <input
          type="text"
          name="soulsWonSearchBar"
          placeholder="search..."
          onChange={(e) => props.changeSearchValue(e.target.value)}
        />
        <MdSearch />
      </div>
      <div className="sortMenuContainer">
        {/* Testimony Tab For Mobile */}
        <div className="sortMenu sortMenuMobile">
          <select
            name="tabMenuMobile"
            value={props.selectedTab}
            onChange={(e) => props.changeTab(e.target.value)}
          >
            <option value="allTestimonies">All Testimonies</option>
            <option value="myTestimonies">My Testimonies</option>
          </select>
        </div>
        {/* Testimony Month Selector */}
        <div className="sortMenu">
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
        </div>
        {/* Total Testimonies */}
        <div className="totalSoulsWonContainer sortMenu">
          <span className="totalSoulsWonText">Total</span>
          <span className="totalSoulsWonCount">{props.totalTestimonies}</span>
        </div>
      </div>
      {/* Add Testimony Button */}
      <div
        className="soulsWonAddSoulBtn addTestimonyBtn"
        onClick={props.displayForm}
      >
        <span className="soulsWonAddSoulBtnText">Add Testimony</span>
        <span className="soulsWonAddSoulBtnIcon">
          <MdNoteAdd />
        </span>
      </div>
    </div>
  );
}

export default TestimoniesSearchBar;
