import Vault from './Vault';
import UrlSpec from './UrlSpec';


describe('Authenticated Vault', () => {
  it('should contain the authentication token', () => {
    const v = new Vault('https://vault', 'token');
    v.fetch(new UrlSpec());
    expect(fetchMock).toHaveBeenCalled();
  });
});