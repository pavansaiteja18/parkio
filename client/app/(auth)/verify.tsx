// client/app/(auth)/verify.tsx
import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Link, useRouter } from "expo-router";

export default function Verify() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)];
  const router = useRouter();

  const onChange = (v: string, i: number) => {
    const next = [...otp];
    next[i] = v.replace(/[^0-9]/g, "").slice(0, 1);
    setOtp(next);
    if (next[i] && i < inputs.length - 1) inputs[i + 1].current?.focus();
  };

  const onConfirm = () => {
    // TODO: verify OTP via API
    router.replace("/(tabs)"); // go to the authenticated tab area
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Verification</Text>
      <Text style={styles.subtitle}>Enter the verification code we’ve sent to your email</Text>

      <View style={styles.otpRow}>
        {otp.map((d, i) => (
          <TextInput
            key={i}
            ref={inputs[i]}
            style={styles.otp}
            keyboardType="number-pad"
            maxLength={1}
            value={d}
            onChangeText={(v) => onChange(v, i)}
            returnKeyType={i === 3 ? "done" : "next"}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.primaryBtn} onPress={onConfirm}>
        <Text style={styles.primaryBtnText}>Confirm</Text>
      </TouchableOpacity>

      <Text style={[styles.muted, { textAlign: "center", marginTop: 12 }]}>
        Didn’t receive the code? <Link href="/(auth)/verify" style={styles.linkText}>Resend</Link>
      </Text>
    </SafeAreaView>
  );
}

const ACCENT = "#B4F25E";
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 6 },
  subtitle: { color: "#6b7280", marginBottom: 20 },
  otpRow: { flexDirection: "row", gap: 12, justifyContent: "center", marginBottom: 20 },
  otp: { width: 54, height: 54, borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 12, textAlign: "center", fontSize: 22 },
  primaryBtn: { backgroundColor: ACCENT, paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  primaryBtnText: { fontSize: 18, fontWeight: "700" },
  muted: { color: "#6b7280" },
  linkText: { color: "#2563EB", fontWeight: "700" },
});
