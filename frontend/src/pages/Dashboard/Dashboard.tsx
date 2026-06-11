import { useNavigate } from "react-router-dom";
import UserNavbar from "../../components/Navbar/UserNavbar";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="app-page">
      <UserNavbar />

      <main className="container py-4 py-md-5">
        <div className="mb-4">
          <h1 className="h3 mb-1">Dashboard</h1>
          <p className="text-muted mb-0">
            Start a new whiteboard or join an existing session.
          </p>
        </div>

        <div className="card border shadow-sm">
          <div className="card-header bg-white">
            <h2 className="h5 mb-0">Session Management</h2>
          </div>

          <div className="card-body p-4">
            <div className="row g-4">
              <section className="col-12 col-lg-6">
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 mb-2">Create Session</h3>
                  <p className="text-muted small mb-3">
                    Open a clean board for a new collaboration.
                  </p>

                  <button
                    className="btn btn-success"
                    onClick={() => navigate("/board/demo-session")}
                  >
                    Create Session
                  </button>
                </div>
              </section>

              <section className="col-12 col-lg-6">
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 mb-2">Join Session</h3>
                  <p className="text-muted small mb-3">
                    Continue working in an existing whiteboard room.
                  </p>

                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/board/demo-session")}
                  >
                    Join Session
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
