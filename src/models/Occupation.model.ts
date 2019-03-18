import { Unique, Column, Table, Model, HasMany, BelongsTo, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table
export class Occupation extends Model<Occupation> {

  @Unique
  @Column
  name: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
};

