// TODO: switch to ES6
const { expect } = require('chai');



describe('Snake page', function () {
  let page;

  before (async function () {
    page = await browser.newPage();
    await page.goto('http://localhost:9000');
  });

  after (async function () {
    await page.close();
  });

  it('should have the correct page title', async function () {
    expect(await page.title()).to.eql('Snake Game');
  });

  it('should have a heading', async function () {
    const HEADING_SELECTOR = 'h1';
    let heading;

    await page.waitFor(HEADING_SELECTOR);
    heading = await page.$eval(HEADING_SELECTOR, heading => heading.innerText);

    expect(heading).to.eql('Snake');
  });

});
