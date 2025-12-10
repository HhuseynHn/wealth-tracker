import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SubscriptionState, PlanType, ProFeatures, FREE_FEATURES, PRO_FEATURES, ENTERPRISE_FEATURES } from '../types/subscription'

// Get features by plan
const getFeaturesByPlan = (plan: PlanType): ProFeatures => {
  switch (plan) {
    case 'pro':
      return PRO_FEATURES
    case 'enterprise':
      return ENTERPRISE_FEATURES
    default:
      return FREE_FEATURES
  }
}

// Load subscription from localStorage (user-specific)
const loadSubscription = (userId: string | null): Partial<SubscriptionState> => {
  if (!userId) {
    return {}
  }
  try {
    const stored = localStorage.getItem(`wt_subscription_${userId}`)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to load subscription:', error)
  }
  return {}
}

// Save subscription to localStorage (user-specific)
const saveSubscription = (state: SubscriptionState, userId: string | null) => {
  if (!userId) return
  try {
    localStorage.setItem(`wt_subscription_${userId}`, JSON.stringify({
      currentPlan: state.currentPlan,
      trialEndsAt: state.trialEndsAt,
      subscribedAt: state.subscribedAt,
      expiresAt: state.expiresAt,
    }))
  } catch (error) {
    console.error('Failed to save subscription:', error)
  }
}

// Initial state - always free for new users
const initialState: SubscriptionState = {
  currentPlan: 'free',
  features: FREE_FEATURES,
  trialEndsAt: null,
  subscribedAt: null,
  expiresAt: null,
}

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    // Load subscription for a specific user
    loadUserSubscription: (state, action: PayloadAction<string | null>) => {
      const userId = action.payload
      const stored = loadSubscription(userId)
      state.currentPlan = stored.currentPlan || 'free'
      state.features = getFeaturesByPlan(stored.currentPlan || 'free')
      state.trialEndsAt = stored.trialEndsAt || null
      state.subscribedAt = stored.subscribedAt || null
      state.expiresAt = stored.expiresAt || null
    },
    
    upgradePlan: (state, action: PayloadAction<{ plan: PlanType; userId: string | null }>) => {
      state.currentPlan = action.payload.plan
      state.features = getFeaturesByPlan(action.payload.plan)
      state.subscribedAt = new Date().toISOString()
      
      // Set expiry to 30 days from now
      const expiryDate = new Date()
      expiryDate.setDate(expiryDate.getDate() + 30)
      state.expiresAt = expiryDate.toISOString()
      
      state.trialEndsAt = null
      saveSubscription(state, action.payload.userId)
    },
    
    startTrial: (state, action: PayloadAction<string | null>) => {
      state.currentPlan = 'pro'
      state.features = PRO_FEATURES
      
      // Set trial to 14 days
      const trialEnd = new Date()
      trialEnd.setDate(trialEnd.getDate() + 14)
      state.trialEndsAt = trialEnd.toISOString()
      
      saveSubscription(state, action.payload)
    },
    
    cancelSubscription: (state, action: PayloadAction<string | null>) => {
      state.currentPlan = 'free'
      state.features = FREE_FEATURES
      state.trialEndsAt = null
      state.subscribedAt = null
      state.expiresAt = null
      saveSubscription(state, action.payload)
    },
    
    checkSubscriptionStatus: (state, action: PayloadAction<string | null>) => {
      // Check if trial or subscription has expired
      const now = new Date()
      
      if (state.trialEndsAt && new Date(state.trialEndsAt) < now) {
        state.currentPlan = 'free'
        state.features = FREE_FEATURES
        state.trialEndsAt = null
        saveSubscription(state, action.payload)
      }
      
      if (state.expiresAt && new Date(state.expiresAt) < now) {
        state.currentPlan = 'free'
        state.features = FREE_FEATURES
        state.expiresAt = null
        state.subscribedAt = null
        saveSubscription(state, action.payload)
      }
    },
    
    // Renew subscription
    renewSubscription: (state, action: PayloadAction<{ plan: PlanType; userId: string | null }>) => {
      state.currentPlan = action.payload.plan
      state.features = getFeaturesByPlan(action.payload.plan)
      state.subscribedAt = new Date().toISOString()
      
      // Set expiry to 30 days from now
      const expiryDate = new Date()
      expiryDate.setDate(expiryDate.getDate() + 30)
      state.expiresAt = expiryDate.toISOString()
      
      state.trialEndsAt = null
      saveSubscription(state, action.payload.userId)
    },
  },
})

export const {
  loadUserSubscription,
  upgradePlan,
  startTrial,
  cancelSubscription,
  checkSubscriptionStatus,
  renewSubscription,
} = subscriptionSlice.actions

export default subscriptionSlice.reducer

// Selectors
export const selectIsProUser = (state: { subscription: SubscriptionState }) =>
  state.subscription.currentPlan !== 'free'

export const selectCanUseFeature = (
  state: { subscription: SubscriptionState },
  feature: keyof ProFeatures
) => state.subscription.features[feature]



