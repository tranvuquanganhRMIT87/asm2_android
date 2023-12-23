import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Button,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuid } from "uuid"; // Import uuid
import 'react-native-get-random-values';
import { FIRESTORE_DB } from "../../firebaseConfig";
import { FIREBASE_AUTH } from "../../firebaseConfig";

export default function AdminHome() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isFormVisible, setFormVisibility] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [slots, setSlots] = useState("");
  const [level, setLevel] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitudeDelta, setLatitudeDelta] = useState("");
  const [longitudeDelta, setLongitudeDelta] = useState("");
  const [datePickerType, setDatePickerType] = useState("");

  const navigation = useNavigation();

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
      owner: FIREBASE_AUTH.currentUser.email,
    });
    console.log("Document written with ID: ", doc.id);

    setFormVisibility(false);
  };

  const formatDateToString = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>AdminHome</Text>
        <View>
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
        
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}> 
        <Text>Logout</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
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
