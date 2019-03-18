import {  CreatedAt, UpdatedAt, ForeignKey, Column, Table, Model, HasMany, BelongsTo, Unique, AllowNull, DataType, BelongsToMany } from 'sequelize-typescript';
import { Occupation } from "./Occupation.model";
import { InfluencerOccupation } from "./InfluencerOccupation.model";
import { Topic } from "./Topic.model";
import { InfluencerTopic } from "./InfluencerTopic.model";

export enum Gender {
    Male    = "male",
    Female  = "female",
    Other   = "other"
}

export enum SocialType {
    Facebook   = 'facebook',
    Instagram  = 'instagram',
    Google     = 'google'
}

@Table
export class Influencer extends Model<Influencer> {

  @Unique
  @Column
  socialId!: string;

  @Column
  socialType!: string;

  @Unique
  @AllowNull
  @Column
  email!: string | null;

  @Column
  name!: string;

  @UpdatedAt
  @Column
  dob: Date;

  @AllowNull
  @Column
  phone!: string | null;

  @AllowNull
  @Column
  gender: string;

  @AllowNull
  @Column
  address: string;

  @BelongsToMany(() => Occupation, () => InfluencerOccupation)
  occupations: Occupation[];

  @BelongsToMany(() => Topic, () => InfluencerTopic)
  topics: Occupation[];


  @AllowNull
  @Column
  averageInteraction: number;

  @AllowNull
  @Column
  profileLink: string;

  @AllowNull
  @Column
  civilId: string;

  // @Column
  // @AllowNull
  // bankAccountId: string;

  // @Column
  // @AllowNull
  // bankId: string;

  // Should intergrate with third party?

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
};
