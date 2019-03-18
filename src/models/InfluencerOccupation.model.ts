import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import {Influencer} from './Influencer.model';
import {Occupation} from './Occupation.model';

@Table
export class InfluencerOccupation extends Model<InfluencerOccupation> {
  @ForeignKey(() => Influencer)
  @Column
  influencerId: number;

  @ForeignKey(() => Occupation)
  @Column
  occupationId: number;
}
