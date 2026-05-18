-- ============================================================
--  DDL MySQL - Sistem Manajemen Restoran
--  Dibuat berdasarkan Diagram Relasi
-- ============================================================

-- Urutan pembuatan tabel memperhatikan dependensi FK

-- ------------------------------------------------------------
-- 1. Tabel Cabang
-- ------------------------------------------------------------
CREATE TABLE Cabang (
    idCabang    INT          NOT NULL AUTO_INCREMENT,
    namaCabang  VARCHAR(100) NOT NULL,
    alamat      VARCHAR(255) NOT NULL,
    PRIMARY KEY (idCabang)
);

-- ------------------------------------------------------------
-- 2. Tabel Kasir
-- ------------------------------------------------------------
CREATE TABLE Kasir (
    idKasir   INT          NOT NULL AUTO_INCREMENT,
    namaKasir VARCHAR(100) NOT NULL,
    idCabang  INT          NOT NULL,
    PRIMARY KEY (idKasir),
    CONSTRAINT fk_kasir_cabang
        FOREIGN KEY (idCabang) REFERENCES Cabang (idCabang)
);

-- ------------------------------------------------------------
-- 3. Tabel MetodePembayaran
-- ------------------------------------------------------------
CREATE TABLE MetodePembayaran (
    idMetode         INT         NOT NULL AUTO_INCREMENT,
    jenisPembayaran  VARCHAR(50) NOT NULL,
    PRIMARY KEY (idMetode)
);

-- ------------------------------------------------------------
-- 4. Tabel Transaksi
-- ------------------------------------------------------------
CREATE TABLE Transaksi (
    noTransaksi    VARCHAR(20)    NOT NULL,
    tanggal        DATE           NOT NULL,
    waktu          TIME           NOT NULL,
    namaPelanggan  VARCHAR(100)   NOT NULL,
    totalBayar     DECIMAL(12, 2) NOT NULL,
    idKasir        INT            NOT NULL,
    idMetode       INT            NOT NULL,
    PRIMARY KEY (noTransaksi),
    CONSTRAINT fk_transaksi_kasir
        FOREIGN KEY (idKasir) REFERENCES Kasir (idKasir),
    CONSTRAINT fk_transaksi_metode
        FOREIGN KEY (idMetode) REFERENCES MetodePembayaran (idMetode)
);

-- ------------------------------------------------------------
-- 5. Tabel Menu
-- ------------------------------------------------------------
CREATE TABLE Menu (
    idMenu     INT            NOT NULL AUTO_INCREMENT,
    namaMenu   VARCHAR(100)   NOT NULL,
    hargaDasar DECIMAL(12, 2) NOT NULL,
    PRIMARY KEY (idMenu)
);

-- ------------------------------------------------------------
-- 6. Tabel OpsiVarian
-- ------------------------------------------------------------
CREATE TABLE OpsiVarian (
    idVarian      INT            NOT NULL AUTO_INCREMENT,
    namaVarian    VARCHAR(100)   NOT NULL,
    hargaTambahan DECIMAL(12, 2) NOT NULL DEFAULT 0,
    idMenu        INT            NOT NULL,
    PRIMARY KEY (idVarian),
    CONSTRAINT fk_opsivarian_menu
        FOREIGN KEY (idMenu) REFERENCES Menu (idMenu)
);

-- ------------------------------------------------------------
-- 7. Tabel PesananSatuan
--    (Pesanan menu satuan dalam satu transaksi)
-- ------------------------------------------------------------
CREATE TABLE PesananSatuan (
    idPesananSatuan INT            NOT NULL AUTO_INCREMENT,
    qty             INT            NOT NULL,
    hargaJual       DECIMAL(12, 2) NOT NULL,
    noTransaksi     VARCHAR(20)    NOT NULL,
    idMenu          INT            NOT NULL,
    idVarian        INT            NULL,
    PRIMARY KEY (idPesananSatuan),
    CONSTRAINT fk_pesatuan_transaksi
        FOREIGN KEY (noTransaksi) REFERENCES Transaksi (noTransaksi),
    CONSTRAINT fk_pesatuan_menu
        FOREIGN KEY (idMenu) REFERENCES Menu (idMenu),
    CONSTRAINT fk_pesatuan_varian
        FOREIGN KEY (idVarian) REFERENCES OpsiVarian (idVarian)
);

-- ------------------------------------------------------------
-- 8. Tabel PaketCombo
-- ------------------------------------------------------------
CREATE TABLE PaketCombo (
    idPaket        INT            NOT NULL AUTO_INCREMENT,
    namaPaket      VARCHAR(100)   NOT NULL,
    hargaPaketDasar DECIMAL(12, 2) NOT NULL,
    PRIMARY KEY (idPaket)
);

-- ------------------------------------------------------------
-- 9. Tabel KatalogIsiPaket
--    (Tabel komposit / junction: Menu apa saja yang ada di suatu Paket)
-- ------------------------------------------------------------
CREATE TABLE KatalogIsiPaket (
    idPaket INT NOT NULL,
    idMenu  INT NOT NULL,
    PRIMARY KEY (idPaket, idMenu),
    CONSTRAINT fk_katalog_paket
        FOREIGN KEY (idPaket) REFERENCES PaketCombo (idPaket),
    CONSTRAINT fk_katalog_menu
        FOREIGN KEY (idMenu) REFERENCES Menu (idMenu)
);

-- ------------------------------------------------------------
-- 10. Tabel PesananPaket
--     (Pesanan paket combo dalam satu transaksi)
-- ------------------------------------------------------------
CREATE TABLE PesananPaket (
    idPesananPaket INT            NOT NULL AUTO_INCREMENT,
    qty            INT            NOT NULL,
    hargaPaketJual DECIMAL(12, 2) NOT NULL,
    noTransaksi    VARCHAR(20)    NOT NULL,
    idPaket        INT            NOT NULL,
    PRIMARY KEY (idPesananPaket),
    CONSTRAINT fk_pespaket_transaksi
        FOREIGN KEY (noTransaksi) REFERENCES Transaksi (noTransaksi),
    CONSTRAINT fk_pespaket_paket
        FOREIGN KEY (idPaket) REFERENCES PaketCombo (idPaket)
);

-- ------------------------------------------------------------
-- 11. Tabel DetailPilihanDalamPaket
--     (Pilihan menu + varian spesifik yang dipilih dalam PesananPaket)
-- ------------------------------------------------------------
CREATE TABLE DetailPilihanDalamPaket (
    idDetailPilihan INT NOT NULL AUTO_INCREMENT,
    idPesananPaket  INT NOT NULL,
    idMenu          INT NOT NULL,
    idVarian        INT NULL,
    PRIMARY KEY (idDetailPilihan),
    CONSTRAINT fk_detail_pespaket
        FOREIGN KEY (idPesananPaket) REFERENCES PesananPaket (idPesananPaket),
    CONSTRAINT fk_detail_menu
        FOREIGN KEY (idMenu) REFERENCES Menu (idMenu),
    CONSTRAINT fk_detail_varian
        FOREIGN KEY (idVarian) REFERENCES OpsiVarian (idVarian)
);
