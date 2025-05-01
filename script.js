const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

// --- Base de données SceptiBot ---
// Structure: [ [liste_mots_cles], { fake: "Réponse Sceptique", hint: "Piste scientifique" } ]
// N'oubliez pas de compléter les indices manquants (marqués // TODO: Add hint)
const sceptiBotResponses = [
    // Exemples de base fournis avec indices
    [["pas réel", "neige", "arabie saoudite", "1998"], {
        fake: "Eh bien, il y a des études qui montrent que les températures n'ont pas augmenté depuis 1998. Et puis, il a neigé en Arabie saoudite cette année, ce qui prouve que le réchauffement climatique est une fausse alerte.",
        hint: "Indice : Attention à ne pas confondre météo (un événement ponctuel comme la neige) et climat (la tendance sur le long terme). Vérifie les courbes de température globale sur plusieurs décennies, pas juste depuis une année choisie spécifiquement (1998 était une année El Niño très chaude, un pic temporaire)."
    }],
    [["scientifiques disent", "consensus", "preuve"], {
        fake: "Les scientifiques sont souvent influencés par des intérêts politiques et économiques. Ils exagèrent les données pour obtenir des financements. Et puis, le climat a toujours changé naturellement, ce n'est pas nouveau.",
        hint: "Indice : Recherche le concept de 'consensus scientifique'. Combien de climatologues s'accordent sur la cause humaine du réchauffement ? Le fait que le climat ait changé naturellement par le passé n'exclut pas une cause humaine actuelle. Quelle est la vitesse du changement actuel comparée aux changements passés ?"
    }],
    [["forêts", "pôle nord", "chaud avant"], {
        fake: "Ces forêts prouvent que la Terre a connu des périodes beaucoup plus chaudes par le passé. Cela montre que le réchauffement actuel n'est pas anormal et n'est pas causé par l'homme.",
        hint: "Indice : Oui, le climat a été différent par le passé. Mais quelle était la cause de ces changements (ex: orbite terrestre, activité solaire) ? À quelle vitesse se sont-ils produits comparé à aujourd'hui ? La cause actuelle (émissions de GES) est-elle la même ?"
    }],
    [["graphiques", "augmentation", "températures globales"], {
        fake: "Les graphiques peuvent être trompeurs. Ils utilisent souvent des données manipulées pour montrer une tendance qui n'existe pas vraiment. Il faut se méfier des chiffres.",
        hint: "Indice : Qui produit ces graphiques ? S'agit-il d'organismes scientifiques reconnus (NASA, NOAA, Météo-France, GIEC) ? Vérifie si plusieurs sources indépendantes montrent la même tendance. Apprends à repérer les manipulations courantes (échelle tronquée, sélection de données...)."
    }],
    [["activités humaines", "responsables", "cause"], {
        fake: "Les activités humaines ont un impact minime comparé aux cycles naturels du climat. Le Soleil et les volcans ont une influence beaucoup plus grande sur les températures.",
        hint: "Indice : Recherche 'forçages radiatifs'. Quelle est l'influence mesurée du CO2 émis par l'homme comparée à celle des variations solaires et des éruptions volcaniques sur les dernières décennies ? Le GIEC fournit des graphiques clairs là-dessus."
    }],
    [["bonjour", "salut", "penses-tu"], {
        fake: "Bonjour ! Je pense que le changement climatique est exagéré par les scientifiques et les écologistes. Le GIEC, par exemple, exagère les risques climatiques.",
        hint: "Indice : Le GIEC (Groupe d'experts Intergouvernemental sur l'Évolution du Climat) synthétise des milliers d'études scientifiques. Leur travail est basé sur des preuves et revu par des centaines d'experts. En quoi consistent leurs rapports ? Sont-ils alarmistes ou basés sur des données ?"
    }],
    [["températures augmentent", "réchauffe"], {
        fake: "Les scientifiques changent souvent d'avis. D'ailleurs, les mesures de température ne sont pas fiables, les thermomètres sont souvent mal placés, près des villes.",
        hint: "Indice : La science évolue, mais le consensus sur le réchauffement se renforce. Recherche comment les scientifiques corrigent l'effet 'îlot de chaleur urbain' dans leurs mesures. Les données satellites confirment-elles les mesures au sol ?"
    }],
    [["inondations", "pluies", "torrent"], {
        fake: "Les inondations récurrentes sont la faute des écologistes qui refusent de curer les cours d'eau. Ils sont responsables de la destruction des villages par des blocs rocheux en refusant de canaliser et de dévier les torrents communaux.",
        hint: "Indice : Le curage excessif peut-il avoir des effets négatifs (accélération de l'eau, érosion en aval) ? Quel est le lien prouvé entre changement climatique et intensification des pluies extrêmes ? L'urbanisation (imperméabilisation des sols) joue-t-elle un rôle dans le ruissellement et les crues rapides ?"
    }],
     [["village", "détruit", "rocheux", "canaliser"], {
        fake: "Ce sont les écologistes les responsables de la destruction du village par des blocs rocheux parce qu'ils refusent de canaliser et de dévier le torrent communal pour protéger je ne sais quelle bestiole.",
        hint: "Indice : La canalisation et le détournement ont aussi des conséquences écologiques et peuvent parfois aggraver les risques en aval ou ailleurs. La protection de la biodiversité est-elle la seule raison de ne pas artificialiser tous les cours d'eau ? Quelle est la cause première de ces événements (pluies intenses, fonte rapide...) ?" // TODO: Refine hint if needed
    }],
    [["écologistes", "avis", "général"], {
        fake: "Les écologistes sont souvent des 'terroristes' verts qui veulent nous ramener à l'âge de pierre ! Ils nous empêchent de nous protéger de la nature.",
        hint: "Indice : Attention aux généralisations abusives et aux attaques personnelles ('terroristes'). Est-ce que tous les écologistes pensent la même chose ? Leurs propositions visent-elles un retour en arrière ou une adaptation durable ? Protéger les écosystèmes peut-il aussi nous protéger (zones humides contre inondations, forêts contre érosion) ?"
    }],
    [["confiance", "avertissements scientifiques"], {
        fake: "Il faut se méfier des avertissements provenant de scientifiques ; ils changent souvent d'avis pour obtenir plus de subventions.",
        hint: "Indice : La science se corrige et s'affine, c'est normal. Mais sur le sujet du climat, le message principal change-t-il fondamentalement depuis des décennies ? L'argument de la subvention est-il prouvé et généralisable à des milliers de chercheurs indépendants dans le monde ?"
    }],
    [["giec", "exagère"], {
        fake: "Absolument, le GIEC exagère les risques climatiques pour des raisons politiques. Leurs modèles sont très incertains.",
        hint: "Indice : Les rapports du GIEC indiquent des fourchettes de probabilité et des niveaux de confiance pour leurs conclusions. Est-ce de l'exagération ou une communication prudente de l'incertitude ? Les modèles climatiques sont complexes, mais ont-ils réussi à prévoir le réchauffement observé jusqu'ici ?"
    }],
    [["protection environnement", "salaire", "économie"], {
        fake: "La protection de l'environnement ne changera rien à mon faible salaire. Ce sont des préoccupations de riches des villes, ça nuit à l'économie réelle.",
        hint: "Indice : Les impacts du changement climatique (sécheresses, inondations, etc.) n'affectent-ils pas aussi l'économie et les populations les plus modestes ? La transition écologique ne peut-elle pas aussi créer de nouveaux emplois et de nouvelles filières économiques ?"
    }],
    [["nature", "voir"], {
        fake: "La nature est violente, pleine de maladies et de catastrophes. Notre but devrait être de la maîtriser, pas de la vénérer.",
        hint: "Indice : La nature a ses dangers, mais sommes-nous complètement séparés d'elle ? Quels sont les 'services écosystémiques' que la nature nous rend (pollinisation, purification de l'eau, air pur...) ? La 'maîtrise' totale est-elle possible ou souhaitable ?" // TODO: Add hint
    }],
    [["aider", "protéger nature"], {
        fake: "Les écologistes nous empêchent de nous protéger de la nature ! Ils nous interdisent de curer les rivières pour sauver les grenouilles, ou de construire des digues.",
        hint: "Indice : Est-ce une opposition systématique ou une demande de prise en compte des impacts environnementaux des aménagements ? Existe-t-il des solutions de protection 'basées sur la nature' (restauration de zones humides, etc.) qui peuvent être plus efficaces ou durables que des ouvrages lourds ?" // TODO: Add hint
    }],
    [["concepts", "dérèglement climatique", "biodiversité", "espèces"], {
        fake: "Ces concepts scientifiques comme « dérèglement climatique », « biodiversité », « espèces » sont des mots inventés par les gens des villes. Ils ne comprennent pas les problèmes des agriculteurs ou des gens normaux.",
        hint: "Indice : Le changement climatique (sécheresse, gel tardif...) n'affecte-t-il pas directement l'agriculture ? La biodiversité (pollinisateurs, santé des sols) n'est-elle pas essentielle pour l'agriculture ? Ces concepts décrivent des réalités observées, même s'ils utilisent un vocabulaire scientifique."
    }],
    [["agriculteurs", "problèmes"], {
        fake: "Les écologistes et les scientifiques ne font pas le poids face à mes problèmes d'agriculteur. Leurs théories sont déconnectées de la réalité du terrain.",
        hint: "Indice : Les scientifiques (agronomes, climatologues...) travaillent-ils sur les impacts du climat sur l'agriculture et les solutions d'adaptation ? Y a-t-il des agriculteurs qui expérimentent ou adoptent des pratiques différentes pour faire face à ces changements ?" // TODO: Add hint
    }],
    [["curer rivières", "grenouilles"], {
        fake: "On ne peut plus curer les rivières correctement à cause des écologistes qui veulent absolument sauver la moindre grenouille ou un bivalve rare, même si ça met en danger les habitants en aval !",
        hint: "Indice : La réglementation vise souvent à trouver un équilibre. Le curage a-t-il uniquement des effets positifs ? La présence de certaines espèces n'est-elle pas un indicateur de la bonne santé du cours d'eau, qui peut être bénéfique à long terme (auto-épuration...) ?" // TODO: Add hint
    }],
     [["détourner", "flux", "torrents", "bivalve"], {
        fake: "Les écologistes nous interdisent de détourner le flux rageur des torrents pour sauver une espèce rare de bivalve. C'est ridicule !",
        hint: "Indice : Quelles sont les conséquences écologiques de détourner un torrent (assèchement de zones, impact sur la faune/flore en aval) ? La protection des espèces est encadrée par la loi, mais est-ce la seule considération dans la gestion des cours d'eau ?" // TODO: Add hint
    }],
    // Arguments issus des documents OCR avec indices
    [["pétition", "oregon", "scientifiques signataires", "pas d'accord"], {
        fake: "Plus de 31 000 scientifiques américains ont signé la pétition de l'Oregon disant qu'il n'y a pas de preuve convaincante que l'homme cause un réchauffement catastrophique. Le CO2 est bon pour les plantes !",
        hint: "Indice : Vérifie la validité de cette pétition (qui pouvait signer ? Quelle expertise réelle en climatologie ? ~0.1% des signataires étaient climatologues). Compare ce chiffre au pourcentage du consensus scientifique (environ 97-100% des climatologues actifs). Le CO2 est utile aux plantes, mais son augmentation rapide a-t-elle seulement des effets positifs (limites, stress hydrique...) ?"
    }],
     [["glaciers", "scandinaves", "masse", "fonte"], {
        fake: "Certains glaciers, comme en Scandinavie, ont gagné en masse depuis les années 60. On nous ment sur la fonte généralisée !",
        hint: "Indice : Cherche 'bilan de masse des glaciers'. Est-ce qu'un ou quelques glaciers qui gagnent en masse (souvent dû à plus de neige localement) contredisent la tendance globale de fonte massive observée sur la quasi-totalité des glaciers du monde ? Regarde les graphiques globaux (ex: ceux du GIEC)."
    }],
     [["avis minoritaires", "dissident", "rester ouvert"], {
        fake: "Il faut rester ouvert et écouter les voix dissidentes, même si elles sont minoritaires. Le GIEC ne devrait pas ignorer ces scientifiques courageux.",
        hint: "Indice : La science progresse en examinant toutes les hypothèses, mais donne plus de poids aux preuves solides. Le GIEC synthétise la littérature scientifique publiée et évaluée par les pairs, y compris les vues minoritaires si elles sont publiées. Quelle est la différence entre 'être ouvert' et donner un poids égal à des théories sans preuves robustes ('fausse équivalence') ?"
    }],
      [["stable", "5 ans", "dernières années", "pause"], {
        fake: "Regardez les 5 dernières années, la température mondiale est plutôt stable. Où est l'accélération catastrophique dont on nous parle ?",
        hint: "Indice : Le climat se juge sur le long terme (au moins 30 ans). Choisir une courte période peut être trompeur à cause de la variabilité naturelle (El Niño/La Niña). Quelle est la tendance sur 30, 50, 100 ans ? Les 10 années les plus chaudes enregistrées se situent où dans l'histoire récente ? (Indice : elles sont presque toutes après 2010)."
    }],
    // Exemples type Trump avec indices
    [["éoliennes", "vent"], {
        fake: "Les éoliennes, c'est pas si écologique que ça. Elles coûtent cher, défigurent le paysage et certains disent même qu'elles pourraient avoir des effets sur la santé.",
        hint: "Indice : Compare l'impact environnemental (analyse de cycle de vie, émissions de GES évitées) des éoliennes à celui des énergies fossiles. Les études scientifiques sérieuses montrent-elles des effets négatifs avérés sur la santé à distance réglementaire ? L'impact paysager est subjectif, mais quel est l'impact global (pollution, climat) des différentes sources d'énergie ?"
    }],
    [["chinois", "chine", "hoax", "complot"], {
        fake: "Cette histoire de réchauffement climatique, ça arrange bien certains pays pour freiner l'économie des autres, non ? C'est peut-être juste une question de compétition économique mondiale.",
        hint: "Indice : Les preuves scientifiques du changement climatique viennent de chercheurs du monde entier, publiées dans des revues internationales. La Chine est-elle aussi affectée par le changement climatique (inondations, sécheresses) ? Est-elle en train d'investir massivement dans les énergies renouvelables et les véhicules électriques ?"
    }],
    [["froid", "hiver", "neige", "encore"], {
        fake: "Il fait un froid glacial cet hiver ! Où est passé le réchauffement climatique dont tout le monde parle ? C'est bien la preuve que tout ça est exagéré.",
        hint: "Indice : Encore une fois, quelle est la différence entre la météo (le temps qu'il fait aujourd'hui ou cette semaine dans une région) et le climat (la tendance globale sur le long terme) ? Le réchauffement global peut-il paradoxalement entraîner des événements froids plus intenses dans certaines régions (perturbation du Jet Stream, humidité accrue pour neige) ?"
    }],

    // Réponse par défaut avec indice générique
    [["default"], {
        fake:"C'est une question complexe, et beaucoup de scientifiques ne sont pas d'accord avec la version officielle alarmiste. Il y a beaucoup d'incertitudes et d'exagérations.",
        hint: "Indice : Recherche le consensus scientifique sur le sujet précis de ta question. Quelles sont les sources fiables (GIEC, académies des sciences, grandes agences météo/spatiales) ? Attention à l'argument 'il y a débat' qui minimise souvent un consensus très large (>97%) parmi les experts du climat."
        }]
];

// Fonction pour ajouter un message au chatbox
function addMessage(messageData, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');

    const paragraph = document.createElement('p');

    if (sender === 'user') {
        paragraph.textContent = messageData; // User message is just text
        messageElement.appendChild(paragraph); // Append paragraph directly for user
    } else {
        // Bot message contains fake response and hint
        paragraph.textContent = messageData.fake; // Display the fake response
        messageElement.appendChild(paragraph); // Append fake response paragraph

        // Only add hint button if there's a hint defined
        if (messageData.hint && messageData.hint.trim() !== "") {
            // Create hint button
            const hintButton = document.createElement('button');
            hintButton.classList.add('hint-button');
            hintButton.textContent = 'Afficher un indice 🤔';

            // Create hint text container (initially hidden)
            const hintText = document.createElement('div');
            hintText.classList.add('hint-text');
            hintText.textContent = messageData.hint; // The actual hint text
            hintText.style.display = 'none'; // Hide it initially

            // Add click listener to the button to reveal the hint
            hintButton.addEventListener('click', () => {
                // Toggle hint visibility
                const isHidden = hintText.style.display === 'none';
                hintText.style.display = isHidden ? 'block' : 'none';
                hintButton.textContent = isHidden ? 'Masquer l\'indice' : 'Afficher un indice 🤔';
            });

            // Append hint button and text below the message paragraph
            messageElement.appendChild(hintButton);
            messageElement.appendChild(hintText);
        }
    }

    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight; // Scroll down
}

// Fonction pour obtenir la réponse de SceptiBot (retourne l'objet {fake, hint})
function getBotResponse(userText) {
    const lowerCaseUserText = userText.toLowerCase().trim();

    if (lowerCaseUserText === "") {
        // Return a default structure even for empty input if needed, or handle differently
        return { fake: "Tu n'as rien demandé...", hint: "Pose une question sur le climat pour commencer." };
    }

    for (const [keywords, responseObj] of sceptiBotResponses) {
        if (keywords[0] === "default") continue;
        // Check if *all* keywords in the list are present (more specific)
        // OR if *any* keyword is present (less specific - using .some)
        // Let's stick to 'any' for broader matching:
        const foundKeyword = keywords.some(keyword => lowerCaseUserText.includes(keyword));
        if (foundKeyword) {
            return responseObj; // Return the whole object {fake, hint}
        }
    }

    // Return the default object {fake, hint}
    const defaultEntry = sceptiBotResponses.find(item => item[0][0] === "default");
    // Ensure defaultEntry and its second element exist before accessing properties
    return defaultEntry && defaultEntry[1] ? defaultEntry[1] : { fake: "Je ne suis pas sûr de comprendre ta question. Essaie de reformuler.", hint: "Vérifie si ta question porte bien sur le climat et essaie d'utiliser des mots-clés simples." };
}

// Fonction pour gérer l'envoi de message
function handleSend() {
    const userText = userInput.value;
    if (userText.trim() === "") return;

    addMessage(userText, 'user'); // Pass the text directly
    userInput.value = '';

    // Simule une petite attente avant la réponse du bot
    setTimeout(() => {
        const botResponseData = getBotResponse(userText); // Gets {fake, hint} object
        addMessage(botResponseData, 'bot'); // Pass the whole object
    }, 500); // 500ms de délai
}

// --- Event Listeners ---
sendButton.addEventListener('click', handleSend);
userInput.addEventListener('keypress', function(event) {
    // Permet d'envoyer avec la touche Entrée
    if (event.key === 'Enter') {
        handleSend();
    }
});