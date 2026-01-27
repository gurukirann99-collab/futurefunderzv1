import RoleLayout from "../components/RoleLayout";

export default function ParentLayout({ children }: any) {
  return (
    <RoleLayout allowedRole="parent">
      {children}
    </RoleLayout>
  );
}
