import {Influencer} from '../models/Influencer.model';

interface InfluencerVM {
    id: string;
    name: string;
    socialId: string;
    phone: string;
    email: string;
    occupations: any[];
    topics: any[];
    civilId: string;
    profileLink: string;
    address: string;
    gender: string;
    dob: string;
    socialType: string;
}

export class InfluencerTransformer {
    static transform(influencer: Influencer): InfluencerVM {
        const occupations = influencer.occupations ? influencer.occupations.map( (occupation: any) => {return {id: occupation.id, name: occupation.name}}) : null;
        const topics = influencer.topics ? influencer.topics.map( (topic: any) => {return {id: topic.id, name: topic.name}}) : null;
        return {
            id: influencer.id,
            socialId: influencer.socialId,
            name: influencer.name,
            phone: influencer.phone,
            gender: influencer.gender,
            civilId: influencer.civilId,
            profileLink: influencer.profileLink,
            address: influencer.address,
            email: influencer.email,
            dob: influencer.dob ? influencer.dob.toISOString() : null,
            socialType: influencer.socialType,
            occupations,
            topics,
        }
    }

    static transformList(influencers: Influencer[]): InfluencerVM[] {
        return influencers.map(influencer => this.transform(influencer));
    }

}

