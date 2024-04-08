import React, { useState } from 'react'
import { dbRealTime } from '../../../configs/fiirebaseConfig'
import { push, ref, set } from 'firebase/database'
import { Button, Divider, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { View } from 'react-native'
import { styles } from '../../../theme/styles'


interface Props {
    visible: boolean,
    setVisible: Function
}

interface AtraccionForm {
    nombre: string,
    pais: string,
    precio: string,
    estadia: string
}
export const NewAtraccionComponent = ({ visible, setVisible }: Props) => {

    //hooks
    const [atraccionForm, setAtraccionForm] = useState<AtraccionForm>({
        nombre: '',
        pais: '',
        precio: '',
        estadia: ''
    })

    const handlerSetAtraccionForm = (key: string, value: string) => {
        setAtraccionForm({ ...atraccionForm, [key]: value })
    }
    const handlerSaveAtraccion = async () => {
        if (!atraccionForm.nombre || !atraccionForm.pais || !atraccionForm.precio || atraccionForm.estadia) {
            return
        }
        //console.log(letterForm);
        const dbRef = ref(dbRealTime, 'atracciones')
        const saveatraccion = push(dbRef) //ubicacion de almacenamiento
        try {
            await set(saveatraccion, atraccionForm)
            //Limpiar los valores del formulario
            setAtraccionForm({
                nombre: '',
                pais: '',
                precio: '',
                estadia: ''
            })
        } catch (e) {
            console.log(e);
        }
        setVisible(false)

    }


    return (
        <Portal>
            <Modal visible={visible} contentContainerStyle={styles.modal}>
                <View style={styles.headerModal}>
                    <Text variant='headlineMedium'>Nueva Atraccion</Text>
                    <IconButton icon='close' onPress={() => setVisible(false)} />
                </View>
                <Divider bold />
                <TextInput
                    label='Nombre'
                    mode='outlined'
                    onChangeText={(value) => handlerSetAtraccionForm('nombre', value)}
                />
                <TextInput
                    label='pais'
                    mode='outlined'
                    onChangeText={(value) => handlerSetAtraccionForm('pais', value)}
                />
                <TextInput
                    label='precio'
                    mode='outlined'
                    onChangeText={(value) => handlerSetAtraccionForm('precio', value)}
                    multiline={true}
                    numberOfLines={7}
                />
                <TextInput
                    label='estadia'
                    mode='outlined'
                    onChangeText={(value) => handlerSetAtraccionForm('estadia', value)}
                    multiline={true}
                    numberOfLines={7}
                />
                <Button style={{ marginTop: 20 }} mode='contained' onPress={() => handlerSaveAtraccion()}>Guardar</Button>
            </Modal>
        </Portal>
    )
}
