import React from 'react'
import { Atraccion } from '../HomeScreen';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

interface props {
    atraccion: Atraccion,
}

export const AtraccionComponent = ({ atraccion }: props) => {
    const navigation = useNavigation()
    return (
        <View>
            <View>
                <Text variant='labelLarge'>Nombre: {atraccion.nombre}</Text>
                <Text variant='bodyMedium'>Pais: {atraccion.pais}</Text>
                <Text variant='bodyMedium'>Precio: {atraccion.precio}</Text>
                <Text variant='bodyMedium'>Estadia: {atraccion.estadia}</Text>
            </View>
            <View>
            <IconButton
            icon="email-open"
            size={25}
            onPress={() => navigation.dispatch(CommonActions.navigate({name:'Detalles', params:{atraccion}}))}
        />
            </View>
        </View>

    )
}
