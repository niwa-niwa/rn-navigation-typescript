import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button, ActivityIndicator, AsyncStorage } from "react-native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Center } from "./Center";
import { AuthParamList, AuthNavProps } from "./AuthParamList";
import { AuthContext, } from './AuthProvider';

interface RoutesProps {}

const Stack = createStackNavigator<AuthParamList>();

function Login({ navigation, route }: AuthNavProps<"Login">) {
  const { login } = useContext(AuthContext);

  return (
    <Center>
      <Text>I am a login screen</Text>
      <Button
        title="log me in"
        onPress={()=>{
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

export const Routes: React.FC<RoutesProps> = ({}) => {
  const { user, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    AsyncStorage.getItem("user")
      .then(userString=>{
        if(userString){
          login();
        }
        setLoading(false);
        console.log(userString);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if(loading){
    return(
      <Center>
        <ActivityIndicator size="large" />
      </Center>
    )
  }

  return (
    <NavigationContainer>
      {user ?
        <Center>
          <Text>
            you exist
          </Text>
        </Center>
      :
        <Stack.Navigator
          initialRouteName="Login"
          // screenOptions={{ header: () => null }}
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
      }
    </NavigationContainer>
  );
};
