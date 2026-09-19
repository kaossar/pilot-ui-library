import { useTranslation } from 'react-i18next';
import { StatusBadge } from '../index.js';

const ClientStatusBadge = ({ statut }) => {
    const { t } = useTranslation();

    const variants = {
        actif: 'bg-green-100 text-green-800 border-green-200',
        prospect: 'bg-blue-100 text-blue-800 border-blue-200',
        inactif: 'bg-gray-100 text-gray-800 border-gray-200'
    };

    const labels = {
        actif: t('common.status.active', 'Active'),
        prospect: t('common.status.prospect', 'Prospect'),
        inactif: t('common.status.archived', 'Archived')
    };

    const variant = variants[statut] || variants.actif;
    const label = labels[statut] || statut;

    return (
        <StatusBadge variant={variant}>
            {label}
        </StatusBadge>
    );
};

export { ClientStatusBadge };
