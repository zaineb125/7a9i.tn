import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cases, CasesDocument } from './models/cases.model';
import { UpdateCasesDTO } from './dto/updateCases.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CasesService {
  constructor(@InjectModel('cases') private casesModel: Model<CasesDocument>) {}
  async getCases() {
    const Cases = await this.casesModel.find().exec();
    return Cases;
  }
  async findCaseById(id: string): Promise<Cases> {
    const Case = await this.casesModel.findOne({ id: id });
    if (Case) {
      return Case;
    }
  }
  async findCasesByLawyer(idLawyer: string) {
    const Cases = await this.casesModel.find({ idLawyer: idLawyer });
    if (Cases) {
      return Cases;
    } else return NotFoundError;
  }
  async findCasesByClient(idClient: string) {
    const Cases = await this.casesModel.find({ idClient: idClient });
    if (Cases) {
      return Cases;
    } else return NotFoundError;
  }
  async updateCase(id: string, dto: UpdateCasesDTO) {
    const Case = await this.findCaseById(id);
    if (dto.description) {
      Case.description = dto.description;
    }
    if (dto.todos) {
      Case.todos = dto.todos;
    }
    if (dto.etat) {
      Case.etat = dto.etat;
    }
    return Case.save();
  }
}
