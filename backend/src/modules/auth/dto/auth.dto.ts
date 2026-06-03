export class RegisterDto {
  email!: string;
  password!: string;
  displayName!: string;
  role?: string;
}

export class LoginDto {
  email!: string;
  password!: string;
}
