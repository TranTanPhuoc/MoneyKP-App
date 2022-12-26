import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Tabs from './src/BottomTabBar/Tabs';
import Login from './src/Screen/Auth/Login';
import Register from './src/Screen/Auth/Register';
import Home from './src/Screen/Home/Home';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
          <Stack.Navigator initialRouteName={'Login'} screenOptions={{headerShown:false}}>
              <Stack.Screen name='Login' component={Login}/>
              <Stack.Screen name='Register' component={Register}/>
              <Stack.Screen name='Tabs' component={Tabs}/>
              <Stack.Screen name='Home' component={Home}/>
          </Stack.Navigator>
          {/* <Tabs/> */}
      </NavigationContainer>
  );
}