import { useEffect, useState } from "react"
import { Feather } from "@expo/vector-icons"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native"
import { signOut, onAuthStateChanged } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SecureStore from "expo-secure-store"
import { auth } from "../firebase"
import { router } from "expo-router"

export default function ProfileMenu() {
  const [menuVisible, setMenuVisible] = useState(false)
  const [emailPrefix, setEmailPrefix] = useState("??")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const email = user.email || ""
        setEmailPrefix(email.slice(0, 2).toUpperCase())
      }
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(["saveMe", "savedEmail"])
      await SecureStore.deleteItemAsync("savedPassword")

      await signOut(auth)
      setMenuVisible(false)

      router.replace("/(tabs)")
    } catch (error) {
      Alert.alert("Logout Error", error.message)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.avatar}
        onPress={() => setMenuVisible(!menuVisible)}
      >
        <Text style={styles.avatarText}>{emailPrefix}</Text>
      </TouchableOpacity>

      {menuVisible && (
        <View style={styles.dropdown}>
          <Pressable onPress={handleLogout} style={styles.menuRow}>
            <Feather name="log-out" size={18} color="black" />
            <Text style={styles.menuItem}>Logout</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 999,
  },
  avatar: {
    backgroundColor: "#007AFF",
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
  },
  avatarText: {
    color: "white",
    fontWeight: "bold",
  },
  dropdown: {
    position: "absolute",
    top: 65,
    right: 20,
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 10,
    elevation: 4,
    minWidth: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 8,
  },
  menuItem: {
    fontSize: 16,
  },
})
