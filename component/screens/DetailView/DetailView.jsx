// PlaceDetail.js
import React from "react";
import { View, Text } from "react-native";

const DetailView = ({ route }) => {
  const { place } = route.params;

  return (
    <View>
      <Text>{place.name}</Text>
      {/* Add more details as needed */}
    </View>
  );
};

export default DetailView;
