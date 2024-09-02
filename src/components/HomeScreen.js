import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions, Button, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages } from '../redux/Slice';

const NUM_COLUMNS = 2;
const WIDTH = Dimensions.get('window').width / NUM_COLUMNS - 10;

export default function HomeScreen() {
  const [images, setImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const dispatch = useDispatch();
  const {data, status, error} = useSelector(state => state.images)


  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);
  
  useEffect(() => {
    if (data) {
      setImages(data);
    }
  }, [data]);
  
    if (status === "loading") {
      return <Text style={styles.loadingText}>Loading...</Text>;
    }
  
    if (status === "failed") {
      return <Text style={styles.errorText}>Error: {error}</Text>;
    }

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const formData = new FormData();
      formData.append('image', {
        uri: result.assets[0].uri,
        name: result.assets[0].uri.split('/').pop(),
        type: 'image/jpeg',
      });

      console.log('FormData:', formData);

      setUploadedImages((prevImages) => [
        ...prevImages,
        { url: result.assets[0].uri },
      ]);
    }
  };

  const renderImage = ({ item }) => (
    <Image
      source={{ uri: item.url }}
      style={[styles.image, { height: 150 }]}
    />
  );

  return (
    <View style={styles.container}>
      <Button title="Pick Images" onPress={pickImage} />
      <FlatList
        data={[...uploadedImages, ...images]}
        renderItem={renderImage}
        keyExtractor={(item) => item.url}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  list: {
    paddingHorizontal: 5,
    marginTop: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    alignItems:'center'
  },
  image: {
    width: WIDTH,
    marginBottom: 10,
    borderRadius: 10,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "black",
  },
  errorText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "red",
  },
});
