import { scrollbarBorderSize, scrollbarSize } from '../constants';

export function scrollbar(
  foregroundColor = 'var(--textColor)',
  backgroundColor = 'var(--bg)',
) {
  return {
    // For Chrome & Safari
    '&::-webkit-scrollbar': {
      width: scrollbarSize,
      height: scrollbarSize,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: `calc(${scrollbarSize} * 0.5)`,
      border: `${scrollbarBorderSize} solid ${backgroundColor}`,
      backgroundColor: foregroundColor,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: backgroundColor,
    },

    // Standard version
    scrollbarColor: `${foregroundColor} ${backgroundColor}`,
  };
}

export function scrollbarOnHover(
  foregroundColor = 'var(--textColor)',
  backgroundColor = 'var(--bg)',
) {
  return {
    ...scrollbar(backgroundColor, backgroundColor),

    '&:hover': {
      // For Chrome & Safari
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: foregroundColor,
      },

      // Standard version
      scrollbarColor: `${foregroundColor} ${backgroundColor}`,
    },
  };
}
