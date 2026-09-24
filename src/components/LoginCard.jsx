// ============================================================================
// LoginCard.jsx — Composant Unique Partagé de Connexion PILOT (@shared/ui)
//
// Composant officiel de référence visuelle utilisé conjointement par :
//   - PILOT Web (pilot-frontend)
//   - PILOT Mobile (pilot-mobile)
//
// CONTRAT VISUEL & PRODUIT (Blanc + Kaki #4B5320, 0 émoji) :
//   - Carte blanche avec ombre douce et bordure minérale
//   - Bouclier Kaki 48x48px en en-tête
//   - Titre "Connexion à PILOT OS" et sous-titre "Accédez à votre centre de pilotage"
//   - Champs flottants avec fond doux bleuté (#EEF2F9) et astérisques rouges
//   - Lien "Mot de passe oublié ?" aligné à droite
//   - Bouton pleine largeur Kaki "Se connecter >" avec icône ChevronRight
//   - Pied de carte "Pas encore de compte ? S'inscrire"
//   - Protection OWASP : décompte de verrouillage temporaire et opacité des erreurs
// ============================================================================

import React, { useState } from 'react';
import {
  Shield,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  LockKeyhole,
  ChevronRight,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Input } from './input';

/**
 * Fiche de connexion officielle PILOT partagée entre Web et Mobile.
 *
 * @param {Object} props
 * @param {string} props.email - Adresse email saisie
 * @param {Function} props.onEmailChange - Callback de modification de l'email
 * @param {string} props.password - Mot de passe saisi
 * @param {Function} props.onPasswordChange - Callback de modification du mot de passe
 * @param {Function} props.onSubmit - Callback de soumission du formulaire
 * @param {Function} [props.onForgotPassword] - Callback clic mot de passe oublié
 * @param {Function} [props.onRegister] - Callback clic inscription / gouvernance
 * @param {boolean} [props.loading=false] - Indicateur de vérification en cours
 * @param {string} [props.error=""] - Message d'erreur opaque
 * @param {boolean} [props.isInCooldown=false] - Indicateur de verrouillage anti-bruteforce
 * @param {number} [props.cooldownRemaining=0] - Secondes restantes de verrouillage
 * @param {'FR' | 'EN'} [props.language='FR'] - Langue active
 * @param {Function} [props.onLanguageChange] - Callback changement de langue
 * @param {string} [props.title="Connexion à PILOT OS"] - Titre principal
 * @param {string} [props.registerLabel="Créer votre agence PILOT"] - Texte du lien d'inscription
 * @param {string} [props.title="Connexion sécurisée"] - Titre principal
 * @param {string} [props.subtitle="Accédez à votre centre de pilotage"] - Sous-titre
 * @param {string} [props.className=""] - Classes CSS additionnelles
 */
export const LoginCard = ({
  email,
  onEmailChange,
  password,
  onPasswordChange,
  onSubmit,
  onForgotPassword,
  onRegister,
  registerLabel = 'Créer votre agence PILOT',
  loading = false,
  error = '',
  isInCooldown = false,
  cooldownRemaining = 0,
  language = 'FR',
  onLanguageChange,
  title = 'Connexion sécurisée',
  subtitle = 'Accédez à votre centre de pilotage',
  className = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={cn(
        'w-full max-w-[420px] bg-white rounded-2xl border border-[#DADCD7] p-7 sm:p-9 shadow-lg relative select-none',
        className
      )}
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.07)',
      }}
    >
      {/* Sélecteur de langue optionnel (en haut à droite) */}
      {onLanguageChange && (
        <div className="absolute top-4 right-4 flex items-center bg-white rounded-md shadow-sm border border-[#DADCD7] p-0.5 z-10">
          <button
            type="button"
            onClick={() => onLanguageChange('FR')}
            className={cn(
              'h-6 px-2 text-[11px] font-bold rounded transition-colors',
              language === 'FR'
                ? 'bg-[#4B5320] text-white'
                : 'text-slate-500 hover:text-slate-900 bg-transparent'
            )}
          >
            FR
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange('EN')}
            className={cn(
              'h-6 px-2 text-[11px] font-bold rounded transition-colors',
              language === 'EN'
                ? 'bg-[#4B5320] text-white'
                : 'text-slate-500 hover:text-slate-900 bg-transparent'
            )}
          >
            EN
          </button>
        </div>
      )}

      {/* En-tête de la fiche de connexion */}
      <div className="flex flex-col items-center text-center mb-6">
        <div
          className="w-12 h-12 rounded-[13px] flex items-center justify-center shadow-md mb-4"
          style={{ backgroundColor: '#4B5320' }}
        >
          <Shield className="text-white" size={24} strokeWidth={2.2} aria-hidden="true" />
        </div>

        <h2 className="text-xl font-bold tracking-tight text-[#21262D] mb-1">
          {title}
        </h2>
        <p className="text-xs text-[#63665F]">
          {subtitle}
        </p>
      </div>

      {/* Formulaire de saisie */}
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        {/* Champ Email professionnel */}
        <Input
          label="Email professionnel"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
          autoComplete="email"
          disabled={loading || isInCooldown}
          placeholder=""
          className="bg-[#EEF2F9] border-[#DADCD7] focus:bg-white focus:border-[#4B5320]"
        />

        {/* Champ Mot de passe avec toggle affichage */}
        <div className="space-y-1">
          <Input
            label="Mot de passe"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
            autoComplete="current-password"
            disabled={loading || isInCooldown}
            placeholder=""
            className="bg-[#EEF2F9] border-[#DADCD7] focus:bg-white focus:border-[#4B5320]"
            suffix={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 focus:outline-none text-slate-400 hover:text-slate-700"
                tabIndex={-1}
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />

          {/* Lien Mot de passe oublié */}
          {onForgotPassword && (
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-xs font-semibold text-[#63665F] hover:text-[#4B5320] transition-colors focus:outline-none"
              >
                Mot de passe oublié ?
              </button>
            </div>
          )}
        </div>

        {/* Message d'erreur opaque */}
        {error && !isInCooldown && (
          <div
            className="flex items-start gap-2.5 p-3 rounded-md border text-xs"
            style={{
              backgroundColor: '#FEF2F2',
              borderColor: '#FECACA',
              color: '#DC2626',
            }}
            role="alert"
          >
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Alerte de suspension temporaire OWASP (Cooldown) */}
        {isInCooldown && (
          <div
            className="flex items-start gap-2.5 p-3 rounded-md border text-xs"
            style={{
              backgroundColor: '#FFFBEB',
              borderColor: '#FDE68A',
              color: '#D97706',
            }}
            role="alert"
          >
            <LockKeyhole size={16} className="shrink-0 mt-0.5" />
            <p className="font-medium">
              Accès temporairement suspendu — réessayez dans <strong>{cooldownRemaining}s</strong>
            </p>
          </div>
        )}

        {/* Bouton d'action vert Kaki "#4B5320" avec "Se connecter >" */}
        <button
          type="submit"
          disabled={loading || isInCooldown}
          className="w-full h-[46px] rounded-[10px] text-sm font-bold text-white flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          style={{
            backgroundColor: '#4B5320',
            boxShadow: '0 2px 8px rgba(75, 83, 32, 0.25)',
          }}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 size={18} className="animate-spin" />
              Vérification en cours...
            </span>
          ) : isInCooldown ? (
            <span className="flex items-center gap-2">
              <LockKeyhole size={18} />
              Accès bloqué ({cooldownRemaining}s)
            </span>
          ) : (
            <>
              <span>Se connecter</span>
              <ChevronRight size={17} strokeWidth={2.5} />
            </>
          )}
        </button>
      </form>

      {/* Pied de formulaire — Identique au Web : Pas encore de compte ? S'inscrire */}
      <div className="flex items-center justify-center gap-1.5 mt-6 pt-5 border-t border-[#DADCD7] text-xs">
        <span className="text-[#63665F]">Pas encore de compte ?</span>
        <button
          type="button"
          onClick={
            onRegister ??
            (() => {
              alert(
                "Gouvernance PILOT Web-First : La création d'agence et la configuration des comptes s'effectuent sur le portail Web officiel PILOT OS (https://app.pilot-security.fr). Les comptes agents sont administrés par votre agence."
              );
            })
          }
          className="font-bold hover:underline focus:outline-none"
          style={{ color: '#4B5320' }}
        >
          {registerLabel}
        </button>
      </div>
    </div>
  );
};

export default LoginCard;
