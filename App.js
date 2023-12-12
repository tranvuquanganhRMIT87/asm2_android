import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, _View } from "react-native";
import Login from "./component/screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "./firebaseConfig";
import List from "./component/screens/List";
import Detail from "./component/screens/Details";
import OnBoarding from "./component/screens/Onboarding/OnBoarding";
import HomeScreen from "./component/screens/HomeSreen";
import { getItem } from "./Util/asyncStrorage";
const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="List" component={List} />
      <InsideStack.Screen name="Details" component={Detail} />
    </InsideStack.Navigator>
  );
}
export default function App() {
  const [user, setUser] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      console.log("user", authUser);
      setUser(authUser);
    });
  }, []);

  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    let onboared = await getItem('onboarded');

    if (onboared == 1) {
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
  };

  // if (showOnboarding== null){
  //   return null;
  // }

  if (showOnboarding){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          {/* {user ? (
            <Stack.Screen
              name="OnBoarding"
              component={OnBoarding}
              options={{ headerShown: true }}
            />
          ) : (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          )} */}
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
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  else{
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {/* {user ? (
            <Stack.Screen
              name="OnBoarding"
              component={OnBoarding}
              options={{ headerShown: true }}
            />
          ) : (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          )} */}
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
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
