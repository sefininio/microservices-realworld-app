import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class PromisifyHttpService {
  constructor(
    private httpService: HttpService,
  ){}

  get(url: string): Promise<any> {
    return this.httpService.get(url)
      .pipe(map(res => res.data))
      .toPromise();
  }

}
