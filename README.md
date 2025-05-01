# SceptiBot - Outil Pédagogique sur le Climatoscepticisme

## 🎯 Objectif

SceptiBot est un chatbot **éducatif** conçu pour les élèves (niveau collège et plus) afin de les aider à développer leur **esprit critique** face à la désinformation sur le changement climatique.

Il simule une conversation avec un climatosceptique en utilisant des arguments fallacieux, des données erronées, des théories obsolètes et des techniques de mauvaise foi couramment rencontrées.

**Le but N'EST PAS de propager ces idées fausses, mais de permettre aux élèves de s'entraîner à :**

1.  **Identifier** les arguments non scientifiques ou trompeurs.
2.  **Rechercher** des informations factuelles et vérifiées auprès de sources fiables (GIEC, organismes scientifiques reconnus).
3.  **Formuler** des contre-arguments basés sur des preuves scientifiques solides.
4.  **Comprendre** les mécanismes de la désinformation.

## ⚠️ Avertissement Important !

*   **SceptiBot est un personnage fictif qui raconte volontairement des contre-vérités.** Ses réponses sont conçues pour être trompeuses et illogiques.
*   **NE PRENEZ JAMAIS ses affirmations au sérieux.** Elles ne reflètent absolument pas le consensus scientifique sur le changement climatique.
*   Utilisez cet outil dans un cadre pédagogique supervisé, en encourageant activement la **vérification des faits** et la **consultation de sources fiables**.

## 🚀 Comment l'utiliser

1.  Clonez ce dépôt ou téléchargez les fichiers (`index.html`, `style.css`, `script.js`).
2.  Ouvrez le fichier `index.html` dans votre navigateur web.
3.  Lisez attentivement les **Instructions pour l'Utilisateur** affichées sur la page.
4.  Posez des questions à SceptiBot sur le changement climatique dans la zone de saisie.
5.  Analysez sa réponse :
    *   Quel type d'argument utilise-t-il (minimisation, attaque personnelle, cherry-picking, fausse équivalence, théorie du complot, etc.) ?
    *   Sur quelles "preuves" (souvent erronées ou hors contexte) s'appuie-t-il ?
    *   Comment pourriez-vous lui répondre en utilisant des faits scientifiques avérés ?

## 🔧 Fonctionnement Technique

Ce chatbot est très simple et fonctionne entièrement côté client (dans votre navigateur) :

*   **HTML (`index.html`) :** Structure la page web et l'interface de chat.
*   **CSS (`style.css`) :** Définit l'apparence visuelle du chat.
*   **JavaScript (`script.js`) :** Contient la logique du chatbot :
    *   Une base de données de paires "mots-clés / réponse climatosceptique".
    *   Une fonction qui cherche des mots-clés dans la question de l'utilisateur.
    *   Affiche la réponse correspondante ou une réponse par défaut si aucun mot-clé n'est trouvé.
    *   Il n'utilise **pas d'intelligence artificielle complexe**, juste une correspondance de mots-clés simple.

## 🤝 Contribution

Cet outil est basique. Des améliorations sont possibles (ajout de plus d'arguments, amélioration de la détection des questions, etc.). N'hésitez pas à forker le projet et proposer des améliorations dans un but pédagogique. Rappelez-vous toujours l'objectif principal : l'éducation à l'esprit critique.
