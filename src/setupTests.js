// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { server } from './mocks/server';

//Establish API mocking before all tests.
beforeAll(() => server.listen())

//Reset any erquest handlers that we my add during the tests,
//so they don't affect other tests
afterEach(() => server.resetHandlers())

//Clean up after the test are finished
afterAll(() => server.close())