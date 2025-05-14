import { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet } from "react-native"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase"
import { Link } from "expo-router"

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      alert("Login success!")
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Link href="/(tabs)/register">
        <Text style={{ marginTop: 10 }}>Dont have an account? Register</Text>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
})
