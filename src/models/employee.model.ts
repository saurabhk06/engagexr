import {
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Column,
  AllowNull,
  NotEmpty,
  Unique,
  BelongsTo,
} from 'sequelize-typescript';
import Company from './company.model';

export interface IEmployee {
  empId?: number | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

@Table({
  tableName: 'employee',
  timestamps: true,
})
export default class Employee extends Model implements IEmployee {
  @AutoIncrement
  @PrimaryKey
  @Column
  empId?: number;

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
  @Unique(true)
  @Column
  email!: string;

  @Column
  phone!: string;

  @BelongsTo(() => Company, 'cmpId')
  company!: Company;
}
