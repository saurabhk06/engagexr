import {
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Column,
  AllowNull,
  NotEmpty,
  HasMany,
} from "sequelize-typescript";
import Employee from "./employee.model";

export interface ICompany {
  id?: number | null;
  name: string;
  email: string;
  phone: string;
  website: string;
}

@Table({ tableName: "company", timestamps: true })
export default class Company extends Model implements ICompany {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  name!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  email!: string;

  @Column
  phone!: string;

  @Column
  website!: string;

  @HasMany(() => Employee, "cmpId")
  employees!: Employee[];
}
