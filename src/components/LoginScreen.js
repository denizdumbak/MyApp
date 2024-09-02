import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

export default function LoginScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Login</Text>
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={values => {
                    console.log(values);
                    navigation.navigate('Home');
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                        />
                        {errors.username && touched.username && (
                            <Text style={styles.error}>{errors.username}</Text>
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                        {errors.password && touched.password && (
                            <Text style={styles.error}>{errors.password}</Text>
                        )}

                        <Button onPress={handleSubmit} title="Login" />

                        <Text style={styles.switchText}>
                            Don't have an account?{' '}
                            <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
                                Register here
                            </Text>
                        </Text>
                    </View>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        fontSize: 30,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    switchText: {
        marginTop: 20,
        textAlign: 'center',
    },
    link: {
        color: 'blue',
    },
});
