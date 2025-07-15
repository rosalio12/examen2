import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { supabase } from './componets/supabase';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signUpMessage, setSignUpMessage] = useState('');

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password
    });
    if (error) {
      Alert.alert("Error", error.message);
      setSignUpMessage('');
    } else {
      setSignUpMessage('Registro exitoso. Revisa tu correo para confirmar tu cuenta.');
    }
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setSignUpMessage('');
  };

  if (isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>¡Hola, Bienvenido!</Text>
        <Text style={styles.subText}>Has iniciado sesión correctamente.</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Cerrar sesion</Text>
        </TouchableOpacity>
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Iniciar Sesión</Text>

      <TextInput
        placeholder="Correo electrónico"
    
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>──────── o ────────</Text>

      <Text style={styles.registerTitle}>¿No tienes cuenta? Regístrate aquí</Text>

      <TouchableOpacity style={styles.registerButton} onPress={handleSignUp}>
        <Text style={styles.registerButtonText}>Registrarse</Text>
      </TouchableOpacity>

      {signUpMessage !== '' && (
        <Text style={styles.confirmationText}>{signUpMessage}</Text>
      )}

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    color: '#f8fafc',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#475569',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    color: '#f8fafc',
    backgroundColor: '#1e293b',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#f8fafc',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orText: {
    color: '#94a3b8',
    marginVertical: 20,
  },
  registerTitle: {
    color: '#f8fafc',
    marginBottom: 10,
    fontSize: 16,
  },
  registerButton: {
    borderColor: '#10b981',
    borderWidth: 2,
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#10b981',
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmationText: {
    color: '#22c55e',
    marginTop: 15,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 28,
    color: '#f8fafc',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#cbd5e1',
    marginBottom: 20,
  },
});
