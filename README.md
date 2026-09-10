# Inpoints — site vitrine

Site vitrine d'**Inpoints**, la plateforme de gestion de compétition :
inscriptions, tirages et tableaux, terrains et planning, accueil et pesée,
arbitrage électronique, direct, écran géant et résultats officiels.

C'est le **jumeau** du site d'InSports (`SyneStudio/insport-landing`) : même
architecture, même typographie, même rythme de sections — mais un sol bleu
nuit, un accent cyan, et le discours de la compétition plutôt que celui de la
gestion fédérale.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (jetons de design dans `src/app/globals.css`)
- **Framer Motion** (reveals, micro-interactions)
- **Three.js** + **React Three Fiber** (scène de hero, optionnelle)
- **Supabase** (demandes de démonstration)
- **Lucide** (icônes)

## Jetons de design

| Rôle           | Valeur    |
| -------------- | --------- |
| Fond           | `#0a1120` |
| Bande alternée | `#0c1526` |
| Carte          | `#111c31` |
| Bordure        | `#223252` |
| Texte          | `#eef4fc` |
| Secondaire     | `#9bacc6` |
| Accent (aplat) | `#0b7aab` |
| Accent (texte) | `#4fd1e8` |

Deux familles ne suivent aucun thème, parce qu'elles viennent du terrain et
non d'une charte :

- **les coins** (`--color-corner-red`, `--color-corner-blue`) désignent un
  côté de l'aire, jamais une importance ;
- **l'écran géant** (`--color-screen-*`) est **blanc**, parce qu'un
  vidéoprojecteur de gymnase projette de la lumière : sur un fond noir il ne
  projette presque rien. C'est la seule surface claire du site.

## Développement

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Variables d'environnement

Copier `.env.example` vers `.env.local` :

- `NEXT_PUBLIC_SITE_URL` — URL publique du site
- `NEXT_PUBLIC_SUPABASE_URL` — projet Supabase
- `SUPABASE_SERVICE_ROLE_KEY` — clé serveur (route API `/api/demo`)

Sans configuration, le formulaire fonctionne quand même : les valeurs
publiques du projet sont embarquées dans `src/lib/supabase/server.ts`, et la
sécurité au niveau des lignes ne laisse à `anon` que l'INSERT.

### La table est partagée avec InSports

Les deux sites écrivent dans `public.demo_requests` du même projet Supabase,
distingués par la colonne **`product`** (`insports` | `inpoints`). Un seul
endroit à surveiller pour les demandes de démonstration.

## Structure

```
src/
  app/            # routes, layout, globals, api/demo, robots, sitemap
  components/
    layout/       # Navbar, Footer, LanguageSwitcher
    sections/     # Hero, Problem, Solution, …, Scoreboard, …, FinalCTA
    mockups/      # Console, Bracket, Planning, Scoring, Scoreboard, Results
    three/        # HeroScene (WebGL) + HeroBackground (fond CSS)
    demo/         # DemoForm
    ui/           # primitives (Button, Container, Reveal, …)
  data/           # features, benefits, screens, sports
  hooks/          # useMediaQuery, usePrefersReducedMotion
  lib/            # fonts, site, utils, validation, supabase, i18n
```

Les maquettes sont du DOM pur — nettes à tout zoom, traduites comme le reste
du site, et pas une capture d'écran à refaire à chaque évolution du produit.

## Langues

FR (référence), EN, NL, DE. La parité des clés est garantie par le typage :
`fr.ts` définit `Dict`, et les trois autres dictionnaires sont annotés avec.
Une clé oubliée ne compile pas.

## Accessibilité & performance

- Reveals et parallaxe désactivés sous `prefers-reduced-motion`.
- HTML sémantique, focus visibles, navigation clavier, `aria-label`.
- SEO : métadonnées, Open Graph, JSON-LD, `robots.txt`, `sitemap.xml`.
