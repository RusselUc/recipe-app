import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import Button from '../components/Button'
import { StatusBar } from 'expo-status-bar'
import { signin } from '../api/service'
import { useNavigation } from '@react-navigation/native'

import { useMutation } from '@tanstack/react-query'
import { AuthContext } from '../context/AuthProvider'

const SingIn = () => {
    const [form, setForm] = useState({ email: 'russel@example.com', password: 'string' })
    const { navigate } = useNavigation()
    const { setToken } = useContext(AuthContext)

    const { mutate, data, error, isLoading } = useMutation({
        mutationFn: signin, onSuccess: async (data) => {
            setToken(data?.token)
            data && navigate("recipes")
        }
    })


    const disabled = () => {
        return form.email !== '' && form.password !== ''
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recetas</Text>
            <Text style={styles.subTitle}>Ingresa a tu cuenta</Text>

            <Text style={styles.label}>Correo electronico</Text>
            <TextInput style={styles.textInput}
                placeholder='usuario@email.com'
                value={form.email}
                keyboardType='email-address'
                onChangeText={(text) => setForm({ ...form, email: text })} />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput style={styles.textInput}
                placeholder='contraseña' secureTextEntry={true}
                value={form.password}
                onChangeText={(text) => setForm({ ...form, password: text })} />
            <Button style={styles.button} onPress={() => mutate(form)} disabled={!disabled()} text="Entrar" />
            <Button style={styles.buttonSignup} onPress={() => navigate("signup")} text="Crear cuenta" />
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
        fontSize: 50,
        color: '#43927d',
        fontWeight: '800'
    },

    subTitle: {
        fontSize: 20,
        color: 'gray'
    },

    label: {
        alignSelf: 'flex-start',
        paddingStart: 30,
        letterSpacing: 0.8,
        fontWeight: '300',
        fontSize: 12,
        paddingBottom: 5
    },

    text: {
        fontSize: 14,
        color: '#fff'
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

    buttonSignup: {
        backgroundColor: '#454545',
        marginTop: 20,
        width: '60%',
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
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
});


export default SingIn