import RoleLayout from "../components/RoleLayout";

export default function MentorLayout({ children }: any) {
  return (
    <RoleLayout allowedRole="mentor">
      {children}
    </RoleLayout>
  );
}
