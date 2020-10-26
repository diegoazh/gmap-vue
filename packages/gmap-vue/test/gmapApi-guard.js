import assert from 'assert';
import { getPage, loadFile } from './test-setup/test-common';

const Lab = require('@hapi/lab');

const lab = Lab.script();

exports.lab = lab;

lab.experiment('Effectiveness of gmapApi guard', { timeout: 15000 }, () => {
  let page = null;
  let isError = false;

  function loadPage() {
    return loadFile(page, './test-pages/test-gmapApi.html', {
      waitUntil: 'networkidle0',
    });
  }

  lab.before(
    { timeout: 15000 },
    getPage((p) => {
      isError = false;
      page = p;

      page.on('error', (err) => {
        isError = err;
      });
      page.on('pageerror', (err) => {
        isError = err;
      });
      return p;
    })
  );

  lab.test('gmapGuard prevents errors', async () => {
    await loadPage();

    assert(!isError);
    assert(
      await page.evaluate(() => {
        return (
          google &&
          window.vue.$refs.myMarker.position instanceof google.maps.LatLng
        );
      }),
      'Marker is loaded with a position'
    );
  });
});
