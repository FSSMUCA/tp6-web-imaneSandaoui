[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=22006261&assignment_repo_type=AssignmentRepo)
# TP 6 : Mini-Application Web Avancée (HTML + CSS + JS) & Introduction au PHP
Ce TP vise à combiner les technologies HTML, CSS et JavaScript pour construire une mini-application web dynamique.<br>
Une deuxième petite partie introduit PHP à partir de l’affichage de variables simples (sans formulaires).<br>

## Travail Demandé
Vous devez créer une page Web professionnelle et interactive, qui :<br>
Utilise une structure HTML sémantique<br>
Utilise un design responsive CSS moderne<br>
Manipule le DOM via JavaScript<br>
Implémente une petite calculatrice locale<br>
Affiche dans une autre page PHP des variables simples<br>

## Structure des fichiers 
tp6-web/<br>
│ index.html<br>
│ style.css<br>
│ app.js<br>
└─ info.php<br>

# Partie 1 — HTML (Interface)

## Créez un fichier index.html contenant :<br>
une structure sémantique (header, main, footer)<br>
un titre<br>
un formulaire avec :<br>
Nombre A<br>
Nombre B<br>
Menu déroulant (choix de l’opération : + − × ÷)<br>
Bouton “Calculer”<br>
une zone d’affichage des messages d’erreurs<br>
une section “Historique des opérations”<br>

# Partie 2 — CSS

Dans le fichier style.css, vous devez :<br>
Utiliser Flexbox ou Grid<br>
Rendre la page responsive<br>
Ajouter effets hover/transitions<br>
Créer une card visuelle pour afficher l’historique<br>

# Partie 3 — JavaScript (DOM & Validation)

Le fichier app.js doit contenir :<br>
Récupération des valeurs saisies dans le formulaire<br>
Validation des données :<br>
Vérifier que les champs ne sont pas vides<br>
Interdire la division par zéro<br>
Affichage dynamique des erreurs dans la page (pas d’alert())<br>
Ajout des opérations dans un tableau JS<br>
Mise à jour de la section “Historique” :<br>
Affichage dynamique (DOM)<br>
Historique visible sous forme de liste<br>

# Partie 4 — Introduction au PHP 
Créer un fichier info.php qui :<br>
Déclare plusieurs variables PHP<br>
chaînes de caractères<br>
entiers<br>
résultats d'opérations<br>
Les affiche dans la page avec echo<br>
Effectue des calculs simples<br>
Affiche les résultats dans une page structurée<br>

## Exemple de contenu attendu :
Nom de l’établissement<br>
Module<br>
Année<br>
Exemples de variables numériques<br>
Résultat d’addition et multiplication<br>
