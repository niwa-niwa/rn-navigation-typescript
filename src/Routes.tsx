import React from "react";
import { View, Text, } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

interface RoutesProps {}

const Stack = createStackNavigator();

function Login(){
  return(
    <View>
      <Text>I am a login screen</Text>
    </View>
  )
}
export const Routes: React.FC<RoutesProps> = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
