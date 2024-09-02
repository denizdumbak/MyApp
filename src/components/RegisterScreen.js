import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number is not valid').required('Phone number is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
});

export default function RegisterScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Register</Text>
            <Formik
                initialValues={{ username: '', email: '', phone: '', password: '', confirmPassword: '' }}
                validationSchema={RegisterSchema}
                onSubmit={values => {
                    console.log(values);
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
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        {errors.email && touched.email && (
                            <Text style={styles.error}>{errors.email}</Text>
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Phone Number Ex.(505...)"
                            keyboardType="numeric"
                            onChangeText={handleChange('phone')}
                            onBlur={handleBlur('phone')}
                            value={values.phone}
                        />
                        {errors.phone && touched.phone && (
                            <Text style={styles.error}>{errors.phone}</Text>
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

                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            secureTextEntry
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                        />
                        {errors.confirmPassword && touched.confirmPassword && (
                            <Text style={styles.error}>{errors.confirmPassword}</Text>
                        )}

                        <Button onPress={handleSubmit} title="Register" />

                        <Text style={styles.switchText}>
                            Already have an account?{' '}
                            <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                                Login here
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
