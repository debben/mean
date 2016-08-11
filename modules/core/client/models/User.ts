export interface User {
  displayName: string,
  provider: string,
  username: string,
  created: Date,
  roles: Array<string>,
  profileImageURL: string,
  email: string,
  lastName: string,
  firstName: string,
  additionalProvidersData: string
};
