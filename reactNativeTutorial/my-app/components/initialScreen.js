import React from 'react';
import openImagePickerAsync from '../imagePicker';
import {styles} from '../styles';
import { Image, Text, Pressable, View } from 'react-native';


export default function InitialScreen({ navigation }) {

    const handleClick = async () => {
        let image = await openImagePickerAsync();
        if (image) {
            navigation.navigate('Image Screen', {image: image.localUri})
        };
    };

    return(
    <View style={styles.container}>
      <Image source={{ uri: 'https://i.imgur.com/TkIrScD.png' }} style={styles.logo} />
      <Text style={styles.instructions}>
        To share a photo from your phone with a friend, just press the button below!
      </Text>

      <Pressable
        hitSlop={30}
        onPress={handleClick}
        style={styles.button}>

        <Text style={styles.buttonText}>Pick a photo</Text>
         
      </Pressable>
    </View>
    )
}
