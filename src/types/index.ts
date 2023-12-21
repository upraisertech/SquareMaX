export type INavLink = {
  imgURL: string;
  route: string;
  label: string;
};

export type IUpdateUser = {
  username: any;
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

export type INewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type IUpdatePost = {
  postId: string;
  caption: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location?: string;
  tags?: string;
};
export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
  followers: string[]; // Update the type to match your data structure
  verified: boolean;
}
export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};
