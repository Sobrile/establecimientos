/* tslint:disable */
export interface LoginDto {

  /**
   * Token capcha
   */
  captcha_response?: string;

  /**
   * Ingrese la password
   */
  password?: string;

  /**
   * Ingrese el usuario
   */
  username?: string;
}
