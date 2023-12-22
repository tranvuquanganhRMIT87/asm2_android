import React from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { FIREBASE_AUTH } from "../../../firebaseConfig";
const MAX_EMAIL_LENGTH = 20;
const { height, width } = Dimensions.get("screen");
const ProfileScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clear user session, navigate to the login screen, etc.
    console.log("User logged out");
    FIREBASE_AUTH.signOut();
    // Navigate to the login screen
    navigation.navigate("Authen");
  };

  return (
    <View>
      <View style={{ backgroundColor: "#00A86B", width: width, height: 150 }} />
      <Image
        source={{ uri: "https://placekitten.com/200/200" }} // Replace with the actual profile image URL
        style={styles.profileImage}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}> 
        <View>
          {/* Display additional user information or profile details here */}
          <View style={styles.container}>
            <View style={styles.row}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.info}>John Doe</Text>
            </View>
            <View style={styles.separator} />

            <View style={styles.row}>
              <Text style={styles.label}>Gender:</Text>
              <Text style={styles.info}>Male</Text>
            </View>
            <View style={styles.separator} />

            <View style={styles.row}>
              <Text style={styles.label}>Date of Birth:</Text>
              <Text style={styles.info}>January 1, 1990</Text>
            </View>
            <View style={styles.separator} />

            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
              <View
                style={
                  FIREBASE_AUTH.currentUser.email.length > MAX_EMAIL_LENGTH
                    ? styles.emailContainerWrap
                    : styles.emailContainer
                }
              >
                <Text style={styles.info}>
                  {FIREBASE_AUTH.currentUser.email}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          {/* Display additional user information or profile details here */}
          <View>
            <View style={styles.row}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.info}>John Doe</Text>
            </View>
            <View style={styles.separator} />

            <View style={styles.row}>
              <Text style={styles.label}>Gender:</Text>
              <Text style={styles.info}>Male</Text>
            </View>
            <View style={styles.separator} />

            <View style={styles.row}>
              <Text style={styles.label}>Date of Birth:</Text>
              <Text style={styles.info}>January 1, 1990</Text>
            </View>
            <View style={styles.separator} />

            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
              <View
                style={
                  FIREBASE_AUTH.currentUser.email.length > MAX_EMAIL_LENGTH
                    ? styles.emailContainerWrap
                    : styles.emailContainer
                }
              >
                <Text style={styles.info}>
                  {FIREBASE_AUTH.currentUser.email}
                </Text>
              </View>
            </View>
          </View>
          
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // Half of the width/height to create a circular shape
    marginBottom: 20,
    marginLeft: 100,
    marginTop: -80,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    margin: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  row: {
    flexDirection: "row",
    marginBottom: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  info: {
    fontSize: 16,
  },
  emailContainer: {
    flexDirection: "row",
    flex: 1,
  },
  emailContainerWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
  logoutButton: {
    backgroundColor: "#00A86B",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    marginHorizontal: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProfileScreen;
