import React from 'react';
import { styles } from '../../styles'
import {View, Image, Text} from 'react-native';
export default function FinalScreen(props) {
    return (
        <View style={styles.container}>
            <Image source={props.image} style={styles.thumbnail} />
            <Text style={styles.buttonText}>Share this photo</Text>
        </View>
    );
}
