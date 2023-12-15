import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { UserLocationContext } from "../Context/UserLocationContext";
// const { width, height } = Dimensions.get("screen");

const MapComponent = () => {
  const [currentLocation, setCurrentLocation] = useState({});
  
const {location,setLocation} = useContext(UserLocationContext)
useEffect(() => {
    if (location){
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0421,
      })
    }
},[location])


  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          width:  Dimensions.get('screen').width * 0.91,
          height:  Dimensions.get('screen').height * 0.23,
          
        }}
        showsUserLocation={true}
        region={currentLocation}
      ></MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // container padding need to re-consider
    backgroundColor: "red",
    borderRadius: 20,
    overflow: "hidden",
  },
});

export default MapComponent;
