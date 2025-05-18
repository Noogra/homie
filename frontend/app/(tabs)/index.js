import { useState, useEffect, useRef } from "react"
import * as SplashScreen from "expo-splash-screen"
import { Animated } from "react-native"
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase"
import { Link, router } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SecureStore from "expo-secure-store"
import { Feather } from "@expo/vector-icons"

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [saveMe, setSaveMe] = useState(false)
  const [loading, setLoading] = useState(true)

  const logoOpacity = useRef(new Animated.Value(0)).current
  const logoScale = useRef(new Animated.Value(0.9)).current

  useEffect(() => {
    SplashScreen.preventAutoHideAsync()

    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => {
      SplashScreen.hideAsync()
    })
  }, [])

  useEffect(() => {
    const tryAutoLogin = async () => {
      const shouldSave = await AsyncStorage.getItem("saveMe")
      const savedEmail = await AsyncStorage.getItem("savedEmail")
      const savedPassword = await SecureStore.getItemAsync("savedPassword")

      if (shouldSave === "true" && savedEmail && savedPassword) {
        try {
          await signInWithEmailAndPassword(auth, savedEmail, savedPassword)
          router.replace("/(tabs)/home")
        } catch (err) {
          console.log("Auto-login failed:", err.message)
        }
      }

      setLoading(false)
    }

    tryAutoLogin()
  }, [])

  const handleLoginButton = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)

      if (saveMe) {
        await AsyncStorage.setItem("saveMe", "true")
        await AsyncStorage.setItem("savedEmail", email)
        await SecureStore.setItemAsync("savedPassword", password)
      } else {
        await AsyncStorage.multiRemove(["saveMe", "savedEmail"])
        await SecureStore.deleteItemAsync("savedPassword")
      }

      router.replace("/(tabs)/home")
    } catch (error) {
      Alert.alert("Login error", error.message)
    }
  }

  if (loading) return null

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../../assets/images/homie_logo.png")}
        style={[
          styles.logo,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <View style={styles.checkboxRow}>
        <TouchableOpacity
          onPress={() => setSaveMe(!saveMe)}
          style={styles.checkboxButton}
        >
          <Feather
            name={saveMe ? "check-square" : "square"}
            size={24}
            color="#007AFF"
          />
        </TouchableOpacity>
        <Text style={styles.saveMeText} onPress={() => setSaveMe(!saveMe)}>
          Save Me
        </Text>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLoginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <Link href="/(tabs)/register">
        <Text style={styles.link}>Dont have an account? Register</Text>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, paddingTop: 0 },
  input: { marginVertical: 8, padding: 10, borderWidth: 1, borderRadius: 6 },
  link: { marginTop: 12, color: "#007AFF", textAlign: "center" },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxButton: {
    marginRight: 8,
  },
  saveMeText: {
    fontSize: 16,
    paddingTop: 2,
  },
  logo: {
    width: 240,
    height: 240,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 30,
    marginTop: -10,
  },
  loginButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginVertical: 10,
    width: "70%",
    alignSelf: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})
