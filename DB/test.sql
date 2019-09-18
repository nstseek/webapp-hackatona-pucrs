-- CREATE DATABASE 
DROP DATABASE IF EXISTS hackatona;
CREATE DATABASE hackatona;

USE hackatona;

-- CREATE TABLES 
CREATE TABLE Doenca (nome VARCHAR(100), idDoenca INT(2));
CREATE TABLE Sintoma (nome VARCHAR(100), idSintoma INT(2));
CREATE TABLE SintomasDoenca (idDoenca INT(2), idSintoma VARCHAR(2));
CREATE TABLE `hackatona`.`Medico` (
  `id_medico` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(80) NOT NULL,
  `cremers` INT NOT NULL,
  `senha` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_medico`));

-- INSERTS 
INSERT INTO Doenca(nome,idDoenca)
VALUES('Gripe',1);
INSERT INTO Doenca(nome,idDoenca)
VALUES('Malária',2);
INSERT INTO Doenca(nome,idDoenca)
VALUES('Dengue',3);
INSERT INTO Doenca(nome,idDoenca)
VALUES('Leptospirose',4);

INSERT INTO Sintoma(nome,idSintoma)
VALUES('Dor de cabeça',1);
INSERT INTO Sintoma(nome,idSintoma)
VALUES('Febre',2);
INSERT INTO Sintoma(nome,idSintoma)
VALUES('Vômito',3);
INSERT INTO Sintoma(nome,idSintoma)
VALUES('Dor muscular',4);
INSERT INTO Sintoma(nome,idSintoma)
VALUES('Diarréia',5);
INSERT INTO Sintoma(nome,idSintoma)
VALUES('Dor nos olhos',6);
INSERT INTO Sintoma(nome,idSintoma)
VALUES('Emagrecimento',7);
INSERT INTO Sintoma(nome,idSintoma)
VALUES('Desmaio',8);

INSERT INTO SintomasDoenca(idDoenca,idSintoma)
VALUES(1,2);
INSERT INTO SintomasDoenca(idDoenca,idSintoma)
VALUES(1,5);
INSERT INTO SintomasDoenca(idDoenca,idSintoma)
VALUES(1,2);
INSERT INTO SintomasDoenca(idDoenca,idSintoma)
VALUES(2,3);
INSERT INTO SintomasDoenca(idDoenca,idSintoma)
VALUES(2,5);
INSERT INTO SintomasDoenca(idDoenca,idSintoma)
VALUES(3,1);
INSERT INTO SintomasDoenca(idDoenca,idSintoma)
VALUES(3,2);
INSERT INTO SintomasDoenca(idDoenca,idSintoma)
VALUES(3,3);
INSERT INTO SintomasDoenca(idDoenca,idSintoma)
VALUES(3,5);
INSERT INTO SintomasDoenca(idDoenca,idSintoma)
VALUES(4,6);
INSERT INTO SintomasDoenca(idDoenca,idSintoma)
VALUES(4,7);
INSERT INTO SintomasDoenca(idDoenca,idSintoma)
VALUES(4,8);

ALTER TABLE `hackatona`.`Doenca` 
CHANGE COLUMN `nome` `nome` VARCHAR(100) NOT NULL ,
CHANGE COLUMN `idDoenca` `idDoenca` INT NOT NULL AUTO_INCREMENT ,
ADD PRIMARY KEY (`idDoenca`);

ALTER TABLE `hackatona`.`Sintoma` 
CHANGE COLUMN `nome` `nome` VARCHAR(100) NOT NULL ,
CHANGE COLUMN `idSintoma` `idSintoma` INT NOT NULL AUTO_INCREMENT ,
ADD PRIMARY KEY (`idSintoma`);

