import React, { useState } from "react";
import { Text, StyleSheet, TextInput, Button, SafeAreaView, ScrollView } from "react-native";
import axios from "axios";

function Summarize() {
  const [enteredText, setEnteredText] = useState("");
  const [summarizedText, setSummarizedText] = useState("");

  const summarizeText = async () => {
    try {
        const apiKey = 'APIKEY HERE'
        const apiURL = 'https://api.openai.com/v1/chat/completions';

        const response = await axios.post(
            apiURL,
            {
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": enteredText}],
                "temperature": 0.7
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }
            }
        )
        console.log(response.choices[0].message.content);
        setSummarizedText(response.choices[0].message.content);
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>SummarizeGPT</Text>
      <ScrollView style={styles.inputOutput}>
        <TextInput
          placeholder="Please enter the text to be summarized here"
          onChangeText={setEnteredText}
          multiline
        />
      </ScrollView>
      <Button title="Summarize" color={"#000"} onPress={summarizeText} />
      <ScrollView style={styles.inputOutput}>
        <Text>{summarizedText}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Summarize;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "800",
  },
  inputOutput: {
    borderWidth: 1,
    height: 300,
    borderRadius: 4,
    padding: 10,
    marginVertical: 10,
  },
});
