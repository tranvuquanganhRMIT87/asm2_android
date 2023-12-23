import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Button,
  FlatList,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import { v4 as uuid } from "uuid"; // Import uuid
import "react-native-get-random-values";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import {
  updateDoc,
  doc,
  collection,
  documentId,
  query,
  where,
  getDoc,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc
} from "firebase/firestore";
import EventCard from "../screens/ReuseableComponent/EventCard";
export default function AdminHome() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isFormVisible, setFormVisibility] = useState(false);
  const [isUpdateFormVisible, setUpdateFormVisibility] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [slots, setSlots] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitudeDelta, setLatitudeDelta] = useState("");
  const [longitudeDelta, setLongitudeDelta] = useState("");
  const [datePickerType, setDatePickerType] = useState("");

  const navigation = useNavigation();
  const [cleanerPlaces, setCleanerPlaces] = useState([]);
  useEffect(() => {
    const userRef = collection(FIRESTORE_DB, "cleanerPlaces");
    const userQuery = query(
      userRef,
      where("owner", "==", FIREBASE_AUTH.currentUser.email)
    );

    const subscriber = onSnapshot(userQuery, {
      next: (snapshot) => {
        const cleanerPlacersData = [];
        snapshot.docs.forEach((doc) => {
          console.log(doc.data());
          cleanerPlacersData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCleanerPlaces(cleanerPlacersData);
      },
      error: (error) => {
        console.error("Error getting users:", error);
      },
    });

    return () => subscriber();
  }, []);

  const handleLogout = () => {
    console.log("User logged out");
    FIREBASE_AUTH.signOut();
    // Navigate to the login screen
    navigation.navigate("Authen");
  };

  const showDatePicker = (dateType) => {
    setDatePickerVisibility(true);
    setDatePickerType(dateType);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (selectedDate) => {
    hideDatePicker();

    if (datePickerType === "fromDate") {
      setFromDate(selectedDate);
    } else if (datePickerType === "toDate") {
      setToDate(selectedDate);
    }

    setFormVisibility(true);
    console.log("handle confirm date");
  };

  const handleCreateEvent = async () => {
    console.log("create event");

    // Generate a unique ID using uuid
    const eventId = uuid();

    const doc = await addDoc(collection(FIRESTORE_DB, "cleanerPlaces"), {
      id: eventId,
      name: eventName,
      address: eventAddress,
      fromDate: fromDate,
      endDate: toDate,
      description: "Your event description",
      slots: slots,
      level: level,
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta,
      participant: [],
      noti: [],
      owner: FIREBASE_AUTH.currentUser.email,
    });
    console.log("Document written with ID: ", doc.id);

    setFormVisibility(false);
  };

  const handleUpdateEvent = async (id) => {
    let documentID;
    console.log("update event", id);
    const q = query(
      collection(FIRESTORE_DB, "cleanerPlaces"),
      where("id", "==", id)
    );

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

    const eventRef = doc(collection(FIRESTORE_DB, "cleanerPlaces"), documentID);

    try {
      await updateDoc(eventRef, {
        name: eventName,
        address: eventAddress,
        description: "Your event description",
        slot: slots,
      });

      console.log("Document updated successfully");
      setUpdateFormVisibility(false);
    } catch (error) {
      console.error("Error updating document:", error.message);
    }
  };

  const deleteEvent = async (id) => {
    let documentID;
    console.log("delete event", id);

    // Query to find the document ID based on the provided ID
    const q = query(
      collection(FIRESTORE_DB, "cleanerPlaces"),
      where("id", "==", id)
    );

    try {
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Found matching document(s)
        querySnapshot.forEach((doc) => {
          console.log("Document ID:", doc.id);
          documentID = doc.id;
        });

        // Delete the document
        const eventRef = doc(
          collection(FIRESTORE_DB, "cleanerPlaces"),
          documentID
        );
        await deleteDoc(eventRef);

        console.log("Document deleted successfully");
      } else {
        console.log("No matching documents found");
      }
    } catch (error) {
      console.error("Error deleting document:", error.message);
    }
  };

  const formatDateToString = (date) => {
    return `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  };
  const noti = (participant) =>{
    Alert.alert(`You have ${participant.length > 0 ? participant.length : 0} participant`);
    Alert.alert(`${participant.length > 0 ? `${participant[participant.length-1]} is a new participant` : "there are no one join the event"}`);
  }
  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            marginBottom: 5,
            paddingLeft: 110,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          AdminHome
        </Text>
        <Text>Admin: {FIREBASE_AUTH.currentUser.email}</Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Create event</Text>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => showDatePicker("fromDate")}>
            <Text>Select Start Date</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showDatePicker("toDate")}>
            <Text>Select End Date</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
          />

          <Modal
            animationType="slide"
            transparent={true}
            visible={isFormVisible}
            onRequestClose={() => {
              setFormVisibility(false);
            }}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Create Event</Text>
              <Text style={styles.label}>Name:</Text>
              <TextInput
                style={styles.input}
                placeholder="Event Name"
                value={eventName}
                onChangeText={(text) => setEventName(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Event Address"
                value={eventAddress}
                onChangeText={(text) => setEventAddress(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="description"
                value={description}
                onChangeText={(text) => setDescription(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Slots"
                value={slots}
                onChangeText={(double) => setSlots(double)}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Level"
                value={level}
                onChangeText={(text) => setLevel(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Latitude"
                value={latitude}
                onChangeText={(double) => setLatitude(double)}
              />
              <TextInput
                style={styles.input}
                placeholder="Longitude"
                value={longitude}
                onChangeText={(double) => setLongitude(double)}
              />
              <TextInput
                style={styles.input}
                placeholder="Latitude Delta"
                value={latitudeDelta}
                onChangeText={(double) => setLatitudeDelta(double)}
              />
              <TextInput
                style={styles.input}
                placeholder="Longitude Delta"
                value={longitudeDelta}
                onChangeText={(double) => setLongitudeDelta(double)}
              />
              <TextInput
                style={styles.input}
                placeholder={`Start Date: ${formatDateToString(fromDate)}`}
                editable={false}
              />
              <TextInput
                style={styles.input}
                placeholder={`End Date: ${formatDateToString(toDate)}`}
                editable={false}
              />
              <Button title="Create Event" onPress={handleCreateEvent} />
            </View>
          </Modal>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Event created</Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={cleanerPlaces}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: "black", fontWeight: "bold" }}>
                    Name:{" "}
                  </Text>
                  <Text style={{ color: "black" }}>{item.name}</Text>
                </View>
                <View style={{ flexDirection: "row", fontWeight: "bold" }}>
                  <Text style={{ color: "black", fontWeight: "bold" }}>
                    Address:{" "}
                  </Text>
                  <Text style={{ color: "black" }}>{item.address}</Text>
                </View>
                <View style={{ flexDirection: "row", fontWeight: "bold" }}>
                  <Text style={{ color: "black", fontWeight: "bold" }}>
                    From:{" "}
                  </Text>
                  <Text style={{ color: "black" }}>
                    {item.fromDate && item.fromDate.seconds
                      ? new Date(
                          item.fromDate.seconds * 1000 +
                            item.fromDate.nanoseconds / 1e6
                        ).toLocaleString("en-US")
                      : "Date not available"}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", fontWeight: "bold" }}>
                  <Text style={{ color: "black", fontWeight: "bold" }}>
                    To:{" "}
                  </Text>
                  <Text style={{ color: "black" }}>
                    {item.endDate && item.endDate.seconds
                      ? new Date(
                          item.endDate.seconds * 1000 +
                            item.endDate.nanoseconds / 1e6
                        ).toLocaleString("en-US")
                      : "Date not available"}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", fontWeight: "bold" }}>
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  Slot:{" "}
                </Text>
                <Text style={{ color: "black" }}>
                  {item.slot - item.participant.length}
                </Text>
              </View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={isUpdateFormVisible}
                onRequestClose={() => {
                  setUpdateFormVisibility(false);
                }}
              >
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>Update Event</Text>
                  <Text style={styles.label}>Name:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Event Name"
                    value={eventName}
                    onChangeText={(text) => setEventName(text)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Event Address"
                    value={eventAddress}
                    onChangeText={(text) => setEventAddress(text)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Slots"
                    value={slots}
                    onChangeText={(double) => setSlots(double)}
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Level"
                    value={level}
                    onChangeText={(text) => setLevel(text)}
                  />
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ marginRight: 5 }}>
                      <Button
                        title="UpdateEvent"
                        onPress={() => handleUpdateEvent(item.id)}
                      />
                    </View>
                    <View>
                      <Button
                        title="Cancel"
                        onPress={() => setUpdateFormVisibility(false)}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
              <FlatList
                style={{ height: 20 }}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={item.participant}
                renderItem={({ user }) => (
                  <View>
                    <Text style={{ color: "black" }}>{user}</Text>
                  </View>
                )}
              />
              <TouchableOpacity
                onPress={() => setUpdateFormVisibility(true)}
                style={styles.logoutButton}
              >
                <Text>Update event</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteEvent(item.id)}
                style={styles.logoutButton}
              >
                <Text>Delete event</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => noti(item.participant)}
                style={styles.logoutButton}
              >
                <Text>Noti</Text>
              </TouchableOpacity>
            </View>
          )}
          style={styles.container11}
        />
      </View>
      {/* update form*/}
      <View>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Update event</Text>
        
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
  container11: {
    height: 400,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    margin: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  input: {
    height: 40,
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  logoutButton: {
    backgroundColor: "#00A86B",
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
  },
});
