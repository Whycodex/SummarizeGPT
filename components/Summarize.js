import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { Configuration, OpenAIApi } from "openai";
import axios from "axios";

function Summarize() {
    [enteredText, setEnteredText] = useState("");
    [summarizedText, setSummarizedText] = useState("");

    function inputHandler(e) {
        setEnteredText(e.target.value);
    }

    function submitHandler(e) {
        e.preventDefault();

        const options = {
            method: 'POST',
            url: 'https://tldrthis.p.rapidapi.com/v1/model/abstractive/summarize-url/',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'YOUR API KEY HERE',
                'X-RapidAPI-Host': 'tldrthis.p.rapidapi.com'
            },
            data: '{"url":"https://techcrunch.com/2019/08/12/verizon-is-selling-tumblr-to-wordpress-parent-automattic/","min_length":100,"max_length":300,"is_detailed":false}'
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            setSummarizedText(response.data.summary);
        }).catch(function (error) {
            console.error(error);
        });
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
