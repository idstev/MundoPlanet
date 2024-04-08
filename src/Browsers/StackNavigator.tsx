import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../configs/fiirebaseConfig'
import { LoginScreen } from '../Screens/loginScreen'
import { RegisterScreen } from '../Screens/RegisterScreen'
import { HomeScreen } from '../Screens/Home/HomeScreen'
import { DetallesTurismoScreen } from '../Screens/Home/DetallesTurismoScreen'
import { ActivityIndicator, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'




//propiedades
interface Routes {
    name: string,
    screen: () => JSX.Element, //elemento JSX
    headerShow?:boolean,
    title?: string
}

const Stack = createStackNavigator();

export const StackNavigator = () => {
    //hooks
    const [isAuth, setIsAuth] = useState(false)

    const[isLoading, setIsLoading]= useState(false)

    //estado de autenticacion
    useEffect(()=>{
        setIsLoading(true)
        onAuthStateChanged(auth, (user)=>{
            if (user){
                setIsAuth(true)
            }
            setIsLoading(false)
        })
    }, [])
    //ARREGLOS
    const routesNoAuth: Routes[]=[
        {name:"Ingreso", screen:LoginScreen},
        {name: "Registro", screen:RegisterScreen}
    ]

    const routesAuth: Routes[]=[
        {name: "Home", screen: HomeScreen},
        {name: "Detalles", screen:DetallesTurismoScreen}
    ]
  return (
    <>
    {
        isLoading ? (
            <View>
                <ActivityIndicator size={50}/>
            </View>
        ):(
            <Stack.Navigator>
                {
                    !isAuth ?
                    routesNoAuth.map((item, index)=>(
                        <Stack.Screen key={index} name={item.name} options={{ headerShown: false }} component={item.screen} />
                    ))
                    :
                    routesAuth.map((item, index)=>(
                        <Stack.Screen key={index} name={item.name} options={{ headerShown: item.headerShow ?? false, title: item.title }} component={item.screen} />
                    ))
                }
            </Stack.Navigator>
        )

    }

    </>
)
}
