import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
  //  console.log(req.headers);
    var token = req.headers['authorization'];
    if (token)  token = token.split(" ")[1];;
    req['token'] = token;
    next();
  }
}