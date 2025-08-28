export interface signupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface message {
  userId: string;
  text: string;
  createdAt: Date;
}

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  bio: string;
  profilePicture: string;
  chats?: string[];
}
