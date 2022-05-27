import { CasesDTO } from './cases.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCasesDTO extends PartialType(CasesDTO) {}
