import React, { Component, Suspense, lazy } from "react";
import "./css/App.css";
import "./css/bootstrap.min.css";
import moment from "moment";
import fb from "./config/config.jsx";
import firebase from "firebase/app";
import data from "./data.js";
import SplashScreen from "./components/SplashScreen";
const AppRouter = lazy(() => import("./routes/AppRouter"));

export default class App extends Component {
  constructor() {
    super();
    // this.state = data();
    this.state = {
      user: {},
      loading: true,
      defaults: {
        serviceGroups: [
          "Children Ministry",
          "Special Care",
          "Miracle Squad",
          "Prayer Squad",
          "Crowd Control",
          "Transport",
          "Safety",
          "Decoration",
          "Praise",
          "Peace Keepers",
          "Medical",
          "Editorial",
          "Technical",
          "Sanctuary",
          "Ushering",
          "Soul Establishment",
        ],
      },
    };
  }
  componentDidMount() {
    this.authListener();
  }
  authListener() {
    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        this.checkData();
        this.checkSlideShowPics();
      } else {
        this.setState({ user: null });
      }
    });
  }

  checkData = () => {
    firebase
      .firestore()
      .collection("members")
      .get()
      .then((data) =>
        data.forEach((member) => {
          if (member.data().uid === this.state.user.uid) {
            this.setState((prevState) => ({
              ...prevState,
              ...member.data(),
              loading: false,
            }));
            this.checkSoulsWon();
            this.checkNotifications();
            this.checkTestimonies();
            this.checkSermons();
          }
        })
      );
  };
  checkSlideShowPics = () => {
    firebase
      .firestore()
      .collection("slideShowPics")
      .get()
      .then((data) => {
        let slideShowPics = [];
        data.forEach((pic) => {
          slideShowPics.push({ ...pic.data() });
        });
        slideShowPics.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
        this.setState((prevState) => ({
          ...prevState,
          slideShowPics,
        }));
      });
  };
  checkNotifications = () => {
    firebase
      .firestore()
      .collection("notifications")
      .get()
      .then((data) => {
        let notifications = [];
        data.forEach((notification) => {
          // if (
          //   notification.data().from.toLowerCase() ===
          //     this.state.satelliteChurch.toLowerCase() ||
          //   notification.data().from.toLowerCase() === "headquarters"
          // ) {
          notifications.push({ ...notification.data() });
          // }
        });
        notifications.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
        this.setState((prevState) => ({
          ...prevState,
          notifications,
        }));
      });
  };
  checkSoulsWon = () => {
    firebase
      .firestore()
      .collection("soulsWon")
      .get()
      .then((data) => {
        let soulsWon = [];
        data.forEach((soul) => {
          soulsWon.push({ ...soul.data() });
        });
        this.setState((prevState) => ({
          ...prevState,
          soulsWon,
        }));
        this.checkMembers();
      });
  };
  checkTestimonies = () => {
    firebase
      .firestore()
      .collection("testimonies")
      .get()
      .then((data) => {
        let testimonies = [];
        data.forEach((testimony) => {
          testimonies.push({ ...testimony.data() });
        });
        this.setState((prevState) => ({
          ...prevState,
          testimonies,
        }));
      });
  };
  checkSermons = () => {
    firebase
      .firestore()
      .collection("sermons")
      .get()
      .then((data) => {
        let sermons = [];
        data.forEach((sermon) => {
          sermons.push({ ...sermon.data() });
        });
        this.setState((prevState) => ({
          ...prevState,
          sermons,
        }));
      })
      .catch((error) => console.log("sermon error:", error));
  };
  checkMembers = () => {
    firebase
      .firestore()
      .collection("members")
      .get()
      .then((data) => {
        let members = [];
        data.forEach((member) => {
          members.push({ ...member.data(), soulsWon: [] });
        });
        members.map((member) => {
          this.state.soulsWon.map((soul) => {
            if (soul.wonBy.id === member.id) {
              member.soulsWon.push(soul);
            }
          });
        });
        this.setState((prevState) => ({
          ...prevState,
          members,
        }));
      });
  };
  addNotification = (notification) => {
    firebase
      .firestore()
      .collection("notifications")
      .doc(`${notification.id}`)
      .set(notification)
      .then(
        this.setState((prevState) => ({
          ...prevState,
          notifications: [
            { ...notification, createdAt: moment() },
            ...prevState.notifications,
          ],
        }))
      )
      .catch((error) => console.log(error));
  };
  deleteNotification = (id) => {
    if (this.state.accountType !== "member") {
      firebase
        .firestore()
        .collection("notifications")
        .doc(`${id}`)
        .delete()
        .then(
          this.setState((prevState) => ({
            ...prevState,
            notifications: prevState.notifications.filter(
              (notification) => notification.id !== id
            ),
          }))
        )
        .catch((error) => console.log(error));
    }
  };
  addSoul = (soul) => {
    firebase
      .firestore()
      .collection("soulsWon")
      .doc(`${soul.id}`)
      .set(soul)
      .then(
        this.setState((prevState) => ({
          ...prevState,
          soulsWon: [{ ...soul, createdAt: moment() }, ...prevState.soulsWon],
        }))
      )
      .catch((error) => console.log(error));
  };
  editSoulProfile = (soulProfile) => {
    firebase
      .firestore()
      .collection("soulsWon")
      .doc(`${soulProfile.id}`)
      .update({
        name: soulProfile.name,
        address: soulProfile.address,
        phoneNumber: soulProfile.phoneNumber,
        occupation: soulProfile.occupation,
        busStop: soulProfile.busStop,
        gender: soulProfile.gender,
        prayerRequest: soulProfile.prayerRequest,
        serviceGroup: soulProfile.serviceGroup,
        verified: soulProfile.verified,
      })
      .then(
        this.setState((prevState) => ({
          ...prevState,
          soulsWon: prevState.soulsWon.map((soul) => {
            if (soul.id === soulProfile.id) {
              return { ...soul, ...soulProfile };
            }
            return soul;
          }),
        }))
      )
      .catch((error) => console.log(error));
  };
  deleteSoul = ({ id }) => {
    firebase
      .firestore()
      .collection("soulsWon")
      .doc(`${id}`)
      .delete()
      .then(
        this.setState((prevState) => ({
          ...prevState,
          soulsWon: prevState.soulsWon.filter((soul) => soul.id !== id),
        }))
      )
      .catch((error) => console.log(error));
  };
  addTestimony = (testimony) => {
    firebase
      .firestore()
      .collection("testimonies")
      .doc(`${testimony.id}`)
      .set(testimony)
      .then(
        this.setState((prevState) => ({
          ...prevState,
          testimonies: [
            { ...testimony, createdAt: moment() },
            ...prevState.testimonies,
          ],
        }))
      )
      .catch((error) => console.log(error));
  };
  deleteTestimony = ({ id }) => {
    firebase
      .firestore()
      .collection("testimonies")
      .doc(`${id}`)
      .delete()
      .then(
        this.setState((prevState) => ({
          ...prevState,
          testimonies: prevState.testimonies.filter(
            (testimony) => testimony.id !== id
          ),
        }))
      )
      .catch((error) => console.log(error));
  };
  addSermon = (sermon) => {
    firebase
      .firestore()
      .collection("sermons")
      .doc(`${sermon.id}`)
      .set(sermon)
      .then(
        this.setState((prevState) => ({
          ...prevState,
          sermons: [{ ...sermon, createdAt: moment() }, ...prevState.sermons],
        }))
      )
      .catch((error) => console.log(error));
  };
  deleteSermon = ({ id }) => {
    firebase
      .firestore()
      .collection("sermons")
      .doc(`${id}`)
      .delete()
      .then(
        this.setState((prevState) => ({
          ...prevState,
          sermons: prevState.sermons.filter((sermon) => sermon.id !== id),
        }))
      )
      .catch((error) => console.log(error));
  };
  addSlidePic = (pic) => {
    firebase
      .firestore()
      .collection("slideShowPics")
      .doc(`${pic.id}`)
      .set(pic)
      .then(
        this.setState((prevState) => ({
          ...prevState,
          slideShowPics: [
            ...prevState.slideShowPics,
            { ...pic, createdAt: moment() },
          ],
        }))
      )
      .catch((error) => console.log(error));
  };
  deleteSlidePic = (id) => {
    firebase
      .firestore()
      .collection("slideShowPics")
      .doc(`${id}`)
      .delete()
      .then(
        this.setState((prevState) => ({
          ...prevState,
          slideShowPics: prevState.slideShowPics.filter((pic) => pic.id !== id),
        }))
      )
      .catch((error) => console.log(error));
  };
  deleteMember = (id) => {
    this.setState((prevState) => ({
      ...prevState,
      members: prevState.members.filter((member) => member.id !== id),
    }));
  };
  editProfile = (profile) => {
    firebase
      .firestore()
      .collection("members")
      .doc(`${this.state.id}`)
      .update({
        name: profile.userName,
        address: profile.address,
        satelliteChurch: profile.satelliteChurch,
        profilePic: profile.profilePic,
        phoneNumber: profile.phoneNumber,
        country: profile.country,
        state: profile.state,
        occupation: profile.occupation,
        busStop: profile.busStop,
        gender: profile.gender,
        serviceGroup: profile.serviceGroup,
      })
      .then(
        this.setState((prevState) => ({
          ...prevState,
          name: profile.userName,
          address: profile.address,
          satelliteChurch: profile.satelliteChurch,
          profilePic: profile.profilePic,
          phoneNumber: profile.phoneNumber,
          country: profile.country,
          state: profile.state,
          occupation: profile.occupation,
          busStop: profile.busStop,
          gender: profile.gender,
          serviceGroup: profile.serviceGroup,
        }))
      )
      .catch((error) => console.log(error));
  };

  render() {
    const scrollFunction = () => {
      if (document.querySelector(".searchBarContainer")) {
        if (
          document.body.scrollTop > 25 ||
          document.documentElement.scrollTop > 25
        ) {
          document.querySelector(".searchBarContainer").style.top = "-50px";
        } else {
          document.querySelector(".searchBarContainer").style.top = "50px";
        }
      }
    };
    window.onscroll = function () {
      scrollFunction();
    };
    return (
      <div>
        <Suspense fallback={<SplashScreen />}>
          <AppRouter
            {...this.state}
            deleteNotification={this.deleteNotification}
            deleteSlidePic={this.deleteSlidePic}
            deleteTestimony={this.deleteTestimony}
            createNotification={this.addNotification}
            createTestimony={this.addTestimony}
            addSermon={this.addSermon}
            deleteSermon={this.deleteSermon}
            addSoul={this.addSoul}
            editSoulProfile={this.editSoulProfile}
            deleteSoul={this.deleteSoul}
            deleteMember={this.deleteMember}
            editProfile={this.editProfile}
            checkData={this.checkData}
            addSlidePic={this.addSlidePic}
            checkData={this.checkData}
          />
        </Suspense>
      </div>
    );
  }
}
