import React from "react";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import Navbar from "../components/Navbar";
import "../css/homeCell.css";
import home1 from "../pics/home1.jpg";
import home2 from "../pics/home2.jpg";
import home3 from "../pics/home3.jpg";

function HomeCell(props) {
  return (
    <div className="homeCell">
      <Header {...props} page="HomeCell" />
      <SideNav page="homecell" {...props} />
      <Navbar />
      <div className="homeCellContainer">
        <div className="homeCellManualHeader">HomeCell manual</div>
        <div className="homeCellManualContainer">
          <a
            className="homeCellManual"
            href="http://smhos.org/intl/download/homecell-fellowship/?wpdmdl=11672&masterkey=59270cccd3da1"
          >
            <div className="homeCellManualDiv">
              <img src={home1} alt="home cell manual" />
            </div>
          </a>
          <a
            className="homeCellManual"
            href="http://smhos.org/intl/download/corporate-cell/?wpdmdl=12044&masterkey=59270c3cb0ccf"
          >
            <div className="homeCellManualDiv">
              <img src={home2} alt="corporate cell manual" />
            </div>
          </a>{" "}
          <a
            className="homeCellManual"
            href="http://smhos.org/intl/download/unique-cell/?wpdmdl=12045&masterkey=59270d9e08046"
          >
            <div className="homeCellManualDiv">
              <img src={home3} alt="unique cell manual" />
            </div>
          </a>
        </div>
        <div className="homeCellFormHeader" style={{ display: "none" }}>
          Open HomeCell
        </div>
        <div className="homeCellFormContainer" style={{ display: "none" }}>
          <div className="homeCellFormRow">
            <div className="homeCellFormInputContainer">
              <div className="homeCellFFormHeader">Full Name </div>
              <input
                type="text"
                name="fullName"
                className="homeCellFormInputBox"
              />
            </div>
            <div className="homeCellFormInputContainer">
              <div className="homeCellFFormHeader">
                Date of Birth (required)
              </div>
              <input
                type="date"
                name="fullName"
                className="homeCellFormInputBox"
              />
            </div>
            <div className="homeCellFormInputContainer">
              <div className="homeCellFFormHeader">Gender</div>
              <input
                type="text"
                name="fullName"
                className="homeCellFormInputBox"
              />
            </div>
          </div>
          <div className="homeCellFormRow">
            <div className="homeCellFormInputContainer">
              <div className="homeCellFFormHeader">Phone Number</div>
              <input
                type="number"
                name="fullName"
                className="homeCellFormInputBox"
              />
            </div>
            <div className="homeCellFormInputContainer">
              <div className="homeCellFFormHeader">Address</div>
              <input
                type="text"
                name="fullName"
                className="homeCellFormInputBox"
              />
            </div>
            <div className="homeCellFormInputContainer">
              <div className="homeCellFFormHeader">Email</div>
              <input
                type="email"
                name="fullName"
                className="homeCellFormInputBox"
              />
            </div>
          </div>
          <div className="homeCellFormRow">
            <div className="homeCellFormInputContainer">
              <div className="homeCellFFormHeader">Country</div>
              <input
                type="text"
                name="fullName"
                className="homeCellFormInputBox"
              />
            </div>
            <div className="homeCellFormInputContainer">
              <div className="homeCellFFormHeader">City</div>
              <input
                type="text"
                name="fullName"
                className="homeCellFormInputBox"
              />
            </div>
            <div className="homeCellFormInputContainer">
              <div className="homeCellFFormHeader">State</div>
              <input
                type="text"
                name="fullName"
                className="homeCellFormInputBox"
              />
            </div>
          </div>
          <div className="homeCellFormRow">
            <div className="homeCellFormInputContainer">
              <div className="homeCellFFormHeader">Message</div>
              <textarea className="homeCellFormTextArea" />
            </div>
          </div>
          <div className="homeCellFormBtn">Send</div>
        </div>
      </div>
    </div>
  );
}

export default HomeCell;
