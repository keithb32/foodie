/**
 * @format
 */
import { AppRegistry } from "react-native";
import App from "./App";
import { Provider as PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";
/***************************************************************************************
 *  REFERENCES
 *
 *  Title: react-native-paper
 *  Author: Callstack
 *  Date: 12/12/2022
 *  Code version: v5.x
 *  URL: https://github.com/callstack/react-native-paper
 *  Software License: MIT License
 ***************************************************************************************/

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
