import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const NavigateIcon = ({iconName}) => {
  return (
    <View style={styles.circle}>
      {/* <Ionicons style={styles.imageIcon} name="ios-search" size={40}/> */}
      <Image style={styles.imageIcon} source={iconName}/>
    </View>
  );
};

const styles = StyleSheet.create({
    circle: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: "#98FB98",
        bottom: 0,
        right: 0,
        // marginRight: 20,
        // marginBottom: 7,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        alignItems: "center",
        justifyContent: "center",
      },
      imageIcon:{
        width: 30,
        height: 30,
        resizeMode: 'cover',
        aspectRatio: 1,
    
        
    },
});
export default NavigateIcon;
