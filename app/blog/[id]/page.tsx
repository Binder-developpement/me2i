import { createServerClient } from '@/src/admin/lib/supabase-server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Phone,
  Mail,
  ChevronRight,
  ShieldCheck,
  Wrench,
  FileText,
} from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const longArticlesMap: Record<string, any> = {
  "guide-ultime-diagnostic-depannage-groupes-electrogenes-secours": {
    title: "Guide ultime du diagnostic et du dépannage des groupes électrogènes de secours : De la mécanique à l'électronique de puissance",
    category: "Groupes Électrogènes",
    excerpt: "Dossier technique exhaustif pour diagnostiquer, analyser et résoudre l'ensemble des pannes mécaniques, électriques et électroniques sur les générateurs de secours.",
    cover_url: "/images/hero.jpg",
    content: `
      <h2>1. Introduction et architecture globale d'un générateur de secours</h2>
      <p>Un groupe électrogène industriel est un système mécatronique complexe associant de la mécanique thermique lourde, de l'électromagnétisme de puissance et de l'électronique de contrôle numérique. Dans les installations critiques au Cameroun (hôpitaux, data centers, usines agroalimentaires, complexes bancaires), le générateur doit démarrer, stabiliser sa vitesse et sa tension, puis prendre en charge 100% de la puissance du site en moins de 10 secondes après une coupure du réseau public ENEO.</p>

      <p>La moindre défaillance sur l'un des sous-systèmes (carburant, démarrage, refroidissement, excitation alternateur, carte de contrôle) annule totalement la fonction de secours et expose l'entreprise à des pertes financières majeures.</p>

      <h2>2. Anatomie détaillée des sous-systèmes critiques</h2>
      
      <h3>2.1. Le circuit d'alimentation en carburant (Gasoil)</h3>
      <p>Le sous-système de carburant comprend la cuve de stockage principale, le réservoir journalier intégré au châssis, la pompe de gavage électrique ou mécanique, les filtres séparateurs d'eau (Racor) et la pompe d'injection haute pression à rampe commune (Common Rail). En milieu tropical, le gasoil stocké trop longtemps a tendance à décanter, accumulant de la condensation d'eau et développant des bactéries fongiques dans le fond de cuve.</p>

      <h3>2.2. Le sous-système de démarrage électrique et batteries</h3>
      <p>Composé de batteries d'accumulateurs au plomb étanche (VRLA AGM) ou au gel 12V/24V, d'un démarreur électrique à solénoïde et d'un chargeur statique de maintien (Floating) raccordé au secteur. Plus de 75% des refus de démarrage d'un groupe en secours résultent d'une batterie sulfatée ou d'un chargeur statique défectueux non repéré.</p>

      <h3>2.3. Le circuit de refroidissement et de régulation thermique</h3>
      <p>Comprend la pompe à eau centrifuge, le calorstat (thermostat), le radiateur à eau avec faisceaux en cuivre/aluminium, le ventilateur débrayable ou entraîné par courroie et le réchauffeur de bloc moteur électrique. Ce dernier maintient le liquide de refroidissement entre 40°C et 50°C hors fonctionnement afin d'assurer une lubrification immédiate dès l'amorçage du moteur.</p>

      <div class="bg-blue-50 p-6 border-l-4 border-blue-600 my-6 text-slate-800 rounded-r shadow-sm">
        <strong>Recommandation de l'expert ME2I :</strong> L'utilisation d'eau du robinet non traitée dans le circuit de refroidissement provoque le tartrage accéléré du radiateur et la corrosion de la chemise de cylindre. Utilisez exclusivement un liquide de refroidissement organique longue durée anticorrosion.
      </div>

      <h2>3. Arbre de décision et méthodologie de dépannage pas à pas</h2>

      <h3>3.1. Le moteur diesel refuse de tourner (Démarreur inerte)</h3>
      <ul>
        <li><strong>Étape 1 :</strong> Mesurer la tension aux bornes de la batterie au repos. Si U &lt; 24.5V (pour un système 24V), la batterie est déchargée. Si U chute en dessous de 18V lors de la commande de démarrage, un élément est court-circuité.</li>
        <li><strong>Étape 2 :</strong> Vérifier la continuité du relais de démarrage (solénoïde) et s'assurer que le signal de commande d'arrêt d'urgence (bouton coup de poing) n'est pas verrouillé.</li>
        <li><strong>Étape 3 :</strong> Contrôler le fusible de protection de la carte de contrôle (DSE, ComAp ou DEIF).</li>
      </ul>

      <h3>3.2. Le moteur tourne au démarreur mais ne s'amorce pas (Pas d'allumage)</h3>
      <ul>
        <li><strong>Étape 1 :</strong> Vérifier l'électrovanne de coupure carburant (Stop Solenoid). S'assurer qu'elle est bien alimentée et que la vanne s'ouvre mécaniquement.</li>
        <li><strong>Étape 2 :</strong> Contrôler l'absence d'air dans le circuit basse pression de gasoil. Effectuer une purge manuelle au niveau du filtre primaire Racor.</li>
        <li><strong>Étape 3 :</strong> Inspecter le capteur de vitesse / Pickup magnétique installé sur la couronne du volant moteur. Si le capteur est encrassé par des limailles, la carte de contrôle ne détecte pas la rotation et coupe l'injection par sécurité.</li>
      </ul>

      <h3>3.3. Le groupe démarre puis s'arrête après quelques secondes (Mise en sécurité)</h3>
      <ul>
        <li><strong>Alarme pression d'huile :</strong> Contrôler le niveau d'huile au jaugeur. Si le niveau est bon, vérifier la sonde de pression analogique à l'aide d'un manomètre étalon.</li>
        <li><strong>Alarme surchauffe eau :</strong> Vérifier la circulation du liquide et s'assurer que le radiateur n'est pas colmaté extérieurement par des poussières.</li>
        <li><strong>Alarme défaut d'alternateur / Sous-fréquence :</strong> Si le moteur n'atteint pas 1500 tr/min dans le délai imparti (généralement 10 secondes), vérifier le régulateur de vitesse électronique (Actuateur et boîtier ESD).</li>
      </ul>

      <h2>4. Maintenance prédictive et contrôles avancés ME2I</h2>
      <p>Pour dépasser le simple dépannage réactif, ME2I déploie un programme de maintenance prédictive s'appuyant sur :</p>
      <ul>
        <li><strong>L'analyse spectrométrique de l'huile moteur :</strong> Mesure des taux de silice, fer, cuivre et suie pour détecter le jeu des coussinets avant le coulage de bielle.</li>
        <li><strong>L'analyse vibratoire de l'accouplement :</strong> Détection du désalignement laser entre le vilebrequin et l'arbre de l'alternateur.</li>
        <li><strong>Le test périodique sous banc de charge :</strong> Simulation de charge réelle à 100% pendant 2 heures pour décrasser la ligne d'échappement et valider la régulation thermique.</li>
      </ul>

      <p>Nos équipes d'ingénieurs et techniciens spécialisés ME2I interviennent H24 dans tout le Cameroun pour le diagnostic, l'entretien et la remise en état intégrale de vos centrales de production d'énergie.</p>
    `
  },
  "conception-calcul-installation-tgbt-armoires-distribution-industrielle": {
    title: "Conception, calcul et installation des Tableaux Généraux Basse Tension (TGBT) et armoires de distribution industrielle",
    category: "Armoires Électriques",
    excerpt: "Guide technique exhaustif couvrant le dimensionnement des jeu de barres, le calcul du courant de court-circuit Icc, les formes de cloisonnement et la sélectivité des protections.",
    cover_url: "/og-preview.png",
    content: `
      <h2>1. Le rôle stratégique du TGBT dans une architecture industrielle</h2>
      <p>Le Tableau Général Basse Tension (TGBT) est le point focal de distribution électrique de toute usine ou grand bâtiment tertiaire. Positionné directement en aval du transformateur HT/BT ou du groupe électrogène principal, il a pour mission d'assurer la distribution de l'énergie électrique vers les sous-tableaux, la protection des personnes et des biens contre les défauts électriques, et la continuité d'alimentation par le jeu des commutations de sources.</p>

      <h2>2. Les normes de conception IEC 61439-1 et 61439-2</h2>
      <p>La conception d'un TGBT moderne doit respecter scrupuleusement la norme internationale IEC 61439. Cette norme garantit que l'armoire électrique assemblée répond aux exigences de sécurité thermique, mécanique et électrique sans risque pour les opérateurs.</p>

      <h3>2.1. Les Formes de cloisonnement interne (Forme 1 à Forme 4b)</h3>
      <p>Le cloisonnement consiste à séparer physiquement au moyen de parois isolantes ou métalliques les différentes unités fonctionnelles du tableau (jeu de barres principal, appareils de coupure, borniers de départ câbles) :</p>
      <ul>
        <li><strong>Forme 1 :</strong> Aucune séparation interne. Risque élevé d'extrapolation d'un court-circuit à tout le tableau.</li>
        <li><strong>Forme 2b :</strong> Séparation entre le jeu de barres principal et l'ensemble des unités fonctionnelles.</li>
        <li><strong>Forme 3b :</strong> Séparation du jeu de barres + séparation individuelle entre chaque unité fonctionnelle. Les bornes de départ restent communes.</li>
        <li><strong>Forme 4b :</strong> Cloisonnement maximal. Chaque unité fonctionnelle a son propre compartiment séparé, y compris pour les borniers de départ câbles. Recommandé pour les installations industrielles sensibles.</li>
      </ul>

      <div class="bg-amber-50 p-6 border-l-4 border-amber-500 my-6 text-slate-800 rounded-r shadow-sm">
        <strong>Règle de sécurité ME2I :</strong> Dans les environnements poussiéreux ou humides du Cameroun, optez au minimum pour un cloisonnement en Forme 3b avec un indice de protection IP54 pour éviter la propagation d'un arc électrique accidentel.
      </div>

      <h2>3. Dimensionnement électrique et calculs de puissance</h2>

      <h3>3.1. Calcul de l'intensité nominale (In) et choix du jeu de barres</h3>
      <p>Le jeu de barres principal doit être dimensionné pour transporter l'intensité maximale admissible sans dépasser l'échauffement maximal autorisé (généralement 65°C au-dessus de la température ambiante). Le calcul de la section du barrage en cuivre électrolytique (Cu-ETP) prend en compte l'effet de peau en courant alternatif :</p>
      
      <p>Pour un transformateur de 1000 kVA en 400V triphasé :</p>
      <p class="font-mono bg-gray-100 p-3 rounded text-sm text-[#1E3A5F]">In = S / (U * √3) = 1 000 000 / (400 * 1.732) = 1443 A</p>
      <p>Le jeu de barres sera dimensionné pour une intensité nominale de 1600 A, soit des barres de cuivre de section 2 x (80 x 10 mm) par phase.</p>

      <h3>3.2. Calcul du courant de court-circuit maximal (Icc)</h3>
      <p>Le courant de court-circuit triphasé au niveau des bornes du TGBT dépend de la puissance de court-circuit du réseau amont (Psc) et de l'impédance du transformateur (Ucc%) :</p>
      <p class="font-mono bg-gray-100 p-3 rounded text-sm text-[#1E3A5F]">Icc = In / (Ucc / 100)</p>
      <p>Pour un transformateur de 1000 kVA avec Ucc = 6%, Icc = 1443 / 0.06 = <strong>24.05 kA</strong>. L'ensemble des disjoncteurs principaux et le pouvoir de coupure (Icu) des appareillages doivent être supérieurs à 35 kA ou 50 kA pour garantir une marge de sécurité absolue.</p>

      <h2>4. La sélectivité des protections (Ampèremétrique, Chronométrique et Logique)</h2>
      <p>La sélectivité consiste à faire fonctionner l'appareil de protection situé immédiatement en amont du défaut, et lui seul, afin de ne pas couper le reste de l'usine lors d'un court-circuit sur une petite ligne secondaire.</p>

      <ul>
        <li><strong>Sélectivité ampèremétrique :</strong> Obtenue par le décalage des seuils de déclenchement magnétothermique entre le disjoncteur amont et aval.</li>
        <li><strong>Sélectivité chronométrique :</strong> Le disjoncteur général (ACB) retarde son déclenchement de quelques dizaines de millisecondes (seuil Short Time Delay) pour laisser le temps au disjoncteur divisionnaire (MCCB) de couper la ligne défaillante.</li>
        <li><strong>Sélectivité logique (ZSI - Zone Selective Interlocking) :</strong> Communication filaire entre les déclencheurs électroniques qui s'échangent des signaux de blocage pour localiser la zone exacte du défaut et déclencher de manière instantanée.</li>
      </ul>

      <h2>5. Fabrication et contrôle qualité dans les ateliers ME2I</h2>
      <p>ME2I conçoit, câble et valide vos TGBT et armoires de distribution industrielle selon un processus certifié : plan de câblage CAD, pliage et poinçonnage des barres de cuivre sur machine CNC, serrage au tournevis dynamométrique des connexions avec marquage au vernis témoin, et essais d'isolement diélectrique à 2.5 kV.</p>
    `
  },
  "automatisme-supervision-scada-guide-complet-norme-iec-61131-3": {
    title: "Automatisme et supervision SCADA : Guide complet de l'intégration de la norme IEC 61131-3 dans l'industrie",
    category: "Automatisme et Contrôle",
    excerpt: "Dossier approfondi sur la programmation des automates PLC, le choix des réseaux de terrain (PROFINET, Modbus TCP) et le développement d'interfaces SCADA ergonomiques.",
    cover_url: "/images/hero.jpg",
    content: `
      <h2>1. La transformation numérique des procédés industriels</h2>
      <p>Dans l'industrie moderne, la compétitivité et la traçabilité reposent sur l'efficacité des architectures d'automatisme et de supervision. Qu'il s'agisse du pilotage d'une ligne d'embouteillage, d'un malaxeur de béton ou d'une centrale de traitement d'eau au Cameroun, l'automate programmable industriel (API ou PLC) est l'élément central garant de la précision, de la répétabilité et de la sécurité des opérations.</p>

      <h2>2. Les 5 langages de programmation de la norme IEC 61131-3</h2>
      <p>La norme internationale IEC 61131-3 définit les standards de programmation logicielle des automates. Elle permet de structurer le code en blocs réutilisables et d'harmoniser les pratiques entre les différentes plateformes (Siemens TIA Portal, Schneider EcoStruxure, Rockwell Studio 5000) :</p>

      <ul>
        <li><strong>1. Schema à contacts (LD - Ladder Diagram) :</strong> Représentation graphique sous forme de schéma électrique à relais. Idéal pour la logique combinatoire de sécurité et la prise en main par les électriciens de maintenance.</li>
        <li><strong>2. Bloc de Fonctions (FBD - Function Block Diagram) :</strong> Représentation par blocs logiques interconnectés. Très utilisé pour la régulation PID et le traitement des signaux analogiques.</li>
        <li><strong>3. Texte Structuré (ST - Structured Text) :</strong> Langage littéral de haut niveau similaire au Pascal ou au C. Recommandé pour les calculs mathématiques complexes, le traitement de chaînes de caractères et la gestion de tableaux d'index.</li>
        <li><strong>4. Diagramme Fonctionnel en Séquence (SFC / Grafcet) :</strong> Modélisation graphique des systèmes séquentiels par étapes, transitions et actions. Indispensable pour la conduite des procédés par lots (Batch processing).</li>
        <li><strong>5. Liste d'Instructions (IL - Instruction List) :</strong> Langage assembleur de bas niveau (en voie de dépréciation dans la norme moderne).</li>
      </ul>

      <div class="bg-emerald-50 p-6 border-l-4 border-emerald-600 my-6 text-slate-800 rounded-r shadow-sm">
        <strong>Bonne pratique d'ingénierie ME2I :</strong> Nous appliquons la programmation orientée objet industrielle (PackML) qui sépare clairement les modes de marche (Auto, Manuel, Initialisation, Arrêt d'urgence) afin d'assurer une sécurité absolue des opérateurs.
      </div>

      <h2>3. Les réseaux de communication industriels et bus de terrain</h2>
      <p>L'échange de données rapides entre les cartes d'entrées/sorties déportées, les variateurs de vitesse et la supervision nécessite des réseaux fiables et tolérants aux perturbations électromagnétiques :</p>

      <h3>3.1. PROFINET (Process Field Net)</h3>
      <p>Standard basé sur Ethernet industriel temps réel (100 Mbit/s à 1 Gbit/s). Il permet d'interconnecter des centaines d'équipements avec des temps de cycle inférieurs à 1 milliseconde (PROFINET IRT) et d'intégrer les profils de sécurité PROFIsafe sur le même câble.</p>

      <h3>3.2. Modbus TCP / IP et Modbus RTU (RS485)</h3>
      <p>Le protocole universel le plus répandu pour l'intégration des centrales de mesure électriques, des cartes de contrôle DSE/ComAp de groupes électrogènes et des onduleurs. Sa simplicité de mise en œuvre en fait le standard incontournable pour la GTC/GTB.</p>

      <h2>4. Développement des systèmes de supervision SCADA et IHM</h2>
      <p>Le système SCADA (Supervisory Control and Data Acquisition) constitue l'interface homme-machine (IHM) sur écran tactile ou poste PC centralisé dans la salle de commande. Un bon système SCADA conçu par ME2I intègre :</p>

      <ul>
        <li><strong>Des synoptiques d'animation clairs :</strong> Représentation dynamique en temps réel de l'état des vannes, pompes, tensions et températures.</li>
        <li><strong>La gestion avancée des alarmes :</strong> Horodatage à la milliseconde, hiérarchisation par niveau de gravité et guidage de l'opérateur pour la résolution de l'incident.</li>
        <li><strong>La traçabilité et l'archivage historique :</strong> Enregistrement des courbes de tendance (Trends) dans une base de données SQL pour l'analyse des incidents et l'optimisation des cadences.</li>
      </ul>

      <h2>5. Cybersécurité des réseaux industriels (OT)</h2>
      <p>Avec l'ouverture des usines vers l'Internet des objets (IIoT), la protection des réseaux automates contre les cyberattaques devient prioritaire. ME2I met en place le cloisonnement par VLANs, des pare-feu industriels spécialisés (Hirschmann, Siemens Scalance) et la désactivation des ports non utilisés.</p>
    `
  },
  "ingenierie-froid-industriel-guide-maintenance-centrales-frigorifiques": {
    title: "Ingénierie du Froid Industriel : Guide de maintenance des centrales frigorifiques de forte capacité",
    category: "Froid Industriel",
    excerpt: "Étude approfondie sur la conduite, le diagnostic et l'optimisation énergétique des centrales frigorifiques industrielles à compresseurs vis ou pistons.",
    cover_url: "/og-preview.png",
    content: `
      <h2>1. Enjeux économiques et thermiques du froid industriel</h2>
      <p>Le froid industriel est au cœur des chaînes de valeur de l'agroalimentaire (abattoirs, transformation de viandes et poissons, brasseries, produits laitiers) et de la logistique pharmaceutique. Une dérive de température dans une chambre froide négative (-25°C) ou un arrêt d'une centrale frigorifique de 500 kW de puissance thermique entraîne la destruction de denrées d'une valeur de plusieurs dizaines de millions de francs CFA en quelques heures.</p>

      <h2>2. Architecture thermodynamique d'une centrale multi-compresseurs</h2>
      <p>Une centrale frigorifique industrielle associe plusieurs compresseurs de forte puissance (compresseurs à vis Bitzer, Frascold, Grasso ou compresseurs à pistons semi-hermétiques) montés en parallèle sur un banc commun avec réservoir de fluide frigorifique et séparateur d'huile à haute efficacité.</p>

      <h3>2.1. Les fluides frigorigènes modernes (HFC, HFO et Ammoniac NH3)</h3>
      <p>Selon l'application et les normes environnementales (Réglementation F-Gas) :</p>
      <ul>
        <li><strong>R-404A / R-507A :</strong> Fluides historiques en cours de substitution en raison de leur GWP (Potentiel de Réchauffement Global) élevé.</li>
        <li><strong>R-448A / R-449A :</strong> Mélanges HFO à faible GWP utilisés en rétrofit des installations existantes.</li>
        <li><strong>Ammoniac (NH3 / R-717) :</strong> Le fluide naturel idéal pour les très grandes capacités (au-delà de 300 kW). Efficacité thermodynamique imbattable mais nécessitant des mesures de sécurité strictes en raison de sa toxicité.</li>
      </ul>

      <h2>3. Le protocole de maintenance préventive ME2I</h2>

      <h3>3.1. Gestion de la sous-chauffe et réglage des détendeurs électroniques</h3>
      <p>La surchauffe à la sortie de l'évaporateur doit être ajustée entre 5 K et 8 K. Une surchauffe trop faible risque d'entraîner du fluide liquide jusqu'aux compresseurs (coup de liquide), ce qui détruit instantanément les clapets ou les vis. Une surchauffe trop élevée réduit la surface utile de l'évaporateur et dégrade le rendement thermique.</p>

      <h3>3.2. Analyse physico-chimique de l'huile compresseur et détection d'acidité</h3>
      <p>L'huile assure la lubrification des roulements, l'étanchéité entre les vis et l'évacuation de la chaleur de compression. La dégradation de l'huile par humidité ou surchauffe génère des acides gras qui rongent le vernis des moteurs. ME2I réalise des prélèvements d'huile périodiques avec mesure du TAN (Total Acid Number) et remplacement des cartouches de filtres à huile.</p>

      <div class="bg-amber-50 p-6 border-l-4 border-amber-500 my-6 text-slate-800 rounded-r shadow-sm">
        <strong>Vérification critique :</strong> Contrôler l'étanchéité des vannes d'inversion de gaz chaud et l'état des résistances électriques de dégivrage des bacs de condensats pour éviter la formation de blocs de glace qui détruisent les ventilateurs d'évaporateur.
      </div>

      <h2>4. Optimisation énergétique et régulation de pression de condensation</h2>
      <p>Le poste frigorifique représente jusqu'à 60% de la facture d'électricité d'un site agroalimentaire. Les ingénieurs ME2I mettent en œuvre des leviers d'économie d'énergie majeurs :</p>

      <ul>
        <li><strong>La Condensation Flottante :</strong> Ajustement dynamique de la consigne de pression HP en fonction de la température extérieure mesurée. Chaque degré de baisse de la température de condensation réduit la consommation électrique des compresseurs de 3%.</li>
        <li><strong>La Variation de Vitesse (Inverter) :</strong> Équipement du compresseur principal d'un variateur de fréquence pour adapter exactement la puissance frigorifique à la charge réelle sans démarrages/arrêts répétitifs.</li>
        <li><strong>La Récupération de Chaleur :</strong> Exploitation des calories de désurchauffe du fluide frigo pour préchauffer l'eau sanitaire ou l'eau de lavage d'usine à 60°C.</li>
      </ul>

      <p>Faites confiance aux experts frigoristes ME2I pour le dimensionnement, l'installation, la maintenance et l'optimisation énergétique de vos centrales frigorifiques au Cameroun.</p>
    `
  },
  "dimensionnement-ingenierie-centrales-solaires-hybrides-groupes-electrogenes": {
    title: "Dimensionnement et ingénierie des centrales solaires hybrides avec groupes électrogènes pour sites industriels et miniers",
    category: "Énergies Renouvelables",
    excerpt: "Guide d'ingénierie complet sur le couplage photovoltaïque, stockage par batteries Lithium LFP et générateurs diesel pour réduire jusqu'à 70% la consommation de carburant.",
    cover_url: "/images/hero.jpg",
    content: `
      <h2>1. Le défi de la transition énergétique pour les sites isolés au Cameroun</h2>
      <p>Pour les exploitations minières, les carrières, les agros-industries et les sites télécoms situés hors réseau ou subissant des délestages prolongés en Afrique centrale, la dépendance au gasoil est un fardeau financier insupportable. L'hybridation solaire / diesel avec stockage par batterie constitue aujourd'hui la solution technologique et économique la plus compétitive du marché.</p>

      <h2>2. Architecture technique d'une centrale hybride industrielle</h2>
      <p>Une centrale hybride microgrid de forte puissance associe trois sources d'énergie interconnectées :</p>
      <ul>
        <li><strong>Le champ photovoltaïque (PV) :</strong> Panneaux solaires haute efficacité (Bifaciaux N-Type TOPCon 580W+) installés au sol ou en toiture d'usine.</li>
        <li><strong>Le système de stockage d'énergie par batterie (BESS) :</strong> Racks de batteries Lithium Fer Phosphate (LiFePO4 ou LFP) intégrés dans des conteneurs climatisés avec système d'extinction d'incendie automatique Novec 1230.</li>
        <li><strong>La centrale de groupes électrogènes diesel :</strong> Deux ou trois générateurs en parallèle assurant le secours et la réserve rapide.</li>
        <li><strong>Le contrôleur d'hybridation (Microgrid Controller / Fuel-Save Controller) :</strong> Le cerveau numérique qui répartit la charge en temps réel entre le solaire, la batterie et le diesel.</li>
      </ul>

      <h2>3. Les algorithmes de régulation du Fuel-Save Controller</h2>
      <p>L'intégration de forte pénétration solaire (au-delà de 30% de la charge du site) pose des défis de stabilité en raison des passages nuageux soudains. Le Fuel-Save Controller (DEIF ASC-4, SMA Fuel Save Controller ou ComAp MainsCompact) applique des règles de régulation avancées :</p>

      <ul>
        <li><strong>Réserve tournante dynamique (Spinning Reserve) :</strong> Le contrôleur s'assure en permanence que la somme de la puissance disponible sur les batteries et de la réserve non chargée des groupes en marche peut absorber instantanément la perte totale de la production solaire en cas de nuage dense.</li>
        <li><strong>Fonctionnement à charge minimale du diesel :</strong> Les groupes diesel ne doivent jamais tourner en dessous de 25% à 30% de leur puissance nominale sous peine d'encrassement (Goutte-à-goutte d'huile à l'échappement / Wet Stacking). Si le solaire suffit à couvrir la charge, le contrôleur coupe le diesel et bascule en mode 100% Solaire + Batterie (Grid-Forming Inverter).</li>
      </ul>

      <div class="bg-emerald-50 p-6 border-l-4 border-emerald-600 my-6 text-slate-800 rounded-r shadow-sm">
        <strong>Gain d'exploitation validé ME2I :</strong> L'ajout d'une batterie Lithium LFP en mode Grid-Forming permet d'éteindre totalement les groupes électrogènes pendant 8 à 14 heures par jour, réduisant la consommation annuelle de gasoil de 55% à 72%.
      </div>

      <h2>4. Étude de cas financière : Retour sur investissement (ROI)</h2>
      <p>Pour une usine consommant 500 kW en continu avec un prix du gasoil rendu site de 750 FCFA / litre :</p>
      <ul>
        <li><strong>Consommation annuelle 100% Diesel :</strong> ~ 1 100 000 litres de gasoil = <strong>825 000 000 FCFA / an</strong>.</li>
        <li><strong>Consommation avec Centrale Hybride ME2I (750 kWp PV + 1 MWh BESS) :</strong> ~ 350 000 litres = <strong>262 500 000 FCFA / an</strong>.</li>
        <li><strong>Économie brute annuelle :</strong> <strong>562 500 000 FCFA / an</strong>.</li>
        <li><strong>Temps de retour sur investissement (Payback) :</strong> <strong>3.2 ans</strong> pour une durée de vie des équipements de 25 ans.</li>
      </ul>

      <h2>5. Accompagnement clé en main par ME2I</h2>
      <p>Du relevé de courbe de charge par analyseur de réseau jusqu'à la mise en service, ME2I assure l'ingénierie, la fourniture des conteneurs BESS, l'installation des structures solaires et la maintenance longue durée de vos centrales microgrid.</p>
    `
  },
  "qualite-energie-electrique-industrielle-harmoniques-transitoires-depollution": {
    title: "Qualité de l'énergie électrique industrielle : Harmoniques, transitoires, creux de tension et solutions de dépollution",
    category: "Efficacité Énergétique",
    excerpt: "Étude approfondie sur la dépollution des réseaux électriques, la suppression des courants harmoniques et la protection contre les micro-coupures.",
    cover_url: "/og-preview.png",
    content: `
      <h2>1. Les enjeux de la qualité de l'onde électrique (Power Quality)</h2>
      <p>L'introduction massive de l'électronique de puissance dans les usines (variateurs de vitesse pour moteurs, gradateurs de puissance, réchauffeurs d'air, alimentations à découpage, éclairage LED) a considérablement modifié la nature des courants absorbés sur le réseau. Ces charges dites "non-linéaires" déforment l'onde sinusoïdale de courant et de tension, provoquant une pollution électrique néfaste pour l'ensemble des équipements.</p>

      <h2>2. Les principales perturbations électriques et leurs impacts</h2>

      <h3>2.1. Les tensions et courants harmoniques (Rang 3, 5, 7, 11, 13)</h3>
      <p>Les harmoniques sont des courants sinusoïdaux de fréquences multiples de la fréquence fondamentale (50 Hz). Par exemple, l'harmonique 5 a une fréquence de 250 Hz, et l'harmonique 7 une fréquence de 350 Hz.</p>
      <ul>
        <li><strong>Surchauffe du conducteur de neutre :</strong> L'harmonique de rang 3 (150 Hz) et ses multiples se cumulent dans le conducteur de neutre au lieu de s'annuler, pouvant provoquer la fusion du câble de neutre même avec des phases équilibrées.</li>
        <li><strong>Échauffement et déclenchements intempestifs :</strong> Les courants de haute fréquence créent des pertes par courants de Foucault dans les transformateurs, le vieillissement accéléré des condensateurs et le déclenchement non justifié des disjoncteurs électroniques.</li>
      </ul>

      <h3>2.2. Les creux de tension (Dips) et micro-coupures</h3>
      <p>Une baisse brutale de la tension efficace de 10% à 90% pendant une durée de 10 millisecondes à quelques secondes. Un creux de tension de seulement 50 ms suffit à faire décrocher les contacteurs de puissance des machines et stopper une chaîne de fabrication complète.</p>

      <div class="bg-blue-50 p-6 border-l-4 border-blue-600 my-6 text-slate-800 rounded-r shadow-sm">
        <strong>Norme de référence :</strong> La norme EN 50160 et la CEI 61000-4-30 fixent le niveau de Taux de Dépollution Harmonique maximal en tension (THD-U) à 8% en milieu industriel. Au-delà, des actions de filtrage sont obligatoires.
      </div>

      <h2>3. Les solutions de dépollution réseau déployées par ME2I</h2>

      <h3>3.1. Les Filtres Actifs d'Harmoniques (AHF - Active Harmonic Filter)</h3>
      <p>Le filtre actif d'harmoniques est une électronique de puissance ultra-rapide connectée en parallèle sur le TGBT. Il mesure en temps réel les courants harmoniques déformés générés par les charges et réinjecte instantanément des courants harmoniques en opposition de phase parfaite. Le réseau amont ne voit plus qu'un courant sinusoïdal pur à 50 Hz avec un Cos Phi égal à 1.0.</p>

      <h3>3.2. Les compensateurs de creux de tension (DVR - Dynamic Voltage Restorer)</h3>
      <p>Dispositifs basés me sur des supercondensateurs ou des réserves d'énergie ultra-rapides capables d'injecter la tension manquante en moins de 2 millisecondes pour maintenir une tension de 400V constante lors des perturbations du réseau public.</p>

      <h2>4. Campagne de mesure et diagnostic par ME2I</h2>
      <p>ME2I dispose d'analyseurs de qualité d'énergie de classe A (Fluke 435-II et Chauvin Arnoux CA 8336). Nos ingénieurs réalisent des enregistrements sur 7 jours avec rapport de conformité IEEE 519 et préconisation des filtres actifs adaptés.</p>
    `
  },
  "maintenance-predictive-analyse-vibratoire-machines-tournantes-industrielles": {
    title: "Maintenance prédictive et analyse vibratoire des machines tournantes industrielles",
    category: "Maintenance Industrielle",
    excerpt: "Dossier technique sur le suivi vibratoire par FFT, l'analyse d'huile et la thermographie pour anticiper la casse des roulements, pompes et moteurs.",
    cover_url: "/images/hero.jpg",
    content: `
      <h2>1. Du curatif au prédictif : La révolution de la maintenance conditionnelle</h2>
      <p>Attend-on qu'un moteur de 200 kW coule ses roulements pour réagir ? Dans l'industrie moderne, la maintenance corrective ("on répare quand ça casse") et la maintenance préventive systematic ("on remplace à date fixe") sont remplacées par la **Maintenance Basée sur l'État (CBM - Condition-Based Maintenance)** ou maintenance prédictive.</p>

      <p>L'objectif est d'écouter et de mesurer les signes avant-coureurs de défaillance émis par la machine des semaines ou des mois avant la rupture catastrophique.</p>

      <h2>2. L'analyse vibratoire par Transformée de Fourier Rapide (FFT)</h2>
      <p>Toute machine tournante (moteur électrique, pompe centrifuge, ventilateur industriel, réducteur mécanique, compresseur) génère des vibrations. En fixant des accéléromètres piézoélectriques sur les paliers de la machine, l'analyseur de spectre transforme le signal temporel en un spectre de fréquences (FFT).</p>

      <h3>2.1. Signature vibratoire des anomalies mécaniques courantes</h3>
      <ul>
        <li><strong>Balourd (Déséquilibre de masse du rotor) :</strong> Se manifeste par un pic très important à la fréquence de rotation fondamentale (1X).</li>
        <li><strong>Désalignement d'arbre :</strong> Caractérisé par des pics prédominants à deux fois la fréquence de rotation (2X) avec une forte composante axiale.</li>
        <li><strong>Fixation défectueuse / Jeu mécanique :</strong> Génère une multiplicité d'harmoniques de la vitesse de rotation (1X, 2X, 3X, 4X...).</li>
        <li><strong>Défaut de roulement à billes ou rouleaux :</strong> Génère des hautes fréquences caractéristiques calculables selon la géométrie du roulement :
          <ul>
            <li><strong>BPFO :</strong> Fréquence de défaut de la bague extérieure.</li>
            <li><strong>BPFI :</strong> Fréquence de défaut de la bague intérieure.</li>
            <li><strong>BSF :</strong> Fréquence de défaut des billes/rouleaux.</li>
            <li><strong>FTF :</strong> Fréquence de défaut de la cage.</li>
          </ul>
        </li>
      </ul>

      <div class="bg-amber-50 p-6 border-l-4 border-amber-500 my-6 text-slate-800 rounded-r shadow-sm">
        <strong>Intérêt économique majeur :</strong> Un défaut de roulement détecté au Stade 1 (ondes de choc ultrasonores) permet de planifier le remplacement du roulement lors d'un arrêt de 2 heures, évitant la destruction de l'arbre, du stator et un arrêt d'usine de 3 jours.
      </div>

      <h2>3. Les techniques complémentaires du diagnostic prédictif</h2>

      <h3>3.1. L'analyse ultrasonore acoustique</h3>
      <p>Permet de détecter les frictions mécaniques naissantes et les fuites d'air comprimé ou d'azote inaudibles à l'œil humain dans des usines très bruyantes.</p>

      <h3>3.2. La ferrographie et l'analyse particulaire d'huile</h3>
      <p>Comptage des micro-particules métalliques en suspension dans l'huile d'un réducteur pour déterminer la vitesse d'usure des engrenages.</p>

      <h2>4. Déploiement d'un programme prédictif par ME2I</h2>
      <p>ME2I accompagne les industriels au Cameroun dans la mise en place de la maintenance prédictive : création de la base de données des machines, définition des points de mesure, rondes vibratoires mensuelles et rapports de santé d'équipement avec recommandations d'intervention.</p>
    `
  },
  "revision-majeure-reconditionnement-complet-overhaul-moteurs-diesel": {
    title: "Révision majeure et reconditionnement complet (Overhaul) des moteurs diesel industriels",
    category: "Groupes Électrogènes",
    excerpt: "Guide technique étape par étape sur le démontage, le métrologie, le chemisage, le rectification et le rodage des grands moteurs diesel (Cummins, Perkins, Caterpillar).",
    cover_url: "/og-preview.png",
    content: `
      <h2>1. Qu'est-ce que l'Overhaul ou révision générale d'un moteur diesel ?</h2>
      <p>Après un nombre d'heures de fonctionnement défini par le constructeur (généralement 10 000 h à 15 000 h pour des moteurs 1500 tr/min, ou 20 000 h pour des moteurs lourds), les composants internes du moteur diesel subissent un niveau d'usure mécanique qui ne peut plus être compensé par la simple maintenance courante.</p>

      <p>L'Overhaul est une opération d'ingénierie mécanique lourde consistant à démonter intégralement le bloc moteur, mesurer toutes les cotes d'usure au micron près, remplacer l'ensemble des pièces d'usure par des composants neufs d'origine et ré-étalonner le moteur pour lui redonner 100% de ses performances initiales.</p>

      <h2>2. Les critères de déclenchement d'une révision majeure</h2>
      <ul>
        <li>Dépassement du nombre d'heures préconisé par le constructeur (Cummins, Perkins, Caterpillar, Aksa, SDMO).</li>
        <li>Consommation d'huile moteur excessive (supérieure à 0.5% de la consommation de gasoil).</li>
        <li>Baisse irréversible de la pression d'huile à chaud due à l'usure des coussinets de ligne d'arbre.</li>
        <li>Présence de fumées bleues ou blanches intenses à l'échappement et perte de puissance importante.</li>
      </ul>

      <h2>3. Les étapes méthodologiques du reconditionnement dans les ateliers ME2I</h2>

      <h3>3.1. Démontage complet et nettoyage chimique ultrasonique</h3>
      <p>Le groupe est désaccouplé de l'alternateur. Le moteur est entièrement mis à nu. Le bloc moteur, les culasses, le vilebrequin et les bielles sont dégraissés et détartrés dans des bacs de nettoyage haute température.</p>

      <h3>3.2. Métrologie de précision et contrôle non destructif (Ressuage / Magnétoscopie)</h3>
      <p>Nos mécaniciens effectuent des mesures au palmer et micromètre d'intérieur :</p>
      <ul>
        <li><strong>Contrôle de l'ovalisation et de la conicité des chemises :</strong> Si la cote limite est dépassée, remplacement des chemises d'usure.</li>
        <li><strong>Contrôle du vilebrequin :</strong> Vérification des tourillons et manetons. Rectification à la cote réparation (STD, -0.25 mm, -0.50 mm) ou remplacement si fissure détectée par magnétoscopie.</li>
        <li><strong>Planéité du plan de joint de bloc et culasses :</strong> Rectification sur fraiseuse de précision.</li>
      </ul>

      <div class="bg-blue-50 p-6 border-l-4 border-blue-600 my-6 text-slate-800 rounded-r shadow-sm">
        <strong>Remplacement systématique du kit de révision :</strong> Lors d'un Overhaul ME2I, les éléments suivants sont obligatoirement remplacés par des pièces neuves d'origine : chemises, pistons, segments, axes de pistons, coussinets de bielle et de palier, soupapes d'admission/échappement, guides et sièges de soupapes, pochette de joints complète, pompe à huile, pompe à eau, calorstats et turbocompresseurs.
      </div>

      <h3>3.3. Remontage au couple et rodage sous banc de charge</h3>
      <p>Le remontage est effectué sous environnement propre avec serrage des vis de culasse et de chapeaux de bielle au couple et à l'angle préconisés. Le moteur réassemblé est monté sur le banc de test pour un rodage progressif de 8 heures sous paliers de charge avec contrôle des pressions et de l'étanchéité.</p>

      <p>Prolongez la durée de vie de vos investissements moteurs avec les révisions majeures certifiées par les ateliers ME2I à Douala.</p>
    `
  },
  "inverseurs-automatiques-source-ats-synchro-couplage-principes-schemas": {
    title: "Inverseurs Automatiques de Source (ATS) et Synchro-Couplage : Principes, algorithmes et schémas de puissance",
    category: "Armoires Électriques",
    excerpt: "Étude complète sur les technologies de permutation de sources d'énergie : transition ouverte, transition fermée, synchronisation et partage de charge.",
    cover_url: "/images/hero.jpg",
    content: `
      <h2>1. La problématique de la permutation de source en milieu industriel</h2>
      <p>Lorsqu'un site industriel est alimenté par deux sources d'énergie distinctes (par exemple le réseau public ENEO et un groupe électrogène de secours, ou deux groupes électrogènes en parallèle), le basculement d'une source vers l'autre doit s'effectuer en garantissant la sécurité maximale du matériel et la continuité de service des charges.</p>

      <h2>2. Les trois grandes modes de transition d'inverseur de source</h2>

      <h3>2.1. Transition Ouverte avec coupure (Open Transition / Break-Before-Make)</h3>
      <p>Le mode le plus classique et le plus économique. L'inverseur ouvre le contacteur de la source 1, marque une pause de sécurité (généralement 1 à 3 secondes pour laisser s'effondrer les tensions induites par les moteurs), puis ferme le contacteur de la source 2. Ce mode implique une coupure temporaire pour les utilisateurs.</p>

      <h3>2.2. Transition Fermée sans coupure (Closed Transition / Make-Before-Break)</h3>
      <p>Permet d'effectuer le transfert de charge sans la moindre micro-coupure lors du retour du réseau public. Lorsque le réseau revient, l'automate d'inverseur (DSE 8610, ComAp InteliGen ou DEIF AGC) ajuste la vitesse et la phase du groupe électrogène pour le synchroniser exactement sur le réseau public.</p>

      <p>Une fois la synchronisation parfaite atteinte (écart de tension &lt; 2%, écart de fréquence &lt; 0.1 Hz, angle de phase &lt; 5°), l'inverseur ferme le second contacteur, faisant tourner les deux sources en parallèle pendant 100 millisecondes, puis ouvre le contacteur du groupe. **Le transfert est 100% invisible pour l'usine.**</p>

      <div class="bg-amber-50 p-6 border-l-4 border-amber-500 my-6 text-slate-800 rounded-r shadow-sm">
        <strong>Protection obligatoire :</strong> La transition fermée nécessite l'accord du distributeur d'électricité et l'installation d'un relais de protection de découplage (Relais ANSI 27, 59, 81O/U, 78 Vector Shift) pour éviter de réinjecter de la puissance dans le réseau en cas de défaut amont.
      </div>

      <h2>3. Le couplage et le partage de charge entre plusieurs groupes (Load Sharing)</h2>
      <p>Dans les grandes centrales électriques (2 x 500 kVA ou 3 x 1000 kVA en parallèle), les groupes doivent partager équitablement la puissance active (kW) et la puissance réactive (kVAR) appelée par l'usine.</p>

      <ul>
        <li><strong>Mode Statisme (Droop Control) :</strong> La fréquence du groupe baisse légèrement quand la charge augmente (ex: 50 Hz à vide -> 49 Hz à pleine charge). Ce glissement naturel permet l'équilibrage passif entre groupes sans communication filaire.</li>
        <li><strong>Mode Isochrone avec ligne de bus de couplage (CANbus Share) :</strong> Les cartes de contrôle automatiques s'échangent des trames numériques à haute vitesse sur bus CAN dédié pour maintenir une fréquence rigoureusement fixe à 50.0 Hz quelle que soit la charge.</li>
      </ul>

      <h2>4. Réalisation d'armoires de synchro-couplage par ME2I</h2>
      <p>ME2I conçoit et fabrique des armoires de couplage et inverseurs automatiques sur mesure intégrant des disjoncteurs motorisés (Masterpact MTX/NT, ABB Emax2) et des modules de synchronisation numériques de pointe.</p>
    `
  },
  "audit-securite-electrique-mise-aux-normes-installations-grande-puissance": {
    title: "Audit de sécurité électrique et mise aux normes des installations de grande puissance au Cameroun",
    category: "Sécurité et Normes",
    excerpt: "Méthodologie complète pour auditer les réseaux électriques industriels, mesurer la terre, évaluer le risque incendie et se conformer à la norme NF C 15-100.",
    cover_url: "/og-preview.png",
    content: `
      <h2>1. Les risques d'une installation électrique vétuste ou non conforme</h2>
      <p>Dans de nombreuses installations industrielles et tertiaires au Cameroun, l'extension progressive des bâtiments sans révision du schéma directeur électrique entraîne des risques d'incendie dévastateurs, des risques d'électrocution pour le personnel et des pannes d'exploitation récurrentes.</p>

      <h2>2. Les référentiels normatifs internationaux applicables (NF C 15-100 et NF C 18-510)</h2>
      <p>L'audit de sécurité réalisé par les ingénieurs d'études ME2I s'appuie sur les exigences des normes NF C 15-100 (conception des installations BT), NF C 18-510 (sécurité des personnes et habilitations électriques) et IEC 60364.</p>

      <h2>3. Les étapes d'un audit de sécurité électrique ME2I</h2>

      <h3>3.1. Mesure de la boucle de terre et continuité des masses</h3>
      <p>La prise de terre est l'élément fondamental de la sécurité. Sans une bonne prise de terre, les disjoncteurs différentiels ne peuvent pas fonctionner correctement.</p>
      <ul>
        <li><strong>Mesure de la résistance de terre au telluromètre :</strong> La valeur doit être inférieure à 10 Ohms pour les installations industrielles.</li>
        <li><strong>Test de continuité des conducteurs de protection (PE) :</strong> Vérification de l'interconnexion de toutes les carcasses métalliques des machines, armoires et structures du bâtiment.</li>
      </ul>

      <h3>3.2. Analyse du Schéma de Liaison à la Terre (Regime de Neutre TT, TN, IT)</h3>
      <p>Choix et vérification du régime de neutre le plus adapté à l'activité :</p>
      <ul>
        <li><strong>Régime TT :</strong> Neutre à la terre, masses à la terre. Nécessite des disjoncteurs différentiels généraux (DDR).</li>
        <li><strong>Régime TN-S / TN-C :</strong> Neutre et masses reliés au même point. Déclenchement automatique par court-circuit au premier défaut d'isolement. Idéal pour les usines avec fortes puissances.</li>
        <li><strong>Régime IT (Neutre Isolé) :</strong> Le premier défaut n'entraîne aucune coupure. Obligatoire pour les blocs opératoires d'hôpitaux et les procédés continus ne pouvant subir d'arrêt.</li>
      </ul>

      <div class="bg-blue-50 p-6 border-l-4 border-blue-600 my-6 text-slate-800 rounded-r shadow-sm">
        <strong>Livrable ME2I :</strong> À l'issue de l'audit, nous vous remettons un dossier de synthèse comprenant le schéma unifilaire remis à jour, la cartographie des anomalies classées par priorité de risque, et le devis estimatif des travaux de mise en conformité.
      </div>

      <p>Garantissez la sécurité de vos collaborateurs et la pérennité de votre outil industriel avec l'audit de sécurité électrique ME2I.</p>
    `
  }
}

async function getArticleItem(id: string) {
  // Check in longArticlesMap first
  if (longArticlesMap[id]) {
    const item = longArticlesMap[id]
    return {
      id: id,
      title: item.title,
      slug: id,
      category: item.category,
      excerpt: item.excerpt,
      content: item.content,
      cover_url: item.cover_url,
      status: 'published',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  }

  const supabase = await createServerClient()

  // Try finding in realisations with art_ prefix
  const { data: seedArt } = await supabase
    .from('realisations')
    .select('*')
    .or(`id.eq.art_${id},slug.eq.${id},id.eq.${id}`)
    .single()

  if (seedArt && (seedArt.id.startsWith('art_') || seedArt.slug)) {
    return {
      id: seedArt.id,
      title: seedArt.title,
      slug: seedArt.slug || seedArt.id.replace('art_', ''),
      category: seedArt.category || 'Maintenance Industrielle',
      excerpt: seedArt.description || seedArt.subtitle || '',
      content: seedArt.content || seedArt.description || '',
      cover_url: seedArt.cover_url || null,
      status: 'published',
      created_at: seedArt.created_at,
      updated_at: seedArt.updated_at,
    }
  }

  // Fallback to articles table
  let { data: article } = await supabase
    .from('articles')
    .select('*')
    .or(`id.eq.${id},slug.eq.${id}`)
    .single()

  return article
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const article = await getArticleItem(id)

  if (!article || article.status !== 'published') {
    return {
      title: 'Article introuvable',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://me2i.cm'
  const articleUrl = `${baseUrl}/blog/${article.slug || article.id}`
  const description = article.excerpt || article.title
  const imageUrl = article.cover_url || `${baseUrl}/og-preview.png`

  return {
    title: article.title,
    description: description,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      type: 'article',
      locale: 'fr_FR',
      url: articleUrl,
      title: article.title,
      description: description,
      siteName: 'ME2I : Maintenance et Énergie',
      publishedTime: article.created_at,
      modifiedTime: article.updated_at || article.created_at,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: description,
      images: [imageUrl],
    },
  }
}

export default async function SingleArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createServerClient()

  const article = await getArticleItem(id)

  if (!article || article.status !== 'published') {
    notFound()
  }

  // Fetch recent articles for the sidebar
  const { data: recentArticles } = await supabase
    .from('realisations')
    .select('id, title, slug, cover_url, created_at')
    .like('id', 'art_%')
    .neq('id', article.id)
    .order('created_at', { ascending: false })
    .limit(4)

  // Fetch company settings for contact widget
  const { data: companySettings } = await supabase
    .from('company_settings')
    .select('*')
    .single()

  const formattedDate = article.created_at
    ? new Date(article.created_at).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''

  // Estimate reading time
  const wordCount = (article.content || '').replace(/<[^>]*>/g, '').split(/\s+/).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  // Prevent duplicate rendering if content starts with or equals excerpt
  const cleanContentText = (article.content || '').replace(/<[^>]*>/g, '').trim()
  const cleanExcerptText = (article.excerpt || '').trim()
  const isDuplicateDescription =
    cleanExcerptText.length > 0 &&
    (cleanContentText === cleanExcerptText || cleanContentText.startsWith(cleanExcerptText))

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://me2i.cm'
  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.excerpt || article.title,
    image: article.cover_url ? [article.cover_url] : [],
    datePublished: article.created_at,
    dateModified: article.updated_at || article.created_at,
    author: {
      '@type': 'Organization',
      name: 'ME2I Maintenance et Énergie',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ME2I',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/og-preview.png`,
      },
    },
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#f8fafc] text-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />

      {/* Top Bar with Back Link on the LEFT */}
      <div className="bg-white border-b border-gray-200 py-3 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-xs font-normal">
          {/* Back Button on the LEFT */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[#1E3A5F] hover:text-[#152943] font-normal transition-colors bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Retour au blog</span>
          </Link>

          {/* Breadcrumb on the RIGHT */}
          <div className="flex items-center gap-2 text-gray-500 truncate">
            <Link href="/" className="hover:text-[#1E3A5F] transition-colors">ME2I</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#1E3A5F] transition-colors">Blog et Articles</Link>
            <span>/</span>
            <span className="text-gray-800 font-normal truncate max-w-xs">{article.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* MAIN CONTENT (8 Cols) */}
          <main className="lg:col-span-8 bg-white border border-gray-200 rounded-sm p-6 sm:p-8 lg:p-10 shadow-sm">
            {/* Header Metadata */}
            <header className="border-b border-gray-100 pb-6 mb-8">
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4 font-normal">
                <span className="bg-[#1E3A5F] text-white font-normal px-3 py-1 rounded-sm uppercase tracking-wider text-[11px]">
                  {article.category || 'Maintenance Industrielle'}
                </span>
                {formattedDate && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                    {formattedDate}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-gray-400" />
                  {readTime} min de lecture
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5 text-gray-400" />
                  Par Équipe ME2I
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1d2327] leading-tight mb-4">
                {article.title}
              </h1>

              {/* Excerpt Callout (only if not identical to content) */}
              {article.excerpt && !isDuplicateDescription && (
                <p className="text-base text-gray-600 font-normal leading-relaxed border-l-4 border-[#1E3A5F] bg-gray-50 p-4 rounded-r-sm italic">
                  {article.excerpt}
                </p>
              )}
            </header>

            {/* Cover Image (Uncropped) */}
            {article.cover_url && (
              <div className="w-full bg-gray-50 border border-gray-200 rounded-sm overflow-hidden mb-8 shadow-sm">
                <img
                  src={article.cover_url}
                  alt={article.title}
                  className="w-full h-auto max-h-[500px] object-cover"
                />
              </div>
            )}

            {/* Rich HTML Content Body */}
            <div
              className="prose prose-slate max-w-none text-gray-800 leading-relaxed font-normal
                prose-headings:font-normal prose-headings:text-[#1d2327]
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-2
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:mb-4 prose-p:leading-relaxed
                prose-a:text-[#1E3A5F] prose-a:underline hover:prose-a:text-[#2A5DB0]
                prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4
                prose-li:mb-2
                prose-blockquote:border-l-4 prose-blockquote:border-[#1E3A5F] prose-blockquote:bg-gray-50 prose-blockquote:p-4 prose-blockquote:font-normal prose-blockquote:italic
                prose-img:rounded-sm prose-img:border prose-img:border-gray-200 prose-img:shadow-sm"
              dangerouslySetInnerHTML={{ __html: article.content || '<p>Aucun contenu disponible pour cet article.</p>' }}
            />

            {/* Article Footer & Action */}
            <footer className="mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs font-normal text-[#1E3A5F] hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Retour à la liste des articles</span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#1E3A5F] hover:bg-[#152943] text-white text-xs font-normal px-4 py-2 rounded-sm transition-colors shadow-sm"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Demander des informations sur cet article</span>
              </Link>
            </footer>
          </main>

          {/* RIGHT SIDEBAR (4 Cols - WordPress Widget Area Style) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Widget 1: À propos de ME2I */}
            <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-sm">
              <div className="border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#1E3A5F]" />
                <h3 className="text-xs font-normal uppercase tracking-wider text-[#1d2327]">
                  À propos de ME2I
                </h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-normal mb-4">
                ME2I (Maintenance Industrielle et Énergie sans Interruption) est votre spécialiste au Cameroun pour la maintenance des groupes électrogènes, l'automatisme industriel et les énergies renouvelables.
              </p>
              <Link
                href="/a-propos"
                className="inline-flex items-center gap-1 text-xs text-[#1E3A5F] hover:underline font-normal"
              >
                <span>En savoir plus sur notre entreprise</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Widget 2: Articles récents */}
            {recentArticles && recentArticles.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-sm">
                <div className="border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#1E3A5F]" />
                  <h3 className="text-xs font-normal uppercase tracking-wider text-[#1d2327]">
                    Articles récents
                  </h3>
                </div>
                <div className="space-y-4">
                  {recentArticles.map((item) => (
                    <Link
                      key={item.id}
                      href={`/blog/${item.slug || item.id.replace('art_', '')}`}
                      className="group flex gap-3 items-start border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                    >
                      {item.cover_url && (
                        <img
                          src={item.cover_url}
                          alt={item.title}
                          className="w-14 h-14 object-cover rounded-sm border border-gray-200 shrink-0 bg-gray-50"
                        />
                      )}
                      <div>
                        <h4 className="text-xs font-normal text-[#1d2327] group-hover:text-[#1E3A5F] transition-colors line-clamp-2 leading-snug">
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-gray-400 mt-1 block font-normal">
                          {new Date(item.created_at).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Widget 3: Contact & Devis rapide */}
            <div className="bg-[#1E3A5F] text-white rounded-sm p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-amber-400" />
                <h3 className="text-xs font-normal uppercase tracking-wider text-white">
                  Besoin d'une intervention ?
                </h3>
              </div>
              <p className="text-xs text-white/80 leading-relaxed font-normal">
                Nos équipes d'ingénieurs et techniciens interviennent 24h/24 et 7j/7 pour la maintenance de vos installations industrielles.
              </p>

              <div className="space-y-2 pt-2 text-xs font-normal">
                {companySettings?.phone && (
                  <a
                    href={`tel:${companySettings.phone}`}
                    className="flex items-center gap-2 text-white/90 hover:text-white hover:underline"
                  >
                    <Phone className="h-3.5 w-3.5 text-amber-400" />
                    <span>{companySettings.phone}</span>
                  </a>
                )}
                {companySettings?.email && (
                  <a
                    href={`mailto:${companySettings.email}`}
                    className="flex items-center gap-2 text-white/90 hover:text-white hover:underline"
                  >
                    <Mail className="h-3.5 w-3.5 text-amber-400" />
                    <span className="truncate">{companySettings.email}</span>
                  </a>
                )}
              </div>

              <div className="pt-3">
                <Link
                  href="/contact"
                  className="block text-center w-full bg-amber-500 hover:bg-amber-600 text-[#1d2327] font-normal text-xs py-2 rounded-sm transition-colors shadow-sm uppercase tracking-wider"
                >
                  Demander un devis gratuit
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
