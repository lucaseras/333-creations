import React, {useState} from 'react';
import FinalScreen from './components/finalScreen';
import InitialScreen from './components/initialScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App(){
    return(
        <NavigationContainer initialRouteName="Home">
            <Stack.Navigator>
                <Stack.Screen name="Home" component={InitialScreen}/>
                <Stack.Screen name="Image Screen" component={FinalScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}


