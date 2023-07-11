import React from 'react';
import Grid from '@mui/material/Grid/Grid';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button/Button';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {loginUserTC} from '../../state/authReducer/authReducer';
import {AppStateType, useAppDispatch} from '../../state/store';
import {useSelector} from 'react-redux';
import { Navigate } from 'react-router-dom';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required!'),
    password: Yup.string().required('Password is required!'),
    rememberMe: Yup.boolean().oneOf([true], 'You should check this field!')
})

export const Login = () => {
    const isLogged = useSelector<AppStateType, boolean>(state => state.login.isLoggedStatus);
    const dispatch = useAppDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch(loginUserTC(values))
        },
    });

    const {handleSubmit, handleChange, values, errors, touched} = formik;
    if (isLogged) {
        return <Navigate to={'/'} />
    }
    return (
        <>
            <Grid container justifyContent={'center'}>
                <Grid item xs={4}>
                    <form onSubmit={handleSubmit}>
                        <FormControl style={{width: '100%'}} margin={'normal'}>
                            <FormLabel>
                                <p>This is Login form for Todo List</p>
                                <p>Email: free@samuraijs.com</p>
                                <p>Password: free</p>
                            </FormLabel>
                            <FormGroup style={{margin: '10px 0'}}>
                                <TextField
                                    variant="standard"
                                    type={'text'}
                                    label={'Email'}
                                    style={{margin: '20px 0'}}
                                    {...formik.getFieldProps('email')}
                                    color={touched.email && !errors.email ? 'success' : 'primary'}
                                    error={!!errors.email && touched.email}
                                    helperText={!!errors.email && touched.email && errors.email}
                                />
                                <TextField
                                    variant="standard"
                                    type={'password'}
                                    label={'Password'}
                                    style={{margin: '20px 0'}}
                                    {...formik.getFieldProps('password')}
                                    color={touched.password && !errors.password ? 'success' : 'primary'}
                                    error={!!errors.password && touched.password}
                                    helperText={!!errors.password && touched.password && errors.password}
                                />
                                <FormControlLabel
                                    label={'Remember me'}
                                    control={
                                        <Checkbox
                                            {...formik.getFieldProps('rememberMe')}
                                            checked={formik.values.rememberMe}
                                        />
                                    } />
                                <span
                                    style={{color: '#d32f2f'}}>{!!errors.rememberMe && touched.rememberMe && errors.rememberMe}</span>
                            </FormGroup>
                            <Button disabled={!!Object.keys(errors).length} variant={'contained'} type={'submit'}>Log
                                In</Button>
                        </FormControl>
                    </form>
                </Grid>
            </Grid>
        </>
    )
};