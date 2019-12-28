import React from 'react';
import {View,TouchableOpacity,StyleSheet} from 'react-native'

import {withNavigation} from 'react-navigation'
import { Ionicons } from '@expo/vector-icons';

const EditHeader = ({navigation, addPost, selectPicture}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {navigation.goBack()}}
                hitSlop={{top:32, bottom:32, left:32, right: 32}}>
                <Ionicons name="ios-arrow-back" size={25} color={'#7a7171'}></Ionicons>
            </TouchableOpacity>

            <View style={styles.iconContainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    hitSlop={{top:2, bottom:2, left:2, right: 2}}
                    onPress={selectPicture}>
                    <Ionicons name="ios-image" size={25} color={'#7a7171'}></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    hitSlop={{top:2, bottom:2, left:2, right: 2}}
                    onPress={() => {
                        addPost();
                        navigation.navigate('ListScreen');
                    }}>
                    <Ionicons name="ios-save" size={25} color={'#7a7171'}></Ionicons>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },
    iconContainer: {
        flexDirection: 'row',
        width: 60,
        justifyContent: 'space-between'
    }
})
export default withNavigation(EditHeader);