
  const config = {
    apiKey: "",
    authDomain: "react-brno-app.firebaseapp.com",
    projectId: "react-brno-app",
    storageBucket: "react-brno-app.appspot.com",
    messagingSenderId: "",
    appId: ""
  };

  export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
      throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.ts');
    } else {
      return config;
    }
  }    
  
