export default class UrlSpec {
  constructor(readonly prefix: string = '', readonly queryParams: any = {}) {
  }

  prefixPath(pre: string): UrlSpec {
    return new UrlSpec(`${pre}${this.prefix}`, this.queryParams);
  }
  
  suffixPathParam(suffix: string): UrlSpec {
    return new UrlSpec(`${this.prefix}${encodeURIComponent(suffix)}`, this.queryParams);
  }

  addParams(params: any): UrlSpec {
    return new UrlSpec(this.prefix, {
      ...this.queryParams,
      ...params,
    });
  }
  
  build() {
    const qps = Object.entries(this.queryParams).map(
      e => `${encodeURIComponent(e[0])}=${encodeURIComponent(String(e[1]))}`
    ).join('&');
    return this.prefix + (qps ? '?' : '') + qps;
  }
}
