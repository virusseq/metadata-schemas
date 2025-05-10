# data-dictionary

## Folder Structure

- File Schemas

File Schemas are found in `/schemas`

- Variables, Scripts, Regex, Code list

Variables, such as recurring scripts, regex, or code lists are found in `/references`. These values can be used in the restrictions section of a schema by refering to them with this pattern: `#/path/to/value`.

Scripts for validating field values fall under `/references/validationFunctions/{schema name}/`. If a validation script is common in many schemas, it can be added under `/references/validationFunctions/common/`. The filename of the script should not contain dashes/dots (ideally be in camelCase).

Example variable usage:

```
{
  "name": "submitter_donor_id",
  "valueType": "string",
  "description": "Unique identifier of the donor, assigned by the data provider.",
  "meta": {
    "examples": "90234,BLD,donor_89,AML-90"
  },
  "restrictions": {
      "required": true,
      "regex": "#/regex/submitter_id",
  }
},
{
  "name": "cause_of_death",
  "valueType": "string",
  "description": "Indicate the cause of a donor's death.",
  "meta": {
    "dependsOn": "donor.vital_status"
  },
  "restrictions": {
      "script": "#/script/donor/ensureDeceased",
  }
}
```

More information on writing schemas can be found [here](https://wiki.oicr.on.ca/pages/viewpage.action?pageId=134938807).

## Scripts

Scripts are provided in NodeJS, requiring npm and Node installed locally.

To use these commands first install the npm dependencies by running: `npm install`

## Unit Testing

Unit tests go in the `/tests` folder, and are created with Jest.

To run all unit tests, you can use : `npm run test`.

[More information about unit tests.](/tests/README.md)

## Compile Dictionary

1. Install dependencies via npm.
   `npm ci`

2. Then run the dictionary building script:
   `npm run compile`

This will check that all units tests pass, and then will collect all schemas and references and format them into a full dictionary object that could be uploaded to lectern. An abridged version of the dictionary will be printed to the console, and the full compiled dictionary will be output to the file `./dictionary.json`

You will be prompted to provide the dictionary name and version number, or leave them blank and accept the defaults (`PCGL Data Dictionary` and `0.0` respectively).

If all tests do not pass, the dictionary will not be compiled.

> Note: The dictionary.json file is ignored by git. This file can be uploaded to Lectern, for example, but it shouldn't appear in this repo.

## Testing your dictionary locally

`node populateReferences.js` will create `populated_dictionary.json`. The output of the script is **not** intended to be uploaded to Lectern. Instead, it is to aid in testing with the [Submission repo](https://github.com/overture-stack/lyric). It can be used to add/overwrite the contents of the sample-schema, when the Lectern URL in the .env file is set to said file's path.

### Adding new schemas

When a new schema is added to the dictionary, you must:

- Add the new schema into `/schemas` directory.
- Update `/schemas/index.js` to include the new json schema. The sequence in `module.exports` determines the schema sequence in the dictionary.
- Run `node populateReferences.js` to create `populated_dictionary.json`.
