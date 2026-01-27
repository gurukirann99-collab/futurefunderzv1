import RoleLayout from "../components/RoleLayout";

export default function EntrepreneurLayout({ children }: any) {
  return (
    <RoleLayout allowedRole="entrepreneur">
      {children}
    </RoleLayout>
  );
}
