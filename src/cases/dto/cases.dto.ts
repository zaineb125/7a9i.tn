import { IsEnum, IsNotEmpty } from 'class-validator';
import { CasesStatusEnum } from '../enums/cases-status.enum';

export class CasesDTO {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  idClient: string;
  @IsNotEmpty()
  idLawyer: string;
  @IsNotEmpty()
  @IsEnum(CasesStatusEnum)
  @IsNotEmpty()
  etat: CasesStatusEnum;
  @IsNotEmpty()
  description: string;
  todos: string[];
}
