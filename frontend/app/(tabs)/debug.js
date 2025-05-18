import { useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"

export default function DebugScreen() {
  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5U3M2kb93AIQiKT6yi4L2GGo4wVDVNwY",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test1234@debug.com",
          password: "debugtest123",
          returnSecureToken: true,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log("✅ Manual fetch:", data))
      .catch((err) => console.log("❌ Manual fetch error:", err))
  }, [])

  return (
    <View style={styles.container}>
      <Text>Testing manual fetch to Firebase...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
})
