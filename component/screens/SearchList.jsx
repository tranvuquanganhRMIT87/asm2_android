import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import TabBar from "../TabBar/TabBar";

const SearchList = ({ navigation }) => {
  const { params } = useRoute();
  const { cleanerPlaces } = params;
  const [searchText, setSearchText] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navigateToDetail = (place) => {
    navigation.navigate("PlaceDetail", { place });
  };

  const handleSearch = () => {
    // Filter cleanerPlaces based on searchText, selectedDistrict, and selectedLevel
    if (!searchText && !selectedDistrict && !selectedLevel) {
      setSearchResults(cleanerPlaces);
      return;
    }
    const results = cleanerPlaces.filter((place) => {
      const nameMatch = place.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const districtMatch =
        !selectedDistrict || place.district === selectedDistrict;
      const levelMatch = !selectedLevel || place.level === selectedLevel;
      return (
        (nameMatch && districtMatch && levelMatch) ||
        (nameMatch && districtMatch) ||
        levelMatch ||
        levelMatch
      );
    });
    console.log("result:", results);
    setSearchResults(results);
    console.log("searchResult:", searchResults);
  };

  const getLevelColor = (level) => {
    // Add your logic to determine the color based on the level
    switch (level) {
      case "Hard":
        return "red";
      case "Medium":
        return "blue";
      case "Easy":
        return "green";
      default:
        return "blue"; // Default color for unknown levels
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#00A86B" }}>
      <View
        style={{
          flexDirection: "row",
          backgroudColor: "#ffffff",
          alignItems: "center",
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 16,
          padding: 8,
          borderRadius: 8,
          backgroundColor: "white",
        }}
      >
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          style={{ flex: 1, marginLeft: 8 }}
          placeholder="Search here"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          onSubmitEditing={handleSearch}
        />
      </View>
      <View>
        <ScrollView
          horizontal
          style={{ flexDirection: "row", marginBottom: 16 }}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.filterContainer}>
            {/* <Text style={styles.filterLabel}>District:</Text> */}
            <Picker
              selectedValue={selectedDistrict}
              style={styles.filterPicker}
              onValueChange={(itemValue) => setSelectedDistrict(itemValue)}
              labelStyle={{ color: "red" }}
            >
              <Picker.Item label="District" value="" style={{ fontSize: 14 }} />
              <Picker.Item
                label="District 1"
                value="District 1"
                style={{ fontSize: 14 }}
              />
              <Picker.Item
                label="District 2"
                value="District 2"
                style={{ fontSize: 14 }}
              />
            </Picker>
            {console.log(selectedDistrict)}
          </View>

          {/* Filter bar for Level */}
          <View style={styles.filterContainer}>
            {/* <Text style={styles.filterLabel}>Level:</Text> */}
            <Picker
              selectedValue={selectedLevel}
              style={styles.filterPicker}
              onValueChange={(itemValue) => setSelectedLevel(itemValue)}
            >
              <Picker.Item label="Level" value="" style={{ fontSize: 14 }} />
              <Picker.Item label="Hard" value="Hard" style={{ fontSize: 14 }} />
              <Picker.Item
                label="Medium"
                value="Medium"
                style={{ fontSize: 14 }}
              />
              <Picker.Item label="Easy" value="Easy" style={{ fontSize: 14 }} />
            </Picker>
          </View>
          <View style={styles.filterContainer}>
            {/* <Text style={styles.filterLabel}>District:</Text> */}
            <Picker
              selectedValue={selectedDistrict}
              style={styles.filterPicker}
              onValueChange={(itemValue) => setSelectedDistrict(itemValue)}
            >
              <Picker.Item label="All" value="All" style={{ fontSize: 14 }} />
              <Picker.Item
                label="Available"
                value="Available"
                style={{ fontSize: 14 }}
              />
              <Picker.Item
                label="Unavailable"
                value="Unavailable"
                style={{ fontSize: 14 }}
              />
            </Picker>
            {console.log(selectedDistrict)}
          </View>
        </ScrollView>
      </View>

      {/* Display search results using FlatList */}
      <View style={{ backgroundColor: "white", borderRadius: 8, padding: 8 }}>
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 8, flexDirection: "row" }}>
              <View style={{ marginRight: "auto" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignContent: "center",
                    marginBottom: 5,
                  }}
                >
                  <View
                    style={[
                      styles.rectangle,
                      { backgroundColor: getLevelColor(item.level) },
                    ]}
                  >
                    <Text style={styles.rectangleText}>{item.level}</Text>
                  </View>
                  <View style={{ paddingTop: 5, marginLeft: 5 }}>
                    <Text style={styles.header}>{item.name}</Text>
                  </View>
                </View>
                <View style={{ marginBottom: 5 }}>
                  <Text styles={{ paddingLeft: 2 }}>
                    Address: 1648 vo can kiet
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons name="walk" size={18} color="gray" />
                    <Text>: 16km</Text>
                  </View>
                  <View style={{ marginLeft: 12, flexDirection: "row" }}>
                    <Ionicons name="bus" size={18} color="gray" />
                    <Text>: 16km</Text>
                  </View>
                </View>
              </View>
              {/* Add more details as needed */}
              <TouchableOpacity
                style={{
                  padding: 8,
                  borderRadius: 8,
                  alignItems: "center",
                  height: 35,
                  backgroundColor: "orange",
                }}
                onPress={() => navigateToDetail(item)}
              >
                <View style={{ paddingLeft: 1 }}>
                  <Text style={{ color: "black", fontWeight: "bold" }}>
                    Explore
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        {console.log("searchResult", searchResults)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: "#f2f2f2",
    marginBottom: 5,
  },
  header: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  rectangle: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },
  rectangleText: {
    color: "white",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "white",
    borderRadius: 8,
    width: 120,
    height: 40,
    marginRight: 16,
  },
  filterLabel: {
    marginRight: 8,
  },
  filterPicker: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
  },
});

SearchList.navigationOptions = {
  title: "Search Results",
  headerStyle: {
    backgroundColor: "green",
  },
  headerTintColor: "#green",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

export default SearchList;
