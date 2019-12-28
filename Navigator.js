import React from 'react';

import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import ListScreen from './screens/ListScreen';
import EditScreen from './screens/EditScreen';
import PrivateScreen from './screens/PrivateScreen';
import ViewScreen from './screens/ViewScreen';

import { Ionicons } from '@expo/vector-icons'



const TabNavigator = createBottomTabNavigator({
    ListScreen: {
        screen: ListScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => {
                return <Ionicons name='ios-apps' size={25} color={tintColor} />
            }
        }
    },
    EditScreen: {
        screen: () => null,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => {
                return <Ionicons name='ios-create' size={25} color={tintColor} />
            },
            tabBarOnPress: ({ navigation }) => {
                navigation.navigate('Edit');
            }
        }
    },
    PrivateScreen: {
        screen: PrivateScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => {
                return <Ionicons name='ios-person' size={25} color={tintColor} />
            }
        }
    }
}, {
        tabBarOptions: {
            activeTintColor: '#000',
            inactiveTintColor: "#bdbdbd",
            showLabel: false
        }
    }
);
const AppNavigator = createStackNavigator(
    {
        Edit: EditScreen,
        View: ViewScreen,
        Tab: TabNavigator,
    },
    {
        initialRouteName: 'Tab',
        mode: 'modal',
        headerMode: 'none'
    }
);

export default createAppContainer(AppNavigator);