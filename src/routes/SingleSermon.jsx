import React, { useState } from "react";
import Header from "../components/Header";
import "../css/testimonies.css";
import "../css/sermon.css";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import Loader from "../components/Loader";

function SingleSermon(props) {
  const sermon =
    props.store.sermons &&
    props.store.sermons.filter((sermon) => sermon.id === props.match.params.id);

  return (
    <>
      {!props.store.sermons ? (
        <div className="loaderContainer">
          <Loader />
        </div>
      ) : (
        <div className="testimoniesPageContainer">
          <div className=" row section">
            {/* Header */}
            <div className="mobileContainer col-12">
              <Header {...props.store} page="Sermon" />
            </div>
            {/* Sidenav */}
            <div className="mobileContainer col-lg-2">
              <SideNav page="sermon" {...props.store} />
            </div>
            <div className="mobileContainer col-lg-10">
              {/* Displayed Sermon */}
              <div className="singleSermonContainer row no-gutters">
                {sermon.map((doc) => (
                  <div key={doc.id}>
                    <div className="singleSermonHeader">
                      <div className="singleSermonTitle">{doc.title}</div>
                      <div className="singleSermonScriptures" style={{display: !doc.scriptures && "none"}}>
                        {doc.scriptures && doc.scriptures}
                      </div>
                    </div>
                    <div
                      className="singleSermonText"
                      dangerouslySetInnerHTML={{ __html: doc.text }}
                    ></div>
                    <div className="singleSermonAuthor">{doc.author}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Mobile Navbar */}
            <div className="mobileContainer col-12">
              <Navbar page="sermon" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleSermon;
