import { View, Text, Image, StyleSheet, Dimensions} from "react-native";
import React from "react";
import GlobalAPI from "../../../Services/GlobalAPI";

const {height, width} = Dimensions.get("screen");
const NearByPlaceCard = ({ place }) => {
  const PLACE_IMAGE = "https://places.googleapis.com/v1/";

  // Check if place and place.photos are defined before accessing properties
  const imageUrl = place?.photos?.[0]?.name
    ? PLACE_IMAGE +
      place.photos[0].name +
      "/media?key=" +
      GlobalAPI.API_KEY +
      "&maxHeightPx=800&maxWidthPx=1200"
    : null;
  // console.log(place.formattedAddress)
  return (
    <View style={styles.wrapper}>
      <Image
        source={
          imageUrl
            ? { uri: imageUrl }
            : require("../../../assets/icon/lock.png")
        }
        style={{ width: 260, height: 120, borderTopRightRadius: 10, borderTopLeftRadius: 10}}
      />
      <Text style={{textTransform:'uppercase', fontWeight:'bold', paddingBottom: 10}}>{place.displayName.text}</Text>
      <Text>{place.formattedAddress}</Text>
    </View>
  );
};

export default NearByPlaceCard;

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 5,
    height: 200,
    width: 260,
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
  }
});