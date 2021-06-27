import React, { useContext } from "react";
import { Text, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Center } from "./Center";
import { AuthParamList, AuthNavProps } from "./AuthParamList";
import { AuthContext } from "./AuthProvider";

interface AuthStackProps {}

const Stack = createStackNavigator<AuthParamList>();

function Login({ navigation, route }: AuthNavProps<"Login">) {
  const { login } = useContext(AuthContext);

  return (
    <Center>
      <Text>I am a login screen</Text>
      <Button
        title="log me in"
        onPress={() => {
          login();
        }}
      />
      <Button
        title="go to register"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
    </Center>
  );
}

function Register({ navigation, route }: AuthNavProps<"Register">) {
  return (
    <Center>
      <Text>route:name: {route.name}</Text>
      <Button
        title="go to login"
        onPress={() => {
          navigation.navigate("Login");
          // navigation.goBack();
        }}
      />
    </Center>
  );
}

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ header: () => null }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitle: "Sign In",
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          // header: () => null,
          headerTitle: "Sign Up",
        }}
      />
    </Stack.Navigator>
  );
};
