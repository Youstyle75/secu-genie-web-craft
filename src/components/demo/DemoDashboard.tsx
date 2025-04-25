
import { Check, Clock, Info, X } from 'lucide-react';

const demoProjects = [
  {
    id: 'proj-1',
    name: 'Centre Commercial Grand Est',
    type: 'ERP - Catégorie 1',
    status: 'completed',
    compliance: 98,
    documents: 8,
    lastUpdate: '2025-04-20',
  },
  {
    id: 'proj-2',
    name: 'Festival Musique ActuElle',
    type: 'Événement - Grand Rassemblement',
    status: 'in-progress',
    compliance: 75,
    documents: 5,
    lastUpdate: '2025-04-22',
  },
  {
    id: 'proj-3',
    name: 'Théâtre Municipal',
    type: 'ERP - Type L',
    status: 'needs-attention',
    compliance: 60,
    documents: 3,
    lastUpdate: '2025-04-15',
  },
];

const demoDocuments = [
  {
    id: 'doc-1',
    name: 'Plan d\'évacuation - Niveau 1',
    project: 'Centre Commercial Grand Est',
    type: 'Plan d\'évacuation',
    status: 'valid',
    expiresAt: '2025-12-31',
  },
  {
    id: 'doc-2',
    name: 'Registre de sécurité',
    project: 'Centre Commercial Grand Est',
    type: 'Registre',
    status: 'valid',
    expiresAt: '2025-09-15',
  },
  {
    id: 'doc-3',
    name: 'Plan d\'évacuation principal',
    project: 'Festival Musique ActuElle',
    type: 'Plan d\'évacuation',
    status: 'draft',
    expiresAt: null,
  },
  {
    id: 'doc-4',
    name: 'Consignes de sécurité',
    project: 'Théâtre Municipal',
    type: 'Consignes',
    status: 'expired',
    expiresAt: '2025-04-10',
  },
];

const DemoDashboard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between p-4 md:p-6">
          <h3 className="text-xl font-bold">Tableau de bord SecuGenie</h3>
          <div className="text-sm text-gray-500">
            Dernière synchronisation: Aujourd'hui à 14:30
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="text-primary text-sm font-semibold mb-1">Projets actifs</div>
            <div className="text-3xl font-bold">3</div>
          </div>
          
          <div className="bg-green-50 border border-green-100 rounded-lg p-4">
            <div className="text-green-700 text-sm font-semibold mb-1">Documents conformes</div>
            <div className="text-3xl font-bold">12/16</div>
          </div>
          
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
            <div className="text-amber-700 text-sm font-semibold mb-1">Documents à mettre à jour</div>
            <div className="text-3xl font-bold">4</div>
          </div>
        </div>
        
        <div className="mb-8">
          <h4 className="text-lg font-semibold mb-3">Projets</h4>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Conformité</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {demoProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="font-medium">{project.name}</div>
                      <div className="text-xs text-gray-500">Dernière mise à jour: {project.lastUpdate}</div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600">
                      {project.type}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        project.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : project.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {project.status === 'completed' && <Check className="h-3 w-3 mr-1" />}
                        {project.status === 'in-progress' && <Clock className="h-3 w-3 mr-1" />}
                        {project.status === 'needs-attention' && <Info className="h-3 w-3 mr-1" />}
                        {project.status === 'completed'
                          ? 'Terminé'
                          : project.status === 'in-progress'
                          ? 'En cours'
                          : 'À traiter'}
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 max-w-[100px]">
                          <div
                            className={`h-2.5 rounded-full ${
                              project.compliance >= 90
                                ? 'bg-green-500'
                                : project.compliance >= 70
                                ? 'bg-blue-500'
                                : 'bg-amber-500'
                            }`}
                            style={{ width: `${project.compliance}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{project.compliance}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-center text-sm">
                      {project.documents}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-3">Documents récents</h4>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projet</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Expiration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {demoDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 whitespace-nowrap font-medium">
                      {doc.name}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600">
                      {doc.project}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-600">
                      {doc.type}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        doc.status === 'valid'
                          ? 'bg-green-100 text-green-800'
                          : doc.status === 'draft'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {doc.status === 'valid' && <Check className="h-3 w-3 mr-1" />}
                        {doc.status === 'expired' && <X className="h-3 w-3 mr-1" />}
                        {doc.status === 'valid' ? 'Valide' : doc.status === 'draft' ? 'Brouillon' : 'Expiré'}
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-right text-sm">
                      {doc.expiresAt || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoDashboard;
