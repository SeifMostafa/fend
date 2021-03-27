import 'babel-polyfill'
import {handleSubmit} from '../js/formHandler';

describe('check if handleSubmit is defined(passed) or not(failed)', () => {
    test('Testing the handleSubmit function defined or not', () => {
        /// passed if handleSubmit is defined
        expect(handleSubmit).toBeDefined();
    })
})
