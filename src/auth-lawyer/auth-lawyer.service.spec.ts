import { Test, TestingModule } from '@nestjs/testing';
import { AuthLawyerService } from './auth-lawyer.service';

describe('AuthLawyerService', () => {
  let service: AuthLawyerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthLawyerService],
    }).compile();

    service = module.get<AuthLawyerService>(AuthLawyerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
