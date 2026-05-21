// Clean Pastel Purple Theme (Reference UI)
export const COLORS = {
  bg: '#F8F9FA',           // Very light gray/white background
  white: '#FFFFFF',
  text: '#1C1C1E',         // Almost black for headings
  textSoft: '#8E8E93',     // Gray for secondary text
  primary: '#E09EFF',      // Bright Pastel Purple
  primaryDark: '#C175E8',  // Darker purple for pressed state
  primaryLight: '#F3DFFF', // Very light purple
  secondary: '#E5EFF8',    // Light pastel blue for cards
  accent1: '#F9E0F8',      // Light pastel pink for cards
  accent2: '#FFF5D1',      // Light pastel yellow
  accent3: '#D1F8E3',      // Light pastel mint
  cardBg: '#FFFFFF',       // Default card bg
  purple1: '#E09EFF',      // Re-map for compatibility
  purple2: '#F3DFFF',
  purple3: '#C175E8',
  pink: '#F9E0F8',
  yellow: '#FFF5D1',
  mint: '#E5EFF8',         // Re-mapped mint to the light blue from the image
  border: '#1C1C1E',       // Black border used in the design
  shadow: 'rgba(0,0,0,0.05)', // Very soft shadow
};

export const CLEAN = {
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  pill: {
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 24,
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
