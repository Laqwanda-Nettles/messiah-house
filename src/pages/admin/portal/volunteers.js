import AdminNavbar from "@/components/AdminNavbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import VolunteerTable from "@/components/VolunteerTable";
import Head from "next/head";

export default function AdminVolunteers() {
  return (
    <ProtectedRoute>
      <Head>
        <title>MHCDC Portal | Volunteers</title>
        <meta
          name="description"
          content="Messiah House Community Development Corporation non-profit portal volunteer signups."
          key="desc"
        />
      </Head>
      <div className="flex h-screen">
        <AdminNavbar />
        <div className="flex-1 overflow-y-auto">
          <VolunteerTable />
        </div>
      </div>
    </ProtectedRoute>
  );
}
