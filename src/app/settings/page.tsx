// ===========================================
// PRANAM - Settings Page
// User settings and preferences
// ===========================================

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your account preferences and privacy settings
        </p>
      </div>

      {/* Profile section */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <p className="font-medium text-gray-900">Name</p>
              <p className="text-sm text-gray-500">Demo Worker</p>
            </div>
            <button className="text-sm text-emerald-600 hover:text-emerald-700">
              Edit
            </button>
          </div>
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <p className="font-medium text-gray-900">Phone</p>
              <p className="text-sm text-gray-500">+91 98765 43210</p>
            </div>
            <button className="text-sm text-emerald-600 hover:text-emerald-700">
              Edit
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email</p>
              <p className="text-sm text-gray-500">demo@pranam.dev</p>
            </div>
            <button className="text-sm text-emerald-600 hover:text-emerald-700">
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Privacy section */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Privacy & Data</h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Active Consents</p>
              <p className="text-sm text-gray-500">Manage your Account Aggregator consents</p>
            </div>
            <button className="text-sm text-emerald-600 hover:text-emerald-700">
              Manage
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Data Export</p>
              <p className="text-sm text-gray-500">Download a copy of your data</p>
            </div>
            <button className="text-sm text-emerald-600 hover:text-emerald-700">
              Export
            </button>
          </div>
        </div>
      </div>

      {/* App info */}
      <div className="rounded-lg bg-gray-50 p-4 text-center">
        <p className="text-xs text-gray-500">
          Pranam v0.1.0 • Hackathon MVP • Mode: <span className="font-mono text-emerald-600">mock</span>
        </p>
      </div>
    </div>
  );
}
