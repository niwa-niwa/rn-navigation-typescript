import React from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Center } from "./Center";
import { AuthParamList, AuthNavProps } from "./AuthParamList";

interface RoutesProps {}

const Stack = createStackNavigator<AuthParamList>();

function Login({ navigation, route }:AuthNavProps<"Login">) {
  return (
    <Center>
      <Text>route.name:{route.name}</Text>
      <Button
        title="go to register"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
    </Center>
  );
}

function Register({
  navigation,
  route,
  }:
    AuthNavProps<"Register"> // same mean
    // navigation: StackNavigationProp<AuthParamList, 'Register'>;
    // route: RouteProp<AuthParamList, "Register">;
  ) {
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

export const Routes: React.FC<RoutesProps> = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        // screenOptions={{ header: () => null }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle:"Sign In"
          }}
          />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            // header: () => null,
            headerTitle:"Sign Up"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
