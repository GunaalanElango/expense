import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AuthScreen from "../src/screens/auth/AuthScreen";
import EditIncomeExpenseScreen from "../src/screens/account/EditIncomeExpenseScreen";
import StartupScreen from "../src/screens/StartupScreen";
import OTPScreen from "../src/screens/auth/OTPScreen";
import Colors from "../colors/colors";
import { HomeDrawerNavigator } from "./Drawer";

const Stack = createStackNavigator();

const defaultStackScreenOptions = {
  headerStyle: { backgroundColor: Colors.primary },
  headerTintColor: "#ffffff",
  headerTitleAlign: "left",
};

const StartupNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackScreenOptions}>
      <Stack.Screen
        name="StartupScreen"
        component={StartupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{
          headerStyle: { backgroundColor: "#ffffff", elevation: 0 },
          headerTintColor: "#000",
          title: "",
        }}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackScreenOptions}>
      <Stack.Screen
        name="HomeDrawer"
        component={HomeDrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditIncomeExpenseScreen"
        component={EditIncomeExpenseScreen}
      />
    </Stack.Navigator>
  );
};

export { MainNavigator, StartupNavigator };
