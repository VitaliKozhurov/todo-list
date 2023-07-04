import {appReducer, AppReducerStateType, AppStatus, setAppErrorAC, setAppStatusAC} from './appReducer';

describe('App reducer test', () => {
    let appInitialState: AppReducerStateType

    beforeEach(() => {
        appInitialState = {
            status: AppStatus.Idle,
            error: null
        }
    })
    it('Should change app status', () => {
        const endState = appReducer(appInitialState,setAppStatusAC(AppStatus.Failed));

        expect(endState.status).toBe(AppStatus.Failed)
        expect(endState.error).toBe(null)
    });

    it('Should change app status', () => {
        const endState = appReducer(appInitialState,setAppStatusAC(AppStatus.Loading));

        expect(endState.status).toBe(AppStatus.Loading)
        expect(endState.error).toBe(null)
    });

    it('Should change app status', () => {
        const endState = appReducer(appInitialState,setAppStatusAC(AppStatus.Succeeded));

        expect(endState.status).toBe(AppStatus.Succeeded)
        expect(endState.error).toBe(null)
    });

    it('Should change app error state', () => {
        const endState = appReducer(appInitialState,setAppErrorAC('Ooooppppsss!'));

        expect(endState.status).toBe(AppStatus.Idle)
        expect(endState.error).toBe('Ooooppppsss!')
    });
})