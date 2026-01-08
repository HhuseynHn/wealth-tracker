import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { SettingsState, AppSettings, UserProfile, Theme, Currency, DateFormat, NumberFormat } from '../types/settings'
import { DEFAULT_SETTINGS } from '../types/settings'

// Load settings from localStorage
const loadSettings = (): AppSettings => {
  try {
    const stored = localStorage.getItem('wt_settings')
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) }
    }
  } catch (error) {
    console.error('Failed to load settings:', error)
  }
  return DEFAULT_SETTINGS
}

// Load profile from localStorage
const loadProfile = (): UserProfile | null => {
  try {
    const stored = localStorage.getItem('wt_profile')
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to load profile:', error)
  }
  return null
}

// Save settings to localStorage
const saveSettings = (settings: AppSettings) => {
  try {
    localStorage.setItem('wt_settings', JSON.stringify(settings))
  } catch (error) {
    console.error('Failed to save settings:', error)
  }
}

// Save profile to localStorage
const saveProfile = (profile: UserProfile | null) => {
  try {
    if (profile) {
      localStorage.setItem('wt_profile', JSON.stringify(profile))
    } else {
      localStorage.removeItem('wt_profile')
    }
  } catch (error) {
    console.error('Failed to save profile:', error)
  }
}

const initialState: SettingsState = {
  profile: loadProfile(),
  settings: loadSettings(),
  isLoading: false,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload }
        saveProfile(state.profile)
      }
    },
    
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload
      saveProfile(state.profile)
    },
    
    clearProfile: (state) => {
      state.profile = null
      saveProfile(null)
    },
    
    updateSettings: (state, action: PayloadAction<Partial<AppSettings>>) => {
      state.settings = { ...state.settings, ...action.payload }
      saveSettings(state.settings)
    },
    
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.settings.theme = action.payload
      saveSettings(state.settings)
    },
    
    setLanguage: (state, action: PayloadAction<string>) => {
      state.settings.language = action.payload
      saveSettings(state.settings)
    },
    
    setCurrency: (state, action: PayloadAction<Currency>) => {
      state.settings.currency = action.payload
      saveSettings(state.settings)
    },
    
    setDateFormat: (state, action: PayloadAction<DateFormat>) => {
      state.settings.dateFormat = action.payload
      saveSettings(state.settings)
    },
    
    setNumberFormat: (state, action: PayloadAction<NumberFormat>) => {
      state.settings.numberFormat = action.payload
      saveSettings(state.settings)
    },
    
    updateNotificationSettings: (state, action: PayloadAction<Partial<AppSettings['notifications']>>) => {
      state.settings.notifications = { ...state.settings.notifications, ...action.payload }
      saveSettings(state.settings)
    },
    
    resetSettings: (state) => {
      state.settings = DEFAULT_SETTINGS
      saveSettings(state.settings)
    },
    
  },
})

export const {
  updateProfile,
  setProfile,
  clearProfile,
  updateSettings,
  setTheme,
  setLanguage,
  setCurrency,
  setDateFormat,
  setNumberFormat,
  updateNotificationSettings,
  resetSettings,
} = settingsSlice.actions

export default settingsSlice.reducer












