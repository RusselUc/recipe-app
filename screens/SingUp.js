import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Button from '../components/Button'
import { StatusBar } from 'expo-status-bar'
import { signup } from '../api/service'
import { useMutation } from 'react-query'
import { useNavigation } from '@react-navigation/native'

const SingUp = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const { navigate } = useNavigation()
    const { mutate, data, error, isLoading } = useMutation(signup, {
        onSuccess: async (data) => {
            data && navigate("signin")
        },
    })

    const disabled = () => {
        return form.name !== '' && form.email !== '' && form.password !== ''
    }
    return (
        <View style={styles.container}>
            <Text style={styles.subTitle}>Sign Up on Recipe App</Text>
            {error && <Text style={styles.error}>{error.message}</Text>}
            <TextInput style={styles.textInput} placeholder='nombre' onChangeText={(text) => setForm({ ...form, name: text })} />
            <TextInput style={styles.textInput} placeholder='usuario@email.com' onChangeText={(text) => setForm({ ...form, email: text })} />
            <TextInput style={styles.textInput} placeholder='contraseña' secureTextEntry={true} onChangeText={(text) => setForm({ ...form, password: text })} />
            <Button onPress={() => mutate(form)} disabled={!disabled()} text="Crear cuenta" />
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
    },

    error: {
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f0ad4e'
    }
});

export default SingUp