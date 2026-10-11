import { notFound } from "next/navigation";

// Deprecated admin route: moved to /panel/admin/config for enhanced security
export default function DeprecatedAdminPage() {
  notFound();
}
