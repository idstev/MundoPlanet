import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import { styles } from '../theme/styles';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../configs/fiirebaseConfig';
import { CommonActions, useNavigation } from '@react-navigation/native';


interface RegisterForm {
    email: string;
    password: string;
}

interface MessageSnackBar {
    visible: boolean,
    message: string,
    color: string
}


export const RegisterScreen = () => {
    //hocks
    const navigation = useNavigation()
    //Hock del registro
    const [registerForm, setRegisterForm] = useState<RegisterForm>({
        email: "",
        password: "",
    });

    const [hiddenPassword, setHiddenPassword] = useState(true)

    const [messageSnackBar, setMessageSnackBar] = useState<MessageSnackBar>({
        visible: false,
        message: "",
        color: "#fff"
    })
    //funciones
    //funcion para actualizar datos dle formulario 
    const handlerSetRegisterForm = (key: string, value: string) => {
        setRegisterForm({ ...registerForm, [key]: value });
    }

    //recoleccion de datos del registro 
    const handlerRegister = async () => {
        if (!registerForm.email || !registerForm.password) {
            setMessageSnackBar({
                visible: true,
                message: "Complete todos los campos para registrarse",
                color: "#962841"
            })
            return

        } try {

            const response = await createUserWithEmailAndPassword(
                auth,
                registerForm.email,
                registerForm.password
            );
            setMessageSnackBar({
                visible: true,
                message: "Registro Exitoso, Bienvenido",
                color: "#8EF39C"
            })

        } catch (i) {
            console.log(i)
            setMessageSnackBar({
                visible: true,
                message: "No se logró completar el registro, intente más tarde",
                color: "#962841"
            })
        }
    }
    return (
        <View style={styles.content}>
            <Text variant="headlineMedium">
                Registrate
            </Text>
            <TextInput
                mode="outlined"
                label="Correo"
                placeholder="Escribe tu correo"
                style={styles.inputs}
                onChangeText={(value) => handlerSetRegisterForm("email", value)}
            />
            <TextInput
                mode="outlined"
                label="Contraseña"
                placeholder="Escribe tu contraseña"
                secureTextEntry={hiddenPassword}
                style={styles.inputs}
                right={<TextInput.Icon icon="eye" onPress={() => setHiddenPassword(!hiddenPassword)} />}
                onChangeText={(value) => handlerSetRegisterForm("password", value)}
            />
            <Button
                mode="contained"
                onPress={() => handlerRegister()}
            >
                Registrarse
            </Button>
            <Snackbar
                visible={messageSnackBar.visible}
                onDismiss={() => setMessageSnackBar({ ...messageSnackBar, visible: false })}
                style={{ backgroundColor: messageSnackBar.color }}
            >
                {messageSnackBar.message}
            </Snackbar>
            <Text
                onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Ingreso' }))}
            >
                Ya tienes una cuenta? Inicia sesión
            </Text>

        </View>
    )
}
