import 'babel-polyfill'
import {handleFormSubmission} from '../js/SubmissionFormHandler';

describe('check if handleFormSubmission is defined(passed) or not(failed)', () => {
    test('Testing the handleFormSubmission function defined or not', () => {
        /// passed if handleFormSubmission is defined
        expect(handleFormSubmission).toBeDefined();
    })
})
