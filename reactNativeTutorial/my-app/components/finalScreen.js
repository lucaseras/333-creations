import React from 'react';
import { styles } from '../styles'
import {View, Image, Text} from 'react-native';
export default function FinalScreen({ route }) {
    const image = route.params.image;
    return (
        <View style={styles.container}>
            <Image source={{uri: image}} style={styles.thumbnail} />
            <Text style={styles.buttonText}>Share this photo</Text>
        </View>
    );
}
