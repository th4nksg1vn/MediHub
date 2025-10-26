import HealthTrendsChart from "../components/HealthTrendsChart";
import AIChat from "../components/AIChat";
import Notifications from "../components/Notifications";

export default function DashboardPage() {
  const sampleData = [
    { x: "Day 1", y: 120 },
    { x: "Day 2", y: 125 },
    { x: "Day 3", y: 130 },
    { x: "Day 4", y: 128 },
    { x: "Day 5", y: 135 },
  ];

  const notifications = [
    { id: "n1", message: "Possible elevated BP trend detected" },
  ];

  return (
    <div className="container dashboard">
      <div className="dashboard-content">
        <aside className="sidebar">
          <ul className="sidebar-menu">
            <li className="active">Overview</li>
            <li>Check-in</li>
            <li>History</li>
            <li>Family</li>
            <li>Recommendations</li>
          </ul>
        </aside>

        <main className="main-content">
          <div className="dashboard-header">
            <h1>Patient Dashboard</h1>
            <p>Summary of recent vitals and AI insights</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">72</div>
              <div className="stat-label">Heart Rate</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">128/82</div>
              <div className="stat-label">Blood Pressure</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">36.7°C</div>
              <div className="stat-label">Temperature</div>
            </div>
          </div>

          <section style={{ marginTop: "1rem" }}>
            <h2>Health Trends</h2>
            <HealthTrendsChart data={sampleData} />
          </section>

          <section style={{ marginTop: "1rem" }}>
            <h2>AI Assistant</h2>
            <AIChat />
          </section>
        </main>
      </div>

      <Notifications items={notifications} />
    </div>
  );
}
