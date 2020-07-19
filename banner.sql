-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 19, 2020 at 10:20 PM
-- Server version: 10.3.23-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smeatech_antoo`
--

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` longtext NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`id`, `title`, `description`, `image`) VALUES
(1, 'Gara-gara CLBK, Hati Jadi Berbunga-bunga', 'Eits, bukan CLBK sembarangan nih! CLBK yang ini artinya Cashback Lagi Buat Kamu! Jadi kamu bisa dapetin Cashback 20% buat ajak temen, gebetan, atau mantan buat makan di merchant partner OVO yang oke banget! Pokoknya mau makan sama siapa aja, mau makan di tempat, atau delivery order semuanya dijamin lebih enak kalo pake Cashback 20% di CLBK (Cashback Lagi Buat Kamu) OVO!\r\n', 'https://images-loyalty.ovo.id/public/deal/82/46/l/27430.jpg'),
(2, 'Pakai Maskernya, Sebar Kebaikanya', 'Kamu tau nggak, kalo ternyata dengan pake masker kamu bisa mengurangi tingkat penularan virus sampe 75% lho! Jadi kayaknya nggak ada lagi alasan buat kita semua untuk nggak pake masker!\r\nPas banget OVO saat ini lagi berkolaborasi dalam mendukung langkah pemerintah untuk memutus mata rantai penyebaran virus. Caranya gampang kok, cukup pakai maskermu saat keluar rumah untuk jaga dirimu dan lindungi orang di sekitarmu. ', 'https://images-loyalty.ovo.id/public/deal/52/45/l/27330.jpg'),
(3, 'Voucher 100.000 Discount 25% Semua Menu', 'Mau Ayam Spicy, Big Mac, McNuggets, atau lainnya? Cuma bayar Rp75.000 nikmati voucher McDonald\'s senilai Rp100.000!', 'https://images-loyalty.ovo.id/public/deal/50/46/l/27427.jpg'),
(4, 'Jadwal Baru Layanan Customer Service Antoo', 'Dear pengguna setia  OVO, mengikuti anjuran pemerintah tentang bekerja dari rumah untuk membantu mencegah penyebaran virus COVID-19. Mulai tanggal 4 Mei 2020:\r\nLayanan Customer Service OVO via telepon (1 500 696) untuk sementara hanya akan beroperasi dari pukul 06.00 WIB hingga 22.00 WIB.', 'https://images-loyalty.ovo.id/public/deal/67/38/l/27122.jpg'),
(5, 'Dapet Cashback Sekarang Jadi Makin Seru', 'Di tengah masa pandemi, pastiin kalo kamu keluar rumah cuma waktu kamu butuh beli kebutuhan rumah di supermarket dan beli kebutuhan kesehatan di apotik ya. Selain itu, kamu bisa beli semua kebutuhan di rumah aja kok. ', 'https://images-loyalty.ovo.id/public/deal/52/38/l/27113.jpg'),
(6, 'Bebas Belanja Sampe Puas di SOS Antoo', 'Online shoppers mana suaranyaa??? Kabar gembira buat kamu semua, karena SOS: Sepuasnya Online Shopping OVO kembali lagi buat kasih Cashback hingga 50% buat kamu belanja online sepuasnya!', 'https://images-loyalty.ovo.id/public/deal/08/47/l/27441.jpg'),
(7, 'Voucher 100.000 Discount 25% Semua Menu', 'Mau Ayam Spicy, Big Mac, McNuggets, atau lainnya? Cuma bayar Rp75.000 nikmati voucher McDonald\'s senilai Rp100.000!', 'https://images-loyalty.ovo.id/public/deal/50/46/l/27427.jpg'),
(8, 'Jadwal Baru Layanan Customer Service Antoo', 'Dear pengguna setia  OVO, mengikuti anjuran pemerintah tentang bekerja dari rumah untuk membantu mencegah penyebaran virus COVID-19. Mulai tanggal 4 Mei 2020:\r\nLayanan Customer Service OVO via telepon (1 500 696) untuk sementara hanya akan beroperasi dari pukul 06.00 WIB hingga 22.00 WIB.', 'https://images-loyalty.ovo.id/public/deal/67/38/l/27122.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banner`
--
ALTER TABLE `banner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
