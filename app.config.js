export default {
  "expo": {
    "name": "Foodicted",
    "slug": "foodicted-rn-app",
    "scheme": "foodicted",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/foreground.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash-screen.png",
      "resizeMode": "cover",
      "backgroundColor": "#F3C58B"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.noncomp.foodicted",
      "googleServicesFile": process.env.GOOGLE_SERVICES_INFOPLIST,
    },
    "android": {
      "adaptiveIcon": { 
        "foregroundImage": "./assets/ic_launcher.png",
        "backgroundColor": "#F3C58B"
      },
      "package": "com.noncomp.foodicted",
      "googleServicesFile": process.env.GOOGLE_SERVICES_JSON,
    },
    "web": {
      "favicon": "./assets/foreground.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-font",
        {
          "fonts": [
            "./node_modules/@expo-google-fonts/dancing-script/DancingScript_400Regular.ttf",
            "./node_modules/@expo-google-fonts/dancing-script/DancingScript_500Medium.ttf",
            "./node_modules/@expo-google-fonts/dancing-script/DancingScript_600SemiBold.ttf"
          ]
        }
      ]
    ],
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "9bad2384-fc5f-469d-b5da-019b8580622b"
      }
    }
  }
}
