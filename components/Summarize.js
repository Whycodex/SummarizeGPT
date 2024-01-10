import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";

function Summarize() {
  const [enteredText, setEnteredText] = useState("");
  const [summarizedText, setSummarizedText] = useState("");
  const summarizeText = async () => {
    const apiKey = "API KEY HERE";
    const apiURL = "https://api.openai.com/v1/chat/completions";

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: enteredText }],
        temperature: 0.7,
      }),
    };
    try {
      const response = await fetch(apiURL, requestOptions);
      const data = await response.json();
      console.log(data.choices[0].message.content);
      setSummarizedText(data.choices[0].message.content);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>SummarizeGPT</Text>
      <ScrollView style={styles.container}>
        <TextInput
          placeholder="Please enter the text to be summarized here"
          onChangeText={setEnteredText}
          multiline
        />
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={summarizeText}>
        <Text style={styles.text}>Summarize</Text>
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <Text>{summarizedText}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Summarize;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "800",
  },
  container: {
    borderWidth: 1,
    height: 300,
    borderRadius: 4,
    padding: 10,
    marginVertical: 10,
  },
  button: {
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    backgroundColor: '#000',
    fontSize: 14,
    fontWeight: 800,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4
  }
});
