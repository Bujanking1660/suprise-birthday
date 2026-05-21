import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { COLORS } from '../theme';
import { playPop, playSparkle } from '../utils/sound';
import { getResolution, saveResolution } from '../utils/storage';
import { Lock, Unlock, Sparkles } from 'lucide-react-native';

export default function TimeCapsuleModal({ visible, onClose }) {
  const [text, setText] = useState('');
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (visible) {
      loadData();
    }
  }, [visible]);

  const loadData = async () => {
    const saved = await getResolution();
    if (saved) {
      setText(saved);
      setIsLocked(true);
    } else {
      setText('');
      setIsLocked(false);
    }
  };

  const handleLock = async () => {
    if (!text.trim()) return;
    playSparkle();
    await saveResolution(text);
    setIsLocked(true);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.header}>
              <View style={styles.iconBg}>
                {isLocked ? <Lock size={24} color={COLORS.primary} /> : <Unlock size={24} color={COLORS.primary} />}
              </View>
              <Text style={styles.title}>Time Capsule 💊</Text>
            </View>

            <Text style={styles.prompt}>
              Apa harapan dan resolusimu di umur yang ke-20 ini, sayang? 💭
            </Text>

            <TextInput
              style={[styles.input, isLocked && styles.inputLocked]}
              multiline
              placeholder="Tulis dari hati..."
              placeholderTextColor={COLORS.textSoft}
              value={text}
              onChangeText={setText}
              editable={!isLocked}
            />

            {!isLocked ? (
              <TouchableOpacity style={styles.lockBtn} onPress={handleLock}>
                <Lock size={18} color={COLORS.white} />
                <Text style={styles.lockBtnText}>Kunci Kapsul</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.sealedBox}>
                <Sparkles size={20} color={COLORS.mint} />
                <Text style={styles.sealedText}>Kapsul ini sudah dikunci & rahasia aman! 💖</Text>
              </View>
            )}

            <TouchableOpacity style={styles.closeBtn} onPress={() => { playPop(); onClose(); }}>
              <Text style={styles.closeBtnText}>Tutup</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(45, 43, 85, 0.6)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 32,
    padding: 24,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.purple1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.text,
  },
  prompt: {
    fontSize: 15,
    color: COLORS.textSoft,
    fontWeight: '500',
    marginBottom: 20,
    lineHeight: 22,
  },
  input: {
    backgroundColor: COLORS.bg,
    borderRadius: 20,
    padding: 20,
    minHeight: 120,
    textAlignVertical: 'top',
    fontSize: 15,
    color: COLORS.text,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.purple1,
  },
  inputLocked: {
    backgroundColor: COLORS.purple1,
    opacity: 0.8,
  },
  lockBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 50,
    marginBottom: 12,
  },
  lockBtnText: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 16,
    marginLeft: 8,
  },
  sealedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.mint,
    paddingVertical: 16,
    borderRadius: 50,
    marginBottom: 12,
  },
  sealedText: {
    color: '#065F46',
    fontWeight: '800',
    fontSize: 14,
    marginLeft: 8,
  },
  closeBtn: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  closeBtnText: {
    color: COLORS.textSoft,
    fontWeight: '700',
    fontSize: 15,
  }
});
