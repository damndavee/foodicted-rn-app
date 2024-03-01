import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnimatedSplash from "react-native-animated-splash-screen";

interface SplashScreenProps {
    isLoaded: boolean;
}

const SplashScreen = (props: PropsWithChildren<SplashScreenProps>) => {
  return (
    <AnimatedSplash 
        isLoaded={props.isLoaded} 
        backgroundColor={'#006BFF'} 
        translucent
        logoImage={require("../../assets/splash-screen.png")}
        logoHeight={200}
        logoWidth={200}
    >
      {props.children}
    </AnimatedSplash>
  )
}

export default SplashScreen;

const styles = StyleSheet.create({})