import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  Image,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { COLORS, CLEAN, FONTS } from '../theme';
import { playPop, playSparkle } from '../utils/sound';
import { ChevronLeft, Camera, ScanLine } from 'lucide-react-native';

const SECRET_KEY = 'I Love You';

export default function QRScannerScreen({ onUnlock, onClose }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  const handleBarcodeScanned = ({ data }) => {
    if (scanned) return;
    setScanned(true);

    if (data === SECRET_KEY) {
      playSparkle();
      Alert.alert(
        '✨ Beautiful!',
        'You have unlocked your special gallery. Happy Birthday, Rasya!',
        [{ text: 'Open Gallery 💜', onPress: () => { playPop(); onUnlock(); } }]
      );
    } else {
      playPop();
      Alert.alert(
        'Oops 🙊',
        "That's not the right QR code. Keep looking!",
        [{ text: 'Try Again', onPress: () => setScanned(false) }]
      );
    }
  };

  if (!permission) {
    return (
      <View style={[styles.container, { backgroundColor: COLORS.bg }]}>
        <Text style={styles.msgText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, { backgroundColor: COLORS.bg }]}>
        <View style={styles.permCard}>
          <View style={styles.permIconBg}>
            <Camera size={32} color={COLORS.primary} />
          </View>
          <Text style={styles.permTitle}>Camera Access</Text>
          <Text style={styles.permText}>
            Please allow camera access to scan your birthday QR code.
          </Text>
          <TouchableOpacity
            style={[styles.permBtn, { backgroundColor: COLORS.primary }]}
            onPress={() => { playPop(); requestPermission(); }}
          >
            <Text style={[styles.permBtnText, { color: COLORS.white }]}>Allow Access</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.permBtn, { backgroundColor: COLORS.purple1, marginTop: 12 }]}
            onPress={() => { playPop(); onClose(); }}
          >
            <Text style={[styles.permBtnText, { color: COLORS.primary }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      />

      {/* Overlay */}
      <View style={styles.overlay}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.closeBtn} onPress={() => { playPop(); onClose(); }}>
            <ChevronLeft size={22} color={COLORS.text} />
          </TouchableOpacity>
          <View style={styles.titlePill}>
            <ScanLine size={16} color={COLORS.white} style={{ marginRight: 6 }} />
            <Text style={styles.scanTitle}>Scan QR Code</Text>
          </View>
          <View style={{ width: 44 }} />
        </View>

        {/* Scanner Frame */}
        <View style={styles.scanArea}>
          <View style={styles.scanFrame}>
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />
            
            {/* Animated Scanning Line Effect (Mock) */}
            <View style={styles.scanLine} />
          </View>
          
          <View style={styles.hintPill}>
            <Text style={styles.scanHint}>
              Point camera at the secret QR code 🎁
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const CORNER_SIZE = 40;
const CORNER_WIDTH = 4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(45, 43, 85, 0.4)', // Dark purple tint
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 58 : 36,
    paddingHorizontal: 20,
  },
  closeBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  titlePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 50,
  },
  scanTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
  },
  scanArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 260,
    height: 260,
    position: 'relative',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
  },
  corner: {
    position: 'absolute',
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderColor: COLORS.primary, // Pastel purple corners
  },
  cornerTL: {
    top: 0, left: 0,
    borderTopWidth: CORNER_WIDTH, borderLeftWidth: CORNER_WIDTH,
    borderTopLeftRadius: 20,
  },
  cornerTR: {
    top: 0, right: 0,
    borderTopWidth: CORNER_WIDTH, borderRightWidth: CORNER_WIDTH,
    borderTopRightRadius: 20,
  },
  cornerBL: {
    bottom: 0, left: 0,
    borderBottomWidth: CORNER_WIDTH, borderLeftWidth: CORNER_WIDTH,
    borderBottomLeftRadius: 20,
  },
  cornerBR: {
    bottom: 0, right: 0,
    borderBottomWidth: CORNER_WIDTH, borderRightWidth: CORNER_WIDTH,
    borderBottomRightRadius: 20,
  },
  scanLine: {
    position: 'absolute',
    top: '50%',
    left: 20,
    right: 20,
    height: 2,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  hintPill: {
    marginTop: 40,
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 50,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  scanHint: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  msgText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  permCard: {
    backgroundColor: COLORS.white,
    borderRadius: 32,
    padding: 32,
    margin: 24,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
  },
  permIconBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.purple1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  permTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 12,
  },
  permText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textSoft,
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 22,
  },
  permBtn: {
    paddingVertical: 16,
    paddingHorizontal: 30,
    width: '100%',
    alignItems: 'center',
    borderRadius: 24,
  },
  permBtnText: {
    fontSize: 16,
    fontWeight: '800',
  },
});
