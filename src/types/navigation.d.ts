/* 
  RootStackParamList
  Es un mapa de tipos que define todas las pantallas registradas en tu Stack Navigator y qué parámetros recibe cada una.
*/

import { Video } from "./video.interface";
import { User } from "./user.interface";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Galery: undefined;
  Location: undefined;
  Home: undefined;
  Validate: User;
  SelectedVideo: Video;   // screen que recibira un objeto Video
};