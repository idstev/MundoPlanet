import React, { useEffect, useState } from 'react'
import firebase, { updateProfile } from 'firebase/auth'
import { auth, dbRealTime } from '../../configs/fiirebaseConfig'
import { onValue, ref } from 'firebase/database'
import { FlatList, View } from 'react-native'
import { styles } from '../../theme/styles'
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { AtraccionComponent } from './components/AtraccionComponent'
import { NewAtraccionComponent } from './components/NewAtraccionComponent'

interface UserForm {
  name: string
}
export interface Atraccion{
  id: string,
  nombre: string,
  pais: string,
  precio: string,
  estadia: string
}

export const HomeScreen = () => {
  const [showModalProfile, setShowModalProfile] = useState(false)

  const [showModalAtraccion, setShowModalAtraccion] = useState(false)
  const [userForm, setUserForm] = useState<UserForm>({
    name: ''
  })
  const [userAuth, setUserAuth] = useState<firebase.User | null>(null)
  
  const [atracciones, setAtracciones] = useState<Atraccion[]>([])

  useEffect(() => {
    setUserAuth(auth.currentUser) //datos del usuario logueado
    setUserForm({ name: auth.currentUser?.displayName ?? '' })
    getAllAtracciones()
  }, [])

  const handlerUpdateUserForm = (key: string, value: string) => {
    setUserForm({ ...userForm, [key]: value })
  }

  const handlerUpdateUser = async () => {
    try {
      await updateProfile(userAuth!, { displayName: userForm.name })
    } catch (e) {
      console.log(e)
    }
    //console.log(userForm);
    setShowModalProfile(false)
  }

  const getAllAtracciones = () => {
    const dbRef = ref(dbRealTime, 'letters')
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val()
      const getKeys = Object.keys(data)
      const listAtracciones: Atraccion[] = []
      getKeys.forEach((key) => {
        const value = { ...data[key], id: key }
        listAtracciones.push(value)
      })
      setAtracciones(listAtracciones)
    })
  }


  return (
    <>
      <View style={styles.contentHome}>
        <View style={styles.headerHome}>
          <Avatar.Text size={55} label="CF" />
          <View>
            <Text variant='bodySmall'>Bienvenido</Text>
            <Text variant='labelLarge'>{userForm.name}</Text>
          </View>
          <View style={styles.icon}>
            <IconButton
              icon="cog"
              size={30}
              mode='contained'
              onPress={() => setShowModalProfile(true)}
            />
          </View>
        </View>
        <View>
          <FlatList
            data={atracciones}
            renderItem={({ item }) => <AtraccionComponent atraccion={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
      <Portal>
        <Modal visible={showModalProfile} contentContainerStyle={styles.modal}>
          <View style={styles.headerModal}>
            <Text variant='headlineLarge'>Mi Perfil</Text>
            <IconButton icon='close' onPress={() => setShowModalProfile(false)} />
          </View>
          <Divider bold />
          <View>
            <TextInput
              mode='outlined'
              label='Nombre'
              value={userForm.name}
              onChangeText={(value) => handlerUpdateUserForm('name', value)}
            />
            <TextInput
              mode='outlined'
              label='Correo'
              value={userAuth?.email!}
              disabled
            />
          </View>
          <Button mode='contained' onPress={() => handlerUpdateUser()}>Actualizar</Button>
        </Modal>
      </Portal>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setShowModalAtraccion(true)}
      />
      <NewAtraccionComponent visible={showModalAtraccion} setVisible={setShowModalAtraccion} />
    </>
  )
}
