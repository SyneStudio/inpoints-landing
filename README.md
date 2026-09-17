# Inpoints — site vitrine

Site vitrine d'**Inpoints**, le logiciel qui accompagne une compétition de
sports de combat de l'inscription aux résultats : participants, brackets,
arbitrage électronique, direct, écran géant et classements.

Né **jumeau** du site d'InSports (`SyneStudio/insport-landing`) — même
typographie, mêmes primitives, un sol bleu nuit et un accent cyan — il a
depuis sa propre architecture, en huit temps :

1. **Hero** — le message, et la console du jour entourée de quatre cartes
   flottantes (tableau, score, inscription, résultats).
2. **Pour tous les sports de combat** — un arc de cartes ; la discipline
   choisie est au sommet, flèches, clavier, glisser, avance automatique
   jusqu'au premier geste.
3. **Les outils** — neuf cartes, chacune avec une micro-maquette qui bouge
   au survol.
4. **Les fonctionnalités essentielles** — bracket, inscriptions, arbitrage,
   direct : quatre grands blocs alternés, avec parallaxe légère.
5. **L'application** — sept écrans posés en perspective, ailes qui s'ouvrent
   au défilement ; piste horizontale sous 1024 px. Quatre garanties dessous.
6. **Gain de temps** — un registre « organisation classique → avec Inpoints »,
   moment par moment, puis quatre effets.
7. **Devis** — le bloc « sur devis » et le formulaire (table partagée, voir
   plus bas).
8. **Pied de page** — contact, navigation, documents juridiques.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (jetons de design dans `src/app/globals.css`)
- **Framer Motion** (reveals, micro-interactions)
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
    sections/     # Hero, CombatSports, Tools, DeepDives, AppShowcase,
                  # TimeSaving, Quote (+ HeroBackground)
    mockups/      # Console, Participants, Bracket, Planning, Scoring,
                  # Scoreboard, Results, Registration, Live (+ PhoneFrame)
    demo/         # DemoForm
    ui/           # primitives (Button, Container, Reveal, …)
  data/           # combatSports, tools
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
