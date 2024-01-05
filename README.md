# solana-tools

Getting started:

Load the intended version of Node.js: `nvm use`

Install dependencies: `npm install`

## TypeScript Commands

Install `ts-node` globally: `npm i -g ts-node`

Copy `example.env` to a new file called `.env` and fill in the values. Leave anything
you don't need to use empty.

Run script commands from the project root:

`ts-node src/scripts/script-name.ts`

## JS Commands

`node src/script.js`

## Tips

Any file you want to use values from `.env` in needs to have the following at the _very_
top of the file:

`import 'dotenv/config';`
