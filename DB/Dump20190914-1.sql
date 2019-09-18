-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: hackatona
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- CREATE DATABASE 
DROP DATABASE IF EXISTS hackatona;
CREATE DATABASE hackatona;

USE hackatona;

--
-- Table structure for table `Doenca`
--

DROP TABLE IF EXISTS `Doenca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Doenca` (
  `nome` varchar(100) NOT NULL,
  `idDoenca` int(11) NOT NULL AUTO_INCREMENT,
  `numeroEpidemia` int(11) NOT NULL DEFAULT '100',
  PRIMARY KEY (`idDoenca`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Doenca`
--

LOCK TABLES `Doenca` WRITE;
/*!40000 ALTER TABLE `Doenca` DISABLE KEYS */;
INSERT INTO `Doenca` VALUES ('Gripe',1,100),('Malária',2,100),('Dengue',3,100),('Leptospirose',4,100);
/*!40000 ALTER TABLE `Doenca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Medico`
--

DROP TABLE IF EXISTS `Medico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Medico` (
  `id_medico` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(80) NOT NULL,
  `cremers` int(11) NOT NULL,
  `senha` varchar(100) NOT NULL,
  PRIMARY KEY (`id_medico`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Medico`
--

LOCK TABLES `Medico` WRITE;
/*!40000 ALTER TABLE `Medico` DISABLE KEYS */;
/*!40000 ALTER TABLE `Medico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Organizacao`
--

DROP TABLE IF EXISTS `Organizacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Organizacao` (
  `id_org` int(11) NOT NULL,
  `senha` varchar(45) NOT NULL,
  PRIMARY KEY (`id_org`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Organizacao`
--

LOCK TABLES `Organizacao` WRITE;
/*!40000 ALTER TABLE `Organizacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `Organizacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sintoma`
--

DROP TABLE IF EXISTS `Sintoma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Sintoma` (
  `nome` varchar(100) NOT NULL,
  `idSintoma` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idSintoma`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sintoma`
--

LOCK TABLES `Sintoma` WRITE;
/*!40000 ALTER TABLE `Sintoma` DISABLE KEYS */;
INSERT INTO `Sintoma` VALUES ('Dor de cabeça',1),('Febre',2),('Vômito',3),('Dor muscular',4),('Diarréia',5),('Dor nos olhos',6),('Emagrecimento',7),('Desmaio',8);
/*!40000 ALTER TABLE `Sintoma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SintomasDoenca`
--

DROP TABLE IF EXISTS `SintomasDoenca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SintomasDoenca` (
  `idDoenca` int(2) DEFAULT NULL,
  `idSintoma` varchar(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SintomasDoenca`
--

LOCK TABLES `SintomasDoenca` WRITE;
/*!40000 ALTER TABLE `SintomasDoenca` DISABLE KEYS */;
INSERT INTO `SintomasDoenca` VALUES (1,'2'),(1,'5'),(1,'2'),(2,'3'),(2,'5'),(3,'1'),(3,'2'),(3,'3'),(3,'5'),(4,'6'),(4,'7'),(4,'8');
/*!40000 ALTER TABLE `SintomasDoenca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ponto_doenca`
--

DROP TABLE IF EXISTS `ponto_doenca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ponto_doenca` (
  `id_ponto_doenca` int(11) NOT NULL AUTO_INCREMENT,
  `lat` float NOT NULL,
  `lng` float NOT NULL,
  `idDoenca` int(11) NOT NULL,
  PRIMARY KEY (`id_ponto_doenca`),
  KEY `fk_ponto_doenca_1_idx` (`idDoenca`),
  CONSTRAINT `fk_ponto_doenca_1` FOREIGN KEY (`idDoenca`) REFERENCES `Doenca` (`idDoenca`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ponto_doenca`
--

LOCK TABLES `ponto_doenca` WRITE;
/*!40000 ALTER TABLE `ponto_doenca` DISABLE KEYS */;
/*!40000 ALTER TABLE `ponto_doenca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'hackatona'
--

--
-- Dumping routines for database 'hackatona'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-14 23:29:15
