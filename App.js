import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, _View } from "react-native";
import Login from "./component/screens/Authen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { User, onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { FIREBASE_AUTH } from "./firebaseConfig";
import SearchList from "./component/screens/SearchList";
import Detail from "./component/screens/Details";
import OnBoarding from "./component/screens/Onboarding/OnBoarding";
import HomeScreen from "./component/screens/HomeSreen";
import { getItem } from "./Util/asyncStrorage";
import * as Location from "expo-location";
import { UserLocationContext } from "./component/Context/UserLocationContext";
import GlobalAPI from "./Services/GlobalAPI";
import PlaceList from "./component/PlaceList/PlaceList";
import Authen from "./component/screens/Authen";
import ProfileScreen from "./component/screens/ProfileView/ProfileScreen";
const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="SearchList" component={SearchList} />
      <InsideStack.Screen name="Details" component={Detail} />
    </InsideStack.Navigator>
  );
}
export default function App() {

  const [user, setUser] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(null);
  // consider again
  /*const {location, setLocation} = useContext(UserLocationContext);*/
  const [location, setLocation] = useState(null);

  const [errorMsg, setErrorMsg] = useState(null);
  
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      console.log("user", authUser);
      console.log(showOnboarding)
      setUser(authUser);
    });
  }, []);

  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    let onboared = await getItem("onboarded");

    if (onboared == 1) {
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({ maximumAge: 0 });
      setLocation(location);
      console.log("location", location);
    })();
  }, []);

  if (showOnboarding == null) {
    return null;
  }

  
  if (!showOnboarding && user == null) {
    return (
      <UserLocationContext.Provider value={{ location, setLocation }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Authen">
            <Stack.Screen
              name="Authen"
              component={Authen}
              options={{ headerShown: false }}/>
            <Stack.Screen
              name="Onboarding"
              component={OnBoarding}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SearchList"
              component={SearchList}
              options={{ headerShown: true }}/>

               <Stack.Screen
              name="ProfileScreen"
              component={ProfileScreen}
              options={{ headerShown: true }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </UserLocationContext.Provider>
    );
  } else {
    return (
      <UserLocationContext.Provider value={{ location, setLocation }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Onboarding"
              component={OnBoarding}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false , user: user}}
            />
            <Stack.Screen
              name="SearchList"
              component={SearchList}
              options={{ headerShown: true }}/>
              <Stack.Screen
              name="ProfileScreen"
              component={ProfileScreen}
              options={{ headerShown: true }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </UserLocationContext.Provider>
    );
  }
}
