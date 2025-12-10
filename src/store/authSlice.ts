import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { AuthState, LoginCredentials, User } from '../types'

// Register credentials interface
interface RegisterCredentials {
  name: string
  email: string
  password: string
}

// Extended auth state with registration success
interface ExtendedAuthState extends AuthState {
  registrationSuccess: boolean
}

// Storage key for registered users
const USERS_STORAGE_KEY = 'wealthtracker_users'

// Get registered users from localStorage
const getRegisteredUsers = (): { email: string; password: string; user: User }[] => {
  try {
    const users = localStorage.getItem(USERS_STORAGE_KEY)
    return users ? JSON.parse(users) : []
  } catch {
    return []
  }
}

// Save registered users to localStorage
const saveRegisteredUsers = (users: { email: string; password: string; user: User }[]) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

// Demo user data
const DEMO_USER: User = {
  id: '1',
  email: 'demo@wealthtracker.com',
  name: 'Demo İstifadəçi',
  avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=3b82f6&color=fff',
  createdAt: new Date().toISOString(),
}

const DEMO_PASSWORD = 'demo123'

// Async thunk for login
export const loginUser = createAsyncThunk<User, LoginCredentials, { rejectValue: string }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check demo credentials
    if (credentials.email === DEMO_USER.email && credentials.password === DEMO_PASSWORD) {
      return DEMO_USER
    }

    // Check registered users
    const registeredUsers = getRegisteredUsers()
    const foundUser = registeredUsers.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    )

    if (foundUser) {
      return foundUser.user
    }

    return rejectWithValue('Email və ya şifrə yanlışdır')
  }
)

// Async thunk for register (does NOT log in the user)
export const registerUser = createAsyncThunk<string, RegisterCredentials, { rejectValue: string }>(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if email already exists
    const registeredUsers = getRegisteredUsers()
    const emailExists = registeredUsers.some((u) => u.email === credentials.email)

    if (emailExists || credentials.email === DEMO_USER.email) {
      return rejectWithValue('Bu email artıq qeydiyyatdan keçib')
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: credentials.email,
      name: credentials.name,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(credentials.name)}&background=10b981&color=fff`,
      createdAt: new Date().toISOString(),
    }

    // Save to localStorage
    registeredUsers.push({
      email: credentials.email,
      password: credentials.password,
      user: newUser,
    })
    saveRegisteredUsers(registeredUsers)

    // Return success message (not user - we don't want to log in)
    return 'Qeydiyyat uğurla tamamlandı!'
  }
)

// Initial state
const initialState: ExtendedAuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  registrationSuccess: false,
}

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
    clearRegistrationSuccess: (state) => {
      state.registrationSuccess = false
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Giriş zamanı xəta baş verdi'
      })
      // Register (does NOT set isAuthenticated)
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.registrationSuccess = false
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false
        state.error = null
        state.registrationSuccess = true
        // NOT setting user or isAuthenticated - user must login after registration
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Qeydiyyat zamanı xəta baş verdi'
        state.registrationSuccess = false
      })
  },
})

export const { logout, clearError, clearRegistrationSuccess, setUser } = authSlice.actions
export default authSlice.reducer
