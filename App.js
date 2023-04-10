import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Tabs from './src/BottomTabBar/Tabs';
import User from './src/Screen/Account/User';
import ForgotPassword from './src/Screen/Auth/ForgotPassword';
import Login from './src/Screen/Auth/Login';
import Exchange from './src/Screen/Exchange/Exchange';
import History from './src/Screen/History/History';
import Home from './src/Screen/Home/Home';
import DetailJar from './src/Screen/Jar/DetailJar';
import Jar from './src/Screen/Jar/Jar';
import SetPercentJar from './src/Screen/Jar/SetPercentJar';
import { store } from './src/redux/store'
import Chart from './src/Screen/Chart/Chart';
import DetailOther from './src/Screen/DetailOther/DetailOther';
import ExchangeOther from './src/Screen/Exchange/ExchangeOther';
import DetailJarOther from './src/Screen/Jar/DetailJarOther';
import JarOther from './src/Screen/Jar/JarOther';
import HistoryOther from './src/Screen/History/HistoryOther';
import Detail from './src/Screen/DetailOther/Detail';
import CameraPic from './src/Screen/Exchange/CameraPic';
import PhotoCameraPic from './src/Screen/Exchange/PhotoCameraPic';
import Register from './src/Screen/Auth/Register';
import ChangePassword from './src/Screen/Auth/ChangePassword';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Login'} screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Register' component={Register} />
          <Stack.Screen name='Tabs' component={Tabs} />
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
          <Stack.Screen name='Jar' component={Jar} />
          <Stack.Screen name='SetPercentJar' component={SetPercentJar} />
          <Stack.Screen name='History' component={History} />
          <Stack.Screen name='DetailJar' component={DetailJar} />
          <Stack.Screen name='Exchange' component={Exchange} />
          <Stack.Screen name='User' component={User} />
          <Stack.Screen name='Chart' component={Chart} />
          <Stack.Screen name='DetailOther' component={DetailOther} />
          <Stack.Screen name='ExchangeOther' component={ExchangeOther} />
          <Stack.Screen name='DetailJarOther' component={DetailJarOther} />
          <Stack.Screen name='JarOther' component={JarOther} />
          <Stack.Screen name='HistoryOther' component={HistoryOther} />
          <Stack.Screen name='Detail' component={Detail} />
          <Stack.Screen name='CameraPic' component={CameraPic} />
          <Stack.Screen name='PhotoCameraPic' component={PhotoCameraPic} />
          <Stack.Screen name='ChangePassword' component={ChangePassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}