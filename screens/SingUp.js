import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Button from '../components/Button'
import { StatusBar } from 'expo-status-bar'
import { signup } from '../api/service'
import { useMutation } from '@tanstack/react-query'
import { useNavigation } from '@react-navigation/native'

const SingUp = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const { navigate } = useNavigation()

    const { mutate, data, error, isLoading } = useMutation({
        mutationFn: signup, onSuccess: async (data) => {
            data && navigate("signin")
        }
    })

    const disabled = () => {
        return form.name !== '' && form.email !== '' && form.password !== ''
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up on Recipe App</Text>
            {error && <Text style={styles.error}>{error.message}</Text>}

            <Text style={styles.label}>Nombre</Text>
            <TextInput style={styles.textInput} placeholder='nombre' onChangeText={(text) => setForm({ ...form, name: text })} />

            <Text style={styles.label}>Correo electronico</Text>
            <TextInput style={styles.textInput} placeholder='usuario@email.com' onChangeText={(text) => setForm({ ...form, email: text })} />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput style={styles.textInput} placeholder='contraseña' secureTextEntry={true} onChangeText={(text) => setForm({ ...form, password: text })} />
            <Button style={styles.button} onPress={() => mutate(form)} disabled={!disabled()} text="Crear cuenta" />
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 20,
        color: '#43927d',
        fontWeight: 'bold',
        marginBottom: 10
    },

    label: {
        alignSelf: 'flex-start',
        paddingStart: 30,
        letterSpacing: 0.8,
        fontWeight: '300',
        fontSize: 12,
        paddingBottom: 5
    },

    textInput: {
        padding: 10,
        paddingStart: 20,
        marginBottom: 20,
        width: '80%',
        height: 50,
        borderRadius: 8,
        backgroundColor: '#f3f3f3'
    },

    button: {
        backgroundColor: '#43927d',
        marginTop: 20,
        width: '60%',
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    error: {
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f0ad4e'
    }
});

export default SingUp