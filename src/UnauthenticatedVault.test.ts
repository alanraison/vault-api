import UnauthenticatedVault from './UnauthenticatedVault';
import UrlSpec from './UrlSpec';

describe('Unauthenticated Vault API', () => {
  const v = new UnauthenticatedVault('http://foo.bar');

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch from the vault url', async () => {
    await v.fetch(new UrlSpec('/baz'))
    expect(fetchMock).toHaveBeenCalledWith('http://foo.bar/baz', undefined);
  });
  it('should include the given options', async () => {
    const options = { method: 'PUT', headers: { 'X-Clacks-Overhead': 'GNU Terry Pratchett' } };
    await v.fetch(new UrlSpec('/baz'), options);
    expect(fetch).toHaveBeenCalledWith('http://foo.bar/baz', options);
  });
  it('should throw on unsuccessful return statuses', async () => {
    fetchMock.mockResponse('Short and stout', { status: 418, statusText: "I'm a teapot" });
    const rejected = await expect(v.checkedFetch(new UrlSpec())).rejects;
    
    rejected.toHaveProperty('message', expect.stringContaining('418'));
    rejected.toHaveProperty('message', expect.stringContaining('Short and stout'));
  });
  it('should throw an error if the response body contains errors', async () => {
    const errorResponse = JSON.stringify({ errors: 'not quite right' });
    fetchMock.mockResponse(errorResponse);
    await expect(v.checkedFetch(new UrlSpec())).rejects.toHaveProperty('message', errorResponse);
  });
});