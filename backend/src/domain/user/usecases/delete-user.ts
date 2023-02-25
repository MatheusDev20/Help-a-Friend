interface DeletedUser {
  name: string;
  email: string;
  msg: string;
}

export interface DeleteUser {
  delete: (email: string, loggedId: string) => Promise<DeletedUser>
}
