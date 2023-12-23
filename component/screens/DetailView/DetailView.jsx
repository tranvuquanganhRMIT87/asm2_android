import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { FIREBASE_AUTH , FIRESTORE_DB} from "../../../firebaseConfig";
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

const { width, height } = Dimensions.get("screen");
const DetailView = ({ route }) => {
  const { place } = route.params;
  const [placeLocation, setPlaceLocation] = useState({});

  const [register, setRegister] = useState(false);
  // user collection
  const userCollection = collection(FIRESTORE_DB, "users");

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

  useEffect(() => {
    if (place) {
      setPlaceLocation({
        latitude: place.latitude,
        longitude: place.longitude,
        latitudeDelta: place.latitudeDelta,
        longitudeDelta: place.longitudeDelta,
      });
    }
  }, [place]);

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../../../assets/icon/lock.png")}
        style={{
          width: width,
          height: 200,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
      />
      <View style={styles.infoWrapper}>
        <View style={styles.row}>
          <Text style={styles.label}>Name: </Text>
          <Text style={styles.info}>{place.name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Address:  </Text>
          <Text style={styles.info}>{place.address}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>From:  </Text>
          <Text style={styles.info}>
            {place.fromDate && place.fromDate.seconds
              ? new Date(
                  place.fromDate.seconds * 1000 +
                    place.fromDate.nanoseconds / 1e6
                ).toLocaleString("en-US")
              : "Date not available"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>To:  </Text>
          <Text style={styles.info1}>
            {place.endDate && place.endDate.seconds
              ? new Date(
                  place.endDate.seconds * 1000 +
                    place.endDate.nanoseconds / 1e6
                ).toLocaleString("en-US")
              : "Date not available"}
          </Text>
        </View>
        <View style={styles.row1}>
          <Text style={styles.label}>Description: </Text>
          <Text style={styles.info}>{place.description}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Owner: </Text>
          <Text style={styles.info}>{place.owner}</Text>
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
      <Text style={{paddingLeft: 20, marginBottom: 10, fontSize: 15, fontWeight: "bold"}}>How to get there?</Text>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          width: Dimensions.get("screen").width,
          height: Dimensions.get("screen").height * 0.23,
        }}
        showsUserLocation={true}
        region={placeLocation}
      >
        <Marker
          coordinate={placeLocation}
          title={place.name}
          description={"Event place"}
        />
      </MapView>
      <View style={{width: width, height: 100}}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  infoWrapper: {
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
    row1: {
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
  info: {
    fontSize: 16,
  },
  info1: {
    fontSize: 16,
  },
  
});

export default DetailView;
