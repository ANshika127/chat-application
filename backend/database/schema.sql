
--CREATES TABLES FOR THE chat_application DATABASE 
--Chat Application Database Schema 
--PostgreSQL
--Author: Anshika Sharma

--user table 
CREATE TABLE users(
  user_id          SERIAL        PRIMARY KEY,
  username         VARCHAR(30)   UNIQUE    NOT NULL,
  name             VARCHAR(100)  NOT NULL,
  email            VARCHAR(255)  UNIQUE    NOT NULL,
  password         VARCHAR(255)  NOT NULL,
  phone_no         VARCHAR(10)   UNIQUE  CHECK(phone_no ~ '^[0-9]{10}$'),
  dob              DATE,
  profile_picture  VARCHAR(255),
  bio              TEXT
);

--Chat table 
CREATE TABLE chats(
  chat_id       SERIAL    PRIMARY KEY,
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--chat participants table 
CREATE TABLE chat_participants(
  chat_id     INTEGER,
  user_id     INTEGER,
  joined_at   TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (chat_id , user_id),

  FOREIGN KEY(chat_id)
     REFERENCES chats(chat_id),

  FOREIGN KEY(user_id)
     REFERENCES users(user_id)
);

-- Messages table 
CREATE TABLE messages(
   message_id     SERIAL      PRIMARY KEY,
   chat_id        INTEGER     NOT NULL,
   sender_id      INTEGER     NOT NULL,
   reply_to_message_id        INTEGER,
   content        TEXT        NOT NULL,
   message_type   VARCHAR(20) NOT NULL
                  CHECK( message_type IN ('text','image','video','document','gif','audio')),
   sent_at        TIMESTAMP   NOT NULL  DEFAULT CURRENT_TIMESTAMP,
   status         VARCHAR(20) NOT NULL
                  CHECK (status IN ('sent','delivered','seen')),

  FOREIGN KEY(chat_id) 
    REFERENCES chats(chat_id)
    ON DELETE CASCADE,

  FOREIGN KEY (sender_id)
    REFERENCES users(user_id)
    ON DELETE CASCADE

  FOREIGN KEY(reply_to_message_id)
    REFERENCES messages(message_id)
    ON DELETE SET NULL 
);

CREATE INDEX idx_chat_messages
ON messages(chat_id, message_id);

