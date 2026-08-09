import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const brandNewArticles = [
  {
    title: "Les 7 piliers de la maintenance préventive industrielle en zone tropicale",
    slug: "7-piliers-maintenance-preventive-industrielle-zone-tropicale",
    category: "Maintenance Industrielle",
    excerpt: "Comment concevoir un plan de maintenance préventive efficace adapté aux contraintes de chaleur, d'humidité et d'instabilité réseau en Afrique centrale.",
    cover_url: "/images/hero.jpg",
    status: "published",
    content: `
      <h2>Pourquoi adapter la maintenance industrielle au climat d'Afrique centrale ?</h2>
      <p>Dans les bassins industriels de Douala, Yaoundé, Bafoussam ou Garoua, les équipements de production et les centrales d'énergie sont soumis à des contraintes environnementales et réseau d'une sévérité exceptionnelle. L'humidité élevée, la poussière en saison sèche et les fortes variations de tension du réseau électrique ENEO mettent à rude épreuve les composants mécaniques et électroniques.</p>

      <div class="bg-blue-50 p-4 border-l-4 border-blue-600 my-6 font-medium text-slate-800 rounded-r">
        <strong>Constat du pôle ingénierie ME2I :</strong> Une machine entretenue selon un protocole européen standard sans adaptation au climat tropical subit une détérioration prématurée de 35% de sa durée de vie théorique.
      </div>

      <h2>1. La gestion rigoureuse du risque thermique</h2>
      <p>La surchauffe est l'ennemi numéro un des blocs moteurs et des variateurs de vitesse. La maintenance préventive doit inclure le rinçage régulier des échangeurs thermiques, le nettoyage au solvant neutre des ailettes de radiateur et le contrôle de l'efficacité des ventilateurs d'extraction de local.</p>

      <h2>2. La protection anti-corrosion et déshydratation des coffrets</h2>
      <p>L'air marin saturé d'humidité à Douala accélère l'oxydation des contacts électriques. L'installation de résistances chauffantes anti-condensation et le traitement des borniers par vernis de protection diélectrique sont indispensables pour prévenir les amorçages d'arcs.</p>

      <h2>3. La filtration renforcée des fluides et de l'air</h2>
      <p>L'air ambiant contient d'importantes quantités de poussières siliceuses. L'utilisation de filtres à air à haute efficacité et le pré-filtrage séparateur d'eau sur les lignes de gasoil protègent les injecteurs et les cylindres contre l'abrasion.</p>

      <h2>4. La planification basée sur les heures réelles de fonctionnement</h2>
      <p>Plutôt qu'un calendrier calendaire fixe, la maintenance doit être déclenchée sur la base du comptage d'heures réelles ou du nombre de cycles de démarrage. Un suivi rigoureux permet de programmer les vidanges et révisions avant l'apparition de l'usure critique.</p>

      <h2>5. Le contrôle thermographique et le resserrage des connexions</h2>
      <p>Les vibrations continues provoquant le desserrage des câbles, le contrôle annuel par caméra thermique infrarouge permet de détecter les points chauds sur les jeux de barres et disjoncteurs de puissance avant qu'ils ne provoquent un incendie.</p>

      <h2>6. La montée en compétences des opérateurs locaux</h2>
      <p>Un plan de maintenance efficace repose sur la réactivité du personnel de conduite. ME2I forme les techniciens d'usine aux rondes d'inspection quotidiennes, aux relevés de paramètres et à la détection précoce des bruits anormaux.</p>

      <h2>7. Le stock stratégique de pièces d'usure à roulement rapide</h2>
      <p>Disposer sur site des filtres, courroies, relais, fusibles ultra-rapides et sondes de température clés permet de résoudre les pannes courantes en quelques minutes sans attendre des approvisionnements extérieurs.</p>

      <p>Faites appel aux experts ME2I pour auditer vos lignes de production et mettre en place un plan de maintenance préventive sur mesure.</p>
    `
  },
  {
    title: "Diagnostiquer les pannes fréquentes sur les alternateurs industriels sans balais",
    slug: "diagnostiquer-pannes-frequentes-alternateurs-industriels-sans-balais",
    category: "Génie Électrique",
    excerpt: "Guide pratique de dépannage des alternateurs brushless : contrôle du pont de diodes, régulateur AVR et excitation de secours.",
    cover_url: "/og-preview.png",
    status: "published",
    content: `
      <h2>Comprendre le principe de l'alternateur synchrone brushless</h2>
      <p>Les alternateurs industriels modernes (Stamford, Leroy Somer, Mecc Alte) sont dits "sans balais" (brushless). Ils n'utilisent plus de charbons ni de bagues glissantes pour alimenter le rotor, ce qui réduit considérablement les besoins d'entretien mécanique. En contrepartie, leur système d'excitation repose sur un ensemble de composants électroniques et semi-conducteurs montés en rotation.</p>

      <h2>Panne 1 : Absence totale de tension de sortie en charge</h2>
      <p>Si le moteur diesel tourne à sa vitesse nominale (1500 tr/min pour 50 Hz) mais que le voltmètre indique zéro volt, plusieurs causes doivent être vérifiées méthodiquement :</p>
      <ul>
        <li><strong>Démagnétisation du magnétisme rémanent :</strong> Si le groupe n'a pas tourné depuis longtemps, la roue polaire a pu perdre son aimantation résiduelle. Une brève ré-excitation par batterie 12V (remagnétisation) réamorce le système.</li>
        <li><strong>Coupure du pont de diodes rotatives :</strong> Si une diode est grillée en circuit ouvert, l'excitation s'arrête instantanément.</li>
        <li><strong>Fusible du régulateur AVR fondu :</strong> Vérifier la continuité du fusible de protection du régulateur de tension.</li>
      </ul>

      <div class="bg-amber-50 p-4 border-l-4 border-amber-500 my-6 font-medium text-slate-800 rounded-r">
        <strong>Règle de sécurité :</strong> Les tests de résistance d'isolement au mégohmmètre (Megger 500V/1000V) doivent impérativement être effectués après avoir déconnecté le régulateur AVR sous peine de détruire l'électronique de contrôle.
      </div>

      <h2>Panne 2 : Tension de sortie trop faible ou instable</h2>
      <p>Une tension qui chute fortement lors du démarrage d'un moteur électrique indique généralement un mauvais réglage de la compensation de fréquence (U/f) sur le régulateur AVR ou un pont de diodes partiellement défectueux (une seule diode en court-circuit).</p>

      <h2>Panne 3 : Échauffement anormal et bruits magnétiques</h2>
      <p>Un réchauffement excessif de la carcasse de l'alternateur traduit un déséquilibre important des charges entre les trois phases ou la présence d'harmoniques de courant dues à des équipements non-linéaires importants (variateurs de vitesse sans filtre).</p>

      <p>Les techniciens ME2I réalisent le diagnostic sur site, le rembobinage et la remise en état complète de vos alternateurs industriels au Cameroun.</p>
    `
  },
  {
    title: "Automatisme industriel : Comment réussir la migration de vos anciens automates PLC",
    slug: "automatisme-industriel-reussir-migration-anciens-automates-plc",
    category: "Automatisme et Contrôle",
    excerpt: "Stratégies et étapes clés pour moderniser vos armoires d'automatisme et éviter l'obsolescence des composants électroniques.",
    cover_url: "/images/hero.jpg",
    status: "published",
    content: `
      <h2>L'enjeu de la modernisation des lignes de production</h2>
      <p>Dans de nombreuses usines de transformation et chaînes de conditionnement au Cameroun, les armoires d'automatisme fonctionnent encore avec des automates programmables (PLC) de génération précédente (Siemens S5, TSX Premium, Omron C200H). La rareté des pièces de rechange et l'impossibilité de trouver des consoles de programmation adaptées font peser un risque critique d'arrêt prolongé.</p>

      <h2>Les étapes clés d'un projet de rétrofit d'automatisme réussi</h2>
      
      <h3>1. Audit préalable et sauvegarde des programmes sources</h3>
      <p>Avant toute intervention physique, les automaticiens ME2I procèdent à l'extraction et au sauvetage des programmes existants, à l'analyse des schémas électriques et au relevé exhaustif des entrées/sorties physiques et réseaux de terrain.</p>

      <h3>2. Choix de la nouvelle plateforme matérielle</h3>
      <p>Le choix s'oriente vers des gammes modernes pérennes (Schneider Modicon M241/M262, Siemens S7-1200/1500) offrant des communications Ethernet/IP, Modbus TCP et une intégration aisée avec des écrans tactiles IHM ergonomiques.</p>

      <h3>3. Réécriture et conversion des programmes</h3>
      <p>Le code écrit en langage Ladder ou Liste d'instructions est restructuré selon la norme IEC 61131-3 avec intégration de blocs de sécurité, de fonctions de diagnostic enrichies et d'alarmes explicites pour les opérateurs.</p>

      <div class="bg-blue-50 p-4 border-l-4 border-blue-600 my-6 font-medium text-slate-800 rounded-r">
        <strong>Bénéfice immédiat :</strong> La migration permet d'ajouter des fonctionnalités de supervision à distance SCADA et d'enregistrer l'historique des cadences et des pannes sur ordinateur ou tablette.
      </div>

      <h3>4. Essais à blanc et recette sur site</h3>
      <p>Le câblage des nouvelles platines d'automatisme est testé à l'atelier avant d'être implanté lors d'un arrêt de production planifié. Les essais sous signaux simulés garantissent un redémarrage de la ligne en quelques heures.</p>

      <p>Confiez la modernisation de vos automates industriels au pôle automatisme et contrôle de ME2I à Douala.</p>
    `
  },
  {
    title: "Optimisation du facteur de puissance : Supprimer les pénalités d'énergie réactive",
    slug: "optimisation-facteur-puissance-supprimer-penalites-energie-reactive",
    category: "Efficacité Énergétique",
    excerpt: "Tout savoir sur l'installation des batteries de condensateurs automatiques pour améliorer le Cos Phi et réduire la facture ENEO.",
    cover_url: "/og-preview.png",
    status: "published",
    content: `
      <h2>Comprendre l'énergie réactive et l'impact sur votre facture</h2>
      <p>Les équipements industriels comportant des enroulements magnétiques (moteurs électriques, transformateurs, machines à souder, ballasts de chauffage) consomment deux types d'énergie : l'énergie active (exprimée en kWh), qui produit le travail mécanique utile, et l'énergie réactive (exprimée en kVARh), nécessaire magnétiser les circuits.</p>

      <p>Lorsque la proportion d'énergie réactive devient trop importante, le facteur de puissance (Cos Phi) chute en dessous du seuil de 0,90. Le fournisseur d'électricité ENEO applique alors des pénalités financières substantielles sur la facture mensuelle.</p>

      <h2>Comment fonctionne une batterie de condensateurs automatique ?</h2>
      <p>Une armoire de compensation de puissance réactive contient des gradins de condensateurs de puissance pilotés par un régulateur varmétrique intelligent. Le régulateur mesure en temps réel le déphasage entre le courant et la tension au TGBT et enclenche automatiquement le nombre exact de condensateurs nécessaires pour maintenir un Cos Phi proche de 0,98.</p>

      <h2>Les avantages financiers et techniques de la compensation</h2>
      <ul>
        <li><strong>Suppression totale des pénalités ENEO :</strong> Élimination immédiate des lignes d'amende réactive sur votre facture.</li>
        <li><strong>Réduction de l'intensité en ligne :</strong> Diminution des pertes par effet Joule dans vos câbles et transformateurs.</li>
        <li><strong>Libération de puissance apparente :</strong> Augmentation de la capacité disponible sur votre transformateur privé sans changer d'abonnement.</li>
      </ul>

      <div class="bg-emerald-50 p-4 border-l-4 border-emerald-600 my-6 font-medium text-slate-800 rounded-r">
        <strong>Retour sur investissement ultra-rapide :</strong> Pour la majorité des PME industrielles au Cameroun, l'installation d'une armoire de condensateurs ME2I est amortie en 6 à 14 mois uniquement grâce aux économies réalisées sur la facture électrique.
      </div>

      <p>Contactez le pôle efficacité énergétique ME2I pour réaliser la mesure de votre Cos Phi et dimensionner votre armoire de compensation.</p>
    `
  },
  {
    title: "Maintenance des groupes électrogènes de forte puissance (500kVA à 2000kVA)",
    slug: "maintenance-groupes-electrogenes-forte-puissance-500kva-2000kva",
    category: "Groupes Électrogènes",
    excerpt: "Les spécificités d'entretien des générateurs à très forte capacité installés dans les usines, data centers et hôpitaux.",
    cover_url: "/images/hero.jpg",
    status: "published",
    content: `
      <h2>Les exigences particulières des centrales de production de forte capacité</h2>
      <p>Les groupes électrogènes de forte puissance (500kVA, 1000kVA, 1500kVA ou 2000kVA) équipés de moteurs lourds V12 ou V16 (Cummins QSK, Caterpillar 3500, MTU Series 4000, Perkins 4000) demandent une rigueur d'exploitation totalement différente des petits générateurs de chantier.</p>

      <h2>La gestion des systèmes d'injection à haute pression (Common Rail)</h2>
      <p>Ces moteurs modernes nécessitent un carburant d'une propreté absolue. La présence d'eau ou de micro-particules dans le gasoil détruit les injecteurs-pompes en quelques dizaines d'heures. ME2I préconise l'installation de double filtres séparateurs d'eau avec purges automatiques et capteurs de présence d'eau raccordés à l'automate.</p>

      <h2>Analyse physico-chimique des huiles de lubrification</h2>
      <p>Sur les carters d'huile contenant plus de 200 litres de lubrifiant, la vidange systématique par heures est complétée par des prélèvements réguliers envoyés en laboratoire. L'analyse d'huile permet d'évaluer la viscosité, la sulfitation, la présence d'éthylène glycol (fuite de joint de culasse) ou de particules de métaux d'usure (coussinets de bielle, segments).</p>

      <h2>Le maintien en température constante (Réchauffeur de bloc)</h2>
      <p>Pour garantir un démarrage et une prise de charge immédiate en moins de 10 secondes sans usure prématurée du haut moteur, le circuit de refroidissement doit être maintenu en permanence entre 40°C et 50°C via des réchauffeurs d'eau thermostatiques monophasés ou triphasés.</p>

      <div class="bg-blue-50 p-4 border-l-4 border-blue-600 my-6 font-medium text-slate-800 rounded-r">
        <strong>Expertise ME2I :</strong> Nos équipes mobiles disposent des bancs de charge mobiles et des valises de diagnostic constructeurs pour intervenir 24h/24 et 7j/7 sur les centrales d'énergie de forte puissance au Cameroun.
      </div>
    `
  },
  {
    title: "Sécurité des armoires électriques industrielles : Prévenir les risques d'arc électrique",
    slug: "securite-armoires-electriques-industrielles-prevenir-risques-arc-electrique",
    category: "Sécurité et Normes",
    excerpt: "Les normes de protection et bonnes pratiques pour sécuriser les TGBT et armoires de puissance contre les courts-circuits violents.",
    cover_url: "/og-preview.png",
    status: "published",
    content: `
      <h2>Qu'est-ce qu'un arc électrique industriel et quelles sont ses conséquences ?</h2>
      <p>L'arc électrique (Arc Flash) est une décharge électrique explosive se produisant à travers l'air entre deux conducteurs sous haute ou basse tension. Il génère instantanément des températures dépassant 10 000 °C, une onde de choc violente et des projections de métal en fusion. C'est l'un des accidents les plus graves en milieu industriel.</p>

      <h2>Les principales causes de déclenchement d'arcs</h2>
      <ul>
        <li><strong>Desserrage mécanique des connexions :</strong> L'échauffement par résistance crée la fusion de l'isolant et l'amorçage.</li>
        <li><strong>Intrusion d'objets ou de corps étrangers :</strong> Poussières conductrices, humidité condensée ou petits rongeurs introduits dans le TGBT.</li>
        <li><strong>Erreurs de manipulation lors de consignations :</strong> Utilisation d'outillage non isolé ou fausse manœuvre sous tension.</li>
      </ul>

      <h2>Mesures de prévention et mise aux normes par ME2I</h2>
      
      <h3>1. Inspections thermographiques infrarouges périodiques</h3>
      <p>Un contrôle thermographique annuel sans interruption de service permet de repérer les connexions anormalement chaudes et de programmer le resserrage hors tension lors des arrêts techniques.</p>

      <h3>2. Cloisonnement interne (Forme 2, 3 et 4)</h3>
      <p>Conformément à la norme IEC 61439-2, la séparation physique entre les jeux de barres, les appareils de coupure et les départs câbles limite la propagation d'un court-circuit à un seul compartiment.</p>

      <h3>3. Installation de délecteurs d'arc photodétecteurs</h3>
      <p>Les relais de protection d'arc modernes intègrent des fibres optiques sensibles aux éclairs de lumière qui déclenchent le disjoncteur général en moins de 15 millisecondes, étouffant l'arc avant qu'il ne se développe.</p>

      <p>Sécurisez vos tableaux généraux basse tension (TGBT) et armoires de puissance avec l'audit de sécurité ME2I.</p>
    `
  },
  {
    title: "Les secrets d'un réseau électrique ondulé sans coupure pour serveurs et équipements critiques",
    slug: "secrets-reseau-electrique-ondule-sans-coupure-equipements-critiques",
    category: "Énergie Sans Interruption",
    excerpt: "Comment associer un réseau d'onduleurs triphasés Online Double Conversion avec un groupe électrogène pour une disponibilité à 99,99%.",
    cover_url: "/images/hero.jpg",
    status: "published",
    content: `
      <h2>Pourquoi le groupe électrogène seul ne suffit pas pour l'informatique et les télécoms</h2>
      <p>Lors d'une coupure du réseau public ENEO, un groupe électrogène automatique met entre 5 et 15 secondes pour démarrer, se stabiliser et fermer son inverseur de source. Pour des serveurs informatiques, des dispositifs médicaux ou des automates de processus, cette micro-coupure provoque un crash immédiat et la perte de données.</p>

      <h2>Le rôle indispensable de l'onduleur (UPS) Online Double Conversion</h2>
      <p>L'onduleur de technologie Online (VFI - Voltage and Frequency Independent) redresse en permanence le courant alternatif du réseau en courant continu pour charger les batteries, puis re-fabrique un courant alternatif sinusoïdal d'une pureté parfaite via son onduleur IGBT.</p>

      <p>En cas de coupure secteur, la bascule sur batterie se fait à <strong>0 millisecondes (sans rupture)</strong>. L'onduleur alimente les équipements pendant le temps nécessaire au démarrage du groupe électrogène.</p>

      <h2>Les composants à surveiller dans une chaîne de secours</h2>
      <ul>
        <li><strong>Le parc de batteries :</strong> Test régulier de capacité par décharge sous banc. Une seule batterie défectueuse dans une chaîne en série peut neutraliser tout l'onduleur.</li>
        <li><strong>Les ventilateurs de refroidissement de l'UPS :</strong> À remplacer tous les 3 à 5 ans pour éviter la mise en bypass thermique.</li>
        <li><strong>Le bypass statique et manuel de maintenance :</strong> Permet d'isoler l'onduleur pour révision sans couper l'alimentation des serveurs.</li>
      </ul>

      <div class="bg-blue-50 p-4 border-l-4 border-blue-600 my-6 font-medium text-slate-800 rounded-r">
        <strong>Architecture globale ME2I :</strong> Nos ingénieurs conçoivent des schémas d'alimentation sécurisée intégrant l'onduleur triphasé, l'inverseur ATS et le groupe électrogène pour atteindre des disponibilités de 99,99%.
      </div>
    `
  },
  {
    title: "Froid industriel : Maintenance préventive des centrales frigorifiques et évaporateurs",
    slug: "froid-industriel-maintenance-preventive-centrales-frigorifiques-evaporateurs",
    category: "Froid Industriel",
    excerpt: "Les règles d'or pour assurer le rendement thermique des compresseurs frigorifiques et éliminer le givrage des évaporateurs.",
    cover_url: "/og-preview.png",
    status: "published",
    content: `
      <h2>Maintenir la chaîne du froid dans l'agroalimentaire et la santé</h2>
      <p>Les centrales frigorifiques industrielles à plusieurs compresseurs (Bitzer, Copeland, Danfoss) constituent le cœur thermique des abattoirs, des usines de transformation du poisson, des brasseries et des entrepôts sous température contrôlée à Douala et dans toute la région.</p>

      <h2>Opérations clés de la maintenance des centrales frigorifiques</h2>
      
      <h3>1. Analyse des pressions et de la sous-chauffe / surchauffe</h3>
      <p>Les techniciens frigoristes ME2I contrôlent les manomètres haute pression (HP) et basse pression (BP), mesurent la surchauffe à l'évaporateur et le sous-refroidissement au condenseur pour valider la charge optimale de fluide frigorigène.</p>

      <h3>2. Contrôle de l'huile compresseur et détection d'acidité</h3>
      <p>L'huile de lubrification des compresseurs frigorifiques absorbe l'humidité et les résidus de décomposition du fluide en cas de surchauffe. Un test d'acidité d'huile prévient le grillage du bobinage du moteur hermétique ou semi-hermétique.</p>

      <h3>3. Dégivrage et nettoyage des évaporateurs</h3>
      <p>La formation de givre sur les ailettes des évaporateurs bloque la circulation de l'air et réduit drastiquement l'échange thermique. Le contrôle des résistances de dégivrage, des vannes de gaz chaud et le nettoyage des bacs de condensats évitent le gel complet du bloc.</p>

      <h3>4. Entretien des condenseurs à air extérieurs</h3>
      <p>Installés en toiture ou en extérieur, les condenseurs s'encrassent rapidement de poussière. Un lavage périodique à l'eau sous pression modérée abaisse la pression de condensation et réduit la consommation électrique de 15% à 25%.</p>

      <p>Confiez l'entretien et le dépannage de vos centrales de froid industriel aux équipes qualifiées ME2I.</p>
    `
  },
  {
    title: "Pompage solaire et irrigation agricole : Dimensionner une installation autonome durable",
    slug: "pompage-solaire-irrigation-agricole-dimensionner-installation-autonome",
    category: "Énergies Renouvelables",
    excerpt: "Guide technique pour calculer la puissance photovoltaïque et choisir le variateur de vitesse solaire adapté aux pompes immergées.",
    cover_url: "/images/hero.jpg",
    status: "published",
    content: `
      <h2>L'accès à l'eau sans carburant pour l'agriculture et les sites isolés</h2>
      <p>Le pompage solaire au fil du soleil représente l'une des solutions énergétiques les plus rentables en Afrique centrale. Il permet d'extraire l'eau de forages ou de rivières pour l'irrigation agricole, l'abreuvement du bétail ou l'alimentation en eau potable des villages sans dépendre du gasoil ni des batteries.</p>

      <h2>Les composants d'un système de pompage solaire autonome</h2>
      <ul>
        <li><strong>Le champ photovoltaïque :</strong> Modules solaires monocristallins dimensionnés pour fournir la tension et le courant requis aux heures de fort ensoleillement.</li>
        <li><strong>Le variateur de vitesse solaire MPPT :</strong> Convertit le courant continu des panneaux en courant alternatif triphasé à fréquence variable pour alimenter directement la pompe immergée. La fonction MPPT ajuste en permanence la vitesse de la pompe selon l'ensoleillement disponible.</li>
        <li><strong>La pompe immergée ou de surface :</strong> Pompe hydraulique en acier inoxydable conçue pour fonctionner avec des fréquences variables de 25 Hz à 50 Hz.</li>
        <li><strong>Le réservoir de stockage en hauteur :</strong> L'eau est stockée dans un château d'eau pendant la journée pour assurer une distribution par gravité la nuit, remplaçant avantageusement le stockage par batteries.</li>
      </ul>

      <div class="bg-emerald-50 p-4 border-l-4 border-emerald-600 my-6 font-medium text-slate-800 rounded-r">
        <strong>Dimensionnement sur mesure :</strong> ME2I réalise le calcul précis de la Hauteur Manométrique Totale (HMT), des pertes de charge dans les conduites et du volume d'eau journalier nécessaire pour installer une station de pompage solaire fiable et garantie.
      </div>
    `
  },
  {
    title: "L'importance des tests sous banc de charge pour valider vos groupes électrogènes",
    slug: "importance-tests-sous-banc-de-charge-valider-groupes-electrogenes",
    category: "Audit et Contrôle",
    excerpt: "Pourquoi et comment réaliser un essai de puissance réelle sous banc de charge résistif et inductif lors des recettes et révisions majeures.",
    cover_url: "/og-preview.png",
    status: "published",
    content: `
      <h2>Pourquoi les essais à vide ne garantissent pas la fiabilité d'un groupe de secours</h2>
      <p>Faire démarrer un groupe électrogène pendant 5 minutes à vide permet uniquement de vérifier que le démarreur fonctionne et que le moteur s'allume. Cependant, un essai à vide ne sollicite ni le système d'injection de carburant, ni les turbo-compresseurs, ni le système de refroidissement, ni la régulation de tension sous fort courant.</p>

      <p>Un groupe électrogène qui démarre parfaitement à vide peut très bien caler ou surchauffer en 10 minutes lorsqu'on lui applique brutalement la charge d'une usine ou d'un immeuble.</p>

      <h2>Qu'est-ce qu'un banc de charge industriel ?</h2>
      <p>Un banc de charge est un équipement de test contenant des résistances électriques blindées et des inductances refroidies par des motoventilateurs. Il simule de manière contrôlée la consommation électrique réelle d'un site.</p>

      <h2>Déroulement d'un essai de recette ME2I</h2>
      <ul>
        <li><strong>Test par paliers de puissance :</strong> Application de la charge à 25%, 50%, 75%, puis 100% de la puissance nominale pendant des durées d'un moins 30 minutes par palier.</li>
        <li><strong>Test de surcharge temporaire :</strong> Application de 110% de la charge pendant 15 minutes pour vérifier les réserves thermiques et mécaniques du bloc moteur.</li>
        <li><strong>Test d'impact de charge brutale (0 à 100%) :</strong> Mesure du temps de rétablissement de la fréquence et de la tension lors du branchement instantané d'une forte charge.</li>
        <li><strong>Relevés continus des températures et émissions :</strong> Mesure des températures d'échappement, de la pression d'huile, de la température d'eau et de l'opacité des fumées.</li>
      </ul>

      <p>À la fin du test, ME2I vous remet un rapport officiel d'essai sous banc de charge certifiant la capacité réelle de vos groupes électrogènes.</p>
    `
  }
]

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aivmdijdocgbnuxqwsbe.supabase.co'
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  const supabase = createClient(supabaseUrl, supabaseKey)

  // 1. Clear out any old duplicated realisation entries in realisations table that were placed with article slugs
  const articleSlugs = brandNewArticles.map((a) => a.slug)
  await supabase.from('realisations').delete().in('id', articleSlugs)

  // 2. Insert into realisations table as clean articles backup so SELECT queries always succeed regardless of RLS
  const results = []
  for (const art of brandNewArticles) {
    const { data: realData, error: realErr } = await supabase
      .from('realisations')
      .upsert(
        {
          id: `art_${art.slug}`,
          title: art.title,
          slug: art.slug,
          category: art.category,
          subtitle: art.excerpt,
          description: art.excerpt,
          content: art.content.trim(),
          cover_url: art.cover_url,
          status: 'published',
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )
      .select()

    const { data: artData, error: artErr } = await supabase
      .from('articles')
      .upsert(
        {
          title: art.title,
          slug: art.slug,
          category: art.category,
          excerpt: art.excerpt,
          content: art.content.trim(),
          cover_url: art.cover_url,
          status: 'published',
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'slug' }
      )
      .select()

    results.push({
      title: art.title,
      articleStatus: artErr ? artErr.message : 'success',
      realisationStatus: realErr ? realErr.message : 'success',
    })
  }

  return NextResponse.json({ success: true, count: results.length, results })
}
