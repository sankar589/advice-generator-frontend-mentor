import React, { useState, useEffect } from "react";
import { useFonts, Manrope_800ExtraBold } from "@expo-google-fonts/manrope";
import Svg, { G, Rect, Path } from "react-native-svg";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Manrope_800ExtraBold,
  });

  const [advice, setAdvice] = useState({
    id: "",
    advice: "",
  });

  const url = "https://api.adviceslip.com/advice";

  async function fetchAdvise() {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });
    const data = await res.json();
    setAdvice({
      id: data.slip.id,
      advice: data.slip.advice,
    });
  }

  useEffect(() => {
    fetchAdvise();
    return () => {};
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.adviceno}>ADVICE #{advice.id}</Text>
        <Text
          style={[{ fontFamily: "Manrope_800ExtraBold" }, styles.advicecontent]}
        >
          {advice.advice}
        </Text>
        <Svg width={295} height={16}>
          <G fill="none" fill-rule="evenodd">
            <Path fill="#4F5D74" d="M0 8h122v1H0zM173 8h122v1H173z" />
            <G transform="translate(138)" fill="#CEE3E9">
              <Rect width="6" height="16" rx="3" />
              <Rect x={14} width={6} height={16} rx={3} />
            </G>
          </G>
        </Svg>
        <TouchableOpacity style={styles.dicebutton} onPress={fetchAdvise}>
          <Svg width={24} height={24}>
            <Path
              d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
              fill="#202733"
            />
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "hsl(217,19%,24%)",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    height: 300,
    width: 300,
    backgroundColor: "hsl(217,19%,38%)",
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 20,
  },
  dicebutton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "hsl(150,100%,66%)",
    position: "absolute",
    bottom: -25,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    fontSize: 30,
  },
  advicecontent: {
    fontSize: 18,
    color: "hsl(198,38%,86%)",
    textAlign: "center",
  },
  adviceno: {
    color: "hsl(150,100%,66%)",
    letterSpacing: 2.5,
    fontSize: 10,
  },
});
