import { Test, TestingModule } from '@nestjs/testing';
import { AuthLawyerController } from './auth-lawyer.controller';

describe('AuthLawyerController', () => {
  let controller: AuthLawyerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthLawyerController],
    }).compile();

    controller = module.get<AuthLawyerController>(AuthLawyerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
