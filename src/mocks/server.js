import {setupServer} from 'msw/node';
import { handlers } from './handlers';

// this configure a erquest mocking server with the given request handlers
export const server = setupServer(...handlers);