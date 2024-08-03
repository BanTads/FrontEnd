import {Usuario} from "../models/usuario.model";


export interface ApiResponseLogin {
  success: boolean;
  message: string;
  data: Usuario;
}
