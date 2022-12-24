import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class authLawyerSignUpDto {
  id: string;

  @IsNotEmpty({
    message: 'Vous devez spécifier une valeur',
  })
  name: string;

  @IsNotEmpty({
    message: 'Vous devez spécifier une valeur',
  })
  FamilyName: string;

  @IsNotEmpty({
    message: 'Vous devez spécifier une valeur',
  })
  age: number;

  @IsNotEmpty({
    message: 'Vous devez spécifier une valeur',
  })
  city: string;

  @IsNotEmpty({
    message: 'Vous devez spécifier une valeur',
  })
  speciality: string;

  description: string;

  @IsNotEmpty({
    message: 'Vous devez spécifier une valeur',
  })
  @IsEmail()
  email: string;

  salt: string;

  @IsNotEmpty({
    message: 'Vous devez spécifier une valeur',
  })
  @MinLength(8, {
    message: 'taille courte',
  })
  password: string;

  @IsNotEmpty({
    message: 'Vous devez spécifier une valeur',
  })
  @MinLength(8, {
    message: 'taille courte',
  })
  confirmPassword: string;

  type: string;

  jwt: string;

  image: string;

  rating: string;

  phoneNumber: number;
}
