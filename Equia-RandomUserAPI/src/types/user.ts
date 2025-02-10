import type { Gender } from './gender';
import type { Name } from './name';
import type { Location } from './location';

export type Picture = {
  large: string;
  medium: string;
  thumbnail: string;
};

export type User = {
  gender: Gender;
  name: Name;
  location: Location;
  email: string;
  phone: string;
  picture: Picture;
};
