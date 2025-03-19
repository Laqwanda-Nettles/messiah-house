import AdminNavbar from "@/components/AdminNavbar";
import ProgramsTable from "@/components/ProgramsTable";
import ProtectedRoute from "@/components/ProtectedRoute";
import Head from "next/head";

export default function AdminPrograms() {
  return (
    <ProtectedRoute>
      <Head>
        <title>MHCDC Portal | Programs</title>
        <meta
          name="description"
          content="Messiah House Community Development Corporation non-profit portal program signups."
          key="desc"
        />
      </Head>
      <div className="flex h-screen">
        <AdminNavbar />
        <div className="flex-1 overflow-y-auto">
          <ProgramsTable />
        </div>
      </div>
    </ProtectedRoute>
  );
}
