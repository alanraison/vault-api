import UrlSpec from "./UrlSpec";
import SysApi from "./sys/SysApi";

export default class Vault {
  sys: SysApi;

  constructor(readonly vaultAddr: string, readonly token: string) {
    this.sys = new SysApi();
  }

  fetch(url: UrlSpec, init?: any) {
    const headers = init && init.headers ? init.headers : new Headers();
      headers.set('X-Vault-Token', this.token);
      return fetch(url.prefixPath(this.vaultAddr).build(), {
        ...init,
        headers,
      });
  }
}
