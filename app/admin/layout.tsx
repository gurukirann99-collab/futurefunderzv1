import RoleLayout from "../components/RoleLayout";

export default function AdminLayout({ children }: any) {
  return (
    <RoleLayout allowedRole="admin">
      {children}
    </RoleLayout>
  );
}
