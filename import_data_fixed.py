import pandas as pd
import re
import os
import sys
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Import models dari app.py
try:
    from app import create_app, db
    from app import (
        DimTahun, DimBulan, DimLokasi, DimIndikatorKecelakaan, 
        DimJenisKendaraan, DimJenisTransportasi, DimJenisJalan, 
        DimRisiko, FaktaKecelakaan, FaktaTransportasiPenumpang, 
        FaktaJumlahKendaraan, FaktaInfrastruktur, FaktaRisiko
    )
except ImportError as e:
    logger.error(f"Error importing models: {e}")
    logger.error("Pastikan file app.py ada dan dapat diakses")
    sys.exit(1)

def init_app():
    """Inisialisasi aplikasi Flask dan database context."""
    try:
        app = create_app()
        app.app_context().push()
        logger.info("Aplikasi Flask berhasil diinisialisasi")
        return app
    except Exception as e:
        logger.error(f"Error inisialisasi aplikasi: {e}")
        sys.exit(1)

def check_files_exist():
    """Memeriksa apakah semua file Excel yang diperlukan ada."""
    required_files = [
        'fakta_kecelakaan.xlsx',
        'fakta_transportasi.xlsx', 
        'fakta_risiko.xlsx',
        'kendaraan_bermotor.xlsx',
        'panjang_jalan.xlsx'
    ]
    
    missing_files = []
    for file in required_files:
        if not os.path.exists(file):
            missing_files.append(file)
    
    if missing_files:
        logger.error(f"File berikut tidak ditemukan: {missing_files}")
        logger.error("Pastikan semua file Excel ada di direktori yang sama dengan script ini")
        return False
    
    logger.info("Semua file Excel ditemukan")
    return True

def populate_dimensions():
    """Mempersiapkan dan mengisi data untuk semua tabel dimensi."""
    logger.info("Mempersiapkan data untuk tabel dimensi...")
    
    initial_data = {
        DimBulan: [
            {'id_bulan': i, 'nama_bulan': b} 
            for i, b in enumerate([
                'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
            ], 1)
        ],
        
        DimTahun: [
            {'id_tahun': 1, 'tahun': 2020}, 
            {'id_tahun': 2, 'tahun': 2021}, 
            {'id_tahun': 3, 'tahun': 2022}, 
            {'id_tahun': 4, 'tahun': 2023}
        ],
        
        DimLokasi: [
            {'id_lokasi': 1, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Cilacap'},
            {'id_lokasi': 2, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Banyumas'},
            {'id_lokasi': 3, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Purbalingga'},
            {'id_lokasi': 4, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Banjarnegara'},
            {'id_lokasi': 5, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Kebumen'},
            {'id_lokasi': 6, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Purworejo'},
            {'id_lokasi': 7, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Wonosobo'},
            {'id_lokasi': 8, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Magelang'},
            {'id_lokasi': 9, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Boyolali'},
            {'id_lokasi': 10, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Klaten'},
            {'id_lokasi': 11, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Sukoharjo'},
            {'id_lokasi': 12, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Wonogiri'},
            {'id_lokasi': 13, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Karanganyar'},
            {'id_lokasi': 14, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Sragen'},
            {'id_lokasi': 15, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Grobogan'},
            {'id_lokasi': 16, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Blora'},
            {'id_lokasi': 17, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Rembang'},
            {'id_lokasi': 18, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Pati'},
            {'id_lokasi': 19, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Kudus'},
            {'id_lokasi': 20, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Jepara'},
            {'id_lokasi': 21, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Demak'},
            {'id_lokasi': 22, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Semarang'},
            {'id_lokasi': 23, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Temanggung'},
            {'id_lokasi': 24, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Kendal'},
            {'id_lokasi': 25, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Batang'},
            {'id_lokasi': 26, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Pekalongan'},
            {'id_lokasi': 27, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Pemalang'},
            {'id_lokasi': 28, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Tegal'},
            {'id_lokasi': 29, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Brebes'},
            {'id_lokasi': 30, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Kota Magelang'},
            {'id_lokasi': 31, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Kota Surakarta'},
            {'id_lokasi': 32, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Kota Salatiga'},
            {'id_lokasi': 33, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Kota Semarang'},
            {'id_lokasi': 34, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Kota Pekalongan'},
            {'id_lokasi': 35, 'nama_provinsi': 'Jawa Tengah', 'nama_kabupaten_kota': 'Kota Tegal'},
        ],
        
        DimIndikatorKecelakaan: [
            {'id_indikator': 1, 'nama_indikator': 'jumlah_kecelakaan', 'satuan': 'kasus'},
            {'id_indikator': 2, 'nama_indikator': 'meninggal_dunia', 'satuan': 'jiwa'},
            {'id_indikator': 3, 'nama_indikator': 'luka_berat', 'satuan': 'jiwa'},
            {'id_indikator': 4, 'nama_indikator': 'luka_ringan', 'satuan': 'jiwa'},
            {'id_indikator': 5, 'nama_indikator': 'kerugian_material', 'satuan': 'rupiah'}
        ],
        
        DimRisiko: [
            {'id_risiko': 1, 'nama_risiko': 'Jumlah Kecelakaan'},
            {'id_risiko': 2, 'nama_risiko': 'Total Panjang Jalan'},
            {'id_risiko': 3, 'nama_risiko': 'Rasio Kecelakaan per KM'}
        ],
        
        DimJenisKendaraan: [
            {'id_kendaraan': 1, 'jenis_kendaraan': 'Mobil Penumpang'},
            {'id_kendaraan': 2, 'jenis_kendaraan': 'Bus'},
            {'id_kendaraan': 3, 'jenis_kendaraan': 'Truk'},
            {'id_kendaraan': 4, 'jenis_kendaraan': 'Sepeda Motor'},
        ],
        
        DimJenisTransportasi: [
            {'id_transportasi': 1, 'jenis_transportasi': 'Angkutan Laut'},
            {'id_transportasi': 2, 'jenis_transportasi': 'Penerbangan Domestik'},
        ],
        
        DimJenisJalan: [
            {'id_jalan': 1, 'jenis_jalan': 'Nasional'},
            {'id_jalan': 2, 'jenis_jalan': 'Provinsi'},
            {'id_jalan': 3, 'jenis_jalan': 'Kabupaten/Kota'},
        ]
    }
    
    for model, data in initial_data.items():
        try:
            if model and hasattr(model, 'query') and model.query.count() == 0:
                logger.info(f"Mengisi data untuk {model.__tablename__}...")
                db.session.bulk_insert_mappings(model, data)
            else:
                logger.info(f"Data untuk {model.__tablename__} sudah ada, dilewati...")
        except Exception as e:
            logger.error(f"Error mengisi data untuk {model.__tablename__}: {e}")
            raise
    
    logger.info("Data dimensi siap dimasukkan.")

def create_mappers():
    """Membuat dictionary untuk mapping data mentah ke ID dimensi."""
    logger.info("Membuat mappers dari tabel dimensi...")
    
    try:
        tahun_map = {t.tahun: t.id_tahun for t in DimTahun.query.all()}
        kendaraan_map = {k.jenis_kendaraan: k.id_kendaraan for k in DimJenisKendaraan.query.all()}
        jalan_map = {j.jenis_jalan: j.id_jalan for j in DimJenisJalan.query.all()}
        
        logger.info("Mappers berhasil dibuat.")
        return {"tahun": tahun_map, "kendaraan": kendaraan_map, "jalan": jalan_map}
    except Exception as e:
        logger.error(f"Error membuat mappers: {e}")
        raise

def standardize_columns(df):
    """Fungsi untuk menstandarkan semua nama kolom dalam DataFrame."""
    df.columns = [str(col).strip().lower().replace(' ', '_').replace('/', '_') for col in df.columns]
    return df

def process_fakta_kecelakaan():
    """Memproses file fakta_kecelakaan.xlsx"""
    logger.info("Memproses fakta_kecelakaan.xlsx...")
    
    try:
        df = pd.read_excel('fakta_kecelakaan.xlsx')
        logger.info(f"Data shape: {df.shape}")
        logger.info(f"Columns: {list(df.columns)}")
        
        # Validasi kolom yang diperlukan
        required_columns = ['id_tahun', 'id_lokasi', 'id_indikator', 'jumlah']
        missing_columns = [col for col in required_columns if col not in df.columns]
        
        if missing_columns:
            logger.error(f"Kolom yang hilang: {missing_columns}")
            raise ValueError(f"File fakta_kecelakaan.xlsx harus memiliki kolom: {required_columns}")
        
        # Bersihkan data
        df = df.dropna(subset=required_columns)
        records = df.to_dict(orient='records')
        
        db.session.bulk_insert_mappings(FaktaKecelakaan, records)
        logger.info(f"-> {len(records)} baris data Fakta Kecelakaan dimasukkan.")
        
    except Exception as e:
        logger.error(f"Error memproses fakta_kecelakaan.xlsx: {e}")
        raise

def process_fakta_transportasi():
    """Memproses file fakta_transportasi.xlsx"""
    logger.info("Memproses fakta_transportasi.xlsx...")
    
    try:
        df = pd.read_excel('fakta_transportasi.xlsx')
        logger.info(f"Data shape: {df.shape}")
        logger.info(f"Columns: {list(df.columns)}")
        
        # Rename kolom jika diperlukan
        if 'id_jenis_transportasi' in df.columns:
            df.rename(columns={'id_jenis_transportasi': 'id_transportasi'}, inplace=True)
        if 'penumpang' in df.columns:
            df.rename(columns={'penumpang': 'jumlah_penumpang'}, inplace=True)
        
        # Validasi kolom yang diperlukan
        required_columns = ['id_tahun', 'id_bulan', 'id_transportasi', 'jumlah_penumpang']
        missing_columns = [col for col in required_columns if col not in df.columns]
        
        if missing_columns:
            logger.error(f"Kolom yang hilang: {missing_columns}")
            raise ValueError(f"File fakta_transportasi.xlsx harus memiliki kolom: {required_columns}")
        
        # Bersihkan data
        df = df.dropna(subset=required_columns)
        records = df.to_dict(orient='records')
        
        db.session.bulk_insert_mappings(FaktaTransportasiPenumpang, records)
        logger.info(f"-> {len(records)} baris data Fakta Penumpang dimasukkan.")
        
    except Exception as e:
        logger.error(f"Error memproses fakta_transportasi.xlsx: {e}")
        raise

def process_fakta_risiko():
    """Memproses file fakta_risiko.xlsx"""
    logger.info("Memproses fakta_risiko.xlsx...")
    
    try:
        df = pd.read_excel('fakta_risiko.xlsx')
        logger.info(f"Data shape: {df.shape}")
        logger.info(f"Columns: {list(df.columns)}")
        
        df = standardize_columns(df)
        
        # Cek apakah data sudah dalam format yang benar atau perlu di-melt
        if 'id_risiko' in df.columns:
            # Data sudah dalam format yang benar
            required_columns = ['id_tahun', 'id_lokasi', 'id_risiko', 'nilai']
            missing_columns = [col for col in required_columns if col not in df.columns]
            
            if missing_columns:
                logger.error(f"Kolom yang hilang: {missing_columns}")
                raise ValueError(f"File fakta_risiko.xlsx harus memiliki kolom: {required_columns}")
            
            records = df[required_columns].dropna().to_dict(orient='records')
        else:
            # Data perlu di-melt (format wide)
            df_melted = df.melt(
                id_vars=['id_tahun', 'id_lokasi'], 
                var_name='nama_risiko', 
                value_name='nilai'
            )
            
            risiko_map = {
                'jumlah_kecelakaan': 1, 
                'total_panjang_jalan': 2, 
                'rasio_kecelakaan_per_km': 3
            }
            
            df_melted['id_risiko'] = df_melted['nama_risiko'].map(risiko_map)
            records = df_melted[['id_tahun', 'id_lokasi', 'id_risiko', 'nilai']].dropna().to_dict(orient='records')
        
        db.session.bulk_insert_mappings(FaktaRisiko, records)
        logger.info(f"-> {len(records)} baris data Fakta Risiko dimasukkan.")
        
    except Exception as e:
        logger.error(f"Error memproses fakta_risiko.xlsx: {e}")
        raise

def process_jumlah_kendaraan(mappers):
    """Memproses file kendaraan_bermotor.xlsx"""
    logger.info("Memproses kendaraan_bermotor.xlsx...")
    
    try:
        df = pd.read_excel('kendaraan_bermotor.xlsx')
        logger.info(f"Data shape: {df.shape}")
        logger.info(f"Columns: {list(df.columns)}")
        
        df = standardize_columns(df)
        
        # Mapping tahun dan jenis kendaraan
        if 'tahun' in df.columns:
            df['id_tahun'] = df['tahun'].map(mappers['tahun'])
        if 'jenis_kendaraan' in df.columns:
            df['id_kendaraan'] = df['jenis_kendaraan'].map(mappers['kendaraan'])
        
        # Rename kolom jumlah
        if 'jumlah' in df.columns:
            df.rename(columns={'jumlah': 'jumlah_kendaraan'}, inplace=True)
        
        # Validasi kolom yang diperlukan
        required_columns = ['id_tahun', 'id_kendaraan', 'jumlah_kendaraan']
        missing_columns = [col for col in required_columns if col not in df.columns]
        
        if missing_columns:
            logger.error(f"Kolom yang hilang: {missing_columns}")
            logger.error(f"Available columns: {list(df.columns)}")
            raise ValueError(f"File kendaraan_bermotor.xlsx harus memiliki kolom: {required_columns}")
        
        # Bersihkan data
        records = df[required_columns].dropna().to_dict(orient='records')
        
        db.session.bulk_insert_mappings(FaktaJumlahKendaraan, records)
        logger.info(f"-> {len(records)} baris data Fakta Jumlah Kendaraan dimasukkan.")
        
    except Exception as e:
        logger.error(f"Error memproses kendaraan_bermotor.xlsx: {e}")
        raise

def process_panjang_jalan(mappers):
    """Memproses file panjang_jalan.xlsx"""
    logger.info("Memproses panjang_jalan.xlsx...")
    
    try:
        df = pd.read_excel('panjang_jalan.xlsx')
        logger.info(f"Data shape: {df.shape}")
        logger.info(f"Columns: {list(df.columns)}")
        
        df = standardize_columns(df)
        
        # Mapping tahun dan jenis jalan
        if 'tahun' in df.columns:
            df['id_tahun'] = df['tahun'].map(mappers['tahun'])
        if 'jenis_jalan' in df.columns:
            df['id_jalan'] = df['jenis_jalan'].map(mappers['jalan'])
        
        # Rename kolom panjang jalan
        if 'panjang_jalan_(km)' in df.columns:
            df.rename(columns={'panjang_jalan_(km)': 'panjang_jalan_km'}, inplace=True)
        elif 'panjang_jalan_km' not in df.columns:
            # Cari kolom yang mengandung 'panjang'
            panjang_cols = [col for col in df.columns if 'panjang' in col.lower()]
            if panjang_cols:
                df.rename(columns={panjang_cols[0]: 'panjang_jalan_km'}, inplace=True)
        
        # Validasi kolom yang diperlukan
        required_columns = ['id_tahun', 'id_jalan', 'panjang_jalan_km']
        missing_columns = [col for col in required_columns if col not in df.columns]
        
        if missing_columns:
            logger.error(f"Kolom yang hilang: {missing_columns}")
            logger.error(f"Available columns: {list(df.columns)}")
            raise ValueError(f"File panjang_jalan.xlsx harus memiliki kolom: {required_columns}")
        
        # Bersihkan data
        records = df[required_columns].dropna().to_dict(orient='records')
        
        db.session.bulk_insert_mappings(FaktaInfrastruktur, records)
        logger.info(f"-> {len(records)} baris data Fakta Infrastruktur dimasukkan.")
        
    except Exception as e:
        logger.error(f"Error memproses panjang_jalan.xlsx: {e}")
        raise

def clear_existing_data():
    """Menghapus semua data lama dari database."""
    logger.info("MENGHAPUS SEMUA DATA LAMA (FAKTA & DIMENSI)...")
    
    try:
        # Hapus data fakta terlebih dahulu (karena ada foreign key)
        db.session.query(FaktaKecelakaan).delete()
        db.session.query(FaktaTransportasiPenumpang).delete()
        db.session.query(FaktaJumlahKendaraan).delete()
        db.session.query(FaktaInfrastruktur).delete()
        db.session.query(FaktaRisiko).delete()
        
        # Hapus data dimensi
        db.session.query(DimBulan).delete()
        db.session.query(DimTahun).delete()
        db.session.query(DimLokasi).delete()
        db.session.query(DimIndikatorKecelakaan).delete()
        db.session.query(DimRisiko).delete()
        db.session.query(DimJenisKendaraan).delete()
        db.session.query(DimJenisTransportasi).delete()
        db.session.query(DimJenisJalan).delete()
        
        db.session.commit()
        logger.info("Semua data lama berhasil dihapus.")
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"Error menghapus data lama: {e}")
        raise

def main():
    """Fungsi utama untuk menjalankan proses import data."""
    try:
        # Inisialisasi aplikasi
        app = init_app()
        
        # Cek file Excel
        if not check_files_exist():
            return
        
        # Hapus data lama
        clear_existing_data()
        
        # Isi data dimensi
        populate_dimensions()
        db.session.commit()
        logger.info("Data dimensi baru telah disimpan permanen ke database.")
        
        # Buat mappers
        mappers = create_mappers()
        
        # Proses data fakta
        process_fakta_kecelakaan()
        process_fakta_transportasi()
        process_fakta_risiko()
        process_jumlah_kendaraan(mappers)
        process_panjang_jalan(mappers)
        
        # Commit semua perubahan
        db.session.commit()
        logger.info("\n✅ Semua data berhasil dimasukkan ke database!")
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"\n❌ Terjadi error: {e}")
        logger.error("Rollback dilakukan, tidak ada data yang disimpan.")
        raise

if __name__ == '__main__':
    main()