import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { COLORS, CLEAN } from '../theme';
import { playPop, playSparkle } from '../utils/sound';
import { ChevronLeft, Download } from 'lucide-react-native';

const WALLPAPERS = [
  {
    id: 'wp_1',
    name: 'Cute Couple Vector',
    source: require('../../assets/maskot3.png'), // Using mascot 3
  },
  {
    id: 'wp_2',
    name: 'Pastel Lavender Dream',
    source: require('../../assets/maskot4.png'),
  },
];

export default function LoveShopScreen({ onBack }) {

  const handleDownload = async (item) => {
    playPop();
    try {
      // 1. Request gallery permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Oops 🙊', 'Maaf, butuh izin akses galeri buat nyimpen wallpaper-nya!');
        return;
      }

      // 2. Load bundled asset and ensure it's downloaded locally
      const asset = Asset.fromModule(item.source);
      await asset.downloadAsync(); // ensure cached locally

      let localUri = asset.localUri;

      // 3. If still remote, download manually to app's document directory
      if (!localUri || localUri.startsWith('http')) {
        const dest = FileSystem.documentDirectory + `${item.id}.png`;
        const { uri } = await FileSystem.downloadAsync(asset.uri, dest);
        localUri = uri;
      }

      // 4. Save to media library as a new asset
      const mediaAsset = await MediaLibrary.createAssetAsync(localUri);
      // Try to add to a dedicated album; if the album doesn't exist, create it
      const albumName = 'RasyaWallpapers';
      const album = await MediaLibrary.getAlbumAsync(albumName);
      if (album) {
        await MediaLibrary.addAssetsToAlbumAsync([mediaAsset], album.id, false);
      } else {
        await MediaLibrary.createAlbumAsync(albumName, mediaAsset, false);
      }

      Alert.alert(
        'Berhasil 💖',
        'Wallpaper berhasil disimpan ke Galeri HP kamu!'
      );
    } catch (error) {
      console.error('Save to gallery error:', error);
      Alert.alert('Error', `Gagal menyimpan wallpaper: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* ─── Header ─── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => { playPop(); onBack(); }}>
          <ChevronLeft size={22} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Love Shop 🛍️</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.shopSub}>Pilih Wallpaper eksklusif yang kamu suka!</Text>

        <View style={styles.grid}>
          {WALLPAPERS.map((wp) => {
            return (
              <View key={wp.id} style={styles.card}>
                <View style={styles.imageContainer}>
                  <Image 
                    source={wp.source} 
                    style={styles.image} 
                    resizeMode="cover"
                  />
                </View>
                
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{wp.name}</Text>
                  
                  <TouchableOpacity style={styles.actionBtnUnlocked} onPress={() => handleDownload(wp)}>
                    <Download size={18} color={COLORS.white} />
                    <Text style={styles.actionBtnTextUnlocked}>Simpan ke Galeri</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    paddingTop: Platform.OS === 'ios' ? 58 : 36,
    paddingBottom: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.white,
    borderWidth: 1.5, borderColor: COLORS.border,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10 },
  shopSub: { fontSize: 15, color: COLORS.textSoft, textAlign: 'center', marginBottom: 24, fontWeight: '500' },
  grid: { gap: 20 },
  card: {
    backgroundColor: COLORS.white, borderRadius: 32, overflow: 'hidden',
    borderWidth: 1.5, borderColor: COLORS.border,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 12, elevation: 4,
  },
  imageContainer: { width: '100%', height: 200, backgroundColor: COLORS.purple1, position: 'relative' },
  image: { width: '100%', height: '100%' },
  cardInfo: { padding: 20 },
  cardTitle: { fontSize: 17, fontWeight: '800', color: COLORS.text, marginBottom: 16 },
  actionBtnUnlocked: {
    flexDirection: 'row', backgroundColor: COLORS.mint,
    paddingVertical: 14, borderRadius: 50, justifyContent: 'center', alignItems: 'center',
    borderWidth: 1.5, borderColor: COLORS.border,
  },
  actionBtnTextUnlocked: { color: '#065F46', fontWeight: '800', fontSize: 15, marginLeft: 8 },
});
