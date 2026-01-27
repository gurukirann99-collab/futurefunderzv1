import RoleLayout from "../components/RoleLayout";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleLayout allowedRole="student">
      {children}
    </RoleLayout>
  );
}
