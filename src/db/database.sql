/* Created by dario.talarico@gm.com */
/* A2 CMU */

USE facturas;

DROP TABLE IF EXISTS `auth_log`;
DROP TABLE IF EXISTS `receipt`;
DROP TABLE IF EXISTS `user`;

CREATE TABLE `auth_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL,
  `token` TEXT NOT NULL,
  `event` varchar(50) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `user` (
  `id` VARCHAR(36) NOT NULL,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `rfc` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `receipt` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total` numeric NOT NULL,
  `emitter` VARCHAR(36) NOT NULL,
  `receiver` VARCHAR(36) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/* Insert data */
SET @uuidDario = UUID();
SET @uuidLaura = UUID();

INSERT INTO facturas.user (id, first_name, last_name, rfc) VALUES
  (@uuidDario,'Laura','Talarico Vettorel','GPD2342344'),
  (@uuidLaura,'Dario','Lencina Talarico','GPD9349348909');

INSERT INTO facturas.receipt (total, emitter, receiver) VALUES
  (1400.00, @uuidLaura, @uuidDario),
  (1500.00, @uuidDario, @uuidLaura),
  (1600.00, @uuidLaura, @uuidDario),
  (1200.00, @uuidDario, @uuidLaura);
