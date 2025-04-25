
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

type BreadcrumbItem = {
  label: string;
  path: string;
};

type BreadcrumbProps = {
  items?: BreadcrumbItem[];
};

const routeNameMap: Record<string, string> = {
  '': 'Accueil',
  'solutions': 'Nos Solutions',
  'about': 'À Propos',
  'contact': 'Contact',
  'demo': 'Démonstration',
  'faq': 'FAQ',
};

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  const location = useLocation();
  
  // If no items provided, generate from current path
  const breadcrumbItems = items || (() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    return [
      { label: 'Accueil', path: '/' },
      ...pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
        return {
          label: routeNameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
          path,
        };
      }),
    ];
  })();

  return (
    <nav aria-label="Fil d'Ariane" className="py-2">
      <ol className="flex flex-wrap items-center text-sm text-gray-600">
        {breadcrumbItems.map((item, index) => (
          <li key={item.path} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="mx-1 h-4 w-4 text-gray-400" />
            )}
            {index === breadcrumbItems.length - 1 ? (
              <span className="font-medium text-primary">{item.label}</span>
            ) : (
              <Link 
                to={item.path} 
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
