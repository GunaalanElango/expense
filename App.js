import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { enableScreens } from "react-native-screens";

import Colors from "./colors/colors";
import AppNavigator from "./navigation/AppNavigation";
import authReducer from "./store/reducers/auth";
import categoryReducer from "./store/reducers/category";
import expenseReducer from "./store/reducers/expense";

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  expenses: expenseReducer,
});

const store = createStore(rootReducer);

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    accent: Colors.secondary,
    error: "red",
  },
};

enableScreens();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={Theme}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
        <AppNavigator />
      </PaperProvider>
    </Provider>
  );
}

const Styles = StyleSheet.create({});
