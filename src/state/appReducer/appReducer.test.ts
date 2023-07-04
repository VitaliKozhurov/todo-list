import {appReducer, AppReducerStateType, EntityStatus, setAppErrorAC, setAppStatusAC} from './appReducer';

describe('App reducer test', () => {
    let appInitialState: AppReducerStateType

    beforeEach(() => {
        appInitialState = {
            status: EntityStatus.Idle,
            error: null
        }
    })
    it('Should change app status', () => {
        const endState = appReducer(appInitialState,setAppStatusAC(EntityStatus.Failed));

        expect(endState.status).toBe(EntityStatus.Failed)
        expect(endState.error).toBe(null)
    });

    it('Should change app status', () => {
        const endState = appReducer(appInitialState,setAppStatusAC(EntityStatus.Loading));

        expect(endState.status).toBe(EntityStatus.Loading)
        expect(endState.error).toBe(null)
    });

    it('Should change app status', () => {
        const endState = appReducer(appInitialState,setAppStatusAC(EntityStatus.Succeeded));

        expect(endState.status).toBe(EntityStatus.Succeeded)
        expect(endState.error).toBe(null)
    });

    it('Should change app error state', () => {
        const endState = appReducer(appInitialState,setAppErrorAC('Ooooppppsss!'));

        expect(endState.status).toBe(EntityStatus.Idle)
        expect(endState.error).toBe('Ooooppppsss!')
    });
})