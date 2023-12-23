import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { collection, FIRESTORE_DB, onSnapshot } from "firebase/firestore";

const Leaderboard = ({users}) => {
  // Assuming 'data' is an array of user objects with 'name' and 'score' properties
  const sortedData = users.sort((a, b) => b.score - a.score);

console.log(users)
  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text style={styles.rank}>{index + 1}</Text>
      <Text style={styles.name}>{item.email.split("@gmail.com")}</Text>
      <Text style={styles.score}>{item.score} points</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    height:300,
    paddingBottom:20,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  rank: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
  name: {
    flex: 1,
    fontSize: 18,
    marginRight: 8,
  },
  score: {
    fontSize: 18,
    color: "#333",
  },
});

export default Leaderboard;
