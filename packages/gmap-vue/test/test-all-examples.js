import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { getPage, loadFile } from './test-setup/test-common';

const Lab = require('@hapi/lab');

const lab = Lab.script();

exports.lab = lab;

lab.experiment('Examples test', { timeout: 15000 }, () => {
  let page = null;

  async function loadPage(f) {
    return loadFile(page, f, {
      waitUntil: 'networkidle0',
    });
  }

  lab.before(
    { timeout: 15000 },
    getPage((p) => {
      page = p;
    })
  );

  lab.test(
    'Test all examples pages load without errors (does not test functionality)',
    { timeout: 70000 },
    async () => {
      const files = fs
        .readdirSync(path.join(__dirname, '../examples'))
        .filter((f) => f.endsWith('.html'));
      let isErrored = false;

      page.on('error', (err) => {
        isErrored = err;
      });
      page.on('pageerror', (err) => {
        // eslint-disable-next-line no-console -- needed to know the error type and stack
        console.error(err);
        isErrored = err;
      });

      assert(!isErrored);

      // eslint-disable-next-line no-restricted-syntax -- this will disappear in a near future
      for (const file of files) {
        try {
          // eslint-disable-next-line no-await-in-loop -- this will disappear in a near future
          await loadPage(`../examples/${file}`);
        } catch (error) {
          // eslint-disable-next-line no-console -- informative purposes
          console.error('log', error);
        }

        if (isErrored) {
          throw new Error(
            `The example file ../../examples/${file} threw an error ${isErrored}`
          );
        }
      }
    }
  );
});
