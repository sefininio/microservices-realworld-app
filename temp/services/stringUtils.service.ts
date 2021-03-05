import { Injectable } from '@nestjs/common';
import slug from 'slug';

@Injectable()
export class StringUtilsService {

  slugify(title: string) {
    return slug(title, {lower: true}) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
  }

}
