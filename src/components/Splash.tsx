import React, { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import AnimatedSplash from "react-native-animated-splash-screen";
import { COLORS } from '../utils/tokens';

interface SplashScreenProps {
    isLoaded: boolean;
}

const SplashScreen = (props: PropsWithChildren<SplashScreenProps>) => {
  return (
    <AnimatedSplash 
        isLoaded={props.isLoaded} 
        translucent
        logoImage={require("../../assets/splash-screen.png")}
        backgroundColor={COLORS.primary}
        logoHeight={200}
        logoWidth={200}
    >
      {props.children}
    </AnimatedSplash>
  )
}

export default SplashScreen;

const styles = StyleSheet.create({})