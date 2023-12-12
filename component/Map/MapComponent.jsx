import React, { useEffect, useState } from 'react';
import { View, StyleSheet,Dimensions, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { useNavigation } from "@react-navigation/native";


const { width, height } = Dimensions.get('window');


const MapComponent = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

//   useEffect(() => {
//     // Get the current location here using a location library or API
//     // For example, you can use the Geolocation API:
//     navigator.geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         setCurrentLocation({ latitude, longitude });
//       },
//       error => {
//         console.error(error);
//       }
//     );
//   }, []);

  return (
    <View style={styles.container}>
        <Text>alo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height - 30,
    backgroundColor: "red",
  },
  map: {
    flex: 1,
  },
});

export default MapComponent;
