// client/app/(auth)/signup.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";

export default function SignUp() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", dob: "", phone: "", password: "",
  });
  const router = useRouter();

  const set = (k: keyof typeof form, v: string) => setForm({ ...form, [k]: v });
  const onSignUp = () => {
    // TODO: call sign up API then send OTP
    router.push("/(auth)/verify");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.wrap}>
        <Text style={styles.title}>Get Started Now</Text>
        <Text style={styles.subtitle}>Create an account or log in to explore our app</Text>

        <View style={styles.toggleRow}>
          <Text style={[styles.tabBtn, styles.tabActive]}>Sign Up</Text>
          <Link href="/(auth)/login" style={styles.tabBtn}>Log In</Link>
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <TextInput style={[styles.input, { flex: 1 }]} placeholder="First Name" onChangeText={(v) => set("firstName", v)} />
          <TextInput style={[styles.input, { flex: 1 }]} placeholder="Last Name"  onChangeText={(v) => set("lastName", v)} />
        </View>

        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" onChangeText={(v) => set("email", v)} />
        <TextInput style={styles.input} placeholder="Birth date (DD/MM/YYYY)" onChangeText={(v) => set("dob", v)} />
        <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" onChangeText={(v) => set("phone", v)} />
        <TextInput style={styles.input} placeholder="Set Password" secureTextEntry onChangeText={(v) => set("password", v)} />

        <TouchableOpacity style={styles.primaryBtn} onPress={onSignUp}>
          <Text style={styles.primaryBtnText}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const ACCENT = "#B4F25E";
const styles = StyleSheet.create({
  wrap: { padding: 20 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 6 },
  subtitle: { color: "#6b7280", marginBottom: 18 },
  toggleRow: { flexDirection: "row", gap: 10, marginBottom: 16 },
  tabBtn: { flex: 1, textAlign: "center", backgroundColor: "#EEF2F5", paddingVertical: 10, borderRadius: 12, fontWeight: "700", color: "#6b7280" },
  tabActive: { backgroundColor: ACCENT, color: "#111827" },
  input: { borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 12, padding: 14, fontSize: 16, marginBottom: 14 },
  primaryBtn: { backgroundColor: ACCENT, paddingVertical: 14, borderRadius: 12, alignItems: "center", marginTop: 8 },
  primaryBtnText: { fontSize: 18, fontWeight: "700" },
});
