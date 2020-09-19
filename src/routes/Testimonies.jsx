import React, { useState } from "react";
import Header from "../components/Header";
import "../css/testimonies.css";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import TestimonyCard from "../components/TestimonyCard";
import TestimonyForm from "../components/TestimonyForm";
import SearchBar from "../components/TestimoniesSearchBar";
import moment from "moment";
import Loader from "../components/Loader";
import { MdAdd } from "react-icons/md";
import OfflineError from "../components/OfflineError";

function Testimonies(props) {
  const [displayForm, setDisplayForm] = useState(false);
  const [month, setMonth] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [selectedTab, setSelectedTab] = useState("allTestimonies");
  const allTestimonies =
    month !== "all"
      ? props.testimonies &&
        props.testimonies.filter(
          (testimony) =>
            moment(testimony.createdAt.toDate()).month() === eval(month)
        )
      : props.testimonies && props.testimonies;

  const myTestimonies =
    month !== "all"
      ? props.testimonies &&
        props.testimonies.filter(
          (testimony) =>
            testimony.userId === props.id &&
            moment(testimony.createdAt.toDate()).month() === eval(month)
        )
      : props.testimonies &&
        props.testimonies.filter((testimony) => testimony.userId === props.id);

  const displayedTestimonies =
    selectedTab === "allTestimonies"
      ? props.testimonies &&
        allTestimonies.filter((testimony) =>
          testimony.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      : props.testimonies &&
        myTestimonies.filter((testimony) =>
          testimony.title.toLowerCase().includes(searchValue.toLowerCase())
        );
  const changeTab = (value) => {
    setSelectedTab(value);
    setMonth("all");
  };
  const changeMonth = (value) => {
    setMonth(value);
  };

  return (
    <>
      <div className="testimoniesPageContainer">
        <div className=" row section">
          {/* Header */}
          <div className="mobileContainer col-12">
            <Header {...props} page="Testimonies" />
          </div>
          {/* Sidenav */}
          <div className="mobileContainer col-lg-2">
            <SideNav page="testimonies" {...props} />
          </div>
          {/* loaders */}
          <div
            className="col-lg-10 mobileContainer p-0"
            style={{ display: props.testimonies && "none" }}
          >
            {/* loading component */}
            {navigator.onLine && !props.testimonies && (
              <div className="loaderContainer">
                <Loader />
              </div>
            )}
            {/* offline component */}
            {!navigator.onLine && !props.testimonies && <OfflineError />}
          </div>
          {/* main content */}
          <div
            className="mobileContainer col-lg-10"
            style={{ display: !props.testimonies && "none" }}
          >
            {/* Top Menu */}
            <SearchBar
              {...props}
              selectedTab={selectedTab}
              changeTab={changeTab}
              totalTestimonies={
                props.testimonies && displayedTestimonies.length
              }
              changeMonth={changeMonth}
              changeSearchValue={(value) => setSearchValue(value)}
              selectedMonth={month}
              displayForm={() => setDisplayForm(true)}
            />
            {/* Displayed Testimonies */}
            <div className="row">
              <div className="col-lg-8 mobileContainer p-0">
                <div className="soulsWonCardContainer">
                  {props.testimonies && displayedTestimonies.length > 0 ? (
                    displayedTestimonies
                      .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                      .map((testimony, i) => (
                        <TestimonyCard key={i} {...testimony} store={props} />
                      ))
                  ) : (
                    <div className="emptyDisplayText">
                      no testimony found...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Mobile Navbar */}
          <div className="mobileContainer col-12">
            <Navbar page="testimonies" />
          </div>
        </div>
        {/* Testimony Form */}
        <div
          className="mobileContainer col-12"
          style={{ display: !displayForm && "none" }}
        >
          <TestimonyForm {...props} closeModal={() => setDisplayForm(false)} />
        </div>
        {/* Mobile Testimony Add Button */}
        <div
          className="addTestimonyBtnMobile"
          onClick={() => setDisplayForm(true)}
          style={{ display: !props.accountType && "none" }}
        >
          <MdAdd />
        </div>
      </div>
    </>
  );
}

export default Testimonies;
