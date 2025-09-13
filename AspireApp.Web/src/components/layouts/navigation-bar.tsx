import { useLocation } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Helper function to get page title from route path
function getPageTitle(pathname: string): string {
  const pathSegments = pathname.split('/').filter(Boolean);
  
  if (pathSegments.length === 0) {
    return "Home";
  }
  
  const lastSegment = pathSegments[pathSegments.length - 1];
  
  // Capitalize first letter and handle special cases
  switch (lastSegment) {
    case "customers":
      return "Customers";
    case "employees":
      return "Employees";
    case "orders":
      return "Orders";
    case "products":
      return "Products";
    case "chat":
      return "Chat";
    default:
      return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  }
}

export function NavigationBar() {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
