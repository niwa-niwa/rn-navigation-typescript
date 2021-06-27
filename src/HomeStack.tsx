import React, { useContext } from "react";
import { Text, Button, TouchableOpacity, FlatList } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Center } from "./Center";
import { AuthContext } from "./AuthProvider";
import faker from "faker";
import { HomeParamList, HomeStackNavProps } from "./HomeParamList";
import { Routes } from "./Routes";

interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();

function Feed({ navigation }: HomeStackNavProps<"Feed">) {
  return (
    <Center>
      <FlatList
        style={{ width: "100%" }}
        renderItem={({ item }) => {
          return (
            <Button
              title={item}
              onPress={() => {
                navigation.navigate("Product", {
                  name: item,
                });
              }}
            />
          );
        }}
        keyExtractor={(product, idx) => product + idx}
        data={Array.from(Array(50), () => faker.commerce.product())}
      />
    </Center>
  );
}

function EditProduct({ route }: HomeStackNavProps<"EditProduct">) {
  return (
    <Center>
      <Text>editing {route.params.name}...</Text>
    </Center>
  );
}

function Product({ route, navigation }: HomeStackNavProps<"Product">) {
  return (
    <Center>
      <Text>{route.params.name}</Text>
      <Button
        title="Edit This Product"
        onPress={() =>
          navigation.navigate("EditProduct", {
            name: route.params.name,
          })
        }
      />
    </Center>
  );
}

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  const { logout } = useContext(AuthContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ route }) => ({
          headerTitle: `Edit: ${route.params.name}`,
          headerRight: ()=>(
            <TouchableOpacity onPress={()=>{}} style={{ paddingRight:8}}>
              <Text style={{color:"red"}}>Done</Text>
            </TouchableOpacity>
          )
        })}
        name="EditProduct"
        component={EditProduct}
      />
      <Stack.Screen
        options={({ route }) => ({
          headerTitle: `Product: ${route.params.name}`,
        })}
        name="Product"
        component={Product}
      />
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  logout();
                }}
              >
                <Text>LOGOUT</Text>
              </TouchableOpacity>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};
