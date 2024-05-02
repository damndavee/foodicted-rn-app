import React, { PropsWithChildren } from 'react';
import AnimatedSplash from "react-native-animated-splash-screen";
import tokens from '../utils/tokens';

interface SplashScreenProps {
    isLoaded: boolean;
}

const SplashScreen = (props: PropsWithChildren<SplashScreenProps>) => {
  return (
    <AnimatedSplash 
        isLoaded={props.isLoaded} 
        translucent
        logoImage={require("../../assets/foreground.png")}
        backgroundColor={tokens.color.primary.default}
        logoHeight={200}
        logoWidth={200}
    >
      {props.children}
    </AnimatedSplash>
  )
}

export default SplashScreen;