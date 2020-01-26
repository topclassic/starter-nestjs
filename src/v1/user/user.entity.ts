import { Table, Column, Model, DataType, Index } from 'sequelize-typescript';
@Table({ tableName: 'user' })
export class User extends Model<User> {
  @Column({
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID,
  })
  id: string;

  @Index({ unique: true })
  @Column(DataType.INTEGER)
  phone?: number;
}
