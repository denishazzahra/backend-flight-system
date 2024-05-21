-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 21, 2024 at 05:38 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `flight_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `airports`
--

CREATE TABLE `airports` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `timezone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `airports`
--

INSERT INTO `airports` (`id`, `name`, `city`, `province`, `code`, `timezone`) VALUES
(1, 'Soekarno–Hatta', 'Tangerang', 'Banten', 'CGK', 'WIB'),
(2, 'I Gusti Ngurah Rai', 'Denpasar', 'Bali', 'DPS', 'WITA'),
(3, 'Juanda', 'Surabaya', 'Jawa Timur', 'SUB', 'WIB'),
(4, 'Sultan Hasanuddin', 'Makassar', 'Sulawesi Selatan', 'UPG', 'WITA'),
(5, 'Kualanamu', 'Medan', 'Sumatera Utara', 'KNO', 'WIB'),
(6, 'Adisutjipto', 'Yogyakarta', 'Daerah Istimewa Yogyakarta', 'JOG', 'WIB'),
(7, 'Halim Perdanakusuma', 'Jakarta', 'DKI Jakarta', 'HLP', 'WIB'),
(8, 'Hang Nadim', 'Batam', 'Kepulauan Riau', 'BTH', 'WIB'),
(9, 'Sultan Mahmud Badaruddin II', 'Palembang', 'Sumatera Selatan', 'PLM', 'WIB'),
(12, 'Zainuddin Abdul Madjid', 'Praya', 'Nusa Tenggara Barat', 'LOP', 'WITA'),
(13, 'Sultan Syarif Kasim II', 'Pekanbaru', 'Riau', 'PKU', 'WIB'),
(14, 'Minangkabau', 'Padang', 'Sumatera Barat', 'PDG', 'WIB'),
(15, 'Syamsudin Noor', 'Banjarmasin', 'Kalimantan Selatan', 'BDJ', 'WITA'),
(16, 'Sam Ratulangi', 'Manado', 'Sulawesi Utara', 'MDC', 'WITA'),
(17, 'Radin Inten II', 'Bandar Lampung', 'Lampung', 'TKG', 'WIB'),
(18, 'Adi Soemarmo', 'Solo', 'Jawa Tengah', 'SOC', 'WIB'),
(19, 'El Tari', 'Kupang', 'Nusa Tenggara Timur', 'KOE', 'WITA'),
(20, 'Sentani', 'Jayapura', 'Papua', 'DJJ', 'WIT'),
(21, 'Yogyakarta', 'Yogyakarta', 'Daerah Istimewa Yogyakarta', 'YIA', 'WIB'),
(22, 'Pattimura', 'Ambon', 'Maluku', 'AMQ', 'WIT'),
(23, 'Sultan Babullah', 'Ternate', 'Maluku Utara', 'TTE', 'WIT'),
(24, 'Supadio', 'Pontianak', 'Kalimantan Barat', 'PNK', 'WIB');

-- --------------------------------------------------------

--
-- Table structure for table `flights`
--

CREATE TABLE `flights` (
  `id` int(11) NOT NULL,
  `airline` varchar(255) NOT NULL,
  `flightNumber` varchar(255) NOT NULL,
  `departure_time` time DEFAULT NULL,
  `arrival_time` time DEFAULT NULL,
  `originId` int(11) DEFAULT NULL,
  `destinationId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `flights`
--

INSERT INTO `flights` (`id`, `airline`, `flightNumber`, `departure_time`, `arrival_time`, `originId`, `destinationId`) VALUES
(1, 'TransNusa', '8B 5536', '16:25:00', '17:40:00', 1, 21),
(2, 'Garuda Indonesia', 'GA 208', '11:30:00', '12:50:00', 1, 21),
(3, 'TransNusa', '8B 5573', '18:10:00', '19:20:00', 21, 1),
(4, 'Garuda Indonesia', 'GA 205', '10:00:00', '11:15:00', 21, 1),
(5, 'Super Air Jet', 'IU 738', '18:45:00', '20:40:00', 1, 2),
(6, 'AirAsia', 'QZ 601', '17:35:00', '19:25:00', 1, 2),
(7, 'Citilink', 'QG 688', '13:50:00', '15:50:00', 2, 1),
(8, 'AirAsia', 'QZ 813', '06:05:00', '07:55:00', 2, 1),
(9, 'LionAir', 'JT 967', '09:05:00', '12:20:00', 20, 4),
(10, 'Citilink', 'QG 657', '05:30:00', '12:15:00', 20, 1),
(11, 'Citilink', 'QG 656', '20:30:00', '04:30:00', 1, 20),
(12, 'Citilink', 'QG 557', '14:45:00', '16:10:00', 8, 5),
(13, 'LionAir', 'JT 867', '14:05:00', '16:15:00', 8, 3),
(14, 'Citilink', 'QG 334', '16:50:00', '18:05:00', 5, 8),
(15, 'LionAir', 'JT 968', '07:00:00', '09:10:00', 3, 8),
(16, 'Citilink', 'QG 587', '11:45:00', '13:15:00', 6, 7),
(17, 'Citilink', 'QG 567', '05:55:00', '07:20:00', 7, 3),
(18, 'Citilink', 'QG 568', '20:40:00', '21:50:00', 9, 1),
(19, 'Citilink', 'QG 458', '20:30:00', '21:35:00', 9, 7),
(20, 'LionAir', 'JT 618', '08:00:00', '09:05:00', 1, 9),
(21, 'Citilink', 'QG 193', '07:15:00', '08:55:00', 7, 9),
(22, 'Citilink', 'QG 182', '07:15:00', '08:55:00', 24, 3),
(23, 'LionAir', 'JT 283', '16:55:00', '18:10:00', 24, 8),
(24, 'LionAir', 'JT 284', '07:00:00', '08:25:00', 24, 1),
(25, 'Super Air Jet', 'IU 382', '06:20:00', '07:50:00', 1, 24),
(26, 'LionAir', 'JT 485', '09:40:00', '10:55:00', 8, 24),
(27, 'LionAir', 'JT 487', '14:00:00', '15:45:00', 3, 24),
(28, 'Super Air Jet', 'IU 499', '14:30:00', '16:30:00', 12, 1),
(29, 'Wings Abadi Airlines', 'IW 1963', '12:10:00', '13:05:00', 12, 2),
(30, 'LionAir', 'JT 789', '01:45:00', '14:55:00', 12, 4),
(31, 'LionAir', 'JT 780', '11:35:00', '12:50:00', 4, 12),
(32, 'LionAir', 'JT 586', '11:45:00', '12:25:00', 2, 12),
(33, 'Super Air Jet', 'IU 423', '15:45:00', '18:40:00', 1, 12),
(34, 'Citilink', 'QG 293', '13:50:00', '15:35:00', 13, 1),
(35, 'Citilink', 'QG 294', '08:20:00', '10:30:00', 13, 21),
(36, 'Citilink', 'QG 312', '11:00:00', '13:10:00', 21, 13),
(37, 'Super Air Jet', 'IU 929', '10:35:00', '12:15:00', 1, 13),
(38, 'Citilink', 'QG 283', '09:20:00', '10:35:00', 14, 8),
(39, 'Citilink', 'QG 349', '07:40:00', '08:50:00', 8, 14),
(40, 'Super Air Jet', 'IU 247', '07:05:00', '08:55:00', 14, 1),
(41, 'Super Air Jet', 'IU 427', '17:30:00', '19:15:00', 1, 14),
(42, 'LionAir', 'JT 328', '15:05:00', '16:15:00', 15, 3),
(43, 'LionAir', 'JT 329', '08:50:00', '10:00:00', 3, 15),
(44, 'Garuda Indonesia', 'GA 482', '06:50:00', '10:05:00', 16, 1),
(45, 'Garuda Indonesia', 'GA 483', '02:25:00', '05:50:00', 1, 16),
(46, 'LionAir', 'JT 366', '14:05:00', '13:45:00', 17, 4),
(47, 'LionAir', 'JT 367', '08:05:00', '09:50:00', 4, 16),
(48, 'Garuda Indonesia', 'GA 382', '07:10:00', '08:00:00', 17, 1),
(49, 'Garuda Indonesia', 'GA 385', '05:50:00', '06:40:00', 1, 17),
(56, 'LionAir', 'JT 926', '11:40:00', '12:55:00', 18, 2),
(57, 'Garuda Indonesia', 'GA 221', '16:00:00', '17:15:00', 18, 1),
(58, 'LionAir', 'JT 925', '13:10:00', '16:30:00', 2, 18),
(59, 'Garuda Indonesia', 'GA 222', '08:45:00', '10:00:00', 1, 18),
(60, 'Batik Air', 'ID 7531', '10:50:00', '12:00:00', 7, 18),
(61, 'Batik Air', 'ID 7532', '12:30:00', '13:45:00', 18, 7),
(62, 'Garuda Indonesia', 'GA 449', '12:30:00', '14:45:00', 19, 3),
(63, 'LionAir', 'JT 693', '05:15:00', '07:15:00', 19, 3),
(64, 'LionAir', 'JT 692', '16:45:00', '18:45:00', 3, 19),
(65, 'Garuda Indonesia', 'GA 448', '09:45:00', '11:45:00', 3, 19),
(66, 'AirAsia', 'QZ 633', '12:05:00', '14:50:00', 19, 2),
(67, 'AirAsia', 'QZ 632', '09:40:00', '11:25:00', 2, 19),
(68, 'Batik Air', 'ID 6541', '05:50:00', '08:40:00', 19, 1),
(69, 'BatikAir', 'ID 6540', '02:00:00', '05:10:00', 1, 19),
(70, 'LionAir', 'JT 787', '09:40:00', '11:20:00', 22, 4),
(71, 'LionAir', 'JT 881', '11:20:00', '13:00:00', 22, 4),
(72, 'LionAir', 'JT 888', '03:10:00', '05:55:00', 4, 22),
(73, 'LionAir', 'JT 786', '07:15:00', '09:00:00', 4, 22),
(74, 'LionAir', 'JT 879', '13:30:00', '16:15:00', 22, 3),
(75, 'LionAir', 'JT 786', '09:40:00', '12:25:00', 3, 22),
(76, 'Garuda Indonesia', 'GA 647', '14:20:00', '17:45:00', 22, 1),
(77, 'Garuda Indonesia', 'GA 646', '10:00:00', '13:35:00', 1, 22),
(78, 'Garuda Indonesia', 'GA 649', '06:05:00', '09:40:00', 23, 1),
(79, 'Batik Air', 'ID 6141', '07:00:00', '10:20:00', 23, 1),
(80, 'Batik Air', 'ID 6140', '02:30:00', '06:15:00', 1, 23),
(81, 'Garuda Indonesia', 'GA 648', '01:20:00', '05:05:00', 1, 23),
(82, 'Super Jet Air', 'IU 251', '12:35:00', '14:24:00', 23, 4),
(83, 'LionAir', 'JT 896', '07:20:00', '09:15:00', 4, 23),
(84, 'LionAir', 'JT 869', '09:45:00', '12:35:00', 23, 3),
(85, 'LionAir', 'JT 868', '06:00:00', '09:00:00', 3, 23);

-- --------------------------------------------------------

--
-- Table structure for table `seats`
--

CREATE TABLE `seats` (
  `id` int(11) NOT NULL,
  `type` enum('Business','Economy') NOT NULL,
  `capacity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `flightId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `seats`
--

INSERT INTO `seats` (`id`, `type`, `capacity`, `price`, `flightId`) VALUES
(7, 'Economy', 168, 661315, 1),
(8, 'Economy', 150, 1209220, 2),
(9, 'Business', 12, 4625580, 2),
(10, 'Economy', 168, 670315, 3),
(11, 'Business', 12, 5639230, 4),
(12, 'Economy', 150, 1165580, 4),
(13, 'Economy', 160, 1150040, 5),
(14, 'Economy', 186, 1034020, 6),
(15, 'Economy', 186, 1052010, 7),
(16, 'Economy', 186, 1100020, 8),
(17, 'Economy', 189, 650320, 9),
(18, 'Economy', 186, 450610, 10),
(19, 'Economy', 186, 680450, 11),
(20, 'Economy', 186, 670390, 12),
(21, 'Economy', 189, 1080040, 13),
(22, 'Economy', 186, 460430, 14),
(23, 'Economy', 189, 1180090, 15),
(24, 'Economy', 186, 1090030, 16),
(25, 'Economy', 186, 470310, 17),
(26, 'Economy', 186, 1075070, 18),
(27, 'Economy', 186, 1130020, 19),
(28, 'Economy', 189, 680210, 20),
(29, 'Economy', 186, 1145090, 21),
(30, 'Economy', 186, 480620, 22),
(31, 'Economy', 189, 1065030, 23),
(32, 'Economy', 189, 1160020, 24),
(33, 'Economy', 160, 1105040, 25),
(34, 'Economy', 189, 1082020, 26),
(35, 'Economy', 189, 1140030, 27),
(36, 'Economy', 160, 1220040, 28),
(37, 'Economy', 72, 650540, 29),
(38, 'Economy', 189, 1250020, 30),
(39, 'Economy', 189, 1170020, 31),
(40, 'Economy', 189, 1150030, 32),
(41, 'Economy', 160, 1275040, 33),
(42, 'Economy', 186, 1130030, 34),
(43, 'Economy', 186, 1115040, 35),
(44, 'Economy', 186, 1185040, 36),
(45, 'Economy', 160, 1095040, 37),
(46, 'Economy', 186, 1225040, 38),
(47, 'Economy', 186, 1235040, 39),
(48, 'Economy', 160, 1250040, 40),
(49, 'Economy', 160, 1190040, 41),
(50, 'Economy', 189, 1200030, 42),
(51, 'Economy', 189, 1215040, 43),
(52, 'Economy', 150, 1300040, 44),
(53, 'Business', 12, 5300040, 44),
(54, 'Economy', 150, 1250030, 45),
(55, 'Business', 12, 5200040, 45),
(56, 'Economy', 189, 1350030, 46),
(57, 'Economy', 189, 1290040, 47),
(58, 'Economy', 150, 1270030, 48),
(59, 'Business', 12, 5150040, 48),
(60, 'Economy', 150, 1280040, 49),
(61, 'Business', 12, 5250040, 49),
(62, 'Economy', 189, 1120030, 56),
(63, 'Economy', 150, 1150030, 57),
(64, 'Business', 12, 5400030, 57),
(65, 'Economy', 189, 1230040, 58),
(66, 'Economy', 150, 1290030, 59),
(67, 'Business', 12, 5600040, 59),
(68, 'Economy', 144, 1080030, 60),
(69, 'Business', 12, 5300040, 60),
(70, 'Economy', 144, 1095040, 61),
(71, 'Business', 12, 5350040, 61),
(72, 'Economy', 150, 1155040, 62),
(73, 'Business', 12, 5100040, 62),
(74, 'Economy', 189, 1205040, 63),
(75, 'Economy', 189, 1180040, 64),
(76, 'Economy', 150, 1210030, 65),
(77, 'Business', 12, 5250030, 65),
(78, 'Economy', 186, 1085030, 66),
(79, 'Economy', 186, 1075040, 67),
(80, 'Economy', 144, 1240040, 68),
(81, 'Business', 12, 5450040, 68),
(82, 'Economy', 144, 1270030, 69),
(83, 'Business', 12, 5500030, 69),
(84, 'Economy', 189, 1105040, 70),
(85, 'Economy', 189, 1085040, 71),
(86, 'Economy', 189, 1120030, 72),
(87, 'Economy', 189, 1095040, 73),
(88, 'Economy', 189, 1210030, 74),
(89, 'Economy', 189, 1185040, 75),
(90, 'Economy', 150, 1270030, 76),
(91, 'Business', 12, 5400040, 76),
(92, 'Economy', 150, 1250030, 77),
(93, 'Business', 12, 5300040, 77),
(94, 'Economy', 150, 1235040, 78),
(95, 'Business', 12, 5250030, 78),
(96, 'Economy', 144, 1265040, 79),
(97, 'Business', 12, 5350040, 79),
(98, 'Economy', 144, 1280030, 80),
(99, 'Business', 12, 5400040, 80),
(100, 'Economy', 150, 1240040, 81),
(101, 'Business', 12, 5250040, 81),
(102, 'Economy', 160, 1180030, 82),
(103, 'Economy', 189, 1175040, 83),
(104, 'Economy', 189, 1200040, 84),
(105, 'Economy', 189, 1225040, 85);

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` varchar(255) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `flightId` int(11) DEFAULT NULL,
  `seatId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profilePicture` text DEFAULT NULL,
  `role` enum('Admin','User') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `airports`
--
ALTER TABLE `airports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `flights`
--
ALTER TABLE `flights`
  ADD PRIMARY KEY (`id`),
  ADD KEY `originId` (`originId`),
  ADD KEY `destinationId` (`destinationId`);

--
-- Indexes for table `seats`
--
ALTER TABLE `seats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `flightId` (`flightId`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `flightId` (`flightId`),
  ADD KEY `seatId` (`seatId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `airports`
--
ALTER TABLE `airports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `flights`
--
ALTER TABLE `flights`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `seats`
--
ALTER TABLE `seats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `flights`
--
ALTER TABLE `flights`
  ADD CONSTRAINT `flights_ibfk_1` FOREIGN KEY (`originId`) REFERENCES `airports` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `flights_ibfk_2` FOREIGN KEY (`destinationId`) REFERENCES `airports` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `seats`
--
ALTER TABLE `seats`
  ADD CONSTRAINT `seats_ibfk_1` FOREIGN KEY (`flightId`) REFERENCES `flights` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`flightId`) REFERENCES `flights` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tickets_ibfk_3` FOREIGN KEY (`seatId`) REFERENCES `seats` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
