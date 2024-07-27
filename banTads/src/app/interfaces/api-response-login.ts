import {Usuario} from "../models/Usuario.model";


export interface ApiResponseLogin {
  success: boolean;
  message: string;
  data: Usuario;
}
