// Romantic Clean Theme Constants
export const COLORS = {
  bg: '#FDF6EE',        // Soft cream
  text: '#1C1C1C',      // Sharp black
  primary: '#F4E491',   // Pastel yellow
  secondary: '#C2CFF5', // Pastel blue
  accent1: '#C1D6C9',   // Pastel mint
  accent2: '#EEB1A4',   // Pastel coral
  white: '#FFFFFF',
  border: 'rgba(28, 28, 28, 0.08)',
  rose: '#EEB1A4',
  gold: '#F4E491',
  olive: '#829667',     // Dark green
};

export const CLEAN = {
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 36, // Huge rounded corners like reference
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  border: {
    borderWidth: 1,
    borderColor: COLORS.border,
  },
};

export const FONTS = {
  heading: {
    fontWeight: '700',
    letterSpacing: -0.5,
    color: COLORS.text,
  },
  body: {
    fontWeight: '400',
    color: '#4A4A4A',
    lineHeight: 22,
  },
  small: {
    fontWeight: '400',
    fontSize: 12,
    color: '#707070',
  },
};
