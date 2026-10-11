import { useTranslation } from 'react-i18next';
import { StatusBadge } from '../index.js';

const ClientStatusBadge = ({ statut }) => {
    const { t } = useTranslation();

    const variants = {
        actif: 'bg-emerald-50 text-emerald-800 border-emerald-300',
        prospect: 'bg-amber-50 text-amber-800 border-amber-300',
        pause: 'bg-slate-100 text-slate-700 border-slate-300',
        litige: 'bg-rose-50 text-rose-800 border-rose-300',
        resilie: 'bg-zinc-100 text-zinc-700 border-zinc-300',
        inactif: 'bg-slate-100 text-slate-600 border-slate-200'
    };

    const labels = {
        actif: t('common.status.active', 'Actif'),
        prospect: t('common.status.prospect', 'Prospect'),
        pause: t('common.status.paused', 'En pause'),
        litige: t('common.status.dispute', 'Litige'),
        resilie: t('common.status.terminated', 'Résilié'),
        inactif: t('common.status.archived', 'Inactif')
    };

    const normalizedStatut = (statut || 'actif').toLowerCase();
    const variant = variants[normalizedStatut] || variants.actif;
    const label = labels[normalizedStatut] || statut;

    return (
        <StatusBadge variant={variant}>
            {label}
        </StatusBadge>
    );
};

export { ClientStatusBadge };
