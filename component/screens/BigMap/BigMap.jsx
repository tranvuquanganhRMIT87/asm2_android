import { View, Text , StyleSheet} from 'react-native'
import React, {useState, useContext, useEffect} from 'react'
import MapComponent from '../../Map/MapComponent'
import { useRoute } from '@react-navigation/native';
import { UserLocationContext } from "../../Context/UserLocationContext";
import { PROVIDER_GOOGLE } from "react-native-maps";
import MapView, { Marker } from "react-native-maps";
import { Dimensions } from "react-native";
const Details = () => {
const { params } = useRoute();
  const { cleanerPlaces } = params;
  const [currentLocation, setCurrentLocation] = useState({});

  const { location, setLocation } = useContext(UserLocationContext);
  const latTest =  {
    
  }
  useEffect(() => {
    if (location) {
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0421,
      });
    }
  }, [location]);
  return (
    <View style={styles.container}>
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{
        width: Dimensions.get("screen").width ,
        height: Dimensions.get("screen").height,
      }}
      showsUserLocation={true}
      region={currentLocation}
    >
      <Marker
        coordinate={currentLocation}
        title={"Your Location"}
        description={"You are here"}
      />
      {cleanerPlaces.map((place, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: place.latitude,
            longitude: place.longitude,
            latitudeDelta: place.latitudeDelta,
            longitudeDelta: place.longitudeDelta,
          }}
          title={place.name}
        />
      ))}
    </MapView>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
})
export default Details