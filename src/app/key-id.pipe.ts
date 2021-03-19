import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyId'
})
export class KeyIdPipe implements PipeTransform {

  transform(result: string, ...args: string[]): string {

        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }
  }

