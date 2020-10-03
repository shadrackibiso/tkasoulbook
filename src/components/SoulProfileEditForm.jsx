import React, { useState } from "react";

function SoulProfileEditForm(props) {
  const [soulProfile, setSoulProfile] = useState({
    id: props.id,
    name: props.name,
    address: props.address,
    phoneNumber: props.phoneNumber,
    occupation: props.occupation,
    busStop: props.busStop,
    gender: props.gender,
    prayerRequest: props.prayerRequest,
    serviceGroup: props.serviceGroup,
    verified: props.verified,
    journeyClass: { ...props.journeyClass },
  });

  const handleChange = (e) => {
    let detail = { [e.target.name]: e.target.value };
    setSoulProfile((prevState) => ({ ...prevState, ...detail }));
  };

  const handleJourneyChange = (e) => {
    let detail = { [e.target.name]: e.target.checked };
    setSoulProfile((prevState) => ({
      ...prevState,
      journeyClass: {
        ...prevState.journeyClass,
        ...detail,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.store.editSoulProfile(soulProfile);
    props.setDisplay(false);
  };
  // RENDERED COMPONENT
  return (
    <form
      className="addSoulForm soulProfileEditForm"
      style={{ display: !props.display && "none" }}
      onSubmit={handleSubmit}
    >
      {/* Name */}
      <div className="inputBoxContainer inputBoxContainerMobile">
        <div className="inputBoxLabel">Full Name</div>
        <input
          name="name"
          type="text"
          className="inputBox"
          defaultValue={props.name}
          onChange={handleChange}
          required
        />
      </div>
      {/* Address */}
      <div className="inputBoxContainer inputBoxContainerMobile">
        <div className="inputBoxLabel">Address</div>
        <input
          name="address"
          type="text"
          className="inputBox"
          defaultValue={props.address}
          onChange={handleChange}
          required
        />
      </div>
      {/* Gender */}
      <div className="inputBoxContainer inputBoxContainerMobile">
        <div className="inputBoxLabel">Gender</div>
        <select
          className="inputBox selectBox genderOptions"
          defaultValue={props.gender}
          name="gender"
          onChange={handleChange}
          required
        >
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
      </div>
      {/* Bus stop */}
      <div className="inputBoxContainer inputBoxContainerMobile">
        <div className="inputBoxLabel">Nearest Bus-stop</div>
        <input
          name="busStop"
          type="text"
          className="inputBox"
          defaultValue={props.busStop}
          onChange={handleChange}
          required
        />
      </div>
      {/* Phone Number */}
      <div className="inputBoxContainer inputBoxContainerMobile">
        <div className="inputBoxLabel">Phone Number</div>
        <input
          name="phoneNumber"
          type="number"
          className="inputBox"
          defaultValue={props.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      {/* Occupation */}
      <div className="inputBoxContainer inputBoxContainerMobile">
        <div className="inputBoxLabel">Occupation</div>
        <input
          name="occupation"
          type="text"
          className="inputBox"
          defaultValue={props.occupation}
          onChange={handleChange}
          required
        />
      </div>
      {/* Prayer request */}
      <div className="inputBoxContainer inputBoxContainerMobile">
        <div className="inputBoxLabel">Prayer request</div>
        <textarea
          name="prayerRequest"
          type="text"
          className="inputBox inputBoxTextAreaMobile"
          defaultValue={props.prayerRequest}
          onChange={handleChange}
        />
      </div>
      {/*  */}
      <hr className="w-100" />
      {/*  */}
      {/* Service group */}
      <div
        className="inputBoxContainer inputBoxContainerMobile"
        style={{ display: props.store.accountType !== "admin" && "none" }}
      >
        <div className="inputBoxLabel">Service group</div>
        <select
          name="serviceGroup"
          className="inputBox selectBox"
          defaultValue={props.serviceGroup}
          onChange={handleChange}
        >
          <option value="none">None</option>
          {props.store &&
            props.store.defaults.serviceGroups.map((serviceGroup, i) => (
              <option value={serviceGroup.toLowerCase()} key={i}>
                {serviceGroup}
              </option>
            ))}
        </select>
      </div>
      {/* journey */}
      <div className="d-flex flex-column w-100">
        <div className="inputBoxLabel mb-2">Journey Class Attendance</div>
        {/* 101 */}
        <div>
          <input
            type="checkbox"
            name="journey101"
            value="journey101"
            defaultChecked={props.journeyClass.journey101}
            onChange={handleJourneyChange}
          />
          <label className="ml-2">Journey 101</label>
        </div>
        {/* 201 */}
        <div>
          <input
            type="checkbox"
            name="journey201"
            value="journey201"
            defaultChecked={props.journeyClass.journey201}
            onChange={handleJourneyChange}
          />
          <label className="ml-2">Journey 201</label>
        </div>
        {/* 301 */}
        <div>
          <input
            type="checkbox"
            name="journey301"
            value="journey301"
            defaultChecked={props.journeyClass.journey301}
            onChange={handleJourneyChange}
          />
          <label className="ml-2">Journey 301</label>
        </div>
        {/* 401 */}
        <div>
          <input
            type="checkbox"
            name="journey401"
            value="journey401"
            defaultChecked={props.journeyClass.journey401}
            onChange={handleJourneyChange}
          />
          <label className="ml-2">Journey 401</label>
        </div>
        {/*  */}
      </div>
      {/* Verified */}
      <div
        className="inputBoxContainer inputBoxContainerMobile"
        style={{ display: props.store.accountType !== "admin" && "none" }}
      >
        <div className="inputBoxLabel">Verified</div>
        <select
          name="verified"
          className="inputBox selectBox"
          defaultValue={props.verified}
          onChange={handleChange}
        >
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
      </div>
      {/* Option buttons */}
      <div className="d-flex optionBtns mt-4">
        <button className="subBtn mr-2" onClick={() => props.setDisplay(false)}>
          Cancel
        </button>
        <button className="mainBtn">Save</button>
      </div>
      {/*  */}
    </form>
  );
}

export default SoulProfileEditForm;
