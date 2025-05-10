# Unit Tests

Testing done with [Jest](https://jestjs.io/docs/en/getting-started.html)

---

This folder holds all the unit tests that run on the field validation scripts. The directory structure reflects that of [the validationFunctions folder](/references/validationFunctions/).

Testing files end with `.test.js`

## Writing Tests

1. Import the validation function you want to test with a 'require' statment.
2. Use a `describe` block to logically categorize your tests. [Ref](https://jestjs.io/docs/en/api#describename-fn).
3. Write `test` blocks within `describe` blocks. [Ref](https://jestjs.io/docs/en/api#testname-fn-timeout).
4. Call different variations of arguments to the validation function and run the output through an `expect` function. [Ref](https://jestjs.io/docs/en/expect#expectvalue).

   **Hints**

   > Alternatively, you can use an array of arrays containing testing inputs and expected outputs, and take advantage of `test.each()` to avoid writing multiple test blocks. [Ref](https://jestjs.io/docs/en/api#testeachtablename-fn-timeout).

> You can use `.only` or `.skip` on `describe` or `test` blocks to control which subset of tests you want to run.

## Running Tests

### Running a Single Test

`npx jest <test file name>`

### Running Multiple Tests

`npx jest <testname1> <testname2> <testname3>`

### Running All Tests

`npm run test` or `npx jest`

### Running a Code Coverage Report

`npx jest --collectCoverage`

---
