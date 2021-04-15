# Vesting CLI

## Run the CLI

You can run the cli with node.js by running the script directly.

```bash
cd <PATH_TO_PROJECT>

./vesting_program.js <PATH_TO_CSV> <YYYY-MM-DD>
```

## Run the Tests

```bash
cd <PATH_TO_PROJECT>

npm install

npm test
```

## Design

- There are some basic validations on inputs, but instead I focused attention towards readabilty, adding default variables for safer run time, and unit tests with 100% code coverage.
- Using [toFixed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) to get the fraction percsion.
    - Ran into issues on what the expected behavior should be for some numbers (See test cases asserts for `output.test.js`).
- No documentation, since I tried to express the code according the prompt.
- This software was intended to be written in a functional manner, due to the focus on data processing.
- The functional logic in this software can be ported to a big data framwork to process larger data sets in parrallel.

## Source Code

```
/test               # Jest unit tests
/src                # Source code
    - runner.js     # Start of program
    - input.js      # Handles args and parse the file
    - process.js    # Maps the events to emplyoees
    - output.js     # Generates the outfile
    - date.js       # Date Logic
vesting_program.js  # CLI program
```
