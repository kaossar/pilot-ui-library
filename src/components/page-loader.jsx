import * as React from "react";
import { cn } from "../lib/utils";
import { Skeleton } from "./skeleton.jsx";

/**
 * PageLoader — Écran de chargement standardisé PILOT OS
 *
 * Remplace tous les `<div>Chargement...</div>` et `<p>Loading...</p>` du SaaS.
 * Garantit une expérience de chargement cohérente et premium.
 *
 * @param {'page' | 'section' | 'card'} [variant='page'] - Contexte de chargement
 * @param {string} [className] - Classes CSS additionnelles
 *
 * @example
 * // Chargement d'une page complète
 * if (loading) return <PageLoader />;
 *
 * @example
 * // Chargement d'une section dans un tableau de bord
 * if (loading) return <PageLoader variant="section" />;
 *
 * @example
 * // Chargement d'une carte
 * if (loading) return <PageLoader variant="card" />;
 */
const PageLoader = ({ variant = "page", className }) => {

    // ── Variante CARD — Skeleton compact pour une carte ───────────────────────
    if (variant === "card") {
        return (
            <div className={cn("p-4 space-y-3", className)}>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-8 w-full" />
            </div>
        );
    }

    // ── Variante SECTION — Skeleton pour une section de page ─────────────────
    if (variant === "section") {
        return (
            <div className={cn("space-y-4 p-6", className)}>
                {/* Header skeleton */}
                <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-9 w-28 rounded-2xl" />
                </div>
                {/* Lignes de tableau skeleton */}
                <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <Skeleton className="h-10 w-10 rounded-xl flex-shrink-0" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-3.5" style={{ width: `${65 + (i % 3) * 10}%` }} />
                                <Skeleton className="h-3" style={{ width: `${40 + (i % 4) * 8}%` }} />
                            </div>
                            <Skeleton className="h-7 w-20 rounded-full" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // ── Variante PAGE — Skeleton pleine page ──────────────────────────────────
    return (
        <div className={cn("min-h-screen p-6 space-y-6 animate-pulse", className)}>
            {/* Barre de titre */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-48" />
                </div>
                <Skeleton className="h-10 w-36 rounded-2xl" />
            </div>

            {/* KPIs / Stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="p-5 rounded-3xl border border-border bg-card space-y-3">
                        <div className="flex justify-between items-start">
                            <Skeleton className="h-10 w-10 rounded-xl" />
                            <Skeleton className="h-5 w-16 rounded-full" />
                        </div>
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                ))}
            </div>

            {/* Tableau principal */}
            <div className="rounded-3xl border border-border bg-card overflow-hidden">
                {/* Header tableau */}
                <div className="p-6 border-b border-border">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-9 w-64 rounded-xl" />
                        <Skeleton className="h-9 w-28 rounded-xl" />
                    </div>
                </div>
                {/* Lignes tableau */}
                <div className="divide-y divide-border">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-4 px-6 py-4">
                            <Skeleton className="h-10 w-10 rounded-xl flex-shrink-0" />
                            <div className="flex-1 space-y-1.5">
                                <Skeleton className="h-3.5" style={{ width: `${55 + (i % 5) * 8}%` }} />
                                <Skeleton className="h-3" style={{ width: `${30 + (i % 4) * 10}%` }} />
                            </div>
                            <Skeleton className="h-6 w-24 rounded-full" />
                            <Skeleton className="h-8 w-8 rounded-xl" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

PageLoader.displayName = "PageLoader";

export { PageLoader };
