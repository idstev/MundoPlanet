import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { View } from 'react-native'
import { auth } from '../configs/fiirebaseConfig';
import { Snackbar, TextInput, Text, Button } from 'react-native-paper';
import { styles } from '../theme/styles';
import { CommonActions, useNavigation } from '@react-navigation/native';


interface LoginForm {
    email: string;
    password: string;
}
interface MessageSnackBar {
    visible: boolean;
    message: string;
    color: string;
}

export const LoginScreen = () => {


    //hoocks
    const navigation = useNavigation()

    const [hiddenPassword, setHiddenPassword] = useState(true)
    const [loginForm, setLoginForm] = useState<LoginForm>({
        email: "",
        password: "",
    });

    const [messageSnackBar, setMessageSnackBar] = useState<MessageSnackBar>({
        visible: false,
        message: "",
        color: "#fff",
    });

    //funciones
    const handlerSetLoginForm = (key: string, value: string) => {
        setLoginForm({ ...loginForm, [key]: value });
    };

    const handlerLogin = async () => {
        if (!loginForm.email || !loginForm.password) {
            setMessageSnackBar({
                visible: true,
                message: "Complete todos los campos",
                color: "#962841",
            });
            return;
        }
        try {
            const response = await signInWithEmailAndPassword(
                auth,
                loginForm.email,
                loginForm.password
            );
        } catch (i) {
            console.log(i);
            setMessageSnackBar({
                visible: true,
                message: "Usuario y/o contraseña incorrecta",
                color: "#962841",
            });
        }
    };
    return (
        <View style={styles.content}>
            <Text variant="headlineMedium">Inicia Sesión</Text>
            <TextInput
                mode="outlined"
                label="Correo"
                placeholder="Escribe tu correo"
                style={styles.inputs}
                onChangeText={(value) => handlerSetLoginForm("email", value)}
            />
            <TextInput
                mode="outlined"
                label="Contraseña"
                placeholder="Escribe tu contraseña"
                secureTextEntry={hiddenPassword}
                right={<TextInput.Icon icon="eye" onPress={() => setHiddenPassword(!hiddenPassword)} />}
                style={styles.inputs}
                onChangeText={(value) => handlerSetLoginForm("password", value)}
            />
            <Button
                mode="contained"
                onPress={() => handlerLogin()}
            >
                Iniciar
            </Button>
            <Snackbar
                visible={messageSnackBar.visible}
                onDismiss={() =>
                    setMessageSnackBar({ ...messageSnackBar, visible: false })
                }
                style={{ backgroundColor: messageSnackBar.color }}
            >
                {messageSnackBar.message}
            </Snackbar>
            <Text
                onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Registro' }))}
            >
                No tienes una cuenta? Regístrate ahora
            </Text>

        </View>
    )
}
