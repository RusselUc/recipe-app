import { View, Text, StyleSheet, SafeAreaView, StatusBar, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native'
import { useCallback, useContext, useRef, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import Button from './Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AuthContext } from '../context/AuthProvider'
import { createRecipe } from '../api/service'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

import { BottomSheetModal, BottomSheetModalProvider, } from '@gorhom/bottom-sheet'
import CameraComponent from './CameraComponent'

const RecipeForm = () => {

    const sheetRef = useRef(null)

    const [open, setOpen] = useState(false)
    const [cameraOpen, setCameraOpen] = useState(false)

    const { navigate } = useNavigation()
    const { token } = useContext(AuthContext)
    const [form, setForm] = useState({
        title: 'Receta 4',
        time_minutes: 20,
        price: 10,
        image: '',
        description: ''
    })

    const queryClient = useQueryClient()

    const { mutate, data, error, isLoading } = useMutation(createRecipe, {
        onSuccess: async (data) => {
            queryClient.invalidateQueries(['recipes'])
            navigate('recipes')
        },
    });

    const snapPoints = ["25%"];

    const handle = () => {
        setCameraOpen(true)
    }

    const pickImage = async () => {
        sheetRef.current?.close()
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setForm({
                ...form, image: {
                    uri: result.assets[0].uri,
                    name: 'image.jpg',
                    type: 'image/jpg',
                }
            });
        }
    };

    return !cameraOpen ? (
        <BottomSheetModalProvider>
            <ScrollView style={{ height: '100%', backgroundColor: "white" }}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.form}>
                        <Text style={styles.title}>Añadir receta</Text>
                        {form.image.uri && (
                            <View>
                                <TouchableOpacity style={styles.iconButton} onPress={() => setForm({ ...form, image: { uri: null } })}>
                                    <Ionicons style={styles.icon} name="close-circle" size={35} color="black" />
                                </TouchableOpacity>
                                <Image source={{ uri: form.image.uri }} style={styles.image} />
                            </View>
                        )}

                        <Text style={styles.label}>Titulo <Text style={styles.required}>*</Text></Text>
                        <TextInput style={styles.textInput}
                            placeholder='Receta'
                            value={form.title}
                            onChangeText={(text) => setForm({ ...form, title: text })} />

                        <Text style={styles.label}>Tiempo (minutos)<Text style={styles.required}>*</Text></Text>
                        <TextInput style={styles.textInput}
                            placeholder='tiempo en minutos'
                            value={form.time_minutes.toString()}
                            keyboardType="numeric"
                            onChangeText={(text) => setForm({ ...form, time_minutes: Number(text) })} />

                        <Text style={styles.label}>Precio<Text style={styles.required}>*</Text></Text>
                        <TextInput style={styles.textInput}
                            placeholder='Precio'
                            value={form.price.toString()}
                            keyboardType="numeric"
                            onChangeText={(text) => setForm({ ...form, price: Number(text) })} />

                        <Text style={styles.label}>Descripción</Text>
                        <TextInput style={styles.textInputDescription}
                            multiline
                            placeholder='Descripción'
                            value={form.description}
                            onChangeText={(text) => setForm({ ...form, description: text })} />
                        {
                            !form.image.uri && (
                                <TouchableOpacity style={styles.contentAdd} onPress={() => handle()}>
                                    <Text style={styles.addText}>+ Añadir imagen</Text>
                                </TouchableOpacity>
                            )
                        }

                        <View style={styles.contentButton}>
                            <Button style={styles.cancel} text='Cancelar' onPress={() => navigate('recipes')} />
                            <Button style={styles.add} text='Añadir' onPress={() => mutate({ mutationKey: [token, form] })} />
                        </View>
                    </View>
                </SafeAreaView>

            </ScrollView>
        </BottomSheetModalProvider >
    ) : (
        <CameraComponent form={form} setForm={setForm} setCameraOpen={setCameraOpen} />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00',
        paddingTop: StatusBar.currentHeight,
    },

    // container: {
    //     flex: 1,
    //     backgroundColor: 'gray',
    //     alignItems: 'center',
    //     justifyContent: 'center'
    // },

    contentButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 10,
        width: '100%'
    },

    contentOptions: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    form: {
        height: '50%',
        alignItems: 'center',
    },

    title: {
        fontSize: 18,
        fontWeight: '600',
        alignSelf: 'flex-start',
        paddingStart: 30,
        paddingVertical: 10,
        color: '#454545'
    },

    label: {
        alignSelf: 'flex-start',
        paddingStart: 30,
        letterSpacing: 0.8,
        fontWeight: '300',
        fontSize: 12,
        paddingBottom: 5
    },

    required: {
        color: '#ff1949'
    },

    textInput: {
        padding: 10,
        paddingStart: 20,
        marginBottom: 20,
        width: '85%',
        height: 50,
        borderRadius: 8,
        backgroundColor: '#f3f3f3'
    },

    textInputDescription: {
        padding: 10,
        paddingStart: 20,
        marginBottom: 20,
        width: '85%',
        height: 90,
        borderRadius: 8,
        backgroundColor: '#f3f3f3',
        textAlignVertical: 'top'
    },

    image: {
        width: 250,
        height: 250,
        borderRadius: 20,
        marginBottom: 20
    },

    iconButton: {
        position: 'absolute',
        alignSelf: 'flex-end',
        zIndex: 1,
    },

    icon: {
        color: '#c10029'
    },

    add: {
        backgroundColor: '#43927d',
        marginVertical: 20,
        width: '40%',
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    cancel: {
        backgroundColor: '#ff214f',
        marginVertical: 20,
        width: '40%',
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    contentAdd: {
        alignSelf: 'flex-start',
        paddingStart: 30,
    },

    addText: {
        fontSize: 16,
        color: '#43927d',
        fontWeight: '700'
    },

    buttonOption: {
        backgroundColor: '#f1f1f1',
        height: 130,
        width: 130,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default RecipeForm