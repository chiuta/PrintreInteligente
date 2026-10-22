# Printre inteligențe

[English](README.md) · [Română](README.ro.md) · **Français** · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Version :** 1.2.6 · **Dernière mise à jour :** 2026-10-22

Langues de l'interface : **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**

Roman de SF interactif sur la mission Artemis 2, « critiqué par les étoiles et les hypercivilisations », avec livre audio intégré.

**En ligne :** https://chiuta.github.io/PrintreInteligente/

![Capture d'écran](screenshot.png)

## De quoi s'agit-il

« Printre inteligențe » est un livre vivant, publié comme application web (un grand fichier `index.html`, plus `sw.js`, `robots.txt`, `sitemap.xml` et des images d'aperçu). Le roman, inspiré de la mission Artemis 2 de la NASA (vol d'essai lunaire, achevé le 10 avril 2026), place l'équipage dans un scénario entièrement fictif où une défaillance technique l'oblige à un alunissage d'urgence. D'après la page, le livre contient un Prologue, deux chapitres, un Épilogue, 17 scénarios alternatifs regroupés en 5 familles, et 108 critiques fictives en 12 catégories (littéraires, philosophiques, de lecteurs, d'IA du futur, NHI, hypercivilisations etc.). La page déclare qu'il s'agit d'une œuvre de fiction, non affiliée à la NASA ni à l'ASC, et d'une collaboration humain-IA, révélée dans l'Épilogue.

## Fonctionnalités

- Navigation par sections (menu latéral) : livre, scénarios, critiques.
- Livre audio intégré, avec synthèse vocale (service en ligne ou voix locale du navigateur), réglages des voix et de la lecture.
- Fonctions génératives « ✨ Ta critique » et « 🚀 Ta fin », qui appellent une API d'IA via un point d'accès configurable (`/api/claude`).
- Recherche, thème jour/nuit, mode lecture, fonds et effets sonores optionnels, progression de lecture et signets.
- Le livre (épilogue, chapitres, 17 scénarios et 108 critiques) existe en 8 langues (original roumain plus anglais, français, italien, espagnol, portugais, allemand et hongrois), incluses dans le fichier : la langue se change depuis le menu « Traductions » sans aucune requête réseau, et la recherche, l'export A4, les métadonnées de la page et le livre audio suivent la langue choisie. Pour les autres langues du menu (62 au total), la page est traduite à la demande via Google Translate.
- Les traductions incluses dans le fichier ont été réalisées avec l'aide de l'IA et **doivent être relues par des locuteurs natifs** ; les pages juridiques et les textes de démonstration restent en roumain (seuls leurs titres sont traduits) ; le contenu juridique et les passages médicaux/physiologiques (valeurs d'oxygène, doses) doivent aussi être relus par un spécialiste.
- Panneau des raccourcis clavier (ouvert avec `?`).
- Pages légales dans l'application : confidentialité/RGPD, cookies, bouton « Supprimer toutes les données locales ».
- PWA : manifeste et Service Worker (`sw.js`).

## Mode d'emploi

Raccourcis affichés par l'application :

- `← →` page précédente / suivante ; `↑ ↓` défilement
- `Échap` ferme toute fenêtre modale ou tout panneau
- `/` ou `Ctrl+F` ouvre la recherche
- `H` accueil ; `D` bascule le thème jour/nuit
- `A` ouvre le livre audio ; `Espace` lecture/pause du livre audio
- `?` affiche la liste des raccourcis

Étapes :

1. Lisez depuis le menu latéral : Prologue, Chapitres 1-2, scénarios, critiques, Épilogue.
2. Pour le livre audio, appuyez sur `A` et utilisez Lecture/Pause.
3. Pour une autre langue, ouvrez le menu « Traductions » et choisissez la langue. Les 8 langues incluses dans le fichier fonctionnent hors ligne ; les autres utilisent Google Translate (voir la section sur le réseau).
4. « ✨ Ta critique » et « 🚀 Ta fin » n'envoient ton texte à une API d'IA que lorsque tu agis (et confirmes).
5. Les données locales peuvent être supprimées avec « 🗑️ Supprimer toutes les données locales maintenant » depuis la page cookies/confidentialité.

## Confidentialité et réseau

Local (`localStorage`/`sessionStorage`), selon la page des cookies de l'application : préférences visuelles et audio (`bgfxMode`, `bgfxActive`, `moonMode`, `rdMode`, `sfx_prefs`, `ab_voice_prefs` etc.), progression et signets (`pi-progress`, `pi-bookmarks`), critiques et fins personnelles (`pi-reviews`, `pi-endings`, `c108entries`), confirmation de la bannière légale, et `nlSubs` (les adresses saisies dans le formulaire de newsletter sont uniquement enregistrées localement par ce code).

Hôtes tiers contactés :

- `alexio.tf` : images d'illustration (demandées au chargement ; la seule requête externe sans action de l'utilisateur) et aperçus de partage.
- `tts-proxy.chiuta.workers.dev` (Cloudflare Worker vers Azure Neural TTS) : **uniquement si tu coches explicitement** « Voix en ligne Azure Neural » dans le panneau des voix du livre audio (opt-in, désactivé par défaut ; la préférence est conservée dans `pi_azure_tts`) ; une requête de test est alors faite et le texte lu part vers le proxy pour la synthèse ; sans opt-in, la voix locale du navigateur est utilisée et aucune requête ne part vers ce service au chargement.
- `translate.googleapis.com` : uniquement si tu choisis dans « Traductions » une langue autre que les 8 incluses dans le fichier (ro, en, fr, it, es, pt, de, hu) ; le texte de la page est envoyé à Google Translate.
- Une API d'IA via `/api/claude` (le proxy `claude-proxy.worker.js` du dépôt, vers l'API Anthropic) : uniquement si tu utilises « Ta critique » / « Ta fin ».
- Google Fonts : vérifié à l'audit (2026-10-10) — il n'y a aucune requête vers `fonts.googleapis.com` / `fonts.gstatic.com` ; la page de confidentialité ne les mentionne que de façon conditionnelle.
- Le formulaire « Prochaine histoire » (newsletter) : l'adresse e-mail est enregistrée uniquement en local, dans `localStorage` (`nlSubs`) ; elle n'est envoyée nulle part et personne ne recevra de notifications sur cette base, bien que le message de confirmation dise « Je te préviens quand quelque chose de nouveau paraît ».

La page hébergée sur GitHub Pages n'a pas la route `/api/claude`, donc les fonctions génératives ne répondent probablement pas là-bas, sauf si `window.PI_API_ENDPOINT` est configuré.

## Avertissement

Fiction / spéculation : le roman, les scénarios et les 108 critiques sont des œuvres de fiction ; les critiques sont fictives, et les valeurs « lecteurs actifs » sont simulées (marquées « ~simulé » dans la page). L'histoire utilise les noms réels des membres de l'équipage d'Artemis 2 (Koch, Wiseman, Glover, Hansen) comme personnages d'un scénario entièrement imaginaire ; elle n'est affiliée ni à la NASA, ni à l'ASC, ni à l'ESA, ni à l'équipage. Les textes générés via « Ta critique » / « Ta fin » sont produits par un modèle d'IA et peuvent contenir des erreurs.

## Exécution locale / hors ligne

Téléchargez le dépôt et ouvrez `index.html` : le texte du livre est inclus dans le fichier et se lit sans Internet. Une connexion Internet est nécessaire pour : le livre audio avec voix en ligne (optionnelle ; sinon la voix locale), les traductions vers d'autres langues que les 8 incluses, les fonctions génératives et les images d'alexio.tf. Le Service Worker s'enregistre au chemin `/sw.js` et ne fonctionne que sur http(s), pas depuis un fichier local.

## Licence

MIT — voir le fichier [LICENSE](LICENSE). Les droits d'auteur sont conservés ; le code et le texte du livre peuvent être utilisés, copiés, modifiés et redistribués en conservant la mention de licence.

## Nouveautés (v1.1.0)

- **Signets et notes sur des passages** (bouton 📝 de la barre supérieure) : tu sélectionnes un fragment d'une page (livre, scénarios, critiques), tu ajoutes une note ; elle n'est conservée que dans le navigateur (FFF.store), « Aller au fragment » t'amène à la page et au paragraphe concernés, les notes peuvent être supprimées et exportées en Markdown. Elles sont distinctes des signets existants (`pi-bookmarks`), qui restent inchangés.
- **Sauvegarde .fff.json** via l'étiquette « Transparence » (clic sur `v 1.1.0 · 2026-10-14` dans « Conditions et confidentialité ») : exporte/importe (éventuellement chiffré par mot de passe) la progression, les signets, les notes et les critiques personnelles ; elle montre les clés stockées et le réseau déclaré.
- Kit commun (core, label, bundle). La recherche (Ctrl+K), le livre audio et la traduction existants n'ont pas été modifiés. Cache du Service Worker : pi-v15.
- Les nouveaux textes sont en ro, en, fr, it, es, pt, hu, de ; les traductions fr/it/es/pt/hu/de sont automatiques et non vérifiées par des natifs.
- Tests : `tests/fff-r8.test.mjs` (réseau bloqué ; les images d'alexio.tf, déjà demandées auparavant, sont exclues du décompte ; 1280 et 360 px, axe 0 violation avec la boîte de dialogue ouverte).

## Historique / Changelog

### 1.2.6 — 2026-10-22
- fff-kit 1.1.2 : PBKDF2 à 600 000 itérations, protection anti-clickjacking

### 1.2.5 — 2026-10-22
- Stockage : les clés génériques de localStorage (arrière-plan, mode Lune, mode lecture, effets sonores, voix, critique de 108 mots, newsletter) portent désormais le préfixe unique `printreinteligente.` ; les valeurs existantes sont migrées automatiquement depuis les anciennes clés.
- Accessibilité : le champ de recherche a un nom accessible ; le focus clavier est visible dans le panneau de recherche et dans le champ de la barre latérale.
- Les messages bloquants `alert()` ont été remplacés par des notifications non modales traduites (role=status).

### 1.2.4 — 2026-10-22
- Les dernières chaînes d’interface restées en roumain dans les autres langues sont désormais traduites : l’index complet des scénarios, la transmission finale avec la citation de clôture et la note de soutien, ainsi que le suffixe « l’image nécessite une connexion internet » des légendes de figures.

### 1.2.3 — 2026-10-22
- Le titre de la page, les titres des cartes sociales et les descriptions d'images suivent la langue de l'interface (l'extrait du roman dans la description reste en roumain, texte source).

### 1.2.2 — 2026-10-19
- Tout le texte narratif (épilogue, chapitres, scénarios et les 108 critiques : 115 pages) est disponible en 7 traductions en plus de l'original roumain (en, fr, it, es, pt, de, hu), sans retour au roumain ; la recherche, l'export A4, les métadonnées de la page et le livre audio utilisent la langue choisie. Les textes juridiques/de démonstration restent en roumain. Cache SW pi-v18.

### 1.1.0 — 2026-10-14
- Nouveau : signets et notes sur des passages avec export Markdown ; sauvegarde .fff.json et étiquette de transparence (kit commun). Cache SW pi-v15.

### 1.0.0 — 2026-10-12
- La version et la date de la dernière mise à jour s'affichent dans l'application (fenêtre « Conditions et confidentialité »).

### 11 octobre 2026 (tour 7)
- Corrigé : les groupes repliés du menu latéral (LE LIVRE, SCÉNARIOS, ACTIONS etc.) ne masquaient les liens que visuellement (`max-height:0`) ; ceux-ci restaient dans l'ordre de Tab et sous les éléments voisins (clic réel intercepté par les titres des groupes). Désormais les groupes repliés sont `visibility:hidden` (avec transition), donc ils ne peuvent plus être focalisés ni lus par les lecteurs d'écran. Vérifié : clic réel sur « Prologue » après ouverture du groupe, 0 violation axe-core. Cache du Service Worker : pi-v14.
- Corrigé : en mode lecture, le panneau du livre audio, la bande « Disclaimer & Conditions » et la notification « Nouveautés » ne se trouvaient dans aucun repère ARIA (axe-core `region`) ; ils ont maintenant `role="region"`/`role="status"`.

### 11 octobre 2026 (tour 6)
- Corrigé : les 354 gestionnaires en ligne (`onclick`, `onchange` etc.) ont été remplacés par un répartiteur délégué (`data-on-*` + un seul écouteur, sans eval/Function ; les arguments dynamiques passent par une liste blanche de fonctions). Parité vérifiée sur 495 éléments (0 différence). La CSP a maintenant `script-src` avec 16 hashs sha256, sans `'unsafe-inline'`.

### 11 octobre 2026
- Mis à jour : la vraie mission Artemis 2 n'est plus décrite comme « programmée » : vol d'essai autour de la Lune, lancé en avril 2026, amerrissage dans le Pacifique le 10 avril 2026 (équipage Wiseman, Glover, Koch, Hansen). Sources vérifiées le 11.10.2026 : NBC Palm Springs (10.04.2026), NASA. Le texte fictif du roman n'a pas été modifié.
- Corrigé : l'intro cinématique peut être fermée au clavier (le bouton × est maintenant un `<button>`, plus la touche Échap) ; la durée de 18,35 s de l'intro reste une décision artistique de l'auteur.
- Corrigé : les images du livre (servies depuis alexio.tf) ont un remplacement par le texte alternatif quand le réseau manque, au lieu d'une icône cassée.
- Corrigé : les fenêtres/surcouches fermées ne restent plus focalisables (visibility:hidden) ; `<footer>`, éléments décoratifs `aria-hidden`, pas de `tabindex` positif ; 0 violation axe-core à 1280 et 360 px.
- Ajouté : politique CSP (meta) avec les hôtes déclarés (alexio.tf, translate.googleapis.com, tts-proxy.chiuta.workers.dev, claude-proxy.alexio.workers.dev) ; cache du Service Worker pi-v12 (maintenant pi-v13).
- Inchangé : le compteur « lisent en ce moment » reste simulé et étiqueté comme tel ; la licence/les droits d'auteur n'ont pas été modifiés (décision de l'auteur).

## Auteur

Alexio — Alexandru-Ionuț Chiuță, contact : alexio@trom.tf

## Résumé

« Printre inteligențe » est un roman de science-fiction interactif (original roumain, avec des traductions en 7 langues), construit autour de la mission Artemis 2 de la NASA et publié sous forme d'application web : prologue, chapitres, épilogue, 17 scénarios alternatifs et 108 critiques fictives, avec un livre audio intégré. Il stocke les préférences, la progression de lecture et les textes de l'utilisateur dans localStorage. Il contacte alexio.tf (images), un proxy TTS sur Cloudflare Workers, Google Translate (seulement si vous choisissez une langue en dehors des 8 incluses) et un point d'accès d'API d'IA (seulement pour les fonctions génératives). Licence : MIT.

## Audit

Tour 2 (2026-10-11) : la requête de test vers le proxy TTS au chargement a été remplacée par un opt-in explicite dans le panneau des voix ; les formulations « hors ligne / sans télémétrie / s'exécute entièrement dans le navigateur » de l'en-tête, de la FAQ, de la page de confidentialité et du résumé EN ont été précisées (le texte du livre se lit hors ligne ; les images, la voix en ligne, la traduction et les fonctions d'IA utilisent des services externes) ; la note de fiction sur les noms réels des membres de l'équipage a été complétée dans la page (RO et EN). Licence : MIT.

Audit : 2026-10-10 — les affirmations réseau de ce README correspondent au code (fetch vers `tts-proxy.chiuta.workers.dev` — y compris une requête de test au chargement —, `translate.googleapis.com`, `window.PI_API_ENDPOINT` ; images de `alexio.tf`). L'en-tête de l'application dit « offline-first, sans télémétrie », et la page contient des formulations absolues (« s'exécute entièrement dans le navigateur », dans le résumé en anglais) qui ne tiennent pas compte de ces appels ; la licence a ensuite été fixée à MIT. Accessibilité corrigée (contraste dans tous les thèmes, étiquettes sur les champs de sélection).
