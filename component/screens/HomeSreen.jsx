import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";
import React, { Component, useState } from "react";
import { SafeAreaView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { removeItem } from "../../Util/asyncStrorage";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import NavigateIcon from "../screens/ReuseableComponent/NavigateIcon";
import mapImage from "../../assets/icon/map.png";
import dotsImage from "../../assets/icon/dots.png";
import MapComponent from "../Map/MapComponent";
const { height, width } = Dimensions.get("window");
const HomeSreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const handleReset = async () => {
    await removeItem("onboarded");
    navigation.push("Onboarding");
  };
  const handleSearch = () => {
    navigation.navigate("List", { searchText });
  };
  return (
    // <SafeAreaView>
    //     <View style={styles.container}>
    //   <TouchableOpacity onPress={handleReset}>
    //     <Text>Home ne</Text>
    //   </TouchableOpacity>

    //     </View>
    // </SafeAreaView>
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="rgb(0,0,0,0)"
      />
      <View style={styles.iamgeBanner}>
        <View style={styles.contentBanner}>
          <View style={styles.leftContent}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Let's make the world a cleaner!
            </Text>
            <Text style={{ fontSize: 14, paddingTop: 6 }}>
              Join the tidy-up adventure!
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
            <Ionicons name="ios-search" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Search"
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
              onSubmitEditing={handleSearch}
            />
          </View>
        </View>
        <View style={styles.wrapperIcon}>
          <View style={{ paddingRight: 36, width: "20%" }}>
            <NavigateIcon iconName={mapImage} />
            <Text style={styles.textFeatureWrapper}>Lookup</Text>
          </View>
          <View style={{ paddingRight: 36 }}>
            <NavigateIcon />
            <Text style={styles.textFeatureWrapper}>Map</Text>
          </View>
          <View style={{ paddingRight: 36 }}>
            <NavigateIcon />
            <Text style={styles.textFeatureWrapper}>Map</Text>
          </View>
          <View style={{ paddingRight: 36 }}>
            <NavigateIcon />
            <Text style={styles.textFeatureWrapper}>Map</Text>
          </View>
          <View style={{ paddingRight: 36 }}>
            <NavigateIcon iconName={dotsImage} />
            <Text style={styles.textFeatureWrapper}>Map</Text>
          </View>
        </View>
        <View style={{marginTop: 20,marginHorizontal: 20}}>
          <View style={{ flexDirection: 'row', alignContent: 'center'}}>
            <Text style={styles.headerText}>Nearby Cleaner Place</Text>
            <Ionicons style={{alignItems: 'baseline', paddingTop: 1, paddingLeft: 5}} name="chevron-forward-outline" size={15}/>
          </View>
          <View style={{  marginTop: 20 }}>
            <MapComponent/>
          </View>
        </View>
      </View>
    </View>
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
  iamgeBanner: {
    height: 210,
    width: width,
    backgroundColor: "green",
  },
  contentBanner: {
    flexDirection: "row",
    height: 170,
    alignItems: "center",
    paddingHorizontal: 20,
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
    height: 150,
    marginTop: -30,
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
  input: {
    height: 60,
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 10,
    borderColor: "#ffff",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
  headerText:{
    fontSize: 15,
    fontWeight: "bold",
  }
});
