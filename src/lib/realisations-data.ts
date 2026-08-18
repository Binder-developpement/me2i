import { createServerClient } from '@/src/admin/lib/supabase-server'

export interface Realisation {
  id: string
  title: string
  slug: string
  category: string
  subtitle?: string
  description: string
  content: string
  cover_url: string
  client?: string
  location?: string
  status: 'published' | 'draft' | 'trash'
  created_at: string
  updated_at?: string
}

export const defaultRealisations: Realisation[] = [
  {
    id: 'realisation-1',
    title: "Câblage complet d'un groupe électrogène de 250kVA avec carte DSE 6120",
    slug: 'cablage-groupe-electrogene-250kva-dse-6120',
    category: 'Groupes Électrogènes',
    subtitle: 'Groupe électrogène 250kVA - Carte DSE 6120',
    description: "Réalisation du câblage intégral d'un groupe électrogène de 250kVA équipé d'un module de contrôle Deep Sea Electronics DSE 6120. L'intervention comprend le raccordement des capteurs de pression d'huile, de température moteur, du capteur de régime (MPU), du solénoïde d'arrêt et de l'alternateur de charge. La carte DSE 6120 permet une surveillance précise des paramètres électriques et mécaniques, avec démarrage et arrêt automatiques en cas de défaillance du réseau.",
    content: "Réalisation du câblage intégral d'un groupe électrogène de 250kVA équipé d'un module de contrôle Deep Sea Electronics DSE 6120. L'intervention comprend le raccordement des capteurs de pression d'huile, de température moteur, du capteur de régime (MPU), du solénoïde d'arrêt et de l'alternateur de charge. La carte DSE 6120 permet une surveillance précise des paramètres électriques et mécaniques, avec démarrage et arrêt automatiques en cas de défaillance du réseau. Tous les câbles ont été repérés, sous gaine de protection haute température, garantissant une fiabilité maximale sur site industriel.",
    cover_url: '/images/realisations/realisation_p6_img1.png',
    client: 'Site Industriel',
    location: 'Douala, Cameroun',
    status: 'published',
    created_at: '2026-05-11T10:00:00.000Z'
  },
  {
    id: 'realisation-2',
    title: "Câblage complet d'un groupe SDMO de 12kVA avec carte DSE 4520",
    slug: 'cablage-groupe-sdmo-12kva-dse-4520',
    category: 'Groupes Électrogènes',
    subtitle: 'SDMO 12kVA - Carte DSE 4520',
    description: "Installation et câblage complet d'un groupe électrogène SDMO de 12kVA destiné à l'alimentation de secours d'un bâtiment commercial. L'armoire de commande a été équipée d'une carte DSE 4520, offrant une interface simple et intuitive pour la gestion automatique de la source. Le projet incluait le câblage de puissance, la mise en place des protections magnétothermiques, le réglage des seuils de tension/fréquence et la réalisation des essais en charge.",
    content: "Installation et câblage complet d'un groupe électrogène SDMO de 12kVA destiné à l'alimentation de secours d'un bâtiment commercial. L'armoire de commande a été équipée d'une carte DSE 4520, offrant une interface simple et intuitive pour la gestion automatique de la source. Le projet incluait le câblage de puissance, la mise en place des protections magnétothermiques, le réglage des seuils de tension/fréquence et la réalisation des essais en charge.",
    cover_url: '/images/realisations/realisation_p7_img1.png',
    client: 'Bâtiment Commercial',
    location: 'Douala, Cameroun',
    status: 'published',
    created_at: '2026-05-12T10:00:00.000Z'
  },
  {
    id: 'realisation-3',
    title: "Coffret inverseur de source automatique pour boulangerie",
    slug: 'coffret-inverseur-source-automatique-boulangerie',
    category: 'Automatisme & Coffrets',
    subtitle: 'Automatisme - Inverseur de source - Boulangerie',
    description: "Conception sur mesure et fabrication d'un coffret inverseur de source automatique (ATS) pour une boulangerie industrielle. Ce coffret assure la bascule automatique du réseau vers le groupe électrogène en moins de 10 secondes en cas de coupure de courant, évitant ainsi l'interruption de la chaîne de cuisson et la perte de marchandise. Il intègre un verrouillage mécanique et électrique entre les contacteurs.",
    content: "Conception sur mesure et fabrication d'un coffret inverseur de source automatique (ATS) pour une boulangerie industrielle. Ce coffret assure la bascule automatique du réseau vers le groupe électrogène en moins de 10 secondes en cas de coupure de courant, évitant ainsi l'interruption de la chaîne de cuisson et la perte de marchandise. Il intègre un verrouillage mécanique et électrique entre les contacteurs pour empêcher tout risque de retour de tension.",
    cover_url: '/images/realisations/realisation_p8_img1.png',
    client: 'Boulangerie Industrielle',
    location: 'Douala, Cameroun',
    status: 'published',
    created_at: '2026-05-13T10:00:00.000Z'
  },
  {
    id: 'realisation-4',
    title: "Câblage complet d'un groupe Aksa avec carte DSE 6120",
    slug: 'cablage-groupe-aksa-dse-6120',
    category: 'Groupes Électrogènes',
    subtitle: 'Groupe Aksa - Carte DSE 6120',
    description: "Réalisation du câblage complet d'un groupe électrogène de marque Aksa. L'intervention a nécessité la refonte complète du faisceau électrique moteur, la réorganisation de la platine de commande et le paramétrage de la carte DSE 6120. Des tests rigoureux ont été effectués : simulation de défaillance secteur, contrôle des protections de température et de pression, et mesure des grandeurs électriques en charge.",
    content: "Réalisation du câblage complet d'un groupe électrogène de marque Aksa. L'intervention a nécessité la refonte complète du faisceau électrique moteur, la réorganisation de la platine de commande et le paramétrage de la carte DSE 6120. Des tests rigoureux ont été effectués : simulation de défaillance secteur, contrôle des protections de température et de pression, et mesure des grandeurs électriques en charge.",
    cover_url: '/images/realisations/realisation_p9_img1.png',
    client: 'Site Télécom / Industriel',
    location: 'Yaoundé, Cameroun',
    status: 'published',
    created_at: '2026-05-14T10:00:00.000Z'
  },
  {
    id: 'realisation-5',
    title: "Installation d'un groupe SDMO 12kVA avec coffret inverseur automatique",
    slug: 'installation-groupe-sdmo-12kva-inverseur-auto',
    category: 'Installation & Énergie',
    subtitle: 'Installation SDMO 12kVA - Inverseur Automatique',
    description: "Installation complète clé en main d'un groupe électrogène SDMO de 12kVA, comprenant le génie civil (dalle béton anti-vibrations), le raccordement de l'échappement, l'installation du coffret inverseur automatique et le câblage de puissance jusqu'au TGBT principal. L'installation garantit une autonomie énergétique totale pour les équipements critiques du client.",
    content: "Installation complète clé en main d'un groupe électrogène SDMO de 12kVA, comprenant le génie civil (dalle béton anti-vibrations), le raccordement de l'échappement, l'installation du coffret inverseur automatique et le câblage de puissance jusqu'au TGBT principal. L'installation garantit une autonomie énergétique totale pour les équipements critiques du client.",
    cover_url: '/images/realisations/realisation_p10_img1.png',
    client: 'Clinique / Santé',
    location: 'Douala, Cameroun',
    status: 'published',
    created_at: '2026-05-15T10:00:00.000Z'
  },
  {
    id: 'realisation-6',
    title: "Câblage complet d'un groupe Olympian de 30kVA avec carte DSE 7320",
    slug: 'cablage-groupe-olympian-30kva-dse-7320',
    category: 'Groupes Électrogènes',
    subtitle: 'Olympian 30kVA - Carte DSE 7320',
    description: "Câblage intégral d'un groupe électrogène Olympian de 30kVA avec l'intégration d'un module de contrôle DSE 7320. Cette carte avancée permet une gestion intelligente du groupe avec surveillance à distance, enregistrement des événements et gestion du carburant. Le câblage intègre toutes les sécurités électriques et mécaniques pour assurer une disponibilité maximale sur site.",
    content: "Câblage intégral d'un groupe électrogène Olympian de 30kVA avec l'intégration d'un module de contrôle DSE 7320. Cette carte avancée permet une gestion intelligente du groupe avec surveillance à distance, enregistrement des événements et gestion du carburant. Le câblage intègre toutes les sécurités électriques et mécaniques pour assurer une disponibilité maximale sur site.",
    cover_url: '/images/realisations/realisation_p11_img1.png',
    client: 'Établissement Scolaire / Tertiaire',
    location: 'Douala, Cameroun',
    status: 'published',
    created_at: '2026-05-16T10:00:00.000Z'
  },
  {
    id: 'realisation-7',
    title: "Remplacement des diodes rotatives sur un groupe MIKANO de 13.5kVA",
    slug: 'remplacement-diodes-rotatives-groupe-mikano-13-5kva',
    category: 'Maintenance Corrective',
    subtitle: 'Mikano 13.5kVA - Station-Service',
    description: "Intervention de maintenance corrective sur l'alternateur d'un groupe MIKANO de 13.5kVA alimentant une station-service. Suite à une perte de tension en sortie d'alternateur, le diagnostic MCI a identifié le claquage du pont de diodes rotatives. L'intervention a consisté au démontage du pont défectueux, au remplacement des diodes et de la varistance de protection, suivi d'un contrôle de l'excitation et d'un test sous charge.",
    content: "Intervention de maintenance corrective sur l'alternateur d'un groupe MIKANO de 13.5kVA alimentant une station-service. Suite à une perte de tension en sortie d'alternateur, le diagnostic MCI a identifié le claquage du pont de diodes rotatives. L'intervention a consisté au démontage du pont défectueux, au remplacement des diodes et de la varistance de protection, suivi d'un contrôle de l'excitation et d'un test sous charge.",
    cover_url: '/images/realisations/realisation_p12_img1.png',
    client: 'Station-Service',
    location: 'Douala, Cameroun',
    status: 'published',
    created_at: '2026-05-17T10:00:00.000Z'
  },
  {
    id: 'realisation-8',
    title: "Entretien des contacteurs de puissance pour groupe froid industriel",
    slug: 'entretien-contacteurs-puissance-groupe-froid-industriel',
    category: 'Froid Industriel & Climatisation',
    subtitle: 'Maintenance Préventive - Froid Industriel',
    description: "Maintenance préventive d'une armoire de commande électrique alimentant un groupe de froid industriel (chambre froide). L'opération comprend le contrôle thermographique des connexions, le resserrage des bornes, le nettoyage des contacts de puissance des contacteurs et le remplacement des composants présentant des signes d'échauffement anormal ou d'usure avancée.",
    content: "Maintenance préventive d'une armoire de commande électrique alimentant un groupe de froid industriel (chambre froide). L'opération comprend le contrôle thermographique des connexions, le resserrage des bornes, le nettoyage des contacts de puissance des contacteurs et le remplacement des composants présentant des signes d'échauffement anormal ou d'usure avancée.",
    cover_url: '/images/realisations/realisation_p13_img1.png',
    client: 'Usine Agroalimentaire / Chambre Froide',
    location: 'Douala, Cameroun',
    status: 'published',
    created_at: '2026-05-18T10:00:00.000Z'
  },
  {
    id: 'realisation-9',
    title: "Adaptation d'un arrêt moteur sur un groupe électrogène de 250kVA",
    slug: 'adaptation-arret-moteur-groupe-electrogene-250kva',
    category: 'Sécurité & Contrôle',
    subtitle: 'Sécurité - Arrêt Moteur - 250kVA',
    description: "Modification et adaptation du système d'arrêt moteur sur un groupe électrogène de 250kVA. Cette intervention consiste à installer un dispositif d'arrêt d'urgence supplémentaire et à reconfigurer le circuit de commande pour améliorer la sécurité. Le système permet désormais un arrêt immédiat en cas de défaut critique : surchauffe moteur, basse pression d'huile, survitesse ou défaut alternateur.",
    content: "Modification et adaptation du système d'arrêt moteur sur un groupe électrogène de 250kVA. Cette intervention consiste à installer un dispositif d'arrêt d'urgence supplémentaire et à reconfigurer le circuit de commande pour améliorer la sécurité. Le système permet désormais un arrêt immédiat en cas de défaut critique : surchauffe moteur, basse pression d'huile, survitesse ou défaut alternateur.",
    cover_url: '/images/realisations/realisation_p14_img1.png',
    client: 'Site Industriel de Grande Puissance',
    location: 'Douala, Cameroun',
    status: 'published',
    created_at: '2026-05-19T10:00:00.000Z'
  },
  {
    id: 'realisation-10',
    title: "Intervention sur un brûleur à gasoil pour une mini boulangerie",
    slug: 'intervention-bruleur-gasoil-mini-boulangerie',
    category: 'Maintenance Industrielle',
    subtitle: 'Maintenance - Brûleur à Gasoil - Boulangerie',
    description: "Diagnostic et réparation d'un brûleur à gasoil utilisé dans le four d'une mini boulangerie. L'intervention comprend le nettoyage de la buse d'injection, le réglage de la pompe à combustible, la vérification du transformateur d'allumage et l'optimisation du rapport air/combustible pour une combustion efficace et économique.",
    content: "Diagnostic et réparation d'un brûleur à gasoil utilisé dans le four d'une mini boulangerie. L'intervention comprend le nettoyage de la buse d'injection, le réglage de la pompe à combustible, la vérification du transformateur d'allumage et l'optimisation du rapport air/combustible pour une combustion efficace et économique. Un brûleur bien réglé réduit la consommation de carburant et garantit une température de cuisson stable.",
    cover_url: '/images/realisations/realisation_p15_img1.png',
    client: 'Mini Boulangerie',
    location: 'Douala, Cameroun',
    status: 'published',
    created_at: '2026-05-20T10:00:00.000Z'
  },
  {
    id: 'realisation-11',
    title: "Entretien radiateur sur un groupe Cummins de 1400kVA",
    slug: 'entretien-radiateur-groupe-cummins-1400kva',
    category: 'Groupes Électrogènes',
    subtitle: 'Cummins 1400kVA - Refroidissement',
    description: "Maintenance du système de refroidissement d'un groupe électrogène Cummins de grande puissance (1400kVA). L'opération inclut le rinçage complet du circuit, le détartrage du radiateur, la vérification du thermostat et de la pompe à eau, ainsi que le remplacement du liquide de refroidissement spécial moteurs lourds.",
    content: "Maintenance du système de refroidissement d'un groupe électrogène Cummins de grande puissance (1400kVA). L'opération inclut le rinçage complet du circuit, le détartrage du radiateur, la vérification du thermostat et de la pompe à eau, ainsi que le remplacement du liquide de refroidissement spécial moteurs lourds. Pour un groupe de cette puissance, un refroidissement optimal est essentiel pour éviter des dommages irréversibles.",
    cover_url: '/images/realisations/realisation_p16_img1.png',
    client: 'Centrale Électrique / Usine',
    location: 'Douala, Cameroun',
    status: 'published',
    created_at: '2026-05-21T10:00:00.000Z'
  },
  {
    id: 'realisation-12',
    title: "Coffret inverseur semi-automatique pour une carrière",
    slug: 'coffret-inverseur-semi-automatique-carriere',
    category: 'Automatisme & Coffrets',
    subtitle: 'Conception - Coffret Inverseur - Carrière',
    description: "Conception et réalisation d'un coffret inverseur de source semi-automatique destiné à une carrière d'exploitation minière. Ce coffret permet la commutation entre le réseau et le groupe électrogène avec une intervention minimale de l'opérateur. Il intègre des voyants de signalisation, des protections renforcées et des contacteurs dimensionnés pour les charges lourdes d'un site minier.",
    content: "Conception et réalisation d'un coffret inverseur de source semi-automatique destiné à une carrière d'exploitation minière. Ce coffret permet la commutation entre le réseau et le groupe électrogène avec une intervention minimale de l'opérateur. Il intègre des voyants de signalisation, des protections renforcées et des contacteurs dimensionnés pour les charges lourdes d'un site minier.",
    cover_url: '/images/realisations/realisation_p17_img1.png',
    client: 'Carrière & Exploitation Minière',
    location: 'Cameroun',
    status: 'published',
    created_at: '2026-05-22T10:00:00.000Z'
  },
  {
    id: 'realisation-13',
    title: "Installation d'onduleurs et de batteries de stockage",
    slug: 'installation-onduleurs-batteries-stockage',
    category: 'Énergies Renouvelables & Stockage',
    subtitle: 'Stockage Énergie - Onduleurs & Batteries',
    description: "Mise en place d'un système de stockage d'énergie composé d'onduleurs hybrides et de batteries de stockage haute capacité. L'installation comprend le montage et le raccordement des onduleurs, la configuration des paramètres de charge et de décharge, ainsi que l'intégration au réseau électrique existant.",
    content: "Mise en place d'un système de stockage d'énergie composé d'onduleurs hybrides et de batteries de stockage haute capacité. L'installation comprend le montage et le raccordement des onduleurs, la configuration des paramètres de charge et de décharge, ainsi que l'intégration au réseau électrique existant. Ce système assure une alimentation de secours fiable en cas de coupure secteur et optimise l'autoconsommation.",
    cover_url: '/images/realisations/realisation_p18_img1.jpeg',
    client: 'Site Tertiaire / Résidentiel',
    location: 'Douala, Cameroun',
    status: 'published',
    created_at: '2026-05-23T10:00:00.000Z'
  },
  {
    id: 'realisation-14',
    title: "Installation de batteries et onduleurs industriels",
    slug: 'installation-batteries-onduleurs-industriels',
    category: 'Énergies Renouvelables & Stockage',
    subtitle: 'Stockage Énergie - Batteries & Onduleurs',
    description: "Mise en place d'un système de stockage d'énergie composé de batteries industrielles à décharge profonde et d'onduleurs de puissance. L'installation assure une alimentation de secours fiable pour les équipements critiques en cas de coupure secteur. Le système comprend un parc de batteries dimensionné pour une autonomie de plusieurs heures et un monitoring en temps réel.",
    content: "Mise en place d'un système de stockage d'énergie composé de batteries industrielles à décharge profonde et d'onduleurs de puissance. L'installation assure une alimentation de secours fiable pour les équipements critiques en cas de coupure secteur. Le système comprend un parc de batteries dimensionné pour une autonomie de plusieurs heures et un monitoring en temps réel.",
    cover_url: '/images/realisations/realisation_p19_img1.png',
    client: 'Complexe Hôtelier / Industriel',
    location: 'Douala, Cameroun',
    status: 'published',
    created_at: '2026-05-24T10:00:00.000Z'
  },
  {
    id: 'realisation-15',
    title: "Maintenance et réparation de groupe électrogène industriel",
    slug: 'maintenance-reparation-groupe-electrogene-industriel',
    category: 'Groupes Électrogènes',
    subtitle: 'Groupes Électrogènes - Maintenance & Réparation',
    description: "Intervention de maintenance corrective sur un groupe électrogène industriel sur site. Les techniciens MCI procèdent au diagnostic et à la réparation des composants défaillants directement chez le client : contrôle du circuit de démarrage, vérification des connexions électriques, remplacement des pièces usées et tests de mise en charge.",
    content: "Intervention de maintenance corrective sur un groupe électrogène industriel sur site. Les techniciens MCI procèdent au diagnostic et à la réparation des composants défaillants directement chez le client : contrôle du circuit de démarrage, vérification des connexions électriques, remplacement des pièces usées et tests de mise en charge.",
    cover_url: '/images/realisations/realisation_p20_img1.png',
    client: 'Usine de Production',
    location: 'Douala, Cameroun',
    status: 'published',
    created_at: '2026-05-25T10:00:00.000Z'
  },
  {
    id: 'realisation-16',
    title: "Installation de panneaux solaires photovoltaïques sur toiture métallique",
    slug: 'installation-panneaux-solaires-toiture-metallique',
    category: 'Énergie Solaire',
    subtitle: 'Énergie Solaire - Installation Photovoltaïque',
    description: "Réalisation d'une installation solaire photovoltaïque sur toiture métallique pour un site industriel. Le projet comprend la pose de panneaux solaires haute performance fixés sur des structures adaptées, le câblage en série et parallèle, le raccordement aux onduleurs et l'intégration au tableau de distribution principal.",
    content: "Réalisation d'une installation solaire photovoltaïque sur toiture métallique pour un site industriel. Le projet comprend la pose de panneaux solaires haute performance fixés sur des structures adaptées, le câblage en série et parallèle, le raccordement aux onduleurs et l'intégration au tableau de distribution principal. Cette installation couvre une part majeure des besoins énergétiques du site.",
    cover_url: '/images/realisations/realisation_p21_img1.png',
    client: 'Site Industriel / Agroalimentaire',
    location: 'Douala, Cameroun',
    status: 'published',
    created_at: '2026-05-26T10:00:00.000Z'
  },
  {
    id: 'realisation-17',
    title: "Installation solaire photovoltaïque sur toiture pour bâtiment commercial",
    slug: 'installation-solaire-photovoltaique-toiture-batiment-commercial',
    category: 'Énergie Solaire',
    subtitle: 'Énergie Solaire - Centrale sur Toiture',
    description: "Déploiement d'une centrale solaire photovoltaïque sur toiture pour un bâtiment commercial. Le projet inclut la fixation de panneaux solaires monocristallins sur rails de montage, le raccordement des strings, l'installation des boîtiers de jonction et la mise en service du système de production.",
    content: "Déploiement d'une centrale solaire photovoltaïque sur toiture pour un bâtiment commercial. Le projet inclut la fixation de panneaux solaires monocristallins sur rails de montage, le raccordement des strings, l'installation des boîtiers de jonction et la mise en service du système de production. Les panneaux sont orientés de manière optimale pour maximiser le rendement énergétique tout au long de l'année.",
    cover_url: '/images/realisations/realisation_p22_img1.jpeg',
    client: 'Bâtiment Commercial / Supermarché',
    location: 'Douala, Cameroun',
    status: 'published',
    created_at: '2026-05-27T10:00:00.000Z'
  }
]

export async function fetchAllRealisations(): Promise<Realisation[]> {
  try {
    const supabase = await createServerClient()
    const { data, error } = await supabase
      .from('realisations')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !data || data.length === 0) {
      return defaultRealisations
    }

    return data as Realisation[]
  } catch (err) {
    console.error('Error fetching realisations from Supabase, returning default array:', err)
    return defaultRealisations
  }
}

export async function fetchPublishedRealisations(): Promise<Realisation[]> {
  const all = await fetchAllRealisations()
  return all.filter((r) => r.status === 'published')
}

export async function fetchRealisationById(id: string): Promise<Realisation | null> {
  const all = await fetchAllRealisations()
  return all.find((r) => r.id === id || r.slug === id) || null
}
