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
  description: string | null;
  group_image: string;
  is_adult_only: boolean;
  is_private_group: boolean;
  is_online: boolean;
  is_f2f: boolean;
}

export type { User, UserSignUp, Group };
