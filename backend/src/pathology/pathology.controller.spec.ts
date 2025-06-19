import { Test, TestingModule } from '@nestjs/testing';
import { PathologyController } from './pathology.controller';
import { PathologyService } from './pathology.service';

describe('PathologyController', () => {
  let controller: PathologyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PathologyController],
      providers: [PathologyService],
    }).compile();

    controller = module.get<PathologyController>(PathologyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
