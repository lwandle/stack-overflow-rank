/* 
    Main user Type and The API call repsponse used throughout the app.
 */
export interface UserModel {
  badge_counts?: {
    bronze?: number;
    silver?: number;
    gold?: number;
  };
  account_id?: number;
  is_employee?: false;
  last_modified_date?: number;
  last_access_date?: number;
  reputation_change_year?: number;
  reputation_change_quarter?: number;
  reputation_change_month?: number;
  reputation_change_week?: number;
  reputation_change_day?: number;
  reputation?: number;
  creation_date?: number;
  user_type?: string;
  user_id: number;
  accept_rate?: number;
  location?: string;
  website_url?: string;
  link?: string;
  profile_image?: string;
  display_name: string;
  following?: boolean;
  blocked?: boolean;
}

export interface StackexchangeResponse {
  items: UserModel[];
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
}
