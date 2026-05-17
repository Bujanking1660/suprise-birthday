import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { COLORS, CLEAN, FONTS } from '../theme';
import { playPop, playSparkle } from '../utils/sound';

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
        [{ text: 'Open', onPress: () => { playPop(); onUnlock(); } }]
      );
    } else {
      playPop();
      Alert.alert(
        'Oops',
        "That's not the right QR code. Keep looking!",
        [{ text: 'Try Again', onPress: () => setScanned(false) }]
      );
    }
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.msgText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <View style={styles.permCard}>
          <Text style={styles.permTitle}>Camera Access</Text>
          <Text style={styles.permText}>
            Please allow camera access to scan your birthday QR code.
          </Text>
          <TouchableOpacity
            style={[styles.permBtn, { backgroundColor: COLORS.primary }]}
            onPress={() => { playPop(); requestPermission(); }}
          >
            <Text style={[styles.permBtnText, { color: COLORS.white }]}>Allow</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.permBtn, { backgroundColor: COLORS.bg, marginTop: 12 }]}
            onPress={() => { playPop(); onClose(); }}
          >
            <Text style={[styles.permBtnText, { color: COLORS.text }]}>Cancel</Text>
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
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.scanTitle}>Scan QR Code</Text>
          <View style={{ width: 44 }} />
        </View>

        {/* Scanner Frame */}
        <View style={styles.scanArea}>
          <View style={styles.scanFrame}>
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />
          </View>
          <Text style={styles.scanHint}>
            Point camera at the secret QR code
          </Text>
        </View>
      </View>
    </View>
  );
}

const CORNER_SIZE = 40;
const CORNER_WIDTH = 2;

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
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
  },
  closeBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnText: {
    fontSize: 16,
    ...FONTS.heading,
    color: COLORS.white,
  },
  scanTitle: {
    fontSize: 18,
    ...FONTS.heading,
    color: COLORS.white,
    letterSpacing: 1,
  },
  scanArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderColor: COLORS.primary,
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
  scanHint: {
    marginTop: 30,
    fontSize: 15,
    ...FONTS.body,
    color: COLORS.white,
    textAlign: 'center',
    opacity: 0.9,
  },
  msgText: {
    fontSize: 16,
    ...FONTS.body,
    color: COLORS.white,
  },
  permCard: {
    ...CLEAN.card,
    padding: 30,
    margin: 24,
    alignItems: 'center',
  },
  permTitle: {
    fontSize: 20,
    ...FONTS.heading,
    marginBottom: 12,
  },
  permText: {
    fontSize: 15,
    ...FONTS.body,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  permBtn: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    width: '100%',
    alignItems: 'center',
    borderRadius: 24,
  },
  permBtnText: {
    fontSize: 16,
    ...FONTS.heading,
  },
});
