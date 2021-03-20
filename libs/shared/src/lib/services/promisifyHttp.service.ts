import { HttpService, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';

/**
 * Turn HttpService <Observable<Response<data>> into Promise<data>
 */
@Injectable()
export class PromisifyHttpService {
  constructor(
    private httpService: HttpService,
  ){}

  get(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.httpService.get(url, config)
      .toPromise()
      .then(res => res.data);
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return this.httpService.post(url, data, config)
      .toPromise()
      .then(res => res.data);
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return this.httpService.put(url, data, config)
      .toPromise()
      .then(res => res.data);
  }

  delete(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.httpService.delete(url, config)
    .toPromise()
    .then(res => res.data);
}

}
