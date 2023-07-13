import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Button from '../components/Button'
import { StatusBar } from 'expo-status-bar'
import { signin } from '../api/service'
import { useNavigation } from '@react-navigation/native'

const SingIn = () => {
    const [data, setData] = useState({ email: '', password: '' })
    const { navigate } = useNavigation()
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recipe App</Text>
            <Text style={styles.subTitle}>Sign In to your account</Text>
            <TextInput style={styles.textInput} placeholder='usuario@email.com' onChangeText={(text) => setData({ ...data, email: text })} />
            <TextInput style={styles.textInput} placeholder='contraseña' secureTextEntry={true} onChangeText={(text) => setData({ ...data, password: text })} />
            <Button onPress={() => signin(data)} />

            <TouchableOpacity onPress={() => navigate("signup")}>
                <Text> Crear cuenta </Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 50,
        color: '#34434D',
        fontWeight: 'bold'
    },

    subTitle: {
        fontSize: 20,
        color: 'gray'
    },

    textInput: {
        padding: 10,
        paddingStart: 30,
        width: '80%',
        height: 50,
        marginTop: 20,
        borderRadius: 8,
        backgroundColor: '#fff'
    }
});


export default SingIn