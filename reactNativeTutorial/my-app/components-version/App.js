import React, {useState} from 'react';
import FinalScreen from '../components/finalScreen';
import InitialScreen from '../components/initialScreen';

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
