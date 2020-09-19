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
  });

  const handleChange = (e) => {
    let detail = { [e.target.name]: e.target.value };
    setSoulProfile((prevState) => ({ ...prevState, ...detail }));
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
