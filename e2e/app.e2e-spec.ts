import { MeatGrinderPage } from './app.po';

describe('meat-grinder App', function() {
  let page: MeatGrinderPage;

  beforeEach(() => {
    page = new MeatGrinderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
