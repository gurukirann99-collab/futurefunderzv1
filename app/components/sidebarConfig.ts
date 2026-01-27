export const sidebarConfig: Record<
  string,
  {
    main: {
      label: string;
      href: string;
      icon: string;
    }[];
    secondary?: {
      label: string;
      href: string;
    }[];
  }
> = {
  student: {
    main: [
      { label: "Dashboard", href: "/dashboard", icon: "🏠" },
      { label: "Career", href: "/career", icon: "🧭" },
      { label: "Learning", href: "/student/learning", icon: "📘" },
      { label: "Work", href: "/student/work", icon: "💼" },
      { label: "Admissions", href: "/student/admissions", icon: "🎓" },
    ],
    secondary: [
      { label: "My Journey", href: "/dashboard/journey" },
      { label: "Profile", href: "/profile" },
    ],
  },

  parent: {
    main: [
      { label: "Dashboard", href: "/dashboard", icon: "🏠" },
      { label: "Child Career", href: "/parent/career", icon: "🧭" },
      { label: "Admissions", href: "/parent/admissions", icon: "🎓" },
      { label: "Colleges", href: "/parent/colleges", icon: "🏫" },
    ],
    secondary: [{ label: "Profile", href: "/profile" }],
  },

  partner: {
    main: [
      { label: "Dashboard", href: "/partner/dashboard", icon: "🏠" },
      { label: "Admissions", href: "/partner/admissions", icon: "🎓" },
      { label: "Courses", href: "/partner/courses", icon: "📘" },
      { label: "Jobs & Internships", href: "/partner/jobs", icon: "💼" },
      { label: "Scholarships", href: "/partner/scholarships", icon: "🎁" },
      { label: "Loans", href: "/partner/loans", icon: "🏦" },
      { label: "Analytics", href: "/partner/analytics", icon: "📊" },
    ],
    secondary: [
      { label: "Organization Profile", href: "/partner/profile" },
      { label: "Team & Users", href: "/partner/team" },
    ],
  },

  admin: {
    main: [
      { label: "Admin Dashboard", href: "/admin", icon: "🛡️" },
      { label: "Users", href: "/admin/users", icon: "👥" },
      { label: "Partners", href: "/admin/partners", icon: "🤝" },
      { label: "Admissions", href: "/admin/admissions", icon: "🎓" },
      { label: "Payments", href: "/admin/payments", icon: "💳" },
      { label: "Analytics", href: "/admin/analytics", icon: "📊" },
    ],
  },
};
