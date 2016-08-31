import {Resource, ResourceParams} from "ng2-resource-rest";
import {Injectable} from "@angular/core";

@Injectable()
@ResourceParams({
  url: 'api/',
  path: 'articles/{id}',
})
export class ArticlesService extends Resource {

}
