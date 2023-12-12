// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const setItem = async(key,value) =>{
//      try{
//         await AsyncStorage.setItem(key,value);
//      } catch(error){
//         console.log("Error storing value:", error)
//      }
// }

// export const getItem = async(key) =>{
//     try{
//        const value = await AsyncStorage.getItem(key);
//        return value;
//     } catch(error){
//        console.log("Error storing value:", error)
//     }
// }

// export const removeItem = async(key) =>{
//     try{
//        await AsyncStorage.removeItem(key);
//     } catch(error){
//        console.log("Error storing value:", error)
//     }
// }
// asyncStorage.js

// asyncStorage.js

import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key, value) => {
  try {
    // Convert non-string value to string before storing
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
    console.log(`Item with key '${key}' set successfully.`);
  } catch (error) {
    console.error(`Error setting item with key '${key}':`, error);
  }
};

export const getItem = async (key) => {
  try {
    const stringValue = await AsyncStorage.getItem(key);
    if (stringValue !== null) {
      // Convert string value back to its original type
      const value = JSON.parse(stringValue);
      console.log(`Item with key '${key}' retrieved successfully. Value:`, value);
      return value;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error getting item with key '${key}':`, error);
    return null; // Return a default value or handle the error appropriately
  }
};

// rest of the code...
export const removeItem = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Item with key '${key}' removed successfully.`);
    } catch (error) {
      console.error(`Error removing item with key '${key}':`, error);
    }
  };
