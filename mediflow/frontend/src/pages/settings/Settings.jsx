import { useState } from 'react'
import { Bell, Building2, CircleUserRound, LockKeyhole, SlidersHorizontal } from 'lucide-react'
import Button from '../../components/common/Button.jsx'
import Card from '../../components/common/Card.jsx'
import PageHeader from '../../components/common/PageHeader.jsx'
import Toast from '../../components/common/Toast.jsx'

const settingsTabs = [
  { id: 'profile', label: 'Profile', icon: CircleUserRound },
  { id: 'clinic', label: 'Clinic information', icon: Building2 },
  { id: 'preferences', label: 'Preferences', icon: SlidersHorizontal },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: LockKeyhole },
]

function SettingsField({ label, value, type = 'text', placeholder }) {
  return <label className="settings-field"><span>{label}</span><input type={type} defaultValue={value} placeholder={placeholder} /></label>
}

function NotificationToggle({ title, description, defaultChecked = true }) {
  return <label className="notification-toggle"><span><strong>{title}</strong><small>{description}</small></span><input type="checkbox" defaultChecked={defaultChecked} /><i aria-hidden="true" /></label>
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [toast, setToast] = useState(null)
  const activeItem = settingsTabs.find((tab) => tab.id === activeTab)

  const handleSave = (event) => {
    event.preventDefault()
    setToast({ tone: 'success', message: 'Changes saved in this local preview only.' })
  }

  return (
    <div className="page-content">
      <PageHeader title="Settings" description="Manage your profile and clinic workspace preferences." />
      <div className="settings-layout">
        <Card className="settings-nav-card">
          <p className="settings-nav-label">WORKSPACE SETTINGS</p>
          <nav aria-label="Settings sections" role="tablist" className="settings-tabs">
            {settingsTabs.map(({ id, label, icon: Icon }) => <button key={id} id={`settings-tab-${id}`} type="button" role="tab" aria-selected={activeTab === id} aria-controls={`settings-panel-${id}`} className={`settings-tab ${activeTab === id ? 'is-selected' : ''}`} onClick={() => setActiveTab(id)}><Icon size={17} /><span>{label}</span></button>)}
          </nav>
        </Card>

        <Card className="settings-content-card" id={`settings-panel-${activeTab}`} role="tabpanel" aria-labelledby={`settings-tab-${activeTab}`}>
          <form onSubmit={handleSave}>
            <div className="settings-content-heading"><div><h2>{activeItem.label}</h2><p>Changes shown here are a local preview and are not saved to an account.</p></div><span className="settings-heading-icon"><activeItem.icon size={18} /></span></div>
            {activeTab === 'profile' && <>
              <div className="settings-profile-summary"><span className="mf-avatar settings-avatar">AM</span><span><strong>Alex Morgan</strong><small>Clinic administrator</small></span><Button variant="secondary" size="small" type="button">Change photo</Button></div>
              <div className="settings-fields-grid"><SettingsField label="First name" value="Alex" /><SettingsField label="Last name" value="Morgan" /><SettingsField label="Email address" type="email" value="alex.morgan@example.com" /><SettingsField label="Phone number" value="+1 (555) 010-2048" /></div>
            </>}
            {activeTab === 'clinic' && <div className="settings-fields-grid"><SettingsField label="Clinic name" value="Greenway Medical Center" /><SettingsField label="Phone number" value="+1 (555) 010-2200" /><SettingsField label="Email address" value="hello@greenway.example" /><SettingsField label="Website" placeholder="https://" /><label className="settings-field settings-field-wide"><span>Clinic address</span><textarea defaultValue="248 Willow Avenue, Portland, OR 97204" rows="3" /></label></div>}
            {activeTab === 'preferences' && <div className="settings-fields-grid"><label className="settings-field"><span>Language</span><select defaultValue="English (US)"><option>English (US)</option><option>English (UK)</option><option>Spanish</option></select></label><label className="settings-field"><span>Time zone</span><select defaultValue="Pacific Time (PT)"><option>Pacific Time (PT)</option><option>Mountain Time (MT)</option><option>Central Time (CT)</option><option>Eastern Time (ET)</option></select></label><label className="settings-field"><span>Date format</span><select defaultValue="MM/DD/YYYY"><option>MM/DD/YYYY</option><option>DD/MM/YYYY</option><option>YYYY-MM-DD</option></select></label><label className="settings-field"><span>Week starts on</span><select defaultValue="Monday"><option>Monday</option><option>Sunday</option></select></label></div>}
            {activeTab === 'notifications' && <div className="notification-list"><NotificationToggle title="Appointment reminders" description="Get notified about upcoming appointments." /><NotificationToggle title="New patient registrations" description="Receive an alert when a patient is added." /><NotificationToggle title="Billing updates" description="Stay informed about invoice activity." /><NotificationToggle title="Product announcements" description="Occasional updates about MediFlow." defaultChecked={false} /></div>}
            {activeTab === 'security' && <div className="security-panel"><span className="security-icon"><LockKeyhole size={19} /></span><div><h3>Account security</h3><p>Password changes and multi-factor authentication will be available when account services are connected.</p><Button variant="secondary" type="button" onClick={() => setToast({ tone: 'info', message: 'Account security controls are not connected yet.' })}>Review security options</Button></div></div>}
            <div className="settings-form-footer"><span /><Button type="submit">Save changes</Button></div>
          </form>
        </Card>
      </div>
      <Toast tone={toast?.tone} message={toast?.message} onClose={() => setToast(null)} />
    </div>
  )
}