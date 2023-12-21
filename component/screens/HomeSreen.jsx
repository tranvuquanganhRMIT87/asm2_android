import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  FlatList,
  Button,
} from "react-native";
import React, { Component, useState, useEffect } from "react";

import { SafeAreaView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { removeItem } from "../../Util/asyncStrorage";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import NavigateIcon from "../screens/ReuseableComponent/NavigateIcon";
import mapImage from "../../assets/icon/map.png";
import dotsImage from "../../assets/icon/dots.png";
import MapComponent from "../Map/MapComponent";
import GlobalAPI from "../../Services/GlobalAPI";
import PlaceList from "../PlaceList/PlaceList";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import EventCard from "./ReuseableComponent/EventCard";

const { height, width } = Dimensions.get("window");
const HomeSreen = ({user}) => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [placeList, setPlaceList] = useState([]);

  const [cleanerPlaces, setCleanerPlaces] = useState([]);
  const [cleanerPlacer, setCleanerPlacer] = useState("");
  const district = [
    "District 8",
    "District 1",
    "District 2",
    "District 3",
    "District 4",
    "District 5",
    "District 6",
    "District 7",
    "District 9",
    "District 10",
    "District 11",
    "District 12",
    "District Bình Tân",
    "District Bình Thạnh",
    "District Gò Vấp",
    "District Phú Nhuận",
    "District Tân Bình",
    "District Tân Phú",
    "District Thủ Đức",
  ];

  const handleReset = async () => {
    await removeItem("onboarded");
    navigation.push("Onboarding");
  };

  const handleSearch = () => {
    navigation.navigate("SearchList", { cleanerPlaces });
    console.log("user1:",user);
  };

  /*  cleaner placer block */
  const addTodo = async () => {
    console.log("addTodo");
    const doc = await addDoc(collection(FIRESTORE_DB, "cleanerPlaces"), {
      text: "test",
      done: false,
    });
    console.log("Document written with ID: ", doc.id);
  };

  useEffect(() => {
    const cleanerPlacerRef = collection(FIRESTORE_DB, "cleanerPlaces");
    const subscriber = onSnapshot(cleanerPlacerRef, {
      next: (snapshot) => {
        const cleanerPlacers = [];
        snapshot.docs.forEach((doc) => {
          console.log(doc.data());
          cleanerPlacers.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCleanerPlaces(cleanerPlacers);
      },
    });
    return () => subscriber();
  }, []);

  /*cleaner placer block */
  useEffect(() => {
    GetNearBySearchPlaces();
  }, []);

  const GetNearBySearchPlaces = async () => {
    GlobalAPI.nearByPlace()
      .then((res) => {
        // console.log(JSON.stringify(res.data.places));
        setPlaceList(res.data.places);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.contentBanner}>
        <View style={styles.leftContent}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Let's make the world a cleaner!
          </Text>
          <Text style={{ fontSize: 14, paddingTop: 6 }}>
            Join the tidy-up adventure!!!
          </Text>
        </View>
        <View style={styles.rightContent}>
          <Image
            source={require("../../assets/icon/lock.png")}
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.containerSearch}>
          <View style={{ width: 20, height: 20, backgroundColor: "white" }}>
            <Ionicons name="ios-search" size={20} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Search"
            // value={searchText}
            // onChangeText={(text) => setSearchText(text)}
            // onSubmitEditing={handleSearch}
            onTouchStart={handleSearch}
            keyboardAppearance="dark"
          />
        </View>
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={district}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "row", paddingTop: 10 }}>
                <View
                  style={{
                    backgroundColor: "#00A86B",
                    borderRadius: 8,
                    marginLeft: 5,
                  }}
                >
                  <Text style={{ paddingHorizontal: 8, paddingVertical: 3 }}>
                    {item}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
      <View style={{ marginTop: 20, marginHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            marginBottom: 10,
          }}
        >
          <Text style={styles.headerText}>Must-joined event this month</Text>
          <Ionicons
            style={{ alignItems: "baseline", paddingTop: 1, paddingLeft: 5 }}
            name="chevron-forward-outline"
            size={15}
          />
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={cleanerPlaces}
          renderItem={({ item }) => <EventCard place={item} user={user} />}
          style={{ height: 300 }}
        />
      </View>
      <View style={{ marginTop: 20, marginHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
          }}
        >
          <Text style={styles.headerText}>Nearby Cleaner Place</Text>
          <Ionicons
            style={{ alignItems: "baseline", paddingTop: 1, paddingLeft: 5 }}
            name="chevron-forward-outline"
            size={15}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <MapComponent cleanerPlaces={cleanerPlaces} />
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          marginHorizontal: 20,
          // backgroundColor: "red",
        }}
      >
        <View style={{ flexDirection: "row", alignContent: "center" }}>
          <Text style={styles.headerText}>Hey, are you lack of energy?</Text>
          <Ionicons
            style={{ alignItems: "baseline", paddingTop: 1, paddingLeft: 5 }}
            name="chevron-forward-outline"
            size={15}
          />
        </View>
        <View style={{ marginTop: 20, height: 500 }}>
          {placeList ? <PlaceList placeList={placeList} /> : null}
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeSreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  contentBanner: {
    flexDirection: "row",
    height: 170,
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#00A86B",
    width: width,
    height: 210,
  },
  leftContent: {
    flex: 1, // Takes 1/2 of the horizontal space
    paddingRight: 10, // Adjust as needed
    justifyContent: "space-between",
  },
  rightContent: {
    flex: 0, // Takes 1/2 of the horizontal space
    paddingLeft: 10, // Adjust as needed
  },
  image: {
    width: 50, // Make the image take the full width of its container
    height: 50, // Make the image take the full height of its container
    resizeMode: "cover", // Adjust the resizeMode as needed
  },
  wrapper: {
    marginHorizontal: 18,
    height: 120,
    // can consider lai margin top
    marginTop: -40,
    backgroundColor: "white",
    elevation: 4,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  containerSearch: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: "#ffff",
    borderRadius: 8,
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
  },
  input: {
    height: 60,
    // width: 70,
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 10,
    borderColor: "#ffff",
    // elevation: 4,
  },
  wrapperIcon: {
    flexDirection: "row",
    marginTop: 30,
    paddingHorizontal: 20,
    // width: width,
    // flexWrap: "wrap",
    /*
      consider the flexwrap
      consider the margin of the wrapperIcon
    */
  },
  textFeatureWrapper: {
    textAlign: "center",
    marginTop: 5,
  },
  headerText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
