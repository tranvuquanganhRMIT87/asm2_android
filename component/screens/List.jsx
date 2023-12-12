
import React from 'react';
import { View, Button ,Text} from 'react-native';
import { FIREBASE_AUTH } from '../../firebaseConfig';

const List = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Email: {FIREBASE_AUTH.currentUser.email} </Text>
      <Button onPress={() => navigation.navigate('Details')} title="Open Details" />
      <Button onPress={() => FIREBASE_AUTH.signOut()} title="Log Out" />
    </View>
  );
};


export default List;




