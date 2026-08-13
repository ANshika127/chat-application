
--CHAT APPLICATION DATABASE
--SAMPLE DATA
--INSERTS SAMPLE DATA INTO THE TABLES 

--USERS
INSERT INTO users (
    username,
    name,
    email,
    password,
    phone_no,
    dob,
    profile_picture,
    bio
)
VALUES
(
    'anshi_01',
    'Anshika Sharma',
    'anshika@example.com',
    'Hello90',
    '9876543210',
    '2006-05-14',
    NULL,
    'Computer Science Student'
),
(
    'abhay_07',
    'Abhay',
    'abhay@gmail.com',
    'Abhay@123',
    '9123456789',
    '2004-08-20',
    NULL,
    'Football lover'
),
(
    'jaini_15',
    'Jainish Khatkar',
    'jaini@example.com',
    'Jaini@123',
    '9234567890',
    '2005-11-02',
    NULL,
    'Coffee addict'
),
(
    'jazz_09',
    'Jasmine',
    'jasmine@example.com',
    'Jasmine@123',
    '9345678901',
    '2005-01-17',
    NULL,
    'Always online'
),
(
    'mom_01',
    'Surinder Bala',
    'mom@example.com',
    'Mom@123',
    '9456789012',
    '1980-09-08',
    NULL,
    'Family first'
),
(
    'papa_18',
    'Manmohan',
    'manu@example.com',
    'Mnu@123',
    '9567890123',
    '2006-03-11',
    NULL,
    'Music heals'
);

--CHATS

INSERT INTO chats
VALUES
(DEFAULT),
(DEFAULT),
(DEFAULT),
(DEFAULT),
(DEFAULT);

--CHAT PARTICIPANTS
INSERT INTO chat_participants(chat_id, user_id)
VALUES
(1,1),
(1,2),

(2,1),
(2,5),

(3,2),
(3,3),

(4,1),
(4,4),

(5,5),
(5,6);

--MESSAGES 
INSERT INTO messages(
  chat_id, 
  sender_id,
  content,
  message_type,
  status
)
VALUES
--Chat 1 (Anshika ↔ Abhay)
--Chat 2 (Anshika ↔ Mumma)
--Chat 3 (Abhay ↔ Jainish)
--Chat 4 (Anshika ↔ Jasmine)
--Chat 5 (Papa ↔ Mumma)

(1,2,'Did you complete the ER diagram?','text','seen'),
(1,1,'Yeah! Finally ','text','seen'),
(1,2,'Nice','text','seen'),
(1,1,'Database design is actually fun once you understand it.','text','seen'),
(1,2,'True Foreign keys confused me at first though.','text','seen'),
(1,1,'Same here','text','seen'),
(1,2,'Let''s start Flask after this.','text','delivered'),
(1,1,'Deal','text','sent'),
(1,2,'I''ll send my notes tonight.','text','sent'),


(2,5,'When will you come home this weekend?','text','seen'),
(2,1,'Probably Saturday afternoon.','text','seen'),
(2,5,'Okay, I''ll make your favourite food ','text','seen'),
(2,1,'Yayyy ','text','seen'),
(2,5,'Study well till then.','text','seen'),
(2,1,'I''m working on my chat application today.','text','delivered'),
(2,5,'Good luck beta ','text','sent'),

(3,3,'Where are you?','text','seen'),
(3,2,'Still in the hostel ','text','seen'),
(3,3,'The lecture already started.','text','seen'),
(3,2,'Save me a seat ','text','seen'),
(3,3,'Too late bro.','text','seen'),
(3,2,'Rude ','text','delivered'),
(3,3,'Bring coffee then ','text','sent'),

(4,1,'Did you submit the assignment?','text','seen'),
(4,4,'Yes, just 5 minutes ago.','text','seen'),
(4,1,'Nice! Mine is still pending.','text','seen'),
(4,4,'You''ll finish it ','text','seen'),
(4,1,'Hopefully ','text','seen'),
(4,4,'Don''t forget tomorrow''s lab.','text','delivered'),
(4,1,'Thanks for reminding me ','text','sent'),

(5,5,'Did you reach the office?','text','seen'),
(5,6,'Yes, just reached.','text','seen'),
(5,5,'Drive carefully while coming back.','text','seen'),
(5,6,'Don''t worry ','text','seen'),
(5,5,'Anshika will come home this weekend.','text','seen'),
(5,6,'That''s great!','text','seen'),
(5,5,'We should plan dinner together.','text','delivered'),
(5,6,'Definitely ','text','sent'),

(1,1,'uploads/dbms_notes.pdf','document','seen'),
(1,2,'uploads/erd_diagram.png','image','seen'),
(4,4,'uploads/funny_meme.gif','gif','seen'),
(3,2,'uploads/class_schedule.pdf','document','delivered'),
(2,1,'uploads/family_photo.jpg','image','seen');
