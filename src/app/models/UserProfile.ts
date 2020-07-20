import { RunfindrDomainObject } from './RunfindrDomainObject';

export interface UserProfile extends RunfindrDomainObject {

    user_id: string;

    given_name: string;

    family_name: string;

    email: string;

    picture: string;

    parkrun_enabled: boolean;

    cdt: string;

    udt: string;

}
