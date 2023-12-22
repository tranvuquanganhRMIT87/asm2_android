import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import GlobalAPI from "../../../Services/GlobalAPI";
import React, { Component, useState, useEffect } from "react";
import {
  updateDoc,
  doc,
  collection,
  documentId,
  query,
  where,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../../firebaseConfig";
const { height, width } = Dimensions.get("screen");
const EventCard = ({ place, user }) => {
  const [register, setRegister] = useState(false);
  // user collection
  const userCollection = collection(FIRESTORE_DB, "users");

  const PLACE_IMAGE = "https://places.googleapis.com/v1/";
  // Check if place and place.photos are defined before accessing properties
  const imageUrl = place?.photos?.[0]?.name
    ? PLACE_IMAGE +
      place.photos[0].name +
      "/media?key=" +
      GlobalAPI.API_KEY +
      "&maxHeightPx=800&maxWidthPx=1200"
    : null;

  const handleRegister = async () => {
    let documentID;
    let documentIDUser;

    const q = query(
      collection(FIRESTORE_DB, "cleanerPlaces"),
      where("id", "==", place.id)
    );
    const q1 = query(
      collection(FIRESTORE_DB, "users"),
      where("uid", "==", FIREBASE_AUTH.currentUser.uid)
    );
    // find document id of place
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // Found matching document(s)
      querySnapshot.forEach((doc) => {
        console.log("Document ID:", doc.id);
        documentID = doc.id;
      });
    } else {
      console.log("No matching documents found");
    }

    // find the document id of user
    const querySnapshotUser = await getDocs(q1);
    if (!querySnapshotUser.empty) {
      // Found matching document(s)
      querySnapshotUser.forEach((doc) => {
        console.log("Document ID:", doc.id);
        documentIDUser = doc.id;
      });
    } else {
      console.log("No matching documents found");
    }

    const userRef = doc(collection(FIRESTORE_DB, "users"), documentIDUser);
    const userDoc = await getDoc(userRef);
    const placeRef = doc(collection(FIRESTORE_DB, "cleanerPlaces"), documentID);

    if (!register) {
        //add user to event
      await updateDoc(placeRef, {
        participant: [...place.participant, FIREBASE_AUTH.currentUser.uid],
      });
      // add event to user
      await updateDoc(userRef, {
        event: [...userDoc.data().event, place.id],
      });
      setRegister(true);

      Alert.alert("You registered successfully");

      console.log("userDoc:", FIREBASE_AUTH.currentUser.uid);
    } else {
      await updateDoc(placeRef, {
        participant: place.participant.filter(
          (item) => item !== FIREBASE_AUTH.currentUser.uid
        ),
      });
      setRegister(false);
      Alert.alert("You canceled your registration");
    }
  };
  return (
    <View style={styles.wrapper}>
      <Image
        source={
          imageUrl
            ? { uri: imageUrl }
            : require("../../../assets/icon/lock.png")
        }
        style={{
          width: 260,
          height: 120,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
      />
      <View style={{ paddingHorizontal: 10, marginTop: 3 }}>
        <Text style={{ color: "red", fontWeight: 500 }}>Đang diễn ra</Text>
        <Text
          style={{
            textTransform: "uppercase",
            fontWeight: "bold",
            paddingBottom: 3,
          }}
        >
          {place.name}
        </Text>
        <Text style={{ fontWeight: "bold", color: "gray" }}>
          {place.address}
        </Text>
        <View style={{ flexDirection: "row"}}>
          <Text style={{ marginRight: 15 }}>participant: {place.participant.length}</Text>
          <Text>Available slot: {place.slot}</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            { backgroundColor: register ? "#D3D3D3" : "#00A86B" },
          ]}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>
            {register ? "Cancel" : "Register"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 5,
    height: 280,
    width: 270,
    backgroundColor: "white",
    elevation: 4,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonContainer: {
    backgroundColor: "#00A86B",
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default EventCard;
