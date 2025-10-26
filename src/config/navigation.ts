export type Role = 'individual' | 'researcher' | 'institution' | 'admin';

export type NavItem = {
  id: string;
  href: string;
  label: string;
  section?: string;
};

const NAV: Record<Role, NavItem[]> = {
  individual: [
    { id: 'overview', href: '/dashboard', label: 'Home' },
    { id: 'records', href: '/records', label: 'My Health' },
    { id: 'analytics', href: '/analytics', label: 'Analytics' },
    { id: 'family', href: '/family', label: 'Family' },
    { id: 'privacy', href: '/privacy', label: 'Privacy' },
    { id: 'help', href: '/help', label: 'Help' },
    { id: 'settings', href: '/settings', label: 'Profile' },
  ],
  researcher: [
    { id: 'overview', href: '/dashboard', label: 'Home' },
    { id: 'datasets', href: '/datasets', label: 'Datasets' },
    { id: 'sql', href: '/sql', label: 'SQL Studio' },
    { id: 'projects', href: '/projects', label: 'Projects' },
    { id: 'docs', href: '/docs', label: 'Docs' },
    { id: 'analytics', href: '/analytics', label: 'Analytics' },
    { id: 'settings', href: '/settings', label: 'Settings' },
  ],
  institution: [
    { id: 'dashboard', href: '/dashboard', label: 'Dashboard' },
    { id: 'patients', href: '/patients', label: 'Patients' },
    { id: 'personnel', href: '/staff', label: 'Personnel' },
    { id: 'records', href: '/records', label: 'Records' },
    { id: 'reports', href: '/reports', label: 'Reports' },
    { id: 'sharing', href: '/sharing', label: 'Data Sharing' },
    { id: 'settings', href: '/settings', label: 'Settings' },
  ],
  admin: [
    { id: 'dashboard', href: '/dashboard', label: 'Dashboard' },
    { id: 'users', href: '/users', label: 'Users' },
    { id: 'organizations', href: '/organizations', label: 'Organizations' },
    { id: 'research', href: '/research', label: 'Research' },
    { id: 'logs', href: '/logs', label: 'Logs' },
    { id: 'settings', href: '/settings', label: 'System Settings' },
  ],
};

export function getNavForRole(role?: string) {
  if (!role) return NAV.individual;
  const r = role as Role;
  return NAV[r] || NAV.individual;
}
