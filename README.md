# object-string-replacer

A set of functions for manipulating strings and objects. It includes functionality for extracting keys from a string, getting values from a complex object using a path, and replacing tokens in a string using data from an object. The package also provides options for using fallback values in case the desired keys are missing. These functions make it easy to work with templates and dynamic data, and are useful in a variety of applications such as generating dynamic content, creating reports, and more.

[![npm version](https://badge.fury.io/js/object-string-replacer.svg)](https://badge.fury.io/js/object-string-replacer)
[![Build Status](https://travis-ci.org/M-Chris/object-string-replacer.svg?branch=master)](https://travis-ci.org/M-Chris/object-string-replacer)


## Installation

**You can install the "object-string-replacer" package from npm by running the following command:**
```
npm install object-string-replacer
```
**Once the package is installed, you can use it in your code by importing it:**
```
const objectStringReplacer = require('object-string-replacer');
```
**or, if you are using ECMAScript Modules:**
```
import objectStringReplacer from 'object-string-replacer';
```

# Extracting Keys, Getting Values, and Replacing Tokens
This is a set of functions for extracting keys from a string, getting values from a complex object using a path, and replacing tokens in a string using data from an object.

## Extracting Keys from a String
This function takes a string and extracts the keys from it.

**Example:**
```
const inputString = 'This is a {{template}} string with {{keys}} that need to be {{replaced}}.';
console.log(extractKeys(inputString));
```
**Output:** `['template', 'keys', 'replaced']`

## Getting Value from a Complex Object using a Path
This function takes an object and a path and returns the value from the object at the specified path.

**Example:**
```
const data = {
    person: {
        name: 'John Doe',
        age: 30,
        address: {
            street: '123 Main St',
            city: 'Anytown',
            state: 'NY',
        },
    },
    colors: ['red', 'green', 'blue'],
};
console.log(getValueFromPath('person.name', data));
```
**Output:** `'John Doe'`

```
console.log(getValueFromPath('colors[1]', data));
```
**Output:** `'green'`

## Replacing Tokens in a String using Data from an Object
This function takes a string and an object and replaces the tokens in the string with the values from the object.

**Example:**
```
const templateString = 'Hello {{person.name}}, you live at {{person.address.street}}, {{person.address.city}}, {{person.address.state}}.';
console.log(replaceTokens(templateString, data));
```
**Output:** `'Hello John Doe, you live at 123 Main St, Anytown, NY.'`

## Using Fallback Tokens for Missing Keys
This function takes a string, an object, and a fallback object and replaces the tokens in the string with the values from the object. If the token is not found in the object, it will use the value from the fallback object.

**Example:**
```
const fallbackData = {
    person: {
        address: {
            city: 'Anywhere',
            state: 'NA',
        },
    },
};
const templateStringFB = 'Hello {{person.name}}, you live at {{person.address.street}}, {{person.address.city}}, {{person.address.state}}.';
console.log(replaceTokens(templateStringFB, {}, fallbackData));
```
**Output:** `'Hello , you live at , Anywhere, NA.'`

## Using Fallback Tokens for Missing Keys with || or Option
This function takes a string, an object, and a fallback object and replaces the tokens in the string with the values from the object. If the token is not found in the object, it will use the value from the fallback object.

**Example:**
```
const str2 = 'Hello {{fullName || friend}}. How are you today?';
const tokens2 = { name: 'John' };
const fallbackTokens2 = { friend: 'Jane' };

console.log(replaceTokens(str2, tokens2, fallbackTokens2));
```
**Output:** `"Hello Jane. How are you today?"`