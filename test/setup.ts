import { rm } from "fs/promises";
 
import { join } from "path";
 
global.beforeEach(async () => {
    // Remove the test database file before each test
    try {
        await rm(join(__dirname, '..', 'test.sqlite'));
    } catch (err) {
    }
});
 