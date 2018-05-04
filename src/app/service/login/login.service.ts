import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  constructor() { }
}

export class Admin {
  constructor(
    public username:string,
    public password:string
  ){}
}
