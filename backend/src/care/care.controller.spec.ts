import { Test, TestingModule } from '@nestjs/testing';
import { CareController } from './care.controller';
import { CareService } from './care.service';

describe('CareController', () => {
  let controller: CareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CareController],
      providers: [CareService],
    }).compile();

    controller = module.get<CareController>(CareController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
