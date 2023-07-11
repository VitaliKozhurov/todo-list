import {Dispatch} from 'redux';
import {ResponseType} from '../api/axiosInstance';
import {RootAppActionsType} from '../state/store';
import {EntityStatus, setAppErrorAC, setAppStatusAC} from '../state/appReducer/appReducer';

export const appServerHandlingError = <T>(data: ResponseType<T>, dispatch: Dispatch<RootAppActionsType>) => {
    dispatch(setAppErrorAC(data.messages.length ? data.messages[0] : 'Something was wrong!!!'))
    dispatch(setAppStatusAC(EntityStatus.Failed))
}
export const appNetworkHandlingError = (error: { message: string }, dispatch: Dispatch<RootAppActionsType>) => {
    console.log(error)
    dispatch(setAppErrorAC(error.message ? error.message : 'Something went wrong'));
    dispatch(setAppStatusAC(EntityStatus.Failed))
}