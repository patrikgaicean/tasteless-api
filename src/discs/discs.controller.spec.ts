import { Test, TestingModule } from '@nestjs/testing';
import { DiscsController } from './discs.controller';
import { DiscsService } from './discs.service';

describe('DiscsController', () => {
  let controller: DiscsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscsController],
      providers: [DiscsService],
    }).compile();

    controller = module.get<DiscsController>(DiscsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
