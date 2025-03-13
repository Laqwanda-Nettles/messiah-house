import { useEffect, useState } from "react";

const statusColors = {
  Pending: "badge-outline badge-warning",
  Approved: "badge-outline badge-success",
  Rejected: "badge-outline badge-error",
  Completed: "badge-outline badge-primary",
  Waitlisted: "badge-outline badge-info",
  Withdrawn: "badge-outline badge-secondary",
};

export default function ProgramsTable() {
  const [signups, setSignups] = useState([]);
  const [filteredSignups, setFilteredSignups] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [programFilter, setProgramFilter] = useState("");

  useEffect(() => {
    const fetchSignups = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/programs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch signups");
        const data = await response.json();
        setSignups(data);
        setFilteredSignups(data);
      } catch (error) {
        console.error("Error fetching signups:", error);
      }
    };
    fetchSignups();
  }, []);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch("/api/services");
        if (!response.ok) throw new Error("Failed to fetch programs");
        const data = await response.json();
        const allPrograms = data.services.flatMap(
          (service) => service.programs
        );
        setPrograms(allPrograms);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };
    fetchPrograms();
  }, []);

  useEffect(() => {
    let filtered = signups;
    if (statusFilter) {
      filtered = filtered.filter((signup) => signup.status === statusFilter);
    }
    if (programFilter) {
      filtered = filtered.filter((signup) => signup.program === programFilter);
    }
    setFilteredSignups(filtered);
  }, [statusFilter, programFilter, signups]);

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/programs/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) throw new Error("Failed to update status");
      setSignups((prevSignups) =>
        prevSignups.map((signup) =>
          signup.id === id ? { ...signup, status: newStatus } : signup
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-4">Programs Signups</h2>

      <div className="flex gap-4 mb-4">
        <select
          className="select select-bordered w-full"
          value={programFilter}
          onChange={(e) => setProgramFilter(e.target.value)}
        >
          <option value="">All Programs</option>
          {programs.map((program, index) => (
            <option key={index} value={program}>
              {program}
            </option>
          ))}
        </select>
        <select
          className="select select-bordered w-full"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          {Object.keys(statusColors).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Program</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSignups.map((signup) => (
              <tr key={signup.id}>
                <td>{signup.name}</td>
                <td>{signup.email}</td>
                <td>{signup.program}</td>
                <td>
                  <span className={`badge ${statusColors[signup.status]}`}>
                    {signup.status}
                  </span>
                </td>
                <td>
                  <select
                    className="select select-sm"
                    value={signup.status}
                    onChange={(e) => updateStatus(signup.id, e.target.value)}
                  >
                    {Object.keys(statusColors).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
