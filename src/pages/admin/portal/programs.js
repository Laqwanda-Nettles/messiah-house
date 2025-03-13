import AdminNavbar from "@/components/AdminNavbar";
import ProgramsTable from "@/components/ProgramsTable";

export default function AdminPrograms() {
  return (
    <div className="flex h-screen">
      <AdminNavbar />
      <div className="flex-1 overflow-y-auto">
        <ProgramsTable />
      </div>
    </div>
  );
}
