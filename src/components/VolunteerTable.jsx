import { useEffect, useState } from "react";

export default function VolunteerTable() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/volunteers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch volunteers");
        }

        const data = await response.json();

        setVolunteers(data);
      } catch (error) {
        console.error("Error fetching volunteers:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVolunteers();
  }, []);

  const statuses = [
    "active",
    "review",
    "pending",
    "inactive",
    "approved",
    "rejected",
  ];
  const statusColors = {
    active: "badge-success",
    review: "badge-info",
    pending: "badge-warning",
    inactive: "badge-neutral",
    approved: "badge-primary",
    rejected: "badge-error",
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/volunteers/${id}/status`,
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
      setVolunteers((prev) =>
        prev.map((volunteer) =>
          volunteer.id === id ? { ...volunteer, status: newStatus } : volunteer
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredVolunteers = filterStatus
    ? volunteers.filter((vol) => vol.status === filterStatus)
    : volunteers;

  const sortedVolunteers = [...filteredVolunteers].sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  if (loading)
    return (
      <p className="text-4xl text-success font-semibold text-center p-4 animate-pulse">
        Loading volunteers...
      </p>
    );
  if (error)
    return (
      <p className="text-4xl font-semibold text-center p-4 text-red-500">
        Error: {error}
      </p>
    );

  return (
    <div className=" p-4">
      <div className="flex justify-between mb-4">
        <select
          className="select select-bordered"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <select
          className="select select-bordered"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
        <button
          className="btn btn-outline"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          {sortOrder === "asc" ? "Sort Desc" : "Sort Asc"}
        </button>
      </div>
      <table className="overflow-x-auto table w-full border rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Availability</th>
            <th>Skills</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedVolunteers.map((volunteer) => (
            <tr key={volunteer.id} className="hover:bg-gray-100 border-b">
              <td className="p-2">{volunteer.name}</td>
              <td className="p-2">{volunteer.email}</td>
              <td className="p-2">{volunteer.phone}</td>
              <td className="p-2">{volunteer.availability}</td>
              <td className="p-2">{volunteer.skills}</td>
              <td className="p-2">
                <div className="dropdown dropdown-hover">
                  <div
                    tabIndex={0}
                    className={`badge ${
                      statusColors[volunteer.status]
                    } p-3 cursor-pointer`}
                  >
                    {volunteer.status}
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36 z-50"
                  >
                    {statuses.map((status) => (
                      <li key={status}>
                        <button
                          className="w-full text-left p-2 hover:bg-gray-200"
                          onClick={() => updateStatus(volunteer.id, status)}
                        >
                          {status}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
