import RoleLayout from "../components/RoleLayout";

export default function PartnerLayout({ children }: any) {
  return (
    <RoleLayout allowedRole="partner">
      {children}
    </RoleLayout>
  );
}
