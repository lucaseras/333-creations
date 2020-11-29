#### Created by Lucas Eras
Main reference: [React Native "Setting up the development environment"](https://reactnative.dev/docs/environment-setup)

## General reference for this project
Inside the my-app folder there are four versions of the same app. They are
the following:
- firstApp.js (file)
    - This is the very first version of the app, with all in one file. This
        version is quite similar to the one that the original tutorial stops.
- initial-separation-no-components (folder)
    - This is the version of the app after it has been organized into separate
        files using import/export, but the two different `return` in `App.js`
        are not yet React components
- components-version (folder)
    - Here the we have created two separate components for the two previous
        `return` statements. These components can be found in
        `components-version > components`. This version does _not_ make usage of
        React Navigation.
- my-app (the folder itself)
    - This is the final version of the app, which uses React Navigation to
        access the two different screens (basically the same components as the
        version above)


## Native React Simple App Tutorial

For beginners, the environment suggested is called Expo CLI. For those already
familiar with mobile development, the environment suggested is React Native CLI.

```zsh
npm install -g expo-cli
```
Where npm is the JavaScript packet manager (students could also use yarn if the
wish to), -g stands for global.

The requirements to isntall Expo CLI are: 
- Node.js
- Git
- Watchman (for MacOS users. Needs brew or macports)

To initialize a React Native program:

```zsh
expo init my-app # creates the project named my-app

# here you can choose the type of project. I suggest using the blank one (first
# option)
cd my-app
npm start #expo start also works
```

The start command starts a development server. CMD-C (mac) or CTRL-C (win) to
stop the server.

The web simulator is in beta, so it might be better to use either the iOS or the
Android simulator. When I tried to run either of them, I got some annoying
errors. Apparently for each of them you need to have the simulator installed in
your machine already. So I'm downloading XCode to see if that fixes the
simulator issue.

After installing XCode, the error changed. This time it is saying the following:

```
Error running `xcrun simctl list devices --json`: xcrun: error: unable to find utility "simctl", not a developer tool or in PATH
```

I looked up a solution. I had to go to `Xcode > Preferences > Locations` and
changed the `Command Line Tools` option to `Xcode 12.1` (it was blank before)

Now the simulator works! It might be easier, however, to use the QRCode to open
the app in your own phone rather than having to go through this annoying
process. To use it in your phone directly, go to your app store and download
`Expo Client`, then read the QRCode available when you run the server. 


In `my-app`, `app.js` is the main file of our program. Feel free go to in the
file and modify the text to whatever you want, to see the change occur in the
app.

## Debugging
To debug, use `console.warn("Warning message")`, `console.error("Error
message")` or `throw Error("Error message")`. The console will show you a red
box with the error mesage in case the error happens. You can then fiz the error
on the fly and update the app by clicking "Reload" in the simulator.


## Styling
Let us change the content of the message to: `To share a photo from your phone with a friend, just press the button below!`

Then let's add more styles to our styleSheet by modifying the styles value (I'm
also adding other styles that we will use soon there):
```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 20,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
})
```
Now with that, let us add a prop to the `<Text>` component: `style={styles.instructions}`

Now our text should look different. We can also add a picture our app using the
`<Image>` component. Add this line right above of our text:
`<Image source={{uri: "https://i.imgur.com/TkIrScD.png"}} style={styles.logo}`

If students are confused with the brackets in the source line: the outer set of
brackets is there because, as we've already seen, to use JS in JSX file we have
to put the JS code inside brackets. Then, the other brackets are there because
that is a JS object, which is always constructed with brackets.

## Creating a button

To create a button, we can import the `Button` component form `react-native` and
use it like so:

```javascript
import { Image, StyleSheet, Text, Button, View } from 'react-native';

//...

<Button
    onPress={() => alert('Hello, world!')}
    title="Click here!"
    color="#841584"
    accessibilityLabel="Click this button to see a message"
/>
```
Buttons are quite simple and will work in Android and iOS devices without
worries. But they are also very limited — we only have control on what happens
when it is pressed, the title of the button and its color. If we want to have
more control over the button's looks and animation, we have to use different
components.

Here, the Expo tutorial uses the `touchableOpacity` component to create the
button. However, the React documentation for [touchableOpacity suggests using the
Pressable API instead](reactnative.dev/docs/touchableopacity). So I'll use
pressable for this tutorial too.

First, don't forget to import the `Pressable` component:
```javascript
import { Image, StyleSheet, Text, Pressable, View } from 'react-native';
```
Then, we add, under the text part of our code, the following code:

```javascript
<Pressable
    onPress={() => alert('Hello, world!')}
    style={{ backgroundColor: 'blue' }}>

    <Text style={{ fontSize: 20, color: '#fff' }}>Pick a photo</Text>

</Pressable>
```
You can see more about the possibilities of using pressable [in the
documentation](reactnative.dev/docs/pressable)
To make the button easier to press, we increase the size of the hitbox of the
button. We can do that by adding `padding` to the style of the button, or by
using the new method of creating a hitRect around the pressable component. We
can do that by adding `hitSlop` as a prop in pressable:


```javascript
<Pressable
    hitSlop={20}
    onPress={() => alert('Hello, world!')}
    style={{ backgroundColor: 'blue' }}>

    <Text style={{ fontSize: 20, color: '#fff' }}>Pick a photo</Text>

</Pressable>
```
## Creating the image picker
We will now use the button to open an image picker, so that we can choose the
picture we like to show it on screen. To do so, lets install `expo-image-picker`
by running:

```zsh
expo install expo-image-picker
```

Now we import it to our app (in App.js as usual):
```javascript
import * as ImagePicker from 'expo-image-picker'
```

Then, inside our App function we do:
```javascript
let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionAsync();

    if (permissionresult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
}

return (
  <View style={styles.container}>
      <Image source={{ uri: 'https://i.imgur.com/TkIrScD.png' }} style={styles.logo} />
      <Text style={styles.instructions}>
        To share a photo from your phone with a friend, just press the button below!
      </Text>

      <Pressable onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </Pressable>
    </View>
);
```
To use the selected image, we are going to store the image as a state variable!
So we will be using the `useState` function to create the state variable and the
set state function. So we must first import `useState`. At the top of our app
file:

```javascript
import React, { useState } from 'react';
```

First, we have to create the state variable and the state variable which will
contain the image selected and the set function using `useState`.
Then, we have to modify our `openImagePickerAsync` function to use the set
function. It will look like the following inside our App function:

```javascript
  const [selectedImage, setSelectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
      </View>
    );
  }
```
Notice that we've added an if statement at the end that changes the look of our
app depending on if we have an image or not in our selectedImage.

## We are skipping the "sharing the image" part 
In the original tutorial, we learn how to share the picture using `expo-sharing`
(quite similar to how we did it with picking the pictures). Because this is
basically a repetition of something that we already learned how to do, I think
it is worth more of our time if we go on to do something else with the app, so
we will skip that part of the tutorial.

If it matters for students to learn how to add an icon and a splashscreen to the
app, redirect them to the [end of the tutorial](https://docs.expo.io/tutorial/configuration/).


The final version of the code can be found in the file `firstApp.js`.

## Organizing our code (_as in the folder initial-separation-no-components_)

In this section we are going to learn how to create better organize our files by
breaking them into smaller sections. We will:
- have a separate file that summons the image picker and returns us a picture
- separate the two `return` into separate React components that will be called
- and give our `styles` a file of its own, so that we can simply import it
    anywhere we want.

So we will end up with the following files: 
- imagePicker.js
- styles.js
- components
    - initialScreen.js
    - finalScreen.js
- App.js

### imagePicker.js
Let us first start by creating `imagePicker.js`.
For `imagePicker.js` we will have the following code in the body of the file:

```javascript
import * as ImagePicker from 'expo-image-picker';

export default async function openImagePickerAsync() {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }
    return ({localUri: pickerResult.uri });
};
```
Notice that we have changed this function just slightly. It does not call the set
function anymore, because the set function doesn't exist in this file. It,
instead, simply returns the value of the picked image if it exists.


Back in our App.js function, we have import openImagePickerAsync:

```javascript
import openImagePickerAsync from './imagePicker';
```

And modify the `onPress` of the button:

```javascript
onPress={ async () => {
    let image = await openImagePickerAsync();
    image ? setSelectedImage(image) : null
    }
}
```
So that now when we click the button, we use the function and see if it returns
an image. If it does, we update our image, if not, we don't do anything. 

### styles.js
This one is similar and quite straightforward:

```javascript
import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 20,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
})
```

And we import `styles.js` in our `App.js` file:


```javascript
import styles from `./styles`;
```


### App's final state 
Currently, our `App.js` looks like this:

```javascript
import React from 'react';
import { Image, Text, Pressable, View } from 'react-native';
import openImagePickerAsync from './imagePicker';
import {styles} from './styles';

export default function App() {
  let [selectedImage, setSelectedImage] = React.useState(null);

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
        </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://i.imgur.com/TkIrScD.png' }} style={styles.logo} />
      <Text style={styles.instructions}>
        To share a photo from your phone with a friend, just press the button below!
      </Text>

      <Pressable
       hitSlop={30}
        onPress={ async () => {
            let image = await openImagePickerAsync();
            image ? setSelectedImage(image) : null
            }
        }
        style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </Pressable>
    </View>
  );
}
 
```
So our `App.js` is certainly shorter and cleaner now that we have
`openImagePickerAsync` and `styles` being imported. The next step is to simply
this further, transforming both JSX that are being returned into their own
separate components.

## Using Child Components (_as in the folder components-version_)

So first we are going to create a folder called components inside our app
folder. In this folder we will create the two components `finalScreen.js` and
`initialScreen.js`. Let us start with the first return statement in `App.js`,
which is the final screen.

### `finalScreen.js`
We create the `finalScreen.js` file with the following content:

```javascript
import React from 'react';
import { styles } from '../styles'
import {View, Image, Text} from 'react-native';
export default function FinalScreen(props) {
    return (
        <View style={styles.container}>
            <Image source={props.image} style={styles.thumbnail} />
            <Text style={styles.buttonText}>Share this photo</Text>
        </View>
    );
}
```
And in `App.js`, the code gets simplified to:

```javascript
  if (selectedImage !== null) {
    return (
        <finalScreen
            image={{uri: selectedImage.localUri}}
        />
    );
  }
```
Notice that we are using a prop, namely `image`, to feed the child component
`finalScreen` the image it has to show.

### `initialScreen.js`
We are now going to do something quite similar to create our second component in
the components folder: `InitialScreen`.

We are going to basically copy/paste what the second return of our App.js looks
like into our `initialScreen.js`, making some important changes. Here is the
final result that I came up with:

```javascript
import React from 'react';
import openImagePickerAsync from '../imagePicker';
import {styles} from '../styles';
import { Image, Text, Pressable, View } from 'react-native';


export default function InitialScreen(props) {
    return(
    <View style={styles.container}>
      <Image source={{ uri: 'https://i.imgur.com/TkIrScD.png' }} style={styles.logo} />
      <Text style={styles.instructions}>
        To share a photo from your phone with a friend, just press the button below!
      </Text>

      <Pressable
        hitSlop={30}
        onPress={ async () => {
            let image = await openImagePickerAsync();
            image ? props.setImage(image) : null
            }
        }
        style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </Pressable>
    </View>
    )
}
```

Notice that now, when we get the result of our openImagePickerAsync() function,
we call the `setImage` function and give it the image as the parameter. Back in
`App,js`, things are looking quite different:

```javascript
import React, {useState} from 'react';
import FinalScreen from './components/finalScreen';
import InitialScreen from './components/initialScreen';

export default function App() {
  let [selectedImage, setSelectedImage] = useState(null);

  if (selectedImage !== null) {
    return (
        <FinalScreen
            image={{uri: selectedImage.localUri}}
        />
    );
  }

  return (
      <InitialScreen 
        setImage={setSelectedImage}
      />
  );
}
```
Notice how small our App.js now is! Most of the work is now being done by our
child components, `FinalScreen` and `InitialScreen`. This makes our code more
organized and easier to navigate. We also made good usage of React components
and their props. Yet, we can simplify this a bit more, usign the React
Navigation package.

Now, if we run the app it should run just like it used to! I will save this
`App.js` as `ComponentsApp.js`, so that we can create a new App.js that will use
React Navigation!


## Using React Navigation
_Important disclaimer_: this tutorial uses the 5.x version of React Navigation.
The version in 333-se-django-react-mobile is *not* 5.x, but 4.x. This means that
our codes are going to look very different, but they function quite similarly.
For example, in the 4.x version you use `props.navigation.getParam` to get
parameters being passed from one screen to another. But in 5.x, we use
`props.route.params`. There are many small differences like this througout the
code.

One nice reason to use React Navigation is that it allows us to move between
different screens without having to set up much of the code — it does a lot of
the work for us. So let's get to it!

We have to install both `navigationContainer` and `createStackNavigator`:
```zsh
npm install @react-navigation/native
npm install @react-navigation/stack
```
The navigation container gives us the ability to move back and forth between
different containers. The stack navigator gives us a specific way of creating
these containers — in a stack way.

Now, we have to change `App.js`, `initialScreen.js` and `finalScreen.js` to use
these new packages. We start by importing them in our `App.js`, and then we
change the body of the app function accordingly:

```javascript
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
```
`App.js` has shaped itself to be quite simple! We first create the `Stack`
variable, which will contain our two screens — `InitialScreen` and
`FinalScreen`. The NavigationContainer functions to navigate between these
different stack screens. We set our initial screen to be `"Home"` by setting
`initialRouteName="Home"`. Now let us look at how `initialScreen.js` will look
like:

```javascript
import React from 'react';
import openImagePickerAsync from '../imagePicker';
import {styles} from '../styles';
import { Image, Text, Pressable, View } from 'react-native';

export default function InitialScreen({ navigation }) {

    const handleClick = async () => {
        let image = await openImagePickerAsync();
        if ( image ) {
            navigation.navigate('Image Screen', {image: image.localUri});
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
        onPres={handleClick}
        style={styles.button}>

        <Text style={styles.buttonText}>Pick a photo</Text>
         
      </Pressable>
    </View>
    )
}
```
Notice that inside the async function `handleClick` we are now doing
`navigation.navigate('Image Screen', {image: image.localUri})`. `navigation` is
a prop that we accessed through object destructuring `{ navigation }`. The
function `navigate` takes two parameters: the name of the screen we are
navigating to, and a second optional object with parameters that can be used by
the target screen. So here we are opening our image screen, while also giving it
the Uri of the image it will show. Let us take a look at `finalScreen.js`:

```javascript
import React from 'react';
import { styles } from '../styles'
import {View, Image, Text} from 'react-native';
export default function FinalScreen({ route }) {
    const image = route.params.image;
    console.log(image)
    return (
        <View style={styles.container}>
            <Image source={{uri: image}} style={styles.thumbnail} />
            <Text style={styles.buttonText}>Share this photo</Text>
        </View>
    );
}
```
When we send parameters to a screen using the navigate function, those
parameters can be found in `props.route.params`. In this case, our image uri is
in `route.params.image`. 


