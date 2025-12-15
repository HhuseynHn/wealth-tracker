import { useState, useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
// // **import { UpgradeBanner } from '../subscription'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { clearOldNotifications } from '../../store/notificationSlice'
import { checkSubscriptionStatus, loadUserSubscription } from '../../store/subscriptionSlice'
// **import { addDemoNotifications } from '../../utils/demoNotifications'

const MainLayout = () => {
  const dispatch = useAppDispatch()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAppSelector((state) => state.auth)
  const hasAddedNotifications = useRef(false)

  useEffect(() => {
    // Clear old notifications and check subscription status on mount
    dispatch(clearOldNotifications())
    
    // Load user-specific subscription
    if (user) {
      dispatch(loadUserSubscription(user.id))
      dispatch(checkSubscriptionStatus(user.id))
    } else {
      dispatch(loadUserSubscription(null))
    }
    
    // Add demo notifications only once when user logs in
    if (user && !hasAddedNotifications.current) {
      // Check if there are no notifications yet
      const existingNotifications = localStorage.getItem('wt_notifications')
      if (!existingNotifications || JSON.parse(existingNotifications).length === 0) {
        // Add demo notifications after a short delay
        setTimeout(() => {
          // ** addDemoNotifications()
        }, 1000)
      }
      hasAddedNotifications.current = true
    }
  }, [dispatch, user])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Floating Upgrade Banner */}
      
      {
       // ** <UpgradeBanner variant="floating" /> 

      }
    </div>
  )
}

export default MainLayout
