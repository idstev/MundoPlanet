import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Atraccion } from './HomeScreen';
import { dbRealTime } from '../../configs/fiirebaseConfig';
import { ref, remove, update } from 'firebase/database';
import { View } from 'react-native';
import { TextInput, Text, Divider, Button } from 'react-native-paper';
import { styles } from '../../theme/styles';

export const DetallesTurismoScreen = () => {
  
  const navigation=useNavigation()
  const route = useRoute()
  //@ts-ignore
  const { Atraccion } = route.params

  
  const [detallesForm, setDetallesForm] = useState<Atraccion>({
    id:'',
    nombre: '',
    pais: '',
    precio: '',
    estadia: ''
  })

  useEffect(() => {
    setDetallesForm(Atraccion)
  }, [])
  const handlerSetDetailForm = (key: string, value: string) => {
    setDetallesForm({ ...detallesForm, [key]: value })
  }

  const handlerUpdateAtraccion = async () => {
    //Referencia a la base de datos
    const dbRef = ref(dbRealTime, 'atracciones/' + detallesForm.id)
    await update(dbRef,{Nombre: detallesForm.nombre, Pais: detallesForm.pais, Precio: detallesForm.precio, Estadia: detallesForm.estadia })
    navigation.goBack()
    //console.log(detailForm);
  }

  const handlerDeleteAtraccion= async()=>{
    const dbRef = ref(dbRealTime, 'atracciones/' + detallesForm.id)
    await remove(dbRef)
    navigation.goBack()
  }
  return (
    <View style={styles.contentDetail}>
      <View style={styles.nombre}>
        <Text variant='headlineSmall'>Asunto:</Text>
        <TextInput
          value={detallesForm.subject}
          onChangeText={(value) => handlerSetDetailForm('subject', value)}
          style={{ flex: 1 }}
        />
      </View>
      <Divider bold />
      <View>
        <Text variant='bodyLarge'>Nombre {detallesForm.nombre}</Text>
      </View>
      <Divider />
      <View>
        <Text style={styles.textMessage}>Pais</Text>
        <TextInput
          value={detallesForm.pais}
          multiline={true}
          numberOfLines={7}
          onChangeText={(value) => handlerSetDetailForm('pais', value)} />
      </View>
      <Button mode='contained'  onPress={handlerUpdateAtraccion}>Actualizar</Button>
      <Button mode='contained'  onPress={() => handlerDeleteAtraccion()}>Eliminar</Button>
    </View>
  )
}

