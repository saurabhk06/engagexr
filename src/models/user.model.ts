import {
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Column,
  AllowNull,
  NotEmpty,
  Default,
} from 'sequelize-typescript';

export interface UserI {
  id?: number | null;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  salt: string;
  encrypt_password: string;
}

@Table({ tableName: 'user', timestamps: true })
export default class User extends Model implements UserI {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  firstName!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  lastName!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  email!: string;

  @AllowNull(false)
  @NotEmpty
  @Default('GUEST')
  @Column
  role!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  salt!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  encrypt_password!: string;
}
