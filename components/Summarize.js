import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { Configuration, OpenAIApi } from "openai";

function Summarize() {
    [enteredText, setEnteredText] = useState("");
    [summarizedText, setSummarizedText] = useState("");

    const config = new Configuration({
        apiKey: "ENTER YOUR OPENAI API KEY HERE",
    });
    const openai = new OpenAIApi(config);
    
    function createSummary(enteredText) {
        return `summarize this paragraph ${enteredText} in less than 100 words`;
    }

    function inputHandler(e) {
        setEnteredText(e.target.value);
    }

    function submitHandler(e) {
        e.preventDefault();
        openai.createCompletion({
            model: "text-babbage-001",
            prompt: createSummary(enteredText),
            max_tokens: 100,
        }).then((response) => {
            if (response.status == 200) {
                console.log(response);
                setSummarizedText(response?.data?.choices[0]?.text);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <View style={styles.container}>
            <TextInput placeholder="Input text to be summarized" onChange={inputHandler} value={enteredText} />
                <Button title="Summarize" onPress={submitHandler} />
            <Text>{summarizedText}</Text>
        </View>
    );
}

export default Summarize;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
