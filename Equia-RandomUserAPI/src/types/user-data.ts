import type { Gender } from './user-gender'
import type { Name } from './user-name'
import type { Location } from './user-location'

export type Picture = {
  large: string
  medium: string
  thumbnail: string
}

export type User = {
  gender: Gender
  name: Name
  location: Location
  email: string
  phone: string
  picture: Picture
}
