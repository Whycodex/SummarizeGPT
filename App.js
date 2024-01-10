import { StyleSheet, StatusBar, View } from 'react-native';
import Summarize from './components/Summarize';
import "react-native-url-polyfill/auto";

export default function App() {
  return (
    <View style={styles.container}>
      <Summarize />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
