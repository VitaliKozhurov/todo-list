import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useSelector} from 'react-redux';
import {AppStateType, useAppDispatch} from '../../state/store';
import {setAppErrorAC} from '../../state/appReducer/appReducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
    bottom: 30,
    left: '50%',
    transform: 'translateX(-50%)'
};


export const CustomSnackbar = () => {
    const error = useSelector<AppStateType, string | null>(state => state.app.error)
    const dispatch = useAppDispatch();

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC(null));
    };

    return (
        <Snackbar style={style} open={!!error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
}