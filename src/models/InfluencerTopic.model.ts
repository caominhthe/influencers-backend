import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import {Influencer} from './Influencer.model';
import {Occupation} from './Occupation.model';
import { Topic } from "./Topic.model";

@Table
export class InfluencerTopic extends Model<InfluencerTopic> {
  @ForeignKey(() => Influencer)
  @Column
  influencerId: number;

  @ForeignKey(() => Topic)
  @Column
  topicId: number;
}

