/*
 * Upon submission, this file should contain the SQL script to initialize your database.
 * It should contain all DROP TABLE and CREATE TABLE statments, and any INSERT statements
 * required.
 */

drop table if exists test;
drop table if exists files;
drop table if exists comments;
drop table if exists posts;
drop table if exists users;
drop table if exists avatars;




--------------- CREATE TABLES


create table if not exists posts (
    id integer not null primary key,
    datTime timestamp not null,
    title varchar(64),
    content varchar(50000),
    userId integer not null,
    foreign key (userId) references users (id) on delete cascade
);

create table if not exists files (
    id integer not null primary key,
    fileName varchar(64) not null,
    userId integer not null,
    foreign key (userId) references users (id) on delete cascade
);


create table  if not exists users (
    id integer not null primary key,
    username varchar(64) unique not null,
    password varchar(128) not null,
    fname varchar(64) not null,
    lname varchar(64) not null,
    doB date not null,
    description varchar(256),
    authToken varchar(128),
    avatar integer, 
    foreign key (avatar) references avatars (id)
);

create table if not exists comments (
    id integer not null primary key,
    postId integer not null,
    userId integer not null,
    datTime timestamp not null,
    comment varchar(500),
    foreign key (postId) references posts (id) on delete cascade,
    foreign key (userId) references users (id) on delete cascade
);

create table if not exists avatars (
id INTEGER NOT NULL PRIMARY KEY,
name varchar(32),
file varchar(64));



INSERT into avatars (name, file) VALUES
('Charmander','./images/avatars/Charmander.png'),
('Jigglypuff','./images/avatars/Jigglypuff.png'),
('Pikachu','./images/avatars/Pikachu.png'),
('Squirtle','./images/avatars/Squirtle.png'),
('Bulbasaur','./images/avatars/Bulbasaur.png'),
('Clefairy','./images/avatars/Clefairy.png'),
('Lapras','./images/avatars/Lapras.png'),
('Meowth','./images/avatars/Meowth.png'),
('Mew','./images/avatars/Mew.png'),
('Slowpoke','./images/avatars/Slowpoke.png'),
('Snorlax','./images/avatars/Snorlax.png');

insert into users (username, password, fname, lname, doB, description, avatar) values
    ('ScoobyDoo', 'pa55word', 'Scooby', 'Doo', '1931-09-23', 'I am a dog.', 3),
	('Walt', 'test', 'Walter', 'White', '1968-04-13', 'I am a chemistry teacher.', 2),
    ('GlobeTrotter82', 'abcd', 'Nancy', 'Jones', '1989-07-11', 'Travel is my passion', 6)
;

insert into posts (datTime, title, content, userId) values
	(datetime('now'), 'Bitten by the travel bug, my first trip away', 'Nullam felis sapien, tempus quis ipsum nec, volutpat iaculis mi.', 1),
	(datetime('2020-03-06 14:28:46'), 'Where to travel to first? How to decide on where to go!', 'Etiam congue quam vitae condimentum sollicitudin.', 1),
	(datetime('2022-08-12 08:22:16'), 'My Top 10 Travel Destinations', "White cat sleeps on a black shirt rub face on everything tuxedo cats always looking dapper. Find empty spot in cupboard and sleep all day kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff or shove bum in owner's face like camera lens.", 2)
;

insert into comments (postId, userId, datTime, comment) values
    (1, 2, datetime('2022-08-12 08:18:02'), 'Well done on your first post.'),
    (1, 3, datetime('2022-08-15 10:18:42'), 'What about a travel post as your next one?'),
    (1, 1, datetime('now'), 'Yes, I''ll get onto that!'),
    (2, 1, datetime('2022-10-16 13:18:42'), 'Some great things to consider when choosing a destination.'),
    (2, 3, datetime('2022-10-18 13:18:42'), 'A handy checklist...but sometimes I like to be spontaneous and randomly select a place on my world map!'),
    (3, 1, datetime('2022-10-28 13:18:42'), 'Nice one.')
;


update users
set password = '$2b$10$QTl6i9QQVxy/xcPquQarf.QXoCBLqnCjITo.H12iG9/MXwvC3KnBO'
where username = 'Walt';

update users
set password = '$2b$10$YlR.6sboWp8jcM1vGLKteuFcTrK3v2H9xxd3GQ8cYpeMWQkxjVzFW'
where id = 3;

update users
set password = '$2b$10$9mYTF2fDkp/CfLhdnOeMp.mBzJMXKNdckdr6i5VC8gCAvf7LYMwDm'
where username = 'ScoobyDoo';


insert into posts (datTime, title, content, userId) values
('1998-03-02 23:59:01', 'A Shadowy Flight into the Dangerous World', 'Landjaeger bacon pork chop eu tongue id, dolore turducken qui ribeye t-bone. Kielbasa ad magna dolore short ribs do pancetta ribeye voluptate exercitation sunt sausage. Shank quis pariatur ex ham ipsum anim ball tip kielbasa labore eiusmod voluptate velit. Kielbasa salami nisi doner bacon aute jowl mollit minim nulla swine. Lorem pariatur elit ut, burgdoggen ea sint eiusmod minim.', 3),
('2013-04-11 03:41:03', 'Seventeen Places to Visit in November', "Throw down all the stuff in the kitchen fooled again thinking the dog likes me play riveting piece on synthesizer keyboard chew on cable missing until dinner time. Licks your face milk the cow. Who's the baby chirp at birds lounge in doorway for Gate keepers of hell mrow rub whiskers on bare skin act innocent jumps off balcony gives owner dead mouse at present then poops in litter box snatches yarn and fights with dog cat chases laser then plays in grass finds tiny spot in cupboard and sleeps all day jumps in bathtub and meows when owner fills food dish the cat knocks over the food dish cat slides down the water slide and into pool and swims even though it does not like water. Milk the cow jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed paw at your fat belly. Gnaw the corn cob spill litter box, scratch at owner, destroy all furniture, especially couch and burrow under covers jump around on couch, meow constantly until given food, relentlessly pursues moth eat half my food and ask for more. Fooled again thinking the dog likes me missing until dinner time freak human out make funny noise mow mow mow mow mow mow success now attack human have secret plans. Plays league of legends meowing chowing and wowing need to chase tail, or lick plastic bags but spend all night ensuring people don't sleep sleep all day or give me attention or face the wrath of my claws poop on grasses. Stretch step on your keyboard while you're gaming and then turn in a circle . White cat sleeps on a black shirt rub face on everything tuxedo cats always looking dapper. Find empty spot in cupboard and sleep all day kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff or shove bum in owner's face like camera lens.", 2);

insert into files (fileName, userId) values
('./images/uploads/20200929_192731_optimized.jpg',2),
('./images/layout-images/20200929_191753_cropped.jpg', 1);