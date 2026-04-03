import { useState } from 'react'
import { iconClass } from '../constants/icons'

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [dataSharing, setDataSharing] = useState(false)

  if (!isOpen) return null

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" />

      <div className="fixed right-8 top-20 z-50 w-96 rounded-2xl bg-white shadow-2xl max-h-[500px] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between border-b border-outline-variant/10 bg-white px-6 py-4">
          <h3 className="text-lg font-bold text-on-surface">Settings</h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-low"
          >
            <span className={iconClass}>close</span>
          </button>
        </div>

        <div className="space-y-6 px-6 py-6">
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-on-surface-variant">Notifications</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-on-surface">Email Notifications</p>
                  <p className="text-xs text-on-surface-variant">Get alerts via email</p>
                </div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`flex h-6 w-11 items-center rounded-full px-1 transition-colors ${emailNotifications ? 'bg-primary' : 'bg-surface-container-high'}`}
                >
                  <div
                    className={`h-4 w-4 rounded-full bg-white transition-transform ${emailNotifications ? 'translate-x-5' : 'translate-x-0'}`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-on-surface">Push Notifications</p>
                  <p className="text-xs text-on-surface-variant">Receive browser alerts</p>
                </div>
                <button
                  onClick={() => setPushNotifications(!pushNotifications)}
                  className={`flex h-6 w-11 items-center rounded-full px-1 transition-colors ${pushNotifications ? 'bg-primary' : 'bg-surface-container-high'}`}
                >
                  <div
                    className={`h-4 w-4 rounded-full bg-white transition-transform ${pushNotifications ? 'translate-x-5' : 'translate-x-0'}`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-outline-variant/10 pt-6">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-on-surface-variant">Privacy</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-on-surface">Share Analytics</p>
                  <p className="text-xs text-on-surface-variant">Help improve our app</p>
                </div>
                <button
                  onClick={() => setDataSharing(!dataSharing)}
                  className={`flex h-6 w-11 items-center rounded-full px-1 transition-colors ${dataSharing ? 'bg-primary' : 'bg-surface-container-high'}`}
                >
                  <div
                    className={`h-4 w-4 rounded-full bg-white transition-transform ${dataSharing ? 'translate-x-5' : 'translate-x-0'}`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-outline-variant/10 pt-6">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-on-surface-variant">App</h4>
            <div className="space-y-2">
              <button className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-on-surface hover:bg-surface-container-low">
                <span>App Version</span>
                <span className="text-xs font-medium text-on-surface-variant">v1.0.0</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-on-surface hover:bg-surface-container-low">
                <span>Check for Updates</span>
                <span className={iconClass + ' text-sm'}>sync</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-error hover:bg-red-50">
                <span>Clear Cache</span>
                <span className={iconClass + ' text-sm'}>delete</span>
              </button>
            </div>
          </div>

          <div className="border-t border-outline-variant/10 pt-6">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-on-surface-variant">Help</h4>
            <div className="space-y-2">
              <button className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-on-surface hover:bg-surface-container-low">
                <span>Documentation</span>
                <span className={iconClass + ' text-sm'}>open_in_new</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-on-surface hover:bg-surface-container-low">
                <span>Report Bug</span>
                <span className={iconClass + ' text-sm'}>bug_report</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-on-surface hover:bg-surface-container-low">
                <span>About</span>
                <span className={iconClass + ' text-sm'}>info</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
