import { WebrtcBasicsPage } from './app.po';

describe('webrtc-basics App', () => {
  let page: WebrtcBasicsPage;

  beforeEach(() => {
    page = new WebrtcBasicsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
