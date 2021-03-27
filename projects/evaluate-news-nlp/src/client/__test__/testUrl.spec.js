import isURLValid from '../js/URLChecker'

describe('Test checkForURL function', () => {
    test('Testing the checkUrl function defined(passed) or not(failed)', () => {
      /// passed if handleSubmit is defined
        expect(isURLValid).toBeDefined();
    })

    test('return false as passed not valid URL', () => {
        // passed if resulting false..
        expect(isURLValid('ooooho')).toBeFalsy();
    })

    test('testing valid URL.. using Truthy..', () => {
        // passed if function could recognize URL of my tweet :)
        expect(isURLValid('https://twitter.com/csseifms/status/1375547862042431492')).toBeTruthy();
    })
})
