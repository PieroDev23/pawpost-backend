import { testTransaction } from "pg-transactional-tests";

// start transaction before all tests (only when there are queries):
beforeAll(testTransaction.start);

// start transaction before each test (only when there are queries):
beforeEach(testTransaction.start);

// rollback transaction after each test (if transaction started):
afterEach(testTransaction.rollback);

// closes all connections in the end, pending transactions (if any) are discarded
afterAll(testTransaction.close);
