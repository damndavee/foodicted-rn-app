const appid = process.env.EXPO_PUBLIC_FB_APP_ID;
const clientToken = process.env.EXPO_PUBLIC_FB_CLIENT_TOKEN;
const scheme = process.env.EXPO_PUBLIC_FB_SCHEME;

module.exports =  {
  "expo": {
    "name": "Foodicted",
    "slug": "foodicted-rn-app",
    "scheme": "foodicted",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/ic_launcher.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/ic_launcher.png",
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
        "foregroundImage": "./assets/foreground.png",
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
      "expo-tracking-transparency",
      "expo-secure-store",
      [
        "react-native-fbsdk-next",
        {
          "appID": appid || 'placeholder',
          "clientToken": clientToken,
          "displayName": "Foodicted",
          "scheme": scheme,
          "advertiserIDCollectionEnabled": false,
          "autoLogAppEventsEnabled": false,
          "isAutoInitEnabled": true,
          "iosUserTrackingPermission": "This identifier will be used to deliver personalized ads to you."
        }
      ],
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
