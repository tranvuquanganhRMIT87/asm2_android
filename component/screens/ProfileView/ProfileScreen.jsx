import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import  {FIREBASE_AUTH} from '../../../firebaseConfig';
const ProfileScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clear user session, navigate to the login screen, etc.
    console.log('User logged out');
    FIREBASE_AUTH.signOut();
    // Navigate to the login screen
    navigation.navigate('Authen');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://placekitten.com/200/200' }} // Replace with the actual profile image URL
        style={styles.profileImage}
      />
      <Text style={styles.profileName}>John Doe</Text>
      {/* Display additional user information or profile details here */}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // Half of the width/height to create a circular shape
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ProfileScreen;
