import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../container/controller';
import { UserService } from '../container/service';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(userController.getHello).toBe('Hello World!');
    });
  });
});
