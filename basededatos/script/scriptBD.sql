CREATE DATABASE  IF NOT EXISTS `ventanillaenlinea` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ventanillaenlinea`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: ventanillaenlinea
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `documento`
--

DROP TABLE IF EXISTS `documento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documento` (
  `idDocumento` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `ruta` varchar(255) NOT NULL,
  `idTramite` int NOT NULL,
  PRIMARY KEY (`idDocumento`),
  KEY `idTramite` (`idTramite`),
  CONSTRAINT `documento_ibfk_1` FOREIGN KEY (`idTramite`) REFERENCES `tramite` (`idTramite`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documento`
--

LOCK TABLES `documento` WRITE;
/*!40000 ALTER TABLE `documento` DISABLE KEYS */;
INSERT INTO `documento` VALUES (1,'Prueba.txt','C:\\Users\\nando\\Desktop\\Trabajos UV\\Desarrollo de sistemas en red\\ProyectoRed\\VentanillaEnLineaServer\\grpcServidor\\ArchivosProyecto\\2\\Prueba.txt',2),(2,'Prueba.txt','C:\\Users\\nando\\Desktop\\Trabajos UV\\Desarrollo de sistemas en red\\ProyectoRed\\VentanillaEnLineaServer\\grpcServidor\\ArchivosProyecto\\2\\Prueba.txt',2),(3,'Prueba.txt','C:\\Users\\nando\\Desktop\\Trabajos UV\\Desarrollo de sistemas en red\\ProyectoRed\\VentanillaEnLineaServer\\grpcServidor\\ArchivosProyecto\\2\\Prueba.txt',2),(4,'Prueba.txt','C:\\Users\\nando\\Desktop\\Trabajos UV\\Desarrollo de sistemas en red\\ProyectoRed\\VentanillaEnLineaServer\\grpcServidor\\ArchivosProyecto\\2\\Prueba.txt',2),(5,'Prueba.txt','C:\\Users\\nando\\Desktop\\Trabajos UV\\Desarrollo de sistemas en red\\ProyectoRed\\VentanillaEnLineaServer\\grpcServidor\\ArchivosProyecto\\2\\Prueba.txt',2),(6,'Prueba.txt','C:\\Users\\nando\\Desktop\\Trabajos UV\\Desarrollo de sistemas en red\\ProyectoRed\\VentanillaEnLineaServer\\grpcServidor\\ArchivosProyecto\\2\\Prueba.txt',2),(7,'Prueba.txt','C:\\Users\\nando\\Desktop\\Trabajos UV\\Desarrollo de sistemas en red\\ProyectoRed\\VentanillaEnLineaServer\\grpcServidor\\ArchivosProyecto\\2\\Prueba.txt',2);
/*!40000 ALTER TABLE `documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experienciaeducativa`
--

DROP TABLE IF EXISTS `experienciaeducativa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experienciaeducativa` (
  `idExperienciaEducativa` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `NRC` int NOT NULL,
  PRIMARY KEY (`idExperienciaEducativa`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experienciaeducativa`
--

LOCK TABLES `experienciaeducativa` WRITE;
/*!40000 ALTER TABLE `experienciaeducativa` DISABLE KEYS */;
INSERT INTO `experienciaeducativa` VALUES (1,'VyV',123213),(2,'Red',98775),(3,'Apps',1235765);
/*!40000 ALTER TABLE `experienciaeducativa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipotramite`
--

DROP TABLE IF EXISTS `tipotramite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipotramite` (
  `idTipoTramite` int NOT NULL AUTO_INCREMENT,
  `nombreTipoTramite` varchar(100) NOT NULL,
  PRIMARY KEY (`idTipoTramite`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipotramite`
--

LOCK TABLES `tipotramite` WRITE;
/*!40000 ALTER TABLE `tipotramite` DISABLE KEYS */;
INSERT INTO `tipotramite` VALUES (1,'Inscripcion'),(2,'Extra'),(3,'Titulo');
/*!40000 ALTER TABLE `tipotramite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipousuario`
--

DROP TABLE IF EXISTS `tipousuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipousuario` (
  `idTipoUsuario` int NOT NULL AUTO_INCREMENT,
  `nombreTipoUsuario` varchar(50) NOT NULL,
  PRIMARY KEY (`idTipoUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipousuario`
--

LOCK TABLES `tipousuario` WRITE;
/*!40000 ALTER TABLE `tipousuario` DISABLE KEYS */;
INSERT INTO `tipousuario` VALUES (1,'Secretario'),(2,'Estudiante');
/*!40000 ALTER TABLE `tipousuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tramite`
--

DROP TABLE IF EXISTS `tramite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tramite` (
  `idTramite` int NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `idTipoTramite` int NOT NULL,
  `idUsuario` int NOT NULL,
  `estado` int NOT NULL,
  PRIMARY KEY (`idTramite`),
  KEY `idTipoTramite` (`idTipoTramite`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `tramite_ibfk_1` FOREIGN KEY (`idTipoTramite`) REFERENCES `tipotramite` (`idTipoTramite`),
  CONSTRAINT `tramite_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tramite`
--

LOCK TABLES `tramite` WRITE;
/*!40000 ALTER TABLE `tramite` DISABLE KEYS */;
INSERT INTO `tramite` VALUES (2,'2025-01-01',1,6,2),(3,'2025-01-02',1,6,1),(4,'2025-01-02',2,6,0);
/*!40000 ALTER TABLE `tramite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `clave` varchar(50) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  `idTipoUsuario` int NOT NULL,
  `idSecretarioAsignado` int NOT NULL,
  `estado` int NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `correo` (`correo`),
  KEY `idTipoUsuario` (`idTipoUsuario`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`idTipoUsuario`) REFERENCES `tipousuario` (`idTipoUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (5,'fer','1234','fer','ferf',1,0,1),(6,'ferd','542','frt','fetr',2,5,1),(7,'ñlo','l402','htt','lfl',2,5,0);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarioexperienciaeducativa`
--

DROP TABLE IF EXISTS `usuarioexperienciaeducativa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarioexperienciaeducativa` (
  `idUsuarioExperienciaEducativa` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `idExperienciaEducativa` int NOT NULL,
  PRIMARY KEY (`idUsuarioExperienciaEducativa`),
  KEY `idUsuario` (`idUsuario`),
  KEY `idExperienciaEducativa` (`idExperienciaEducativa`),
  CONSTRAINT `usuarioexperienciaeducativa_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`),
  CONSTRAINT `usuarioexperienciaeducativa_ibfk_2` FOREIGN KEY (`idExperienciaEducativa`) REFERENCES `experienciaeducativa` (`idExperienciaEducativa`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarioexperienciaeducativa`
--

LOCK TABLES `usuarioexperienciaeducativa` WRITE;
/*!40000 ALTER TABLE `usuarioexperienciaeducativa` DISABLE KEYS */;
INSERT INTO `usuarioexperienciaeducativa` VALUES (1,6,1);
/*!40000 ALTER TABLE `usuarioexperienciaeducativa` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-12 19:37:21
