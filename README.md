# Inpoints — site vitrine

Site vitrine d'**Inpoints**, le logiciel qui accompagne une compétition de
sports de combat de l'inscription aux résultats : participants, brackets,
arbitrage électronique, direct, écran géant et classements.

**Jumeau** du site d'InSports (`SyneStudio/insport-landing`) : même sol
anthracite, mêmes cartes, mêmes boutons, mêmes effets, même roue des sports.
Seul l'accent change — rouge chez InSports, bleu roi ici — pour que les deux
sites se lisent comme un seul écosystème. Le contenu, lui, tient en sept
temps :

1. **Hero** — le hero d'InSports : halos, grille, fin de titre en dégradé,
   et la console du jour qui s'incline en suivant la souris.
2. **Pour tous les sports de combat** — la roue d'InSports, avec un emoji
   par discipline ; la discipline
   choisie est au sommet, flèches, clavier, glisser, avance automatique
   jusqu'au premier geste.
3. **Les outils** — neuf cartes, chacune avec une micro-maquette qui bouge
   au survol.
4. **Les fonctionnalités essentielles** — bracket, inscriptions, arbitrage,
   direct : quatre grands blocs alternés, avec parallaxe légère.
5. **L'application** — sept écrans posés en perspective, ailes qui s'ouvrent
   au défilement ; piste horizontale sous 1024 px. Quatre garanties dessous.
6. **Devis** — le bloc « sur devis » et le formulaire (table partagée, voir
   plus bas).
7. **Pied de page** — contact, navigation, documents juridiques.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (jetons de design dans `src/app/globals.css`)
- **Framer Motion** (reveals, micro-interactions)
- **Supabase** (demandes de démonstration)
- **Lucide** (icônes)

## Jetons de design

| Rôle           | Valeur    |
| -------------- | --------- |
| Fond           | `#14161a` |
| Bande alternée | `#16191e` |
| Carte          | `#1c1f25` |
| Bordure        | `#2c3038` |
| Texte          | `#f5f4f1` |
| Secondaire     | `#9aa0aa` |
| Accent (aplat) | `#3461a8` |
| Accent (texte) | `#7fa6e6` |
| Logo           | `#3461a8` · `#6e8db5` |

Fonds, filets et texte sont ceux d'InSports, à la valeur près ; les effets
aussi (`.brand-glow`, `.bg-grid`, `.text-gradient`, `.shadow-card`,
`.edge-light`, `.grain`). Quand InSports change l'un d'eux, le reporter ici.

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
                  # Quote (+ HeroBackground)
    mockups/      # Console, Participants, Bracket, Planning, Scoring,
                  # Scoreboard, Results, Registration, Live (+ PhoneFrame)
    demo/         # DemoForm
    ui/           # primitives (Button, Card, ScaledFrame, Reveal, …)
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
