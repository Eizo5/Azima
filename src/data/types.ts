interface User {
  ID: number;
  email: string;
  name: string;
  surname: string;
  password: string;
  birthdate: string;
  is_email_notifications_on: boolean;
  is_email_private: boolean;
  is_name_private: boolean;
  is_sms_notifications_on: boolean;
  is_theme_dark: boolean;
  is_updates_notifications_on: boolean;
  language: string | null;
  profile_image: string;
  username: string;
}

interface UserSignUp {
  email: string;
  name: string;
  surname: string;
  password: string;
  confirmPassword: string;
  birthdate: string;
  profile_image: string;
  username: string;
  preferences: number[];
}

interface Group {
  group_id: number;
  name: string;
  location: "string";
  description: string | null;
  group_image: string;
  is_adult_only: boolean;
  is_private_group: boolean;
  is_online: boolean;
  is_f2f: boolean;
  categories: number[];
}

interface GroupMembers {
  ID: number;
  birthdate: string;
  email: string;
  is_email_notifications_on: boolean;
  is_email_private: boolean;
  is_name_private: boolean;
  is_sms_notifications_on: boolean;
  is_theme_dark: boolean;
  is_updates_notifications_on: boolean;
  language: null;
  name: string;
  password: string;
  profile_image: string;
  surname: string;
  username: string;
}
interface EventType {
  age_restriction: number;
  currency: string;
  event_capacity: number;
  event_date: string;
  event_id: number;
  event_image: string;
  group_id: number;
  guests: string;
  is_contribution_allowed: boolean;
  is_event_private: boolean;
  name: string;
  return_policy: string;
  rules: string;
  ticket_included_items: string;
  ticket_not_included_items: string;
  ticket_price: string;
  time: string;
  location: string;
  description: string;
}

export type { User, UserSignUp, Group, GroupMembers, EventType };
