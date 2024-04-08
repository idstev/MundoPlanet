import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { StackNavigator } from './src/Browsers/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <StackNavigator/>
      </PaperProvider>
    </NavigationContainer>
  );
}

