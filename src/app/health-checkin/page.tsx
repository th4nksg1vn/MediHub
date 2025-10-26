export default function HealthCheckinPage() {
  return (
    <div className="container dashboard">
      <div className="dashboard-content">
        <aside className="sidebar">
          <ul className="sidebar-menu">
            <li>Dashboard</li>
            <li className="active">Health Check-in</li>
            <li>Health History</li>
          </ul>
        </aside>
        <main className="main-content">
          <div className="dashboard-header">
            <h1>Daily Health Check-in</h1>
            <p>Record your daily health status and symptoms</p>
          </div>

          <form className="checkin-form">
            <div className="card">
              <label>Date</label>
              <input type="date" name="checkin_date" />
              <label>Temperature (°F)</label>
              <input type="number" step="0.1" name="temperature" />
            </div>

            <div className="card">
              <label>Symptoms</label>
              <textarea name="symptoms" rows={3} />
            </div>

            <div className="card actions">
              <button className="hh-btn hh-btn-secondary">Cancel</button>
              <button className="hh-btn hh-btn-primary" type="submit">
                Save Check-in
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
