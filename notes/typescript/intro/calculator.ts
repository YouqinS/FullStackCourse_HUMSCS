const multiplicator1 = (a: number, b: number, printText: string) => {
    console.log(printText,  a * b);
};

//call a function
multiplicator1(12, 4, 'Multiplied 12 and 4, the result is:');

type Operation = 'multiply' | 'add' | 'divide';

/*const calculator1 = (a: number, b: number, op : Operation) => {
    if (op === 'multiply') {
        return a * b;
    } else if (op === 'add') {
        return a + b;
    } else if (op === 'divide') {
        if (b === 0) return 'can\'t divide by 0!';
        return a / b;
    }
}*/

type Result = string | number;

/*const calculatorf = (a: number, b: number, op: Operation): Result => {

    if (op === 'multiply') {
        return a * b;
    } else if (op === 'add') {
        return a + b;
    } else if (op === 'divide') {
        //if (b === 0) return 0;
        if (b === 0) return 'this cannot be done'; //(return type error without | string)
        return a / b;
    }
}*/

//with error handling
export const calculator = (a: number, b: number, op: Operation) : Result => {
    switch(op) {
        case 'multiply':
            return a * b;
        case 'divide':
            if (b === 0) throw new Error('Can\'t divide by 0!');
            return a / b;
        case 'add':
            return a + b;
        default:
            throw new Error('Operation is not multiply, add or divide!');
    }
};

try {
    console.log(calculator(1, 0 , 'divide'));
} catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
