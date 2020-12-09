export enum REGEX {
  positiveNumber = '^([+-]?[1-9]\\d*|0)$',
  password = '^(?=.*[0-9])(?=.*[a-z])([a-zA-Z0-9]{8,20})$',
  account = '^(?=.*[a-z])([a-zA-Z0-9]{5,30})$',
  email = '^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$',
  phone = '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{2}[-s.]?[0-9]{4,6}$',
  phonePrefix = '^\\+[(]?[0-9]{2,3}[)]?$',
  contentRange = '^(bytes \\d+-\\d+)/\\d+$',
  hexColor = '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',
}

export enum JWT_SUBJECT {
  RESET_PASSWORD = '1',
  ACCESS_TOKEN = '2',
  REFRESH_TOKEN = '3',
}

export enum RECAPTCHA_ACTION {
  RESET_PASSWORD = '1',
  SIGN_UP = '2',
  VERIFY_ACCOUNT = '3',
  LOGIN = '4',
  REQUEST_RESET_PASSWORD = '5',
}

export enum SIGNUP_VERIFY_TYPE {
  PHONE = 1,
  EMAIL = 2,
}

export enum SHARE_MODE {
  NONE = 1,
  VIEWONLY = 2,
  EDITABLE = 3,
}

export enum FILE_TYPE {
  FOLDER = 'FOLDER',
  FILE = 'FILE',
}

export enum FILE_TAG {
  IMAGE = 1,
  PDF = 2,
  DOCUMENT = 3,
  SPREADSHEET = 4,
  PRESENTATION = 5,
  AUDIO = 6,
  VIDEO = 7,
  ARCHIVE = 8,
  FONT = 9,
  TEXT = 10,
  UNKNOWN = 11,
}

export enum FILE_SORT_BY {
  NAME = 1,
  LAST_MODIFIED = 2,
  FILE_SIZE = 3,
  DOWNLOADED = 4,
  VIEWED = 5,
}

export enum FOLDER_ICON {
  DEFAULT = 1,
  ACCOUNT = 2,
  ACCOUNT_OUTLINE = 3,
  ALERT = 4,
  ALERT_OUTLINE = 5,
  CLOCK = 6,
  CLOCK_OUTLINE = 7,
  COG = 8,
  COG_OUTLINE = 9,
  DOWNLOAD = 10,
  DOWNLOAD_OUTLINE = 11,
  EDIT = 12,
  EDIT_OUTLINE = 13,
  GOOGLE_DRIVE = 14,
  HEART = 15,
  HEART_OUTLINE = 16,
  HOME = 17,
  HOME_OUTLINE = 18,
  IMAGE = 19,
  INFORMATION = 20,
  INFORMATION_OUTLINE = 21,
  KEY = 22,
  KEY_OUTLINE = 23,
  KEY_NETWORK = 24,
  KEY_NETWORK_OUTLINE = 25,
  LOCK = 26,
  LOCK_OPEN = 27,
  MARKER = 28,
  MARKER_OUTLINE = 29,
  MOVE = 30,
  MOVE_OUTLINE = 31,
  MULTIPLE = 32,
  MULTIPLE_OUTLINE = 33,
  MULTIPLE_IMAGE = 34,
  MUSIC = 35,
  MUSIC_OUTLINE = 36,
  NETWORK = 37,
  NETWORK_OUTLINE = 38,
  STAR = 39,
  STAR_MULTIPLE = 40,
  STAR_MULTIPLE_OUTLINE = 41,
  STAR_OUTLINE = 42,
  ZIP = 43,
  ZIP_OUTLINE = 44,
}

export enum REDIS_SUBSCRIBE_CHANNEL {
  CHANGE_USER_CHANNEL = 'change-user',
  CHANGE_FOLDER_CHANNEL = 'change-folder',
  CHANGE_FILE_CHANNEL = 'change-file',
}

export enum POLICY_EFFECT {
  ALLOW = 1,
  DENY = 0,
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}
