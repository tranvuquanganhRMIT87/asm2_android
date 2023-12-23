import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from 'lottie-react-native';
import { useNavigation } from "@react-navigation/native";
import { Touchable } from "react-native";
import { setItem } from "../../../Util/asyncStrorage";

const {width, height} = Dimensions.get('window');
const OnBoarding = () => {
    const navigation = useNavigation();
    const handleDone = () =>{
        navigation.navigate("Home");
        setItem('onboarded',1);
    }

    const handleSkip = () =>{

    }

    const doneButton = ({...props}) =>{
        return(
            <TouchableOpacity style={styles.doneButton} {...props}>
                <Text>Done</Text>
            </TouchableOpacity>
        )
    }
    return (
      <View style={styles.container}>
        <Onboarding
          onDone={handleDone}
          onSkip={handleDone}
          bottomBarHighlight={false}
          DoneButtonComponent={doneButton}
          containerStyles={{paddingHorizontal: 15}}
          pages={[
            {
              backgroundColor: "#fff",
              image: 
              <View style={styles.lottie}>
              <Image source={require('../../../assets/icon/location.png')}  style={{ width: width*0.9, height:width}} />
              </View>,
              // image:(
              //   <View style={styles.lottie}>
              //       <LottieView source={require('../../../assets/animations/ani3.json')} style={{ width: width*0.9, height:width, backgroundColor:"red"}} autoPlay loop />
              //   </View>
              // ) ,
              title: "Navigation",
              subtitle: "Don't worry about getting lost",
            },
            {
              backgroundColor: "#fff",
              //   image: <Image source={require('./images/circle.png')} />,
              image:(
                <View style={styles.lottie}>
              <Image source={require('../../../assets/icon/green-earth.png')}  style={{ width: width*0.9, height:width}} />
              </View>
              ) ,
              title: "Enviroment",
              subtitle: "Don't throw trash away",
            },
            {
              backgroundColor: "#fff",
              //   image: <Image source={require('./images/circle.png')} />,
              image:(
                <View style={styles.lottie}>
              <Image source={require('../../../assets/icon/friendship.png')}  style={{ width: width*0.9, height:width}} />
              </View>
              ) ,
              title: "Friend Ship",
              subtitle: "New event, new friend",
            },
          ]}
        />
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  lottie:{
    width: width*0.9,
    height: width,
  },
  doneButton:{
    padding: 20,
    backgroundColor:'white',
    // borderTopLeftRadius: '100%',
    // borderBottomLeftRadius: '100%',
  }
});
export default OnBoarding;
