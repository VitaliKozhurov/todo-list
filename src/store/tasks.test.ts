import {ActionType, div, mult, salaryReducer, sub, sum} from './tasks';

test('Should increase salary', () => {
    // Data
    const salary: number = 800;
    const n: number = 200;
    // Action
    const result = sum(salary, n)

    // Test
    expect(result).toBe(1000)
})

test('Should crease salary', () => {
    expect(sub(1200, 200)).toBe(1000)
})
test('Should div salary', () => {
    expect(div(1200, 2)).toBe(600)
})
test('Should mult salary', () => {
    expect(mult(1200, 2)).toBe(2400)
})

test('Test SUM salaryReducer', () => {
    const salary: number = 1000;
    const action: ActionType = {
        type: 'SUM',
        payload: {n: 200}
    }

    const newSalary = salaryReducer(salary, action);

    expect(newSalary).toBe(1200);
})
test('Test SUM salaryReducer', () => {
    const salary: number = 1000;
    const action: ActionType = {
        type: 'SUM',
        payload: {n: 200}
    }

    const newSalary = salaryReducer(salary, action);

    expect(newSalary).toBe(1200);
})