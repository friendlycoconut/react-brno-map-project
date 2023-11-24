
  const config = {
    apiKey: "YourAPIKey",
    authDomain: "react-brno-app.firebaseapp.com",
    projectId: "react-brno-app",
    storageBucket: "react-brno-app.appspot.com",
    messagingSenderId: "665113238679",
    appId: "1:665113238679:web:2a93bbadf62e2747305dd2"
  };

  export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
      throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.ts');
    } else {
      return config;
    }
  }    
  
