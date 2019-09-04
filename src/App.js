import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from "./graphql/queries";
import { registerUser } from "./graphql/mutations";
import { Authenticator, AmplifyTheme } from "aws-amplify-react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Auth, Hub } from "aws-amplify";
import "./App.css";
import { StateProvider } from "./context/store";
import { initialState, reducer } from "./context/reducer";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage"
import GalleryPage from "./pages/GalleryPage"
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// Redux
import { useSelector, useDispatch } from 'react-redux'



export const UserContext = React.createContext();


const muiTheme = createMuiTheme({
  palette: {
    primary: { main: "#00bcd4" },
    secondary: { main: "#ffc400" }
  },
  shadows: new Array(25)
  // status: {
  //   danger: orange[500],
  // },
});

function App() {
  const [user, setUser] = useState(null);
  const avatar = useSelector(state => state.avatar)
  const dispatch = useDispatch()

  Hub.listen("auth", data => {
    const { payload } = data;
    onAuthEvent(payload);
    console.log(
      "A new auth event has happened: ",
      data.payload.data.username + " has " + data.payload.event
    );
  });

  const onAuthEvent = payload => {
    switch (payload.event) {
      case "signIn":
        console.log("signed in");
        // setUserInfo()
        getUserData();
        console.log(payload.data);
        registerNewUser(payload.data);
        break;
      case "signUp":
        console.log("signed up");
        // setUserInfo()
        getUserData();
        break;
      case "signOut":
        console.log("signed out");
        setUser(null);
        // user = null
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getUserData();

  }, []);

  const registerNewUser = async signInData => {
    const getUserInput = {
      id: signInData.signInUserSession.idToken.payload.sub
    };
    const { data } = await API.graphql(graphqlOperation(getUser, getUserInput));
    console.log("getUser data:", data);
    if (!data.getUser) {
      try {
        const registerUserInput = {
          ...getUserInput,
          username: signInData.username,
          email: signInData.signInUserSession.idToken.payload.email,
          registered: true
        };
        console.log("new user input:", registerUserInput);
        const newUser = await API.graphql(
          graphqlOperation(registerUser, { input: registerUserInput })
        );
        console.log(newUser);
      } catch (err) {
        console.error("Error registering new user", err);
      }
    }
  };

  const getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    console.log(user);
    user ? setUser(user) : setUser(null);
    dispatch({ type: "SET_NEW_USER", payload: user })
    const currentUserProfile = await API.graphql(
      graphqlOperation(getUser, {
        id: user.attributes.sub
      })
    )
    const profile = currentUserProfile.data.getUser
    let key = ""
    if(profile.avatar == null){
      key = profile.avatar
    }else {
      key = profile.avatar.key
    }
    dispatch({ type: "SET_AVATAR", payload:key })
    dispatch({ type: "SET_PROFILE", payload:profile })
  };

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
    } catch (err) {
      console.log(err);
    }
  };

  return !user ? (
    <Authenticator theme={theme} />
  ) : (
    <StateProvider initialState={initialState} reducer={reducer}>
      <UserContext.Provider value={{ user }}>
        <ThemeProvider theme={muiTheme}>
          <Router>
            <Navbar user={user} handleSignOut={handleSignOut} />
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => <HomePage {...props} user={user} 
                   />}
                />
                <Route
                  exact
                  path="/profile/:id"
                  render={props => (
                    <ProfilePage
                      {...props}
                      // user={user}
                      id={props.match.params.id}
                    />
                  )}
                />
                <Route
                  exact
                  path="/gallery/:id"
                  render={props => (
                    <GalleryPage
                      {...props}
                      user={user}

                      id={props.match.params.id}
                    />
                  )}
                />
                {/* <Route
                  path="/markets/:marketId"
                  component={({ match }) => (
                    <MarketPageB marketId={match.params.marketId} user={user} />
                  )}
                /> */}
              </Switch>
            </div>
          </Router>
        </ThemeProvider>
      </UserContext.Provider>
      {/* </UserContext.Provider> */}
    </StateProvider>
  );
}

const theme = {
  // ...AmplifyTheme,
  // navBar: {
  //   ...AmplifyTheme.navBar,
  //   backgroundColor: "#ffc0cb"
  // },
  // button: {
  //   ...AmplifyTheme.button,
  //   backgroundColor: "var(--amazonOrange)"
  // },
  // formSection: {
  //   ...AmplifyTheme.formSection,
  //   marginTop: "2rem",
  //   backgroundColor: "#fafafa"
  // },
  // sectionHeader: {
  //   ...AmplifyTheme.sectionHeader,
  //   backgroundColor: "var(--squidInk)"
  // },
  // sectionBody: {
  //   ...AmplifyTheme.sectionBody,
  //   padding: "5px"
  // }
};

export default App;
