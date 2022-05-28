import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { CasesService } from './cases.service';
import { UpdateCasesDTO } from './dto/updateCases.dto';

@Controller('cases')
export class CasesController {
  constructor(private casesService: CasesService) {}
  @Get()
  getCases() {
    return this.casesService.getCases();
  }
  @Get('/lawyerCases/:id')
  lawyerCases(@Param('id') id: string) {
    return this.casesService.findCasesByLawyer(id);
  }
  @Get('/clientCases/:id')
  clientCases(@Param('id') id: string) {
    return this.casesService.findCasesByClient(id);
  }
  @Patch(':id')
  updateCase(@Param('id') id: string, @Body() caseDto: UpdateCasesDTO) {
    return this.casesService.updateCase(id, caseDto);
  }
}
