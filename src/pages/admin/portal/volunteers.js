import AdminNavbar from "@/components/AdminNavbar";
import VolunteerTable from "@/components/VolunteerTable";

export default function AdminVolunteers() {
  return (
    <div className="flex h-screen">
      <AdminNavbar />
      <div className="flex-1 overflow-y-auto">
        <VolunteerTable />
      </div>
    </div>
  );
}
