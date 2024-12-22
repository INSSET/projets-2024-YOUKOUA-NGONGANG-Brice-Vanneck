// import { UserInterface } from './../interfaces/user.interface';
import { LocalStorage } from './localStorage';

export class UserHelper {

  dialog = false;
  constructor() {

  }

  /**
   * determine wheather or not a user is authenticate
   */
  static isConnect(): boolean {

    return LocalStorage.getItem('apiculteur_User') !== (undefined || null);
  }
  /**
   * Remove user data to the local DB
   */
  static disconect(): void {
    LocalStorage.delete('apiculteur_User');
  }

  /**
   * Get the current log user
   */
  static getUser(): any {
    return JSON.parse(LocalStorage.getItem('apiculteur_User'))||null;
  }
  static getUserId(): any {
    const user = LocalStorage.getItem('apiculteur_User');
    const userJson = JSON.parse(user);

    return userJson.id_User;
  }

  /**
   * Add user data to the local DB
   * @param * user user object to be saved
   */
  static connect(user: any): void {
    LocalStorage.setItem('apiculteur_User', JSON.stringify(user));
  }


  static  refresh(token:any,refresh_token:any){
    const user = LocalStorage.getItem('apiculteur_User');
          user.token = token;
          user.refresh_token=refresh_token;
    LocalStorage.setItem('apiculteur_User', JSON.stringify(user));
  }


}
