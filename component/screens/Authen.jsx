import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from "react-native";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { KeyboardAvoidingView } from "react-native";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
function Authen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const SignIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert("Check your email");
    } catch (error) {
      console.log(error);
      alert("Sign in failed" + error.message);
    } finally {
      setLoading(true);
    }
  };

  const SignUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userCollection = collection(FIRESTORE_DB, "users");
      await addDoc(userCollection, {
        uid: response.user.uid,
        email: response.user.email,
        // Add other user properties as needed
      });
      console.log(response);
      alert("Check your email");
    } catch (error) {
      console.log(error);
      alert("Sign in failed" + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 30,
                paddingLeft: 53,
                marginBottom: 15,
                fontWeight: 800,
                color: "#00A86B",
              }}
            >
              {" "}
              Green Place
            </Text>
            <TextInput
              value={email}
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
            ></TextInput>
            <TextInput
              secureTextEntry={true}
              value={password}
              style={styles.input}
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            ></TextInput>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <TouchableOpacity style={styles.button} onPress={SignIn}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: "row" }}>

                <View style={styles.separator} />
          
                <Text
                  style={{
                    color: "gray",
                    fontWeight: "500",
                    paddingLeft : 1,
                    paddingTop: 10,
                    fontSize: 17,
                  }}
                >
                  Or
                </Text>
                <View style={styles.separator2} />
              </View>
              <TouchableOpacity style={styles.button2} onPress={SignUp}>
                <Text style={styles.buttonText}>Create account</Text>
              </TouchableOpacity>
            </>
          )}
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

export default Authen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#00A86B",
  },
  container: {
    marginHorizontal: 20,
    marginVertical: 150,
    padding: 20,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#00A86B",
    padding: 15,
    borderRadius: 4,
    marginTop: 10,
    alignItems: "center",
  },
  button2: {
    backgroundColor: "#00A86B",
    padding: 15,
    borderRadius: 4,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "black",
    flex: 1,  
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  separator2: {
    height: 1,
    backgroundColor: "black",
    flex: 1,  
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
});
