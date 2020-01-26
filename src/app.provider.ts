import { ConfigService } from '@config/config.service';
import { Sequelize } from 'sequelize-typescript';
import { loader } from '@utils/loader';
import { User } from '@user/user.entity';

export const database = [
  {
    provide: 'SEQUELIZE',
    inject: [ConfigService],
    useFactory: async (env: ConfigService) => {
      const sequelize = new Sequelize({
        logging: false,
        dialect: 'postgres' as 'postgres',
        host: env.get('PS_HOST'),
        port: parseInt(env.get('PS_PORT')),
        username: env.get('PS_USER'),
        password: env.get('PS_PASS'),
        database: env.get('PS_DATABASE'),
      });
      sequelize.addModels([...loader(__dirname, /^(.+entity)\.(js|ts)$/)]);
      await sequelize.sync({ alter: true });
      return sequelize;
    },
  },
];

export const repository = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
];
