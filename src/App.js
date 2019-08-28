import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { getUser } from './graphql/queries'
import { registerUser } from './graphql/mutations'
import { Authenticator, AmplifyTheme } from "aws-amplify-react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Auth, Hub } from "aws-amplify";
import "./App.css";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';



export const UserContext = React.createContext();

const muiTheme = createMuiTheme({
  palette: {
    primary: {main: "#00bcd4"},
    secondary: {main: "#ffc400"},
  },
  shadows: new Array(25)
  // status: {
  //   danger: orange[500],
  // },
});

function App() {
  const [user, setUser] = useState(null);

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
        getUserData();
        console.log(payload.data)
        registerNewUser(payload.data)
        break;
      case "signUp":
        console.log("signed up");
        getUserData();
        break;
      case "signOut":
        console.log("signed out");
        setUser(null);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const registerNewUser = async (signInData) => {
    const getUserInput = {
      id: signInData.signInUserSession.idToken.payload.sub
    }
    const { data } = await API.graphql(graphqlOperation(getUser, getUserInput))
    console.log("getUser data:", data)
    if(!data.getUser){
      try{
        const registerUserInput = {
          ...getUserInput,
          username: signInData.username,
          email: signInData.signInUserSession.idToken.payload.email,
          registered: true
        }
        console.log('new user input:', registerUserInput)
        const newUser = await API.graphql(graphqlOperation(registerUser, { input: registerUserInput }))
        console.log(newUser)
      }catch(err){
        console.error("Error registering new user",err)
      }
    }
  }

  const getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    user ? setUser(user) : setUser(null);
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
    <UserContext.Provider value={{ user }}>
     <ThemeProvider theme={muiTheme}>
      <Router>
        <Navbar user={user} handleSignOut={handleSignOut} />
          <div className="container">
            <Switch>

              <Route exact path="/" component={HomePage} />
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
  );
}

const theme = {
  ...AmplifyTheme,
  navBar: {
    ...AmplifyTheme.navBar,
    backgroundColor: "#ffc0cb"
  },
  button: {
    ...AmplifyTheme.button,
    backgroundColor: "var(--amazonOrange)"
  },
  formSection: {
    ...AmplifyTheme.formSection,
    marginTop: "2rem",
    backgroundColor: "#fafafa"
  },
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: "var(--squidInk)"
  },
  sectionBody: {
    ...AmplifyTheme.sectionBody,
    padding: "5px"
  }
};

export default App;
