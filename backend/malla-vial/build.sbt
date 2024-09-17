name := """malla-vial"""
organization := "AdyIng"
version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.13.14"

// Guice para inyección de dependencias
libraryDependencies += guice

// PostgreSQL driver
libraryDependencies += "org.postgresql" % "postgresql" % "42.5.4"

// JPA y transacciones
libraryDependencies += "com.typesafe.play" %% "play-java-jpa" % "2.8.18"
libraryDependencies += "javax.transaction" % "javax.transaction-api" % "1.3"

// Agregar dependencias para Hibernate y JPA
libraryDependencies += "org.hibernate" % "hibernate-core" % "5.6.15.Final"
libraryDependencies += "javax.persistence" % "javax.persistence-api" % "2.2"

// Twirl y scala-xml
libraryDependencies += "com.typesafe.play" %% "twirl-api" % "1.5.1"
libraryDependencies += "org.scala-lang.modules" %% "scala-xml" % "2.2.0"

// Forzar la versión 2.2.0 de scala-xml para todas las dependencias
dependencyOverrides += "org.scala-lang.modules" %% "scala-xml" % "2.2.0"
