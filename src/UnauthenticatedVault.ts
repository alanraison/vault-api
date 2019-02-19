import UrlSpec from './UrlSpec';
import UnauthenticatedSysApi from './sys/UnauthenticatedSysApi';

/**
 * UnauthenticatedVault
 */
export default class UnauthenticatedVault {
  sys: UnauthenticatedSysApi;

  constructor(readonly vaultAddr: string) {
    this.sys = new UnauthenticatedSysApi();
  }

  fetch(url: UrlSpec, options?: any) {
    return fetch(url.prefixPath(this.vaultAddr).build(), options);
  }

  checkedFetch(url: UrlSpec, options?: any) {
    return this.fetch(url, options).then(async res => {
      if (!res.ok) {
        const body = await res.text();
        throw new Error(`received status code ${res.status}\n${body}`);
      }
      const json = await res.json();
      if (json.errors) {
        throw new Error(JSON.stringify(json));
      }
      return json;
    });
  }
}
