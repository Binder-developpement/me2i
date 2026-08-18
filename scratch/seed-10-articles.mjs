import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.resolve(__dirname, '../.env.local')

if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8')
  envConfig.split('\n').forEach((line) => {
    const parts = line.split('=')
    if (parts.length >= 2) {
      const key = parts[0].trim()
      const val = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '')
      if (key && !process.env[key]) {
        process.env[key] = val
      }
    }
  })
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Supabase credentials missing in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const articles = [
  {
    title: "Guide complet de la maintenance préventive des groupes électrogènes industriels",
    slug: "guide-maintenance-preventive-groupes-electrogenes-industriels",
    category: "Groupes Électrogènes",
    excerpt: "Découvrez les étapes essentielles pour planifier et exécuter la maintenance préventive de vos groupes électrogènes de secours et permanents.",
    cover_url: "/images/realisations/realisation_p6_img1.png",
    status: "published",
    content: `
      <h2>Pourquoi la maintenance préventive est cruciale pour votre entreprise</h2>
      <p>Un groupe électrogène industriel représente la colonne vertébrale énergétique de toute installation moderne au Cameroun. Qu'il s'agisse d'un hôpital, d'une usine manufacturière ou d'un complexe hôtelier, l'interruption soudaine du réseau principal exige une réponse instantanée et sans faille du générateur de secours.</p>
      
      <div class="bg-blue-50 p-4 border-l-4 border-blue-600 my-6 font-medium text-slate-800 rounded-r">
        <strong>Note d'expert ME2I :</strong> Plus de 80% des pannes de groupes électrogènes constatées lors de coupures réseau sont dues à un manque d'entretien préventif ou à une défaillance de batterie non détectée.
      </div>

      <h2>Les opérations clés du programme de maintenance</h2>
      <p>Pour garantir la longévité de vos équipements (Perkins, SDMO, Cummins, Caterpillar), ME2I recommande un calendrier de vérifications structuré :</p>
      
      <ul>
        <li><strong>Inspection des fluides :</strong> Contrôle hebdomadaire du niveau d'huile moteur, du liquide de refroidissement et détection des fuites éventuelles.</li>
        <li><strong>Remplacement des filtres :</strong> Changement périodique du filtre à huile, du filtre à gasoil et du filtre à air toutes les 250 heures de fonctionnement ou une fois par an.</li>
        <li><strong>Entretien du système de démarrage :</strong> Test de la tension et de la densité de l'électrolyte de la batterie, nettoyage des bornes et vérification du chargeur statique.</li>
        <li><strong>Vérification de l'alternateur :</strong> Mesure de l'isolement des enroulements et contrôle du régulateur automatique de tension (AVR).</li>
      </ul>

      <h2>Essais périodiques sous charge</h2>
      <p>Faire tourner un groupe électrogène à vide n'est pas suffisant. Un essai sous charge réelle (minimum 50% à 70% de la puissance nominale) au moins une fois par mois permet de décrasser le moteur, d'éviter l'encrassement des injecteurs et de valider le comportement thermique complet de la machine.</p>

      <p>Faites confiance aux équipes techniques ME2I à Douala et Yaoundé pour instaurer un contrat de maintenance sur mesure adapté à vos besoins industriels.</p>
    `
  },
  {
    title: "Comment choisir et programmer une carte de contrôle DSE (Deep Sea Electronics 6120 / 7320) ?",
    slug: "choisir-programmer-carte-de-controle-dse-6120-7320",
    category: "Automatisme et Contrôle",
    excerpt: "Analyse technique et étapes de configuration des modules de contrôle automatiques DSE 6120 et 7320 pour la gestion optimale des groupes électrogènes.",
    cover_url: "/images/realisations/realisation_p9_img1.png",
    status: "published",
    content: `
      <h2>Le rôle central du module de contrôle dans un groupe électrogène</h2>
      <p>Le module de contrôle est le cerveau de l'installation. Il surveille en temps réel les paramètres mécaniques du moteur (pression d'huile, température d'eau, vitesse) et les grandeurs électriques de l'alternateur (tension, fréquence, courant, puissance).</p>

      <h2>Comparatif : DSE 6120 vs DSE 7320</h2>
      <p>Les cartes de contrôle de la marque Deep Sea Electronics (DSE) constituent le standard le plus répandu et le plus fiable sur le marché :</p>

      <ul>
        <li><strong>DSE 6120 :</strong> Idéal pour les applications de secours mono-groupe avec gestion automatique de l'inverseur. Il offre un écran LCD clair, un journal des événements et des protections complètes contre les surcharges et anomalies moteur.</li>
        <li><strong>DSE 7320 :</strong> Module avancé conçu pour les installations complexes nécessitant la télégestion SCADA, la synchronisation réseau, le délestage de charge et une connectivité modbus étendue.</li>
      </ul>

      <div class="bg-amber-50 p-4 border-l-4 border-amber-500 my-6 font-medium text-slate-800 rounded-r">
        <strong>Recommandation technique :</strong> La programmation d'une carte DSE nécessite le logiciel DSE Configuration Suite et un paramétrage rigoureux des temporisations de refroidissement pour éviter tout choc thermique lors de l'arrêt du moteur.
      </div>

      <h2>Étapes de mise en service et paramétrage par ME2I</h2>
      <p>Nos ingénieurs procèdent au câblage intégral du faisceau de commande, au raccordement des capteurs de pression et de température, ainsi qu'au réglage précis des seuils d'alarme pour garantir une sécurité absolue de vos groupes électrogènes Aksa, Mikano ou SDMO.</p>
    `
  },
  {
    title: "Conception et câblage d'un coffret inverseur automatique de source (ATS) pour l'industrie",
    slug: "conception-cablage-coffret-inverseur-automatique-source-ats",
    category: "Armoires Électriques",
    excerpt: "Comprendre le fonctionnement et les exigences de sécurité d'un coffret inverseur automatique de source entre le réseau ENEO et un groupe de secours.",
    cover_url: "/images/realisations/realisation_p8_img1.png",
    status: "published",
    content: `
      <h2>Assurer la continuité de service sans intervention humaine</h2>
      <p>Dans des secteurs critiques comme les boulangeries industrielles, les banques de sang ou les centres de données, la rupture d'alimentation secteur doit être compensée en quelques secondes. C'est le rôle précis du coffret inverseur automatique de source (ATS).</p>

      <h2>Composants essentiels d'un inverseur de source ME2I</h2>
      <p>Un coffret inverseur fabriqué dans nos ateliers intègre des composants de qualité industrielle rigoureusement dimensionnés :</p>

      <ul>
        <li><strong>Contacteurs de puissance à verrouillage mécanique et électrique :</strong> Empêchent physiquement le couplage simultané entre le secteur et le groupe électrogène.</li>
        <li><strong>Automate ou relais de commutation :</strong> Analyse la présence et la qualité des phases du réseau principal avant de déclencher l'ordre de démarrage du groupe.</li>
        <li><strong>Protections magnétothermiques et différentielles :</strong> Protègent les équipements aval contre les surintensités et les défauts d'isolement.</li>
        <li><strong>Voyants et centrale de mesure :</strong> Permettent aux opérateurs de contrôler l'état des sources et la répartition des phases en un coup d'œil.</li>
      </ul>

      <div class="bg-blue-50 p-4 border-l-4 border-blue-600 my-6 font-medium text-slate-800 rounded-r">
        <strong>Sécurité de retour réseau :</strong> ME2I intègre systématiquement une temporisation de sécurité (généralement 1 à 3 minutes) lors du retour du réseau public afin de s'assurer de sa stabilité avant d'effectuer le basculement inverse.
      </div>

      <h2>Réalisation sur mesure à Douala</h2>
      <p>Que ce soit pour une puissance de 12kVA ou de plus de 400kVA, ME2I conçoit, assemble et met en service vos armoires et coffrets inverseurs selon les normes NFC 15-100 et IEC 60947-6-1.</p>
    `
  },
  {
    title: "Diagnostiquer et remplacer les diodes rotatives sur un alternateur de groupe électrogène",
    slug: "diagnostiquer-remplacer-diodes-rotatives-alternateur-groupe-electrogene",
    category: "Maintenance Corrective",
    excerpt: "Comment identifier les défaillances de pont de diodes rotatives responsables des chutes de tension et des instabilités sur vos générateurs.",
    cover_url: "/images/realisations/realisation_p12_img1.png",
    status: "published",
    content: `
      <h2>Symptômes d'une défaillance du pont de diodes rotatives</h2>
      <p>Lorsqu'un groupe électrogène démarre normalement mais ne délivre aucune tension en sortie, ou affiche une tension très faible et instable malgré un moteur à régime nominal, le pont de diodes rotatives de l'alternateur est très souvent en cause.</p>

      <h2>Comprendre le rôle des diodes dans l'alternateur brushless</h2>
      <p>Dans les alternateurs modernes sans balais (brushless), le pont de diodes rotatives est monté directement sur l'arbre de l'induit. Il transforme le courant alternatif produit par l'excitatrice en courant continu injecté dans la roue polaire. Si une ou plusieurs diodes tombent en court-circuit ou se coupent, le champ magnétique principal s'effondre.</p>

      <h2>Procédure de diagnostic étape par étape</h2>
      <ul>
        <li><strong>Déconnexion de la batterie :</strong> Travailler en sécurité hors tension sur un groupe consigné.</li>
        <li><strong>Accès au pont de diodes :</strong> Démontage du capot arrière de l'alternateur.</li>
        <li><strong>Test individuel des diodes :</strong> Desserrage d'une borne de chaque diode et mesure au multimètre en mode testeur de diode (passante dans un sens, bloquante dans l'autre).</li>
        <li><strong>Vérification de la varistance (surpresseur de tension) :</strong> Contrôle de l'élément de protection contre les surtensions transitoires.</li>
      </ul>

      <p>L'équipe ME2I intervient directement sur site dans les stations-service, ateliers et entreprises pour remplacer les ponts de diodes défectueux par des composants d'origine (Stamford, Leroy Somer, Mecc Alte) et réajuster la tension de sortie sous charge nominale.</p>
    `
  },
  {
    title: "Hybridation Solaire et Groupe Électrogène : Optimiser les coûts de carburant en Afrique centrale",
    slug: "hybridation-solaire-groupe-electrogene-optimisation-carburant",
    category: "Énergies Renouvelables",
    excerpt: "Découvrez comment le couplage entre panneaux photovoltaïques et groupes électrogènes réduit jusqu'à 60% les dépenses en gasoil des entreprises.",
    cover_url: "/images/realisations/realisation_p10_img1.png",
    status: "published",
    content: `
      <h2>Le défi des coûts de carburant pour l'industrie au Cameroun</h2>
      <p>Avec l'augmentation constante du prix du gasoil et la nécessité d'assurer un fonctionnement continu 24h/24, l'alimentation exclusive par groupe électrogène pèse lourdement sur les coûts d'exploitation des entreprises industrielles et agricoles.</p>

      <h2>Qu'est-ce que l'hybridation solaire / groupe ?</h2>
      <p>L'hybridation consiste à intégrer une centrale photovoltaïque et un parc de batteries de stockage au système électrique existant. Pendant les heures d'ensoleillement, les panneaux solaires fournissent l'essentiel de l'énergie requise. Le groupe électrogène n'intervient qu'en complément pour couvrir les pics de consommation ou lorsque les batteries atteignent leur seuil de décharge configuré.</p>

      <h2>Les avantages clés d'une solution hybride ME2I</h2>
      <ul>
        <li><strong>Réduction drastique de la facture de gasoil :</strong> Économie de 40% à 65% sur la consommation annuelle de carburant.</li>
        <li><strong>Augmentation de la durée de vie du groupe :</strong> Moins d'heures de fonctionnement moteur signifie un espacement des vidanges et des révisions lourdes.</li>
        <li><strong>Réduction des émissions carbone :</strong> Alignement avec les démarches RSE et les normes environnementales actuelles.</li>
      </ul>

      <div class="bg-emerald-50 p-4 border-l-4 border-emerald-600 my-6 font-medium text-slate-800 rounded-r">
        <strong>Accompagnement ME2I :</strong> De l'étude de faisabilité et dimensionnement du parc solaire jusqu'à l'installation et au paramétrage des onduleurs hybrides de forte puissance, ME2I vous apporte une solution clé en main.
      </div>
    `
  },
  {
    title: "Entretien des systèmes de refroidissement et radiateurs des groupes de forte puissance (1000kVA+)",
    slug: "entretien-systemes-refroidissement-radiateurs-groupes-forte-puissance",
    category: "Groupes Électrogènes",
    excerpt: "Prévenir les risques de surchauffe moteur sur les générateurs industriels Cummins, Caterpillar et MTU de grande capacité.",
    cover_url: "/images/realisations/realisation_p16_img1.png",
    status: "published",
    content: `
      <h2>Les enjeux thermiques sur les groupes électrogènes de forte puissance</h2>
      <p>Un groupe électrogène de 1000kVA ou 1400kVA transforme une quantité considérable d'énergie thermique. Le système de refroidissement est l'élément critique garant de l'intégrité mécanique du bloc moteur et de l'alternateur.</p>

      <h2>Origines fréquentes de surchauffe en environnement tropical</h2>
      <p>Sous le climat chaud et humide du Cameroun, les radiateurs industriels accumulent rapidement de la poussière, des dépôts d'huile et du tartre dans les faisceaux :</p>

      <ul>
        <li>Colmatage externe des ailettes de refroidissement par les poussières industrielles.</li>
        <li>Formation de boue et de tartre à l'intérieur du circuit dû à l'utilisation d'eau non traitée.</li>
        <li>Usure du calorstat (thermostat) bloqué en position fermée.</li>
        <li>Défaillance de la pompe à eau ou détérioration des courroies d'entraînement du ventilateur.</li>
      </ul>

      <h2>Protocole de maintenance curative et préventive ME2I</h2>
      <p>Nos techniciens appliquent un protocole complet comprenant le vidange du circuit, le détartrage chimique neutre du radiateur, le rinçage haute pression des ailettes, le contrôle de la pression de bouchon de vase d'expansion et le remplacement du liquide de refroidissement par un fluide organique longue durée anticorrosion.</p>
    `
  },
  {
    title: "Maintenance préventive des armoires de commande et contacteurs de puissance pour le froid industriel",
    slug: "maintenance-preventive-armoires-commande-contacteurs-froid-industriel",
    category: "Froid Industriel",
    excerpt: "Comment éviter les arrêts chaotiques des chaînes du froid et des chambres frigorifiques grâce au contrôle systématique des appareillages électriques.",
    cover_url: "/images/realisations/realisation_p13_img1.png",
    status: "published",
    content: `
      <h2>L'importance du froid industriel dans l'agroalimentaire</h2>
      <p>Une panne imprévue d'un groupe frigorifique dans une centrale d'abattage, une usine de transformation ou une chambre froide médicale peut entraîner des pertes financières massives en quelques heures. Les armoires électriques de commande sont soumises à des sollicitations intenses et répétées.</p>

      <h2>Les phénomènes d'usure des contacteurs de puissance</h2>
      <p>Chaque démarrage de compresseur engendre un appel de courant important. À terme, les contacts en alliage d'argent des contacteurs s'érodent, se pèsent ou s'oxydent. Cela entraîne un échauffement anormal par résistance de contact, pouvant conduire à la fusion des bornes ou au grillage des compresseurs.</p>

      <h2>Actions clés de la maintenance des armoires électriques</h2>
      <ul>
        <li><strong>Resserrage au couple des connexions :</strong> Prévenir le desserrage des borniers dû aux vibrations industrielles.</li>
        <li><strong>Nettoyage et déshydratation :</strong> Élimination de la poussière et humidité condensée dans les armoires.</li>
        <li><strong>Remplacement préventif des contacteurs usés :</strong> Analyse visuelle et mesure d'isolement avant l'apparition de l'arc permanent.</li>
        <li><strong>Contrôle des protections thermiques :</strong> Vérification des réglages des relais de surcharge et des contrôleurs de phase.</li>
      </ul>

      <p>ME2I garantit la maintenance préventive de vos installations de froid industriel sur l'ensemble du territoire camerounais.</p>
    `
  },
  {
    title: "Optimisation et réglage des brûleurs à gasoil pour fours industriels et boulangeries",
    slug: "optimisation-reglage-bruleurs-gasoil-fours-industriels-boulangeries",
    category: "Équipements Industriels",
    excerpt: "Méthodologie de réglage et de maintenance des brûleurs à fioul/gasoil pour assurer une combustion complète et maîtriser la consommation.",
    cover_url: "/images/realisations/realisation_p15_img1.png",
    status: "published",
    content: `
      <h2>Assurer une cuisson homogène tout en réduisant la consommation de carburant</h2>
      <p>Les brûleurs à gasoil équipent une grande majorité des fours à soles et rotatifs dans les boulangeries et usines agroalimentaires. Un brûleur mal réglé consomme excessivement, encrasse la chambre de combustion de suie et dégrade la qualité thermique de la cuisson.</p>

      <h2>Signes d'un dysfonctionnement de brûleur</h2>
      <ul>
        <li>Présence d'une fumée noire ou d'odeurs intenses de gasoil mal brûlé à la cheminée.</li>
        <li>Instabilité de la flamme et mises en sécurité répétées du coffret de contrôle de flamme.</li>
        <li>Difficulté à atteindre ou maintenir la température de consigne dans le four.</li>
      </ul>

      <h2>Les opérations techniques effectuées par ME2I</h2>
      <p>Nos interventions de maintenance sur brûleurs à fioul et gasoil comprennent :</p>
      <ul>
        <li>Nettoyage ou changement du gicleur (buse d'injection de combustible).</li>
        <li>Nettoyage des filtres à gasoil et révision de la pompe à haute pression.</li>
        <li>Vérification des électrodes d'allumage, du transformateur et de la cellule photoélectrique de détection de flamme.</li>
        <li>Réglage précis du volet d'air pour optimiser le rapport stœchiométrique air/carburant.</li>
      </ul>

      <p>Contactez ME2I pour auditer et régler vos brûleurs industriels afin d'allier performance thermique et économie de combustible.</p>
    `
  },
  {
    title: "Adaptation des systèmes d'arrêt moteur d'urgence et sécurité des installations industrielles",
    slug: "adaptation-systemes-arret-moteur-urgence-securite-installations",
    category: "Sécurité et Normes",
    excerpt: "Mise en place de dispositifs de coupure d'urgence et sécurité automatique sur groupes électrogènes de forte puissance.",
    cover_url: "/images/realisations/realisation_p14_img1.png",
    status: "published",
    content: `
      <h2>Les impératifs de sécurité sur les groupes électrogènes industriels</h2>
      <p>Les groupes électrogènes de forte puissance (250kVA et plus) concentrent des énergies mécaniques et électriques considérables. En cas d'anomalie critique (emballement moteur, baisse brutale de la pression d'huile, surchauffe ou fuite de carburant), l'arrêt immédiat du groupe est impératif pour éviter la destruction de la machine ou des départs d'incendie.</p>

      <h2>Intégration d'un système d'arrêt d'urgence redondant</h2>
      <p>ME2I adapte et installe des kits d'arrêt d'urgence comprenant :</p>

      <ul>
        <li><strong>Boutons coup de poing à verrouillage :</strong> Positionnés sur le groupe et à l'extérieur du local technique pour une action rapide des opérateurs.</li>
        <li><strong>Électrovanne de coupure de carburant :</strong> Coupe instantanément l'arrivée de gasoil au niveau de la pompe d'injection.</li>
        <li><strong>Volet de fermeture d'air d'admission :</strong> Dispositif anti-emballement coupant l'arrivée d'air au moteur en cas de survitesse.</li>
        <li><strong>Reconfiguration des cartes de commande :</strong> Intégration des boucles de sécurité de niveau SIL dans les modules DSE ou ComAp.</li>
      </ul>

      <p>Assurez la conformité de vos installations industrielles aux normes de sécurité au Cameroun avec l'accompagnement des ingénieurs ME2I.</p>
    `
  },
  {
    title: "Audit et diagnostic énergétique pour PME et usines : Réduire les coupures et la facture électrique",
    slug: "audit-diagnostic-energetique-pme-usines-cameroun",
    category: "Audit et Conseil",
    excerpt: "Analyse experte des réseaux électriques industriels, équilibrage des phases et compensation de l'énergie réactive.",
    cover_url: "/images/realisations/realisation_p7_img1.png",
    status: "published",
    content: `
      <h2>Pourquoi réaliser un audit énergétique industriel ?</h2>
      <p>De nombreuses entreprises au Cameroun subissent des pannes récurrentes, des disjonctions intempestives et des pénalités financières sur leur facture d'électricité en raison d'un réseau mal équilibré ou d'un mauvais facteur de puissance (Cos Phi).</p>

      <h2>Les étapes de l'audit énergétique réalisé par ME2I</h2>
      <ul>
        <li><strong>Campagne de mesure par analyseur de réseau :</strong> Enregistrement sur plusieurs jours des variations de tension, courant, harmoniques et déséquilibre de phase.</li>
        <li><strong>Analyse de la puissance souscrite et consommée :</strong> Identification des pics de charge et des surdimensionnements d'équipements.</li>
        <li><strong>Contrôle de la compensation réactive :</strong> Analyse des batteries de condensateurs existantes et calcul du besoin de compensation pour atteindre un Cos Phi supérieur à 0,95.</li>
        <li><strong>Inspecton thermographique :</strong> Détection par caméra thermique des points chauds sur les jeux de barres et disjoncteurs de puissance.</li>
      </ul>

      <div class="bg-blue-50 p-4 border-l-4 border-blue-600 my-6 font-medium text-slate-800 rounded-r">
        <strong>Résultat concret :</strong> À l'issue de l'audit, ME2I vous remet un rapport détaillé assorti d'un plan d'action préconisant les travaux prioritaires à amortissement rapide.
      </div>

      <p>Optimisez dès aujourd'hui la qualité et le coût de votre énergie avec le pôle conseil de ME2I à Douala.</p>
    `
  }
]

async function seed() {
  console.log('Seeding 10 definitive technical articles into Supabase...')

  for (const art of articles) {
    const { data, error } = await supabase
      .from('articles')
      .upsert(
        {
          title: art.title,
          slug: art.slug,
          category: art.category,
          excerpt: art.excerpt,
          cover_url: art.cover_url,
          status: art.status,
          content: art.content.trim(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'slug' }
      )
      .select()

    if (error) {
      console.error(`Error inserting article "${art.title}":`, error.message)
    } else {
      console.log(`✓ Article successfully inserted/updated: "${art.title}"`)
    }
  }

  console.log('Completed seeding 10 articles!')
}

seed()
