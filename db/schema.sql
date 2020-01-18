-- Create the table
CREATE TABLE questions
(
id int NOT NULL AUTO_INCREMENT,
question varchar(300) NOT NULL,
answer_1 varchar(200) NOT NULL,
answer_score_1 int(3) NOT NULL,
answer_2 varchar(200) NOT NULL,
answer_score_2 int(3) NOT NULL,
answer_3 varchar(200) NOT NULL,
answer_score_3 int(3) NOT NULL,
answer_4 varchar(200) NOT NULL,
answer_score_4 int(3) NOT NULL,
answer_5 varchar(200) NOT NULL,
answer_score_5 int(3) NOT NULL,
answer_6 varchar(200) NOT NULL,
answer_score_6 int(3) NOT NULL,
PRIMARY KEY (id)
);