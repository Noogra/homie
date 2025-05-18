import { useState } from "react"
import { View, TextInput, Button, StyleSheet, Alert } from "react-native"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../firebase"
import { doc, setDoc } from "firebase/firestore"
import { router } from "expo-router"

export default function RegisterScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("parent")

  const handleRegisterButton = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      await setDoc(doc(db, "users", userCred.user.uid), { email, role })
      Alert.alert("Success", `User created: ${userCred.user.email}`)
      router.push("/(tabs)/home")
    } catch (error) {
      Alert.alert("Register Error", error.message)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Role"
        value={role}
        onChangeText={setRole}
        style={styles.input}
      />
      <Button title="Register" onPress={handleRegisterButton} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { marginVertical: 8, padding: 10, borderWidth: 1, borderRadius: 6 },
})
