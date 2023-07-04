import {Dispatch} from 'redux';
import {ResponseType} from '../api/axiosInstance';
import {RootAppActionsType} from '../state/store';
import {EntityStatus, setAppErrorAC, setAppStatusAC} from '../state/appReducer/appReducer';

export const appServerHandlingError = <T>(data: ResponseType<T>, dispatch: Dispatch<RootAppActionsType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Something was wrong!!!'))
    }
    dispatch(setAppStatusAC(EntityStatus.Failed))
}
export const appNetworkHandlingError = (error: { message: string }, dispatch: Dispatch<RootAppActionsType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Something was wrong'));
    dispatch(setAppStatusAC(EntityStatus.Failed))
}