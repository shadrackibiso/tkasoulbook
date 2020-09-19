import React from "react";
import "../css/dataSummary.css";
import { AiFillPlusCircle } from "react-icons/ai";
import AddSoulModal from "./AddSoulModal";

function DataSummary(props) {
  const showModal = () => {
    document.querySelector(".addSoulModal").style.display = "flex";
  };
  const soulsWon = () => {
    if (props.soulsWon && props.accountType && props.accountType === "member") {
      return props.soulsWon.filter((soul) => soul.wonBy.id === props.id);
    } else {
      return props.soulsWon && props.soulsWon;
    }
  };
  const firstTimers =
    props.soulsWon &&
    props.soulsWon.filter((soul) => soul.wonThrough === "firstTimer");
  const altarCall =
    props.soulsWon &&
    props.soulsWon.filter((soul) => soul.wonThrough === "altarCall");

  return (
    <div className="dataSummaryContainer">
      {/* Souls Won */}
      <div className="dataSummaryCard">
        <div className="dataCount">{props.soulsWon && soulsWon().length}</div>
        <div className="dataLabel">souls won</div>
      </div>
      {/* Altar Call */}
      <div
        className="dataSummaryCard"
        style={{
          display:
            props.accountType &&
            props.accountType.toLowerCase() === "member" &&
            "none",
        }}
      >
        <div className="dataCount">{altarCall && altarCall.length}</div>
        <div className="dataLabel">altar call</div>
      </div>
      {/* First Timers */}
      <div
        className="dataSummaryCard"
        style={{
          display:
            props.accountType &&
            props.accountType.toLowerCase() === "member" &&
            "none",
        }}
      >
        <div className="dataCount">{firstTimers && firstTimers.length}</div>
        <div className="dataLabel">first timers</div>
      </div>
      {/* Members */}
      <div
        className="dataSummaryCard"
        style={{
          display:
            props.accountType &&
            props.accountType.toLowerCase() === "member" &&
            "none",
        }}
      >
        <div className="dataCount">{props.members && props.members.length}</div>
        <div className="dataLabel">members</div>
      </div>
      {/* Add Soul */}
      <div className="dataSummaryCard addSoulCard" onClick={showModal}>
        <div className="dataCount">
          <AiFillPlusCircle />
        </div>
        <div className="dataLabel">Add soul</div>
      </div>
      {/* ===== */}

      {/* Add Soul Modal */}
      <AddSoulModal {...props} />
      {/* ======= */}
    </div>
  );
}

export default DataSummary;
