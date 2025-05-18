import { View, Text, StyleSheet } from "react-native"
import ProfileMenu from "../../components/ProfileMenu"

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <ProfileMenu />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to the Homie!</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#666" },
})
