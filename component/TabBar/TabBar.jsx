// CustomTabBar.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const TabBar = ({cleanerPlaces}) => {
  const navigation = useNavigation();
  const isHomeScreenFocused = useIsFocused('Home');
  const isProfileScreenFocused = useIsFocused('ProfileScreen');
  const isSearchScreenFocused = useIsFocused('SearchList');

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };
  const navigateToSearch = () =>{
    navigation.navigate('SearchList',{cleanerPlaces});
  }

  return (
    <View style={{marginBottom: "auto"}}>
    <View style={styles.tabBar}>
      <TouchableOpacity onPress={() => navigateToScreen('Home')} style={styles.tab}>
        <Ionicons
          name="home"
          size={24}
          color={isHomeScreenFocused ? 'black' : 'lightgray'}
          style={{ fontWeight: isHomeScreenFocused ? 'bold' : 'normal' }}
        />
        <Text style={{ fontWeight: isHomeScreenFocused ? 'bold' : 'normal' }}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('ProfileScreen')} style={styles.tab}>
        <Ionicons
          name="person"
          size={24}
          color={isProfileScreenFocused ? 'black' : 'lightgray'}
          style={{ fontWeight: isProfileScreenFocused ? 'bold' : 'normal' }}
        />
        <Text style={{ fontWeight: isProfileScreenFocused ? 'bold' : 'normal' }}>Profile</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#00A86B',
    height: 60,
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TabBar;
