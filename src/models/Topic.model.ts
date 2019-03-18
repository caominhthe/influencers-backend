import { Unique, Column, Table, Model, CreatedAt, BelongsTo, UpdatedAt } from 'sequelize-typescript';

@Table
export class Topic extends Model<Topic> {

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
