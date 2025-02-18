import { Theme, createTheme } from '@mui/material'

const white = '#fff'

export const theme: Theme = createTheme({
  shape: {
    borderRadius: 16,
  },
  // @ts-expect-error TODO: fix this error Target requires 25 element(s) but source may have fewer
  shadows: [
    'none',
    '0px 8px 48px -12px rgba(16, 24, 40, 0.15)',
    ...(Array(23).fill(
      '0px 8px 48px -12px rgba(16, 24, 40, 0.15)',
    ) as string[]),
  ],
  palette: {
    primary: {
      main: '#000000',
      light: '#3b3b3b',
      dark: '#000000',
      contrastText: white,
    },
    secondary: {
      main: '#0945EB',
      light: '#6971FF',
      dark: '#001EB7',
      contrastText: white,
    },
    error: {
      light: '#E57373',
      main: '#F44336',
      dark: '#D32F2F',
      contrastText: white,
    },
    warning: {
      main: '#FF9900',
      dark: '#F57C00',
      light: '#FFB74D',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    info: {
      light: '#64B5F6',
      main: '#2196F3',
      dark: '#1976D2',
      contrastText: white,
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    grey: {
      '50': '#F9FAFC',
      '100': '#F0F2F5',
      '200': '#E7E9EC',
      '300': '#D7D9DC',
      '400': '#B4B5B8',
      '500': '#949598',
      '600': '#6C6D70',
      '700': '#58595C',
      '800': '#3A3B3E',
      '900': '#1A1B1D',
      A100: '#d5d5d5',
      A200: '#aaaaaa',
      A400: '#303030',
      A700: '#616161',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: '#7F7F7F',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    background: {
      paper: white,
      default: '#F8F8F8',
    },
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.08)',
      hoverOpacity: 0.08,
      selected: 'rgba(0, 0, 0, 0.14)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
  },
})
