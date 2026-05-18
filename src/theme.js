// Cute Pastel Purple Theme — inspired by playful kids/celebration UI
export const COLORS = {
  bg: '#F8F7FF',           // Off-white with a hint of lavender
  white: '#FFFFFF',
  text: '#2D2B55',         // Deep purple-navy for headings
  textSoft: '#7B7A9D',     // Muted purple for body/sub
  primary: '#A78BFA',      // Vibrant lavender purple (main CTA)
  primaryDark: '#7C3AED',  // Deeper purple for press states
  primaryLight: '#EDE9FE', // Ultra-light lavender for card bg
  secondary: '#C4B5FD',    // Soft violet
  accent1: '#FDE68A',      // Warm yellow accent (like trophy)
  accent2: '#FCA5A5',      // Soft coral/pink accent
  accent3: '#6EE7B7',      // Mint green accent
  cardBg: '#FFFFFF',
  purple1: '#EDE9FE',      // Card background lavender
  purple2: '#DDD6FE',      // Slightly deeper
  purple3: '#A78BFA',      // Primary purple
  pink: '#FBCFE8',         // Soft pink
  yellow: '#FEF3C7',       // Soft yellow
  mint: '#D1FAE5',         // Soft mint
  border: 'rgba(167, 139, 250, 0.15)',
  shadow: '#7C3AED',
};

export const CLEAN = {
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  pill: {
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
};

export const FONTS = {
  heading: {
    fontWeight: '800',
    letterSpacing: -0.3,
    color: COLORS.text,
  },
  subheading: {
    fontWeight: '700',
    color: COLORS.text,
  },
  body: {
    fontWeight: '400',
    color: COLORS.textSoft,
    lineHeight: 22,
  },
  small: {
    fontWeight: '500',
    fontSize: 12,
    color: COLORS.textSoft,
  },
  label: {
    fontWeight: '600',
    fontSize: 13,
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
};
