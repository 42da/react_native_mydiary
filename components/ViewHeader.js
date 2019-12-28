// components/ViewHeader.js

import React from 'react';
import {View,TouchableOpacity,StyleSheet} from 'react-native'
import {withNavigation} from 'react-navigation'
import { Ionicons } from '@expo/vector-icons';

const ViewHeader = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {props.navigation.goBack()}}
                hitSlop={{top:32, bottom:32, left:32, right: 32}}>
                <Ionicons name="ios-arrow-back" size={25} color={'#7a7171'}></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.8}
                hitSlop={{top:32, bottom:32, left:32, right: 32}}
                onPress={(id) => {
                    props.deletePost(id);
                    props.navigation.navigate('ListScreen');
                }}>
                <Ionicons name="ios-close" size={30} color={'#7a7171'}></Ionicons>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'yellow'
    }
})

export default withNavigation(ViewHeader);