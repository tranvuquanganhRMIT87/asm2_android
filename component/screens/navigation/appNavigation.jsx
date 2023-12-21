import { Text, View } from 'react-native'
import React, { Component, useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import List from '../List';

const Stack = createNativeStackNavigator();

export class appNavigation extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" options={{headerShown:false}} component={HomeScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default appNavigation