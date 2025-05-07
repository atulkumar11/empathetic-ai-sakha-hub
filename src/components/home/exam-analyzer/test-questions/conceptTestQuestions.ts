import { TestQuestion, SubjectTopic } from '../types';

// Physics Questions for NEET (30 questions)
const neetPhysicsQuestions: TestQuestion[] = [
  // Easy Physics Questions
  {
    id: 'p-easy-1',
    question: 'A particle moves in a straight line with constant acceleration. If its velocity changes from 5 m/s to 25 m/s in 5 seconds, what is its acceleration?',
    options: ['2 m/s²', '4 m/s²', '5 m/s²', '10 m/s²'],
    correctAnswer: '4 m/s²',
    timeLimit: 45,
    difficulty: 'easy',
    category: 'Physics',
    subject: 'Mechanics'
  },
  {
    id: 'p-easy-2',
    question: 'What is the SI unit of electric current?',
    options: ['Volt', 'Coulomb', 'Ampere', 'Ohm'],
    correctAnswer: 'Ampere',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Physics',
    subject: 'Electricity'
  },
  {
    id: 'p-easy-3',
    question: 'Which of the following is a vector quantity?',
    options: ['Mass', 'Temperature', 'Energy', 'Velocity'],
    correctAnswer: 'Velocity',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Physics',
    subject: 'Mechanics'
  },
  {
    id: 'p-easy-4',
    question: 'What is the formula for kinetic energy?',
    options: ['mgh', 'mv', '½mv²', 'ma'],
    correctAnswer: '½mv²',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Physics',
    subject: 'Mechanics'
  },
  {
    id: 'p-easy-5',
    question: 'Which mirror is used in a vehicle\'s headlight to get a powerful parallel beam of light?',
    options: ['Plane mirror', 'Convex mirror', 'Concave mirror', 'Cylindrical mirror'],
    correctAnswer: 'Concave mirror',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Physics',
    subject: 'Optics'
  },
  {
    id: 'p-easy-6',
    question: 'What happens to the resistance of a conductor when its temperature increases?',
    options: ['Decreases', 'Increases', 'Remains the same', 'First increases then decreases'],
    correctAnswer: 'Increases',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Physics',
    subject: 'Electricity'
  },
  {
    id: 'p-easy-7',
    question: 'Which law states that the volume of a given mass of gas is inversely proportional to its pressure at constant temperature?',
    options: ['Charles\' law', 'Boyle\'s law', 'Gay-Lussac\'s law', 'Avogadro\'s law'],
    correctAnswer: 'Boyle\'s law',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Physics',
    subject: 'Thermodynamics'
  },
  {
    id: 'p-easy-8',
    question: 'What is the principle of a transformer based on?',
    options: ['Self-induction', 'Mutual induction', 'Coulomb\'s law', 'Ampere\'s law'],
    correctAnswer: 'Mutual induction',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Physics',
    subject: 'Electromagnetism'
  },
  {
    id: 'p-easy-9',
    question: 'Which color of light has the highest wavelength in the visible spectrum?',
    options: ['Blue', 'Green', 'Yellow', 'Red'],
    correctAnswer: 'Red',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Physics',
    subject: 'Optics'
  },
  {
    id: 'p-easy-10',
    question: 'The phenomenon of light splitting into its constituent colors is called:',
    options: ['Reflection', 'Dispersion', 'Scattering', 'Diffraction'],
    correctAnswer: 'Dispersion',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Physics',
    subject: 'Optics'
  },
  
  // Medium Physics Questions
  {
    id: 'p-medium-1',
    question: 'A body is thrown vertically upward with a velocity of 20 m/s. What is the maximum height reached by the body? (g = 10 m/s²)',
    options: ['10 m', '20 m', '30 m', '40 m'],
    correctAnswer: '20 m',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Physics',
    subject: 'Mechanics'
  },
  {
    id: 'p-medium-2',
    question: 'In a common emitter transistor amplifier, the phase difference between the input and output voltage is:',
    options: ['0°', '90°', '180°', '270°'],
    correctAnswer: '180°',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Physics',
    subject: 'Electronics'
  },
  {
    id: 'p-medium-3',
    question: 'For a given angle of incidence, the angle of refraction in a medium is 30°. If the refractive index of the medium is √3, what is the angle of incidence?',
    options: ['30°', '45°', '60°', '90°'],
    correctAnswer: '60°',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Physics',
    subject: 'Optics'
  },
  {
    id: 'p-medium-4',
    question: 'A person of mass 60 kg stands on a weighing scale in an elevator. What would be the reading when the elevator is moving upward with an acceleration of 5 m/s²? (g = 10 m/s²)',
    options: ['300 N', '600 N', '900 N', '1200 N'],
    correctAnswer: '900 N',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Physics',
    subject: 'Mechanics'
  },
  {
    id: 'p-medium-5',
    question: 'What is the equivalent resistance between points A and B in a circuit where three resistors of 2Ω, 3Ω, and 6Ω are connected in parallel?',
    options: ['1Ω', '1.5Ω', '11Ω', '0.5Ω'],
    correctAnswer: '1Ω',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Physics',
    subject: 'Electricity'
  },
  {
    id: 'p-medium-6',
    question: 'The period of a simple pendulum on the moon is:',
    options: ['Same as on earth', 'Less than on earth', 'More than on earth', 'Zero'],
    correctAnswer: 'More than on earth',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Physics',
    subject: 'Mechanics'
  },
  {
    id: 'p-medium-7',
    question: 'In Young\'s double-slit experiment, if the distance between the slits is halved and the distance between the screen and the slits is doubled, then the fringe width will:',
    options: ['Remain unchanged', 'Be doubled', 'Be halved', 'Be quadrupled'],
    correctAnswer: 'Be quadrupled',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Physics',
    subject: 'Optics'
  },
  {
    id: 'p-medium-8',
    question: 'Two particles of equal masses m are moving with velocities v and -v. What is their total kinetic energy?',
    options: ['0', 'mv²', '2mv²', 'mv²/2'],
    correctAnswer: 'mv²',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Physics',
    subject: 'Mechanics'
  },
  {
    id: 'p-medium-9',
    question: 'A body cools from 50°C to 45°C in 5 minutes. How much time will it take to cool from 45°C to 40°C? (Assume the room temperature is 25°C)',
    options: ['5 minutes', '5.5 minutes', '6 minutes', '7.5 minutes'],
    correctAnswer: '6 minutes',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Physics',
    subject: 'Thermodynamics'
  },
  {
    id: 'p-medium-10',
    question: 'A wire of resistance 10Ω is bent into a circle. What is the resistance between two diametrically opposite points?',
    options: ['2.5Ω', '5Ω', '10Ω', '20Ω'],
    correctAnswer: '2.5Ω',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Physics',
    subject: 'Electricity'
  },
  
  // Hard Physics Questions
  {
    id: 'p-hard-1',
    question: 'A radioactive nucleus undergoes two successive decays: β- followed by α. The resulting nucleus has:',
    options: ['Same mass number, atomic number decreased by 2', 'Mass number decreased by 4, atomic number decreased by 3', 'Mass number decreased by 4, atomic number decreased by 1', 'Mass number decreased by 4, atomic number increased by 1'],
    correctAnswer: 'Mass number decreased by 4, atomic number decreased by 1',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Physics',
    subject: 'Nuclear Physics'
  },
  {
    id: 'p-hard-2',
    question: 'In an LC circuit, the maximum charge on the capacitor is Q. The maximum current in the circuit is:',
    options: ['Q/√(LC)', 'Q√(L/C)', 'Q√(C/L)', '√(LC)/Q'],
    correctAnswer: 'Q√(L/C)',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Physics',
    subject: 'Electromagnetism'
  },
  {
    id: 'p-hard-3',
    question: 'A Carnot engine works between 127°C and 27°C. What is its efficiency?',
    options: ['10%', '20%', '25%', '33%'],
    correctAnswer: '25%',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Physics',
    subject: 'Thermodynamics'
  },
  {
    id: 'p-hard-4',
    question: 'A uniform rod of length L and mass M is hinged at one end. The rod is released from rest in the horizontal position. What is the angular acceleration of the rod at the moment of release?',
    options: ['g/L', '2g/L', '3g/2L', 'g/2L'],
    correctAnswer: '3g/2L',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Physics',
    subject: 'Mechanics'
  },
  {
    id: 'p-hard-5',
    question: 'Two coherent sources of light produce interference fringes. If one source is blue light and the other is red light, what will happen to the interference pattern?',
    options: ['The fringes will be clearly visible', 'The fringes will disappear', 'The fringes will have a purple color', 'The fringes will be blurred'],
    correctAnswer: 'The fringes will disappear',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Physics',
    subject: 'Optics'
  },
  {
    id: 'p-hard-6',
    question: 'In the Bohr model of hydrogen atom, the ratio of the radii of the second orbit to the first orbit is:',
    options: ['2:1', '4:1', '8:1', '16:1'],
    correctAnswer: '4:1',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Physics',
    subject: 'Atomic Physics'
  },
  {
    id: 'p-hard-7',
    question: 'A current carrying circular loop of radius R creates a magnetic field B at its center. If the radius is doubled and the current is halved, the new magnetic field at the center will be:',
    options: ['B', 'B/2', 'B/4', '4B'],
    correctAnswer: 'B/4',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Physics',
    subject: 'Electromagnetism'
  },
  {
    id: 'p-hard-8',
    question: 'A particle moves in a circle of radius r with constant speed v. What is the angle between its velocity and acceleration?',
    options: ['0°', '45°', '90°', '180°'],
    correctAnswer: '90°',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Physics',
    subject: 'Mechanics'
  },
  {
    id: 'p-hard-9',
    question: 'A block of mass m slides down a frictionless inclined plane of angle θ. What is the acceleration of the block?',
    options: ['g', 'g sinθ', 'g cosθ', 'g tanθ'],
    correctAnswer: 'g sinθ',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Physics',
    subject: 'Mechanics'
  },
  {
    id: 'p-hard-10',
    question: 'In a hydrogen atom, an electron makes a transition from n = 3 to n = 2 state. The wavelength of the emitted photon falls in:',
    options: ['Lyman series', 'Balmer series', 'Paschen series', 'Bracket series'],
    correctAnswer: 'Balmer series',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Physics',
    subject: 'Atomic Physics'
  }
];

// Chemistry Questions for NEET (30 questions)
const neetChemistryQuestions: TestQuestion[] = [
  // Easy Chemistry Questions
  {
    id: 'c-easy-1',
    question: 'Which of the following elements has the highest electronegativity?',
    options: ['Oxygen', 'Fluorine', 'Chlorine', 'Nitrogen'],
    correctAnswer: 'Fluorine',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Chemistry',
    subject: 'Periodic Table'
  },
  {
    id: 'c-easy-2',
    question: 'What is the hybridization of carbon in CH₄?',
    options: ['sp', 'sp²', 'sp³', 'sp³d'],
    correctAnswer: 'sp³',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Chemistry',
    subject: 'Chemical Bonding'
  },
  {
    id: 'c-easy-3',
    question: 'The pH of a neutral solution at 25°C is:',
    options: ['0', '7', '14', 'Depends on the solution'],
    correctAnswer: '7',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Chemistry',
    subject: 'Acid-Base'
  },
  {
    id: 'c-easy-4',
    question: 'Which of the following is not a homogeneous mixture?',
    options: ['Air', 'Vinegar', 'Milk', 'Sugar solution'],
    correctAnswer: 'Milk',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Chemistry',
    subject: 'States of Matter'
  },
  {
    id: 'c-easy-5',
    question: 'The general formula for alkanes is:',
    options: ['CₙH₂ₙ', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₂', 'CₙHₙ'],
    correctAnswer: 'CₙH₂ₙ₊₂',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Chemistry',
    subject: 'Organic Chemistry'
  },
  {
    id: 'c-easy-6',
    question: 'Which of the following is an example of a coordination compound?',
    options: ['NaCl', 'CH₄', 'K₄[Fe(CN)₆]', 'C₂H₅OH'],
    correctAnswer: 'K₄[Fe(CN)₆]',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Chemistry',
    subject: 'Coordination Chemistry'
  },
  {
    id: 'c-easy-7',
    question: 'Which of the following is a reducing agent?',
    options: ['Cl₂', 'O₂', 'H₂', 'SO₃'],
    correctAnswer: 'H₂',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Chemistry',
    subject: 'Redox Reactions'
  },
  {
    id: 'c-easy-8',
    question: 'The number of moles of solute per kilogram of solvent is called:',
    options: ['Molality', 'Molarity', 'Normality', 'Mole fraction'],
    correctAnswer: 'Molality',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Chemistry',
    subject: 'Solutions'
  },
  {
    id: 'c-easy-9',
    question: 'Which of the following is not a noble gas?',
    options: ['Neon', 'Argon', 'Fluorine', 'Xenon'],
    correctAnswer: 'Fluorine',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Chemistry',
    subject: 'Periodic Table'
  },
  {
    id: 'c-easy-10',
    question: 'The functional group present in alcohols is:',
    options: ['-COOH', '-OH', '-CHO', '-C=O'],
    correctAnswer: '-OH',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Chemistry',
    subject: 'Organic Chemistry'
  },
  
  // Medium Chemistry Questions
  {
    id: 'c-medium-1',
    question: 'How many isomers are possible for butane (C₄H₁₀)?',
    options: ['1', '2', '3', '4'],
    correctAnswer: '2',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Chemistry',
    subject: 'Organic Chemistry'
  },
  {
    id: 'c-medium-2',
    question: 'Which of the following has the highest boiling point?',
    options: ['CH₃CH₂CH₂CH₃', 'CH₃CH₂OH', 'CH₃OCH₃', 'CH₃CHO'],
    correctAnswer: 'CH₃CH₂OH',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Chemistry',
    subject: 'Physical Chemistry'
  },
  {
    id: 'c-medium-3',
    question: 'Which of the following is not a Lewis acid?',
    options: ['BF₃', 'AlCl₃', 'NH₃', 'FeCl₃'],
    correctAnswer: 'NH₃',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Chemistry',
    subject: 'Chemical Bonding'
  },
  {
    id: 'c-medium-4',
    question: 'The IUPAC name of CH₃-CH=CH-CHO is:',
    options: ['But-2-enal', 'But-1-en-4-al', '2-Butenal', 'Crotonaldehyde'],
    correctAnswer: 'But-2-enal',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Chemistry',
    subject: 'Organic Chemistry'
  },
  {
    id: 'c-medium-5',
    question: 'The half-life of a first-order reaction is 10 minutes. How long will it take for the concentration to reach 1/8th of its original value?',
    options: ['20 minutes', '30 minutes', '40 minutes', '80 minutes'],
    correctAnswer: '30 minutes',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Chemistry',
    subject: 'Chemical Kinetics'
  },
  {
    id: 'c-medium-6',
    question: 'Which of the following compounds will undergo SN1 reaction most readily?',
    options: ['CH₃Cl', 'CH₃CH₂Cl', '(CH₃)₃CCl', 'CH₂=CH-CH₂Cl'],
    correctAnswer: '(CH₃)₃CCl',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Chemistry',
    subject: 'Organic Chemistry'
  },
  {
    id: 'c-medium-7',
    question: 'The conjugate base of H₂PO₄⁻ is:',
    options: ['PO₄³⁻', 'HPO₄²⁻', 'H₃PO₄', 'P₂O₇⁴⁻'],
    correctAnswer: 'HPO₄²⁻',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Chemistry',
    subject: 'Acid-Base'
  },
  {
    id: 'c-medium-8',
    question: 'According to the phase rule, what is the maximum number of phases that can coexist at the triple point of water?',
    options: ['1', '2', '3', '4'],
    correctAnswer: '3',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Chemistry',
    subject: 'Physical Chemistry'
  },
  {
    id: 'c-medium-9',
    question: 'Which of the following is not a greenhouse gas?',
    options: ['CO₂', 'CH₄', 'N₂', 'Water vapor'],
    correctAnswer: 'N₂',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Chemistry',
    subject: 'Environmental Chemistry'
  },
  {
    id: 'c-medium-10',
    question: 'What is the empirical formula of glucose (C₆H₁₂O₆)?',
    options: ['CHO', 'CH₂O', 'C₆H₁₂O₆', 'C₃H₆O₃'],
    correctAnswer: 'CH₂O',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Chemistry',
    subject: 'General Chemistry'
  },
  
  // Hard Chemistry Questions
  {
    id: 'c-hard-1',
    question: 'The equilibrium constant for the reaction N₂ + 3H₂ ⇌ 2NH₃ is K. What is the equilibrium constant for the reaction NH₃ ⇌ 1/2N₂ + 3/2H₂?',
    options: ['1/K', '1/K²', 'K²', '1/√K'],
    correctAnswer: '1/K',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Chemistry',
    subject: 'Chemical Equilibrium'
  },
  {
    id: 'c-hard-2',
    question: 'What is the coordination number of Fe in [Fe(CN)₆]³⁻?',
    options: ['3', '4', '6', '8'],
    correctAnswer: '6',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Chemistry',
    subject: 'Coordination Chemistry'
  },
  {
    id: 'c-hard-3',
    question: 'Which of the following does not show geometrical isomerism?',
    options: ['2-butene', '1-butene', '2-pentene', '1,2-dichloroethene'],
    correctAnswer: '1-butene',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Chemistry',
    subject: 'Organic Chemistry'
  },
  {
    id: 'c-hard-4',
    question: 'The major product in the reaction of propene with HBr in the presence of benzoyl peroxide is:',
    options: ['1-bromopropane', '2-bromopropane', '1,2-dibromopropane', '1,3-dibromopropane'],
    correctAnswer: '1-bromopropane',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Chemistry',
    subject: 'Organic Chemistry'
  },
  {
    id: 'c-hard-5',
    question: 'Which of the following is paramagnetic?',
    options: ['O₂²⁻', 'O₂', 'CO', 'N₂'],
    correctAnswer: 'O₂',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Chemistry',
    subject: 'Chemical Bonding'
  },
  {
    id: 'c-hard-6',
    question: 'Which of the following has the highest lattice energy?',
    options: ['NaCl', 'MgO', 'KCl', 'CaO'],
    correctAnswer: 'MgO',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Chemistry',
    subject: 'Chemical Bonding'
  },
  {
    id: 'c-hard-7',
    question: 'What is the hybridization of sulfur in SF₆?',
    options: ['sp³', 'sp³d', 'sp³d²', 'sp³d³'],
    correctAnswer: 'sp³d²',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Chemistry',
    subject: 'Chemical Bonding'
  },
  {
    id: 'c-hard-8',
    question: 'At 25°C, the standard reduction potential E° for Cu²⁺/Cu⁺ is 0.15V and for Cu⁺/Cu is 0.52V. What is the value of E° for Cu²⁺/Cu?',
    options: ['0.37V', '0.67V', '0.34V', '0.33V'],
    correctAnswer: '0.34V',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Chemistry',
    subject: 'Electrochemistry'
  },
  {
    id: 'c-hard-9',
    question: 'Which of the following alkali metals gives a blue color in flame test?',
    options: ['Li', 'Na', 'K', 'Cs'],
    correctAnswer: 'K',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Chemistry',
    subject: 'Atomic Structure'
  },
  {
    id: 'c-hard-10',
    question: 'In the electrolysis of aqueous NaCl, what is produced at the cathode?',
    options: ['Cl₂', 'Na', 'H₂', 'O₂'],
    correctAnswer: 'H₂',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Chemistry',
    subject: 'Electrochemistry'
  }
];

// Biology Questions for NEET (30 questions)
const neetBiologyQuestions: TestQuestion[] = [
  // Easy Biology Questions
  {
    id: 'b-easy-1',
    question: 'The process by which plants make food is called:',
    options: ['Respiration', 'Photosynthesis', 'Transpiration', 'Digestion'],
    correctAnswer: 'Photosynthesis',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Biology',
    subject: 'Plant Physiology'
  },
  {
    id: 'b-easy-2',
    question: 'Which of the following is the site of protein synthesis in a cell?',
    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'],
    correctAnswer: 'Ribosome',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Biology',
    subject: 'Cell Biology'
  },
  {
    id: 'b-easy-3',
    question: 'The basic unit of classification is:',
    options: ['Family', 'Genus', 'Species', 'Order'],
    correctAnswer: 'Species',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Biology',
    subject: 'Taxonomy'
  },
  {
    id: 'b-easy-4',
    question: 'DNA replication is:',
    options: ['Conservative', 'Semiconservative', 'Dispersive', 'Non-conservative'],
    correctAnswer: 'Semiconservative',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Biology',
    subject: 'Molecular Biology'
  },
  {
    id: 'b-easy-5',
    question: 'Which of the following is not a function of the liver?',
    options: ['Production of bile', 'Storage of glycogen', 'Production of insulin', 'Detoxification'],
    correctAnswer: 'Production of insulin',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Biology',
    subject: 'Human Physiology'
  },
  {
    id: 'b-easy-6',
    question: 'The primary function of white blood cells is:',
    options: ['Transport of oxygen', 'Blood clotting', 'Defense against pathogens', 'Transport of nutrients'],
    correctAnswer: 'Defense against pathogens',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Biology',
    subject: 'Human Physiology'
  },
  {
    id: 'b-easy-7',
    question: 'What is the role of stomata in plants?',
    options: ['Absorption of water', 'Gas exchange', 'Food storage', 'Reproduction'],
    correctAnswer: 'Gas exchange',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Biology',
    subject: 'Plant Physiology'
  },
  {
    id: 'b-easy-8',
    question: 'Which of the following is a vestigial organ in humans?',
    options: ['Appendix', 'Heart', 'Lungs', 'Kidneys'],
    correctAnswer: 'Appendix',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Biology',
    subject: 'Evolution'
  },
  {
    id: 'b-easy-9',
    question: 'The human heart is:',
    options: ['Two-chambered', 'Three-chambered', 'Four-chambered', 'Single-chambered'],
    correctAnswer: 'Four-chambered',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Biology',
    subject: 'Human Physiology'
  },
  {
    id: 'b-easy-10',
    question: 'The powerhouse of the cell is:',
    options: ['Nucleus', 'Mitochondria', 'Chloroplast', 'Endoplasmic reticulum'],
    correctAnswer: 'Mitochondria',
    timeLimit: 30,
    difficulty: 'easy',
    category: 'Biology',
    subject: 'Cell Biology'
  },
  
  // Medium Biology Questions
  {
    id: 'b-medium-1',
    question: 'Crossing over occurs during which phase of meiosis?',
    options: ['Prophase I', 'Metaphase I', 'Anaphase I', 'Telophase I'],
    correctAnswer: 'Prophase I',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Biology',
    subject: 'Genetics'
  },
  {
    id: 'b-medium-2',
    question: 'Which of the following is not a part of the hindbrain?',
    options: ['Pons', 'Cerebellum', 'Medulla oblongata', 'Thalamus'],
    correctAnswer: 'Thalamus',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Biology',
    subject: 'Human Physiology'
  },
  {
    id: 'b-medium-3',
    question: 'Which hormone is responsible for the fight-or-flight response?',
    options: ['Insulin', 'Thyroxine', 'Adrenaline', 'Glucagon'],
    correctAnswer: 'Adrenaline',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Biology',
    subject: 'Human Physiology'
  },
  {
    id: 'b-medium-4',
    question: 'Which of the following diseases is caused by a virus?',
    options: ['Malaria', 'Typhoid', 'Influenza', 'Cholera'],
    correctAnswer: 'Influenza',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Biology',
    subject: 'Human Health and Disease'
  },
  {
    id: 'b-medium-5',
    question: 'Which of the following is not a function of the kidney?',
    options: ['Osmoregulation', 'Production of erythropoietin', 'Regulation of blood pH', 'Digestion of proteins'],
    correctAnswer: 'Digestion of proteins',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Biology',
    subject: 'Human Physiology'
  },
  {
    id: 'b-medium-6',
    question: 'Which of the following is not a nitrogen-fixing organism?',
    options: ['Rhizobium', 'Azotobacter', 'Escherichia', 'Anabaena'],
    correctAnswer: 'Escherichia',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Biology',
    subject: 'Microbiology'
  },
  {
    id: 'b-medium-7',
    question: 'The enzyme that catalyzes the first step of glycolysis is:',
    options: ['Hexokinase', 'Phosphofructokinase', 'Pyruvate kinase', 'Glucose-6-phosphatase'],
    correctAnswer: 'Hexokinase',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Biology',
    subject: 'Biochemistry'
  },
  {
    id: 'b-medium-8',
    question: 'Which of the following is a secondary messenger in hormone action?',
    options: ['cAMP', 'cGMP', 'Calcium ions', 'All of these'],
    correctAnswer: 'All of these',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Biology',
    subject: 'Molecular Biology'
  },
  {
    id: 'b-medium-9',
    question: 'Which of the following is the correct sequence of air passage in humans?',
    options: ['Nose → Larynx → Pharynx → Trachea → Lungs', 'Nose → Pharynx → Larynx → Trachea → Lungs', 'Nose → Trachea → Larynx → Pharynx → Lungs', 'Nose → Pharynx → Trachea → Larynx → Lungs'],
    correctAnswer: 'Nose → Pharynx → Larynx → Trachea → Lungs',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Biology',
    subject: 'Human Physiology'
  },
  {
    id: 'b-medium-10',
    question: 'Which of the following is not a function of the placenta?',
    options: ['Nutrition of the embryo', 'Exchange of respiratory gases', 'Excretion of waste products', 'Production of milk'],
    correctAnswer: 'Production of milk',
    timeLimit: 45,
    difficulty: 'medium',
    category: 'Biology',
    subject: 'Reproduction'
  },
  
  // Hard Biology Questions
  {
    id: 'b-hard-1',
    question: 'Which of the following is the correct sequence of events in the electron transport chain?',
    options: ['NADH → FMN → CoQ → Cyt b → Cyt c₁ → Cyt c → Cyt a → Cyt a₃', 'NADH → FMN → CoQ → Cyt c₁ → Cyt b → Cyt c → Cyt a → Cyt a₃', 'NADH → CoQ → FMN → Cyt b → Cyt c₁ → Cyt c → Cyt a → Cyt a₃', 'NADH → FMN → CoQ → Cyt c → Cyt c₁ → Cyt b → Cyt a → Cyt a₃'],
    correctAnswer: 'NADH → FMN → CoQ → Cyt b → Cyt c₁ → Cyt c → Cyt a → Cyt a₃',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Biology',
    subject: 'Biochemistry'
  },
  {
    id: 'b-hard-2',
    question: 'Which of the following is not a feature of genetic code?',
    options: ['Universal', 'Non-overlapping', 'Degenerate', 'Non-complementary'],
    correctAnswer: 'Non-complementary',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Biology',
    subject: 'Molecular Biology'
  },
  {
    id: 'b-hard-3',
    question: 'In which stage of prophase I of meiosis does synapsis occur?',
    options: ['Leptotene', 'Zygotene', 'Pachytene', 'Diplotene'],
    correctAnswer: 'Zygotene',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Biology',
    subject: 'Genetics'
  },
  {
    id: 'b-hard-4',
    question: 'Which of the following antibiotics inhibits protein synthesis by binding to the 30S ribosomal subunit?',
    options: ['Penicillin', 'Tetracycline', 'Rifampicin', 'Erythromycin'],
    correctAnswer: 'Tetracycline',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Biology',
    subject: 'Microbiology'
  },
  {
    id: 'b-hard-5',
    question: 'In C3 plants, photorespiration is initiated in:',
    options: ['Chloroplast', 'Mitochondria', 'Peroxisome', 'Cytoplasm'],
    correctAnswer: 'Chloroplast',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Biology',
    subject: 'Plant Physiology'
  },
  {
    id: 'b-hard-6',
    question: 'Which of the following is the primary site of action of FSH in males?',
    options: ['Seminiferous tubules', 'Leydig cells', 'Prostate gland', 'Seminal vesicle'],
    correctAnswer: 'Seminiferous tubules',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Biology',
    subject: 'Human Physiology'
  },
  {
    id: 'b-hard-7',
    question: 'Which of the following is the correct sequence of spermatogenesis?',
    options: ['Spermatogonia → Primary spermatocyte → Secondary spermatocyte → Spermatid → Sperm', 'Spermatogonia → Spermatid → Primary spermatocyte → Secondary spermatocyte → Sperm', 'Spermatid → Spermatogonia → Primary spermatocyte → Secondary spermatocyte → Sperm', 'Primary spermatocyte → Secondary spermatocyte → Spermatogonia → Spermatid → Sperm'],
    correctAnswer: 'Spermatogonia → Primary spermatocyte → Secondary spermatocyte → Spermatid → Sperm',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Biology',
    subject: 'Reproduction'
  },
  {
    id: 'b-hard-8',
    question: 'The gene for color blindness is located on:',
    options: ['X chromosome', 'Y chromosome', 'Chromosome 21', 'Mitochondria'],
    correctAnswer: 'X chromosome',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Biology',
    subject: 'Genetics'
  },
  {
    id: 'b-hard-9',
    question: 'Which of the following is not a phase of Calvin cycle?',
    options: ['Carboxylation', 'Reduction', 'Regeneration', 'Photoactivation'],
    correctAnswer: 'Photoactivation',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Biology',
    subject: 'Plant Physiology'
  },
  {
    id: 'b-hard-10',
    question: 'Which of the following is not a function of the lymphatic system?',
    options: ['Return of tissue fluid to the blood', 'Transport of dietary lipids', 'Production of antibodies', 'Gas exchange'],
    correctAnswer: 'Gas exchange',
    timeLimit: 60,
    difficulty: 'hard',
    category: 'Biology',
    subject: 'Human Physiology'
  }
];

// Function to get a random selection of questions for a subject
export const getConceptTestQuestions = (examType: string, subject: string): TestQuestion[] => {
  let questions: TestQuestion[] = [];
  
  // Select the appropriate question bank based on subject
  if (examType === 'NEET-UG' || examType === 'NEET') {
    switch (subject.toLowerCase()) {
      case 'physics':
        questions = neetPhysicsQuestions;
        break;
      case 'chemistry':
        questions = neetChemistryQuestions;
        break;
      case 'biology':
        questions = neetBiologyQuestions;
        break;
      default:
        // If no subject is specified, combine all subjects
        questions = [...neetPhysicsQuestions, ...neetChemistryQuestions, ...neetBiologyQuestions];
    }
  }
  
  // Shuffle the questions to get a random selection
  const shuffledQuestions = shuffleArray([...questions]);
  
  // Return 10 random questions for the concept test
  return shuffledQuestions.slice(0, 10);
};

// Helper function to shuffle an array (Fisher-Yates algorithm)
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Get subject topics for NEET
export const getConceptTopics = (examType: string): SubjectTopic[] => {
  if (examType === 'NEET-UG' || examType === 'NEET') {
    return [
      { id: 'phy-neet', subject: 'Physics', topics: 10 },
      { id: 'chem-neet', subject: 'Chemistry', topics: 10 },
      { id: 'bio-neet', subject: 'Biology', topics: 10 }
    ];
  }
  
  return [];
};

// Get all subjects for the concept test
export const getConceptTestSubjects = () => {
  return ['Physics', 'Chemistry', 'Biology'];
};
