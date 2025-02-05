import { NextFn } from "@adonisjs/core/types/http";
import { HttpContext } from "@adonisjs/core/http";

export default class ForceJsonResponseMiddleware {
  handle({ request }:HttpContext, next: NextFn){
    const headers = request.headers();
    headers.accept = 'application/json';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return next();
  }
}
