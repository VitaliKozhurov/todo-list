export const sum = (salary: number, n: number) => salary + n;
export const sub = (salary: number, n: number) => salary - n;
export const div = (salary: number, n: number) => salary / n;
export const mult = (salary: number, n: number) => salary * n;

export type ActionType = {
    type: 'SUM' | 'SUB' | 'DIV' | 'MULTIPLE',
    payload: {
        n: number
    }
}

export const salaryReducer = (state: number, action: ActionType) => {
    switch (action.type) {
        case 'SUM':
            return state + action.payload.n
        case 'SUB':
            return state - action.payload.n
        case 'DIV':
            return state / action.payload.n
        case 'MULTIPLE':
            return state * action.payload.n

        default:
            return state;
    }
}
