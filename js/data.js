// ===== COMPLETE COURSE DATA =====
// All topics, subtopics, and daily plans for all 5 courses

const COURSES = {
    CPE203: {
        name: 'Digital Logic & Computer Architecture',
        color: '#3b82f6',
        icon: 'fa-microchip',
        examDate: '2025-02-25',
        topics: [
            { id: 'cpe203_binary', name: 'Binary Arithmetic', subtopics: ['Addition rules', 'Subtraction (2\'s complement)', 'Multiplication', 'Division'] },
            { id: 'cpe203_signed', name: 'Signed Numbers', subtopics: ['Sign bit convention', '2\'s complement system', 'Sign extension', 'Negation', 'Range of values'] },
            { id: 'cpe203_bcd', name: 'BCD Addition', subtopics: ['BCD definition', 'Case 1: sum ≤ 9', 'Case 2: sum > 9 correction', 'Add 6 method'] },
            { id: 'cpe203_hex', name: 'Hexadecimal Arithmetic', subtopics: ['Hex addition', 'Hex subtraction', '2\'s complement in hex'] },
            { id: 'cpe203_boolean', name: 'Boolean Algebra', subtopics: ['Basic operations', 'Single-variable theorems', 'Multivariable theorems', 'DeMorgan\'s laws'] },
            { id: 'cpe203_gates', name: 'Logic Gates', subtopics: ['AND, OR, NOT', 'NAND, NOR', 'XOR, XNOR', 'Truth tables', 'Timing diagrams'] },
            { id: 'cpe203_circuits', name: 'Combinational Circuits', subtopics: ['SOP form', 'POS form', 'Circuit design procedure', 'Simplification'] },
            { id: 'cpe203_kmaps', name: 'Karnaugh Maps', subtopics: ['2-variable K-maps', '3-variable K-maps', '4-variable K-maps', 'Grouping rules'] },
            { id: 'cpe203_performance', name: 'Performance Characteristics', subtopics: ['Propagation delay', 't_PHL, t_PLH', 'Power dissipation', 'Frequency limitation'] },
            { id: 'cpe203_fan', name: 'Fan-in/Fan-out', subtopics: ['Fan-in definition', 'Fan-out calculation', 'Increasing fan-out', 'Buffers'] },
            { id: 'cpe203_error', name: 'Error Detection', subtopics: ['Parity method', 'CRC', 'Hamming code', 'Error correction'] }
        ]
    },
    
    STT201: {
        name: 'Introduction to Statistics',
        color: '#10b981',
        icon: 'fa-chart-bar',
        examDate: '2025-03-04',
        topics: [
            { id: 'stt201_intro', name: 'Introduction to Statistics', subtopics: ['Descriptive vs Inferential', 'Common terms', 'Population vs Sample'] },
            { id: 'stt201_data', name: 'Data Types & Sources', subtopics: ['Primary vs Secondary', 'Qualitative vs Quantitative', 'Discrete vs Continuous'] },
            { id: 'stt201_scales', name: 'Scales of Measurement', subtopics: ['Nominal', 'Ordinal', 'Interval', 'Ratio', 'NOIR classification'] },
            { id: 'stt201_frequency', name: 'Frequency Distributions', subtopics: ['Summary tables', 'Grouped frequency', 'Class boundaries', 'Class width'] },
            { id: 'stt201_graphs', name: 'Graphical Presentations', subtopics: ['Histograms', 'Bar charts', 'Pie charts', 'Ogive', 'Stem and leaf'] },
            { id: 'stt201_central', name: 'Central Tendency', subtopics: ['Arithmetic mean', 'Geometric mean', 'Harmonic mean', 'Median', 'Mode'] },
            { id: 'stt201_partition', name: 'Measures of Partition', subtopics: ['Quartiles', 'Deciles', 'Percentiles', 'Box plots'] },
            { id: 'stt201_dispersion', name: 'Measures of Dispersion', subtopics: ['Range', 'IQR', 'Variance', 'Standard Deviation', 'CV'] },
            { id: 'stt201_probability', name: 'Probability Basics', subtopics: ['Events', 'Sample space', 'Addition rule', 'Multiplication rule'] },
            { id: 'stt201_conditional', name: 'Conditional Probability', subtopics: ['P(B|A)', 'Independent events', 'Tree diagrams'] },
            { id: 'stt201_binomial', name: 'Binomial Distribution', subtopics: ['Conditions', 'Formula', 'Mean and variance', 'Applications'] },
            { id: 'stt201_poisson', name: 'Poisson Distribution', subtopics: ['Characteristics', 'Formula', 'Mean = Variance', 'Applications'] },
            { id: 'stt201_normal', name: 'Normal Distribution', subtopics: ['PDF', 'Empirical rule', 'Z-scores', 'Standard normal'] },
            { id: 'stt201_sampling', name: 'Sampling Distributions', subtopics: ['Sample mean', 'Standard error', 'CLT', 'Sample proportion'] },
            { id: 'stt201_estimation', name: 'Estimation Theory', subtopics: ['Point estimation', 'Confidence intervals', 'Properties of estimators'] }
        ]
    },
    
    SEN205: {
        name: 'Software Requirements & Design',
        color: '#f59e0b',
        icon: 'fa-code-branch',
        examDate: '2025-03-07',
        topics: [
            { id: 'sen205_intro', name: 'Introduction to Requirements', subtopics: ['Definition', 'Importance', 'Requirements engineering process'] },
            { id: 'sen205_types', name: 'Types of Requirements', subtopics: ['Functional vs Non-functional', 'User vs System', 'Product vs Process'] },
            { id: 'sen205_nfr', name: 'Non-Functional Requirements', subtopics: ['Product requirements', 'Organizational requirements', 'External requirements'] },
            { id: 'sen205_elicitation', name: 'Elicitation Techniques', subtopics: ['Interviews', 'Surveys', 'Observation', 'Prototyping', 'Brainstorming'] },
            { id: 'sen205_srs', name: 'SRS Documentation', subtopics: ['IEEE standards', 'Structure', 'Characteristics of good requirements'] },
            { id: 'sen205_validation', name: 'Requirements Validation', subtopics: ['Reviews', 'Prototyping', 'Test-case generation', 'Validation attributes'] },
            { id: 'sen205_management', name: 'Requirements Management', subtopics: ['Traceability', 'Change control', 'Versioning', 'Scope creep'] },
            { id: 'sen205_models', name: 'Process Models', subtopics: ['Waterfall', 'Incremental', 'Integration and Configuration'] },
            { id: 'sen205_quality', name: 'Process Quality', subtopics: ['CMMI', 'ISO standards', 'Agile approaches', 'Process improvement'] },
            { id: 'sen205_sets', name: 'Set Theory', subtopics: ['Complement', 'Union', 'Intersection', 'Difference', 'Power sets'] },
            { id: 'sen205_relations', name: 'Relations', subtopics: ['Properties', 'Equivalence relations', 'Partial orders'] },
            { id: 'sen205_functions', name: 'Functions', subtopics: ['Injective', 'Surjective', 'Bijective', 'Composite', 'Inverse'] },
            { id: 'sen205_combinatorics', name: 'Combinatorics', subtopics: ['Permutations', 'Combinations', 'With/without repetition'] }
        ]
    },
    
    SEN203: {
        name: 'Discrete Structures',
        color: '#8b5cf6',
        icon: 'fa-infinity',
        examDate: '2025-03-10',
        topics: [
            { id: 'sen203_intro', name: 'Introduction to Discrete Structures', subtopics: ['Discrete vs Continuous', 'Importance in CS', 'Applications'] },
            { id: 'sen203_sets', name: 'Set Theory', subtopics: ['Sets and elements', 'Subsets', 'Universal set', 'Complement'] },
            { id: 'sen203_operations', name: 'Set Operations', subtopics: ['Union', 'Intersection', 'Difference', 'Venn diagrams'] },
            { id: 'sen203_powerset', name: 'Power Sets', subtopics: ['Definition', '|P(A)| = 2ⁿ', 'Listing subsets', 'Applications'] },
            { id: 'sen203_relations', name: 'Relations', subtopics: ['Properties', 'Reflexive', 'Symmetric', 'Transitive', 'Equivalence'] },
            { id: 'sen203_functions', name: 'Functions', subtopics: ['Domain and codomain', 'Injective', 'Surjective', 'Bijective'] },
            { id: 'sen203_sequences', name: 'Sequences', subtopics: ['Arithmetic', 'Geometric', 'Recurrence relations'] },
            { id: 'sen203_logic', name: 'Logic', subtopics: ['Propositional logic', 'Predicate logic', 'Truth tables', 'Logical equivalences'] },
            { id: 'sen203_proofs', name: 'Proof Techniques', subtopics: ['Direct proof', 'Proof by contradiction', 'Induction'] },
            { id: 'sen203_number', name: 'Number Theory', subtopics: ['Divisibility', 'Modular arithmetic', 'GCD', 'Primes'] },
            { id: 'sen203_applications', name: 'Applications', subtopics: ['Search engines', 'Cybersecurity', 'OS scheduling', 'Database queries'] }
        ]
    },
    
    CSE201: {
        name: 'Elements of Software Construction',
        color: '#ef4444',
        icon: 'fa-laptop-code',
        examDate: '2025-03-13',
        topics: [
            { id: 'cse201_intro', name: 'Introduction to Software Construction', subtopics: ['Definition', 'Scope', 'IEEE Standard', 'Core principles'] },
            { id: 'cse201_design', name: 'Software Design Principles', subtopics: ['Modularity', 'Abstraction', 'Encapsulation', 'High-level vs Detailed'] },
            { id: 'cse201_cohesion', name: 'Cohesion', subtopics: ['Definition', '7 types (worst to best)', 'Coincidental', 'Logical', 'Temporal', 'Procedural', 'Communicational', 'Sequential', 'Functional'] },
            { id: 'cse201_coupling', name: 'Coupling', subtopics: ['Definition', 'Tight coupling', 'Loose coupling', 'Cohesion + Coupling relationship'] },
            { id: 'cse201_standards', name: 'Coding Standards', subtopics: ['Naming conventions', 'PEP 8', 'Google Java Style', 'Commenting rules'] },
            { id: 'cse201_defensive', name: 'Defensive Programming', subtopics: ['Input validation', 'Error handling', 'Assertions', 'Exception handling'] },
            { id: 'cse201_refactoring', name: 'Refactoring', subtopics: ['Definition', 'Benefits', 'Code smells', 'Examples'] },
            { id: 'cse201_tools', name: 'Development Tools', subtopics: ['Code editors', 'IDEs', 'Version Control', 'Build tools', 'Debuggers'] },
            { id: 'cse201_testing', name: 'Testing', subtopics: ['Levels: Unit, Integration, System, Acceptance', 'Types: Functional, Non-functional', 'Manual vs Automated'] },
            { id: 'cse201_debugging', name: 'Debugging', subtopics: ['Testing vs Debugging', 'Techniques', 'Tools', 'Common bugs'] },
            { id: 'cse201_documentation', name: 'Documentation', subtopics: ['Types', 'Code documentation', 'User documentation', 'Technical documentation'] },
            { id: 'cse201_quality', name: 'Code Quality', subtopics: ['Readability', 'Maintainability', 'Code smells', 'Static analysis'] },
            { id: 'cse201_ethics', name: 'Ethics', subtopics: ['ACM Code', 'IEEE Code', 'Professional responsibility', 'Privacy', 'Intellectual property'] }
        ]
    }
};

// ===== 19-DAY STUDY PLAN =====
// Complete daily breakdown with all topics and subtopics

const STUDY_PLAN = [
    // DAY 1 - Feb 22 (CPE203 Focus)
    {
        day: 1,
        date: '2025-02-22',
        totalHours: 8,
        topics: [
            {
                time: '09:00 - 10:30',
                course: 'CPE203',
                topic: 'Binary Arithmetic',
                subtopics: ['Addition rules (0+0=0, 1+1=10)', 'Subtraction using 2\'s complement', 'Multiplication with partial products', 'Division examples'],
                priority: 3,
                activities: 'Solve 20 practice problems',
                resources: 'Lecture notes, practice sheet',
                completed: false
            },
            {
                time: '10:45 - 12:15',
                course: 'CPE203',
                topic: 'Signed Numbers',
                subtopics: ['Sign bit convention (0=positive, 1=negative)', '2\'s complement system', 'Sign extension', 'Negation process', 'Range: -2^N to +(2^N-1)'],
                priority: 3,
                activities: '15 conversion problems',
                resources: 'Formula card',
                completed: false
            },
            {
                time: '12:45 - 14:15',
                course: 'CPE203',
                topic: 'BCD & Hexadecimal',
                subtopics: ['BCD definition', 'Case 1: sum ≤ 9', 'Case 2: sum > 9 → add 6 correction', 'Hex addition (carry when sum ≥ 16)', 'Hex subtraction using 2\'s complement'],
                priority: 2,
                activities: '10 BCD + 10 Hex problems',
                resources: 'Correction rule card',
                completed: false
            },
            {
                time: '14:30 - 16:00',
                course: 'CPE203',
                topic: 'Boolean Algebra',
                subtopics: ['OR/AND/NOT operations', 'Truth tables', 'Single-variable theorems', 'Basic expressions'],
                priority: 3,
                activities: '15 simplification problems',
                resources: 'Theorem sheet',
                completed: false
            }
        ]
    },
    
    // DAY 2 - Feb 23 (CPE203 Focus)
    {
        day: 2,
        date: '2025-02-23',
        totalHours: 8,
        topics: [
            {
                time: '09:00 - 10:30',
                course: 'CPE203',
                topic: 'Logic Gates',
                subtopics: ['AND gate (all HIGH = HIGH)', 'OR gate (any HIGH = HIGH)', 'NOT gate (inversion)', 'NAND gate', 'NOR gate', 'Truth tables for all gates'],
                priority: 3,
                activities: 'Draw symbols, complete truth tables',
                resources: 'Gate symbol sheet',
                completed: false
            },
            {
                time: '10:45 - 12:15',
                course: 'CPE203',
                topic: 'Boolean Theorems',
                subtopics: ['Commutative law', 'Associative law', 'Distributive law', 'x+xy=x', 'x(x+y)=x'],
                priority: 3,
                activities: '20 simplification problems',
                resources: 'Theorem reference',
                completed: false
            },
            {
                time: '12:45 - 14:15',
                course: 'CPE203',
                topic: 'DeMorgan\'s Theorems',
                subtopics: ["(x+y)' = x'·y'", "(x·y)' = x'+y'", 'Extension to multiple variables', 'Applications'],
                priority: 3,
                activities: '15 DeMorgan\'s problems',
                resources: 'DeMorgan\'s card',
                completed: false
            },
            {
                time: '14:30 - 16:00',
                course: 'CPE203',
                topic: 'Universal Gates',
                subtopics: ['NAND universality', 'Converting to NAND-only', 'Alternate logic symbols'],
                priority: 2,
                activities: 'Practice circuit conversions',
                resources: 'Circuit examples',
                completed: false
            }
        ]
    },
    
    // DAY 3 - Feb 24 (CPE203 Final Prep)
    {
        day: 3,
        date: '2025-02-24',
        totalHours: 9,
        topics: [
            {
                time: '09:00 - 10:30',
                course: 'CPE203',
                topic: 'Combinational Circuits',
                subtopics: ['SOP form', 'POS form', 'Converting truth table → SOP → Circuit', 'Design procedure'],
                priority: 3,
                activities: 'Design 5 circuits',
                resources: 'Circuit template',
                completed: false
            },
            {
                time: '10:45 - 12:15',
                course: 'CPE203',
                topic: 'Karnaugh Maps',
                subtopics: ['2-variable K-maps', '3-variable K-maps', '4-variable K-maps', 'Grouping rules (powers of 2)'],
                priority: 3,
                activities: '10 K-map minimizations',
                resources: 'K-map templates',
                completed: false
            },
            {
                time: '12:45 - 14:15',
                course: 'CPE203',
                topic: 'Performance',
                subtopics: ['Propagation delay (t_PHL, t_PLH)', 't_p = ½(t_PHL + t_PLH)', 'Frequency limitation', 'Power dissipation'],
                priority: 3,
                activities: '10 delay calculations',
                resources: 'Formula sheet',
                completed: false
            },
            {
                time: '14:30 - 16:00',
                course: 'CPE203',
                topic: 'Fan-in/Fan-out & Error Detection',
                subtopics: ['Fan-in definition', 'Fan-out calculation', 'Parity method', 'CRC process', 'Hamming code'],
                priority: 2,
                activities: '5 fan-out + 5 error detection problems',
                resources: 'Error detection notes',
                completed: false
            }
        ]
    },
    
    // DAY 4 - Feb 25 (CPE203 Exam + STT201 Start)
    {
        day: 4,
        date: '2025-02-25',
        totalHours: 5,
        topics: [
            {
                time: '06:00 - 08:00',
                course: 'CPE203',
                topic: 'Final Review',
                subtopics: ['All formulas', 'Key concepts', 'Common pitfalls', 'Practice problems'],
                priority: 3,
                activities: 'Quick review session',
                resources: 'Cram sheet',
                completed: false
            },
            {
                time: '09:00 - 12:00',
                course: 'CPE203',
                topic: 'EXAM',
                subtopics: ['CPE203 Examination'],
                priority: 3,
                activities: 'Take exam',
                resources: 'Exam',
                completed: false
            },
            {
                time: '14:00 - 16:00',
                course: 'STT201',
                topic: 'Introduction to Statistics',
                subtopics: ['Descriptive vs Inferential', 'Common terms', 'Population vs Sample', 'Data types'],
                priority: 2,
                activities: 'Read notes, create glossary',
                resources: 'STT201 notes',
                completed: false
            }
        ]
    },
    
    // DAY 5 - Feb 26 (STT201 Focus)
    {
        day: 5,
        date: '2025-02-26',
        totalHours: 8,
        topics: [
            {
                time: '09:00 - 10:30',
                course: 'STT201',
                topic: 'Data Types & Scales',
                subtopics: ['Primary vs Secondary data', 'Qualitative vs Quantitative', 'Discrete vs Continuous', 'NOIR scales'],
                priority: 3,
                activities: '20 classification problems',
                resources: 'NOIR mnemonic',
                completed: false
            },
            {
                time: '10:45 - 12:15',
                course: 'STT201',
                topic: 'Frequency Distributions',
                subtopics: ['Summary tables', 'Relative frequency', 'Grouped frequency', 'Class boundaries', 'Class width'],
                priority: 3,
                activities: 'Create 3 frequency tables',
                resources: 'Frequency template',
                completed: false
            },
            {
                time: '12:45 - 14:15',
                course: 'STT201',
                topic: 'Graphical Presentations',
                subtopics: ['Histograms', 'Bar charts', 'Pie charts', 'Ogive', 'Stem and leaf'],
                priority: 2,
                activities: 'Draw 3 histograms, 2 ogives',
                resources: 'Graph paper',
                completed: false
            },
            {
                time: '14:30 - 16:00',
                course: 'SEN205',
                topic: 'Set Theory',
                subtopics: ['Complement', 'Union', 'Intersection', 'Difference', 'Power sets'],
                priority: 2,
                activities: '15 set operation problems',
                resources: 'SEN205 notes',
                completed: false
            }
        ]
    },
    
    // DAY 6 - Feb 27 (STT201 Focus)
    {
        day: 6,
        date: '2025-02-27',
        totalHours: 9,
        topics: [
            {
                time: '09:00 - 10:30',
                course: 'STT201',
                topic: 'Central Tendency',
                subtopics: ['Arithmetic mean (grouped/ungrouped)', 'Geometric mean', 'Harmonic mean', 'Median', 'Mode'],
                priority: 3,
                activities: '20 mean/median/mode problems',
                resources: 'Formula sheet',
                completed: false
            },
            {
                time: '10:45 - 12:15',
                course: 'STT201',
                topic: 'Measures of Partition',
                subtopics: ['Quartiles (Q₁, Q₂, Q₃)', 'Deciles (D₁-D₉)', 'Percentiles (P₁-P₉₉)'],
                priority: 3,
                activities: '15 quartile/percentile problems',
                resources: 'Partition formulas',
                completed: false
            },
            {
                time: '12:45 - 14:15',
                course: 'STT201',
                topic: 'Measures of Dispersion',
                subtopics: ['Range', 'IQR', 'Mean Deviation', 'Variance', 'Standard Deviation', 'CV'],
                priority: 3,
                activities: '15 variance/SD problems',
                resources: 'Dispersion formulas',
                completed: false
            },
            {
                time: '14:30 - 16:00',
                course: 'STT201',
                topic: 'Box Plots',
                subtopics: ['Five-number summary', 'Outlier detection', 'Skewness detection'],
                priority: 2,
                activities: 'Draw 5 box plots',
                resources: 'Box plot template',
                completed: false
            },
            {
                time: '16:00 - 17:00',
                course: 'SEN203',
                topic: 'Set Theory Review',
                subtopics: ['Operations', 'Venn diagrams', 'Applications'],
                priority: 1,
                activities: 'Practice problems',
                resources: 'SEN203 notes',
                completed: false
            }
        ]
    },
    
    // DAY 7 - Feb 28 (STT201 Probability)
    {
        day: 7,
        date: '2025-02-28',
        totalHours: 10,
        topics: [
            {
                time: '09:00 - 10:30',
                course: 'STT201',
                topic: 'Probability Basics',
                subtopics: ['Events', 'Sample space', 'Experiment', 'Trial', 'Probability rules'],
                priority: 3,
                activities: 'Create sample spaces for 10 experiments',
                resources: 'Probability notes',
                completed: false
            },
            {
                time: '10:45 - 12:15',
                course: 'STT201',
                topic: 'Addition Rule',
                subtopics: ['P(A or B) = P(A) + P(B) - P(A and B)', 'Mutually exclusive', 'Exhaustive events'],
                priority: 3,
                activities: '15 addition rule problems',
                resources: 'Formula card',
                completed: false
            },
            {
                time: '12:45 - 14:15',
                course: 'STT201',
                topic: 'Multiplication Rule',
                subtopics: ['P(A and B) = P(A) × P(B|A)', 'Conditional probability', 'Independent events'],
                priority: 3,
                activities: '15 conditional probability problems',
                resources: 'Conditional probability sheet',
                completed: false
            },
            {
                time: '14:30 - 16:00',
                course: 'STT201',
                topic: 'Tree Diagrams',
                subtopics: ['Representing sequences', 'Multiply along branches', 'Add across branches'],
                priority: 2,
                activities: 'Draw 5 tree diagrams',
                resources: 'Graph paper',
                completed: false
            },
            {
                time: '16:00 - 17:00',
                course: 'SEN205',
                topic: 'Relations & Functions',
                subtopics: ['Properties', 'Injective', 'Surjective', 'Bijective'],
                priority: 1,
                activities: '10 classification problems',
                resources: 'SEN205 notes',
                completed: false
            }
        ]
    },
    
    // DAY 8 - Mar 1 (STT201 Distributions)
    {
        day: 8,
        date: '2025-03-01',
        totalHours: 9,
        topics: [
            {
                time: '09:00 - 10:30',
                course: 'STT201',
                topic: 'Binomial Distribution',
                subtopics: ['Conditions', 'Formula: P(X=x) = ⁿCₓ pˣ qⁿ⁻ˣ', 'Mean = np', 'Variance = npq'],
                priority: 3,
                activities: '10 binomial problems',
                resources: 'Binomial formula sheet',
                completed: false
            },
            {
                time: '10:45 - 12:15',
                course: 'STT201',
                topic: 'Poisson Distribution',
                subtopics: ['Characteristics', 'Formula: P(X=x) = (μˣ e^(-μ))/x!', 'Mean = Variance = μ'],
                priority: 2,
                activities: '10 Poisson problems',
                resources: 'Poisson formula card',
                completed: false
            },
            {
                time: '12:45 - 14:15',
                course: 'STT201',
                topic: 'Normal Distribution',
                subtopics: ['PDF', 'Empirical rule (68-95-99.7)', 'Properties', 'Applications'],
                priority: 3,
                activities: 'Sketch 5 normal curves',
                resources: 'Normal distribution table',
                completed: false
            },
            {
                time: '14:30 - 16:00',
                course: 'STT201',
                topic: 'Z-Scores',
                subtopics: ['Z = (X-μ)/σ', 'Standard normal table', 'P(Z < x)', 'P(Z > x)'],
                priority: 3,
                activities: '15 Z-score problems',
                resources: 'Z-table',
                completed: false
            },
            {
                time: '16:00 - 17:00',
                course: 'SEN203',
                topic: 'Functions Deep Dive',
                subtopics: ['Composite functions', 'Inverse functions', 'Applications'],
                priority: 1,
                activities: '10 function problems',
                resources: 'SEN203 notes',
                completed: false
            }
        ]
    },
    
    // DAY 9 - Mar 2 (STT201 Sampling & Estimation)
    {
        day: 9,
        date: '2025-03-02',
        totalHours: 10,
        topics: [
            {
                time: '09:00 - 10:30',
                course: 'STT201',
                topic: 'Sampling Distributions',
                subtopics: ['Sample mean', 'E[X̄] = μ', 'Var(X̄) = σ²/n', 'Standard Error = σ/√n'],
                priority: 3,
                activities: '10 sampling problems',
                resources: 'Sampling formulas',
                completed: false
            },
            {
                time: '10:45 - 12:15',
                course: 'STT201',
                topic: 'Central Limit Theorem',
                subtopics: ['X̄ ~ N(μ, σ²/n) for large n', 'Z = (X̄-μ)/(σ/√n)', 'Conditions'],
                priority: 3,
                activities: '10 CLT problems',
                resources: 'CLT examples',
                completed: false
            },
            {
                time: '12:45 - 14:15',
                course: 'STT201',
                topic: 'Sample Proportion',
                subtopics: ['p̂ = X/n', 'E[p̂] = p', 'Var(p̂) = p(1-p)/n', 'Standard Error'],
                priority: 2,
                activities: '10 proportion problems',
                resources: 'Proportion formulas',
                completed: false
            },
            {
                time: '14:30 - 16:00',
                course: 'STT201',
                topic: 'Estimation Theory',
                subtopics: ['Point estimation', 'Confidence intervals', 'CI for mean', 'CI for proportion'],
                priority: 3,
                activities: '15 CI problems',
                resources: 'CI formulas',
                completed: false
            },
            {
                time: '16:00 - 17:00',
                course: 'SEN205',
                topic: 'Combinatorics',
                subtopics: ['Permutations', 'Combinations', 'Word problems'],
                priority: 2,
                activities: '15 permutation/combination problems',
                resources: 'Combinatorics formulas',
                completed: false
            }
        ]
    },
    
    // DAY 10 - Mar 3 (STT201 Review)
    {
        day: 10,
        date: '2025-03-03',
        totalHours: 8,
        topics: [
            {
                time: '09:00 - 11:00',
                course: 'STT201',
                topic: 'Comprehensive Review',
                subtopics: ['All formulas', 'Data types', 'Central tendency', 'Dispersion', 'Probability', 'Distributions', 'CLT', 'Estimation'],
                priority: 3,
                activities: 'Mixed problem set (30 questions)',
                resources: 'STT201 cram sheet',
                completed: false
            },
            {
                time: '11:00 - 12:00',
                course: 'STT201',
                topic: 'Practice Test',
                subtopics: ['Timed 1-hour test'],
                priority: 3,
                activities: 'Complete practice exam',
                resources: 'Timer + answer key',
                completed: false
            },
            {
                time: '13:00 - 16:00',
                course: 'SEN205',
                topic: 'Full Review',
                subtopics: ['Set theory', 'Relations', 'Functions', 'Combinatorics'],
                priority: 2,
                activities: 'Mixed problem set',
                resources: 'SEN205 notes',
                completed: false
            }
        ]
    },
    
    // DAY 11 - Mar 4 (STT201 Exam + SEN205)
    {
        day: 11,
        date: '2025-03-04',
        totalHours: 5,
        topics: [
            {
                time: '06:00 - 08:00',
                course: 'STT201',
                topic: 'Final Review',
                subtopics: ['Quick formula review', 'Key concepts'],
                priority: 3,
                activities: 'Review cram sheet',
                resources: 'Cram sheet',
                completed: false
            },
            {
                time: '09:00 - 12:00',
                course: 'STT201',
                topic: 'EXAM',
                subtopics: ['STT201 Examination'],
                priority: 3,
                activities: 'Take exam',
                resources: 'Exam',
                completed: false
            },
            {
                time: '14:00 - 16:00',
                course: 'SEN205',
                topic: 'Advanced Topics',
                subtopics: ['Process models', 'CMMI', 'Agile', 'Quality improvement'],
                priority: 2,
                activities: 'Read and summarize',
                resources: 'SEN205 notes',
                completed: false
            }
        ]
    },
    
    // DAY 12 - Mar 5 (SEN205 Focus)
    {
        day: 12,
        date: '2025-03-05',
        totalHours: 9,
        topics: [
            {
                time: '09:00 - 10:30',
                course: 'SEN205',
                topic: 'Requirements Types',
                subtopics: ['Functional vs Non-functional', 'User vs System', 'Product vs Process'],
                priority: 3,
                activities: '20 classification problems',
                resources: 'Requirements chart',
                completed: false
            },
            {
                time: '10:45 - 12:15',
                course: 'SEN205',
                topic: 'Elicitation Techniques',
                subtopics: ['Interviews', 'Surveys', 'Observation', 'Prototyping', 'Brainstorming'],
                priority: 3,
                activities: 'Match techniques to scenarios',
                resources: 'Technique cards',
                completed: false
            },
            {
                time: '12:45 - 14:15',
                course: 'SEN205',
                topic: 'SRS Documentation',
                subtopics: ['IEEE standards', 'Structure', 'Good requirements characteristics'],
                priority: 3,
                activities: 'Analyze sample SRS',
                resources: 'SRS template',
                completed: false
            },
            {
                time: '14:30 - 16:00',
                course: 'SEN205',
                topic: 'Validation & Management',
                subtopics: ['Reviews', 'Prototyping', 'Traceability', 'Change control'],
                priority: 2,
                activities: 'Case study analysis',
                resources: 'Validation notes',
                completed: false
            },
            {
                time: '16:00 - 17:00',
                course: 'SEN203',
                topic: 'Set Theory Review',
                subtopics: ['Operations', 'Power sets', 'Applications'],
                priority: 1,
                activities: '10 problems',
                resources: 'SEN203 notes',
                completed: false
            }
        ]
    },
    
    // DAY 13 - Mar 6 (SEN205 Focus)
    {
        day: 13,
        date: '2025-03-06',
        totalHours: 9,
        topics: [
            {
                time: '09:00 - 10:30',
                course: 'SEN205',
                topic: 'Process Models',
                subtopics: ['Waterfall', 'Incremental', 'Integration and Configuration'],
                priority: 3,
                activities: 'Compare and contrast models',
                resources: 'Process model diagrams',
                completed: false
            },
            {
                time: '10:45 - 12:15',
                course: 'SEN205',
                topic: 'Quality Improvement',
                subtopics: ['CMMI levels', 'ISO standards', 'Agile approaches'],
                priority: 2,
                activities: 'Research and summarize',
                resources: 'Quality notes',
                completed: false
            },
            {
                time: '12:45 - 14:15',
                course: 'SEN205',
                topic: 'Set Theory Review',
                subtopics: ['Complement', 'Union', 'Intersection', 'Difference'],
                priority: 2,
                activities: '15 operation problems',
                resources: 'Set theory sheet',
                completed: false
            },
            {
                time: '14:30 - 16:00',
                course: 'SEN205',
                topic: 'Relations & Functions',
                subtopics: ['Properties', 'Injective/Surjective/Bijective'],
                priority: 3,
                activities: '20 classification problems',
                resources: 'Function types chart',
                completed: false
            },
            {
                time: '16:00 - 17:00',
                course: 'SEN203',
                topic: 'Logic Review',
                subtopics: ['Propositional logic', 'Truth tables'],
                priority: 1,
                activities: '10 truth table problems',
                resources: 'SEN203 notes',
                completed: false
            }
        ]
    },
    
    // DAY 14 - Mar 7 (SEN205 Exam + SEN203)
    {
        day: 14,
        date: '2025-03-07',
        totalHours: 5,
        topics: [
            {
                time: '06:00 - 08:00',
                course: 'SEN205',
                topic: 'Final Review',
                subtopics: ['All key concepts', 'Formulas'],
                priority: 3,
                activities: 'Review cram sheet',
                resources: 'Cram sheet',
                completed: false
            },
            {
                time: '09:00 - 12:00',
                course: 'SEN205',
                topic: 'EXAM',
                subtopics: ['SEN205 Examination'],
                priority: 3,
                activities: 'Take exam',
                resources: 'Exam',
                completed: false
            },
            {
                time: '14:00 - 16:00',
                course: 'SEN203',
                topic: 'Discrete Structures Intro',
                subtopics: ['Discrete vs Continuous', 'Importance in CS'],
                priority: 1,
                activities: 'Read and take notes',
                resources: 'SEN203 notes',
                completed: false
            }
        ]
    },
    
    // DAY 15 - Mar 8 (SEN203 Focus)
    {
        day: 15,
        date: '2025-03-08',
        totalHours: 9,
        topics: [
            {
                time: '09:00 - 10:30',
                course: 'SEN203',
                topic: 'Set Theory',
                subtopics: ['Sets and elements', 'Subsets', 'Universal set', 'Complement'],
                priority: 3,
                activities: '25 set problems',
                resources: 'Set theory notes',
                completed: false
            },
            {
                time: '10:45 - 12:15',
                course: 'SEN203',
                topic: 'Set Operations',
                subtopics: ['Union', 'Intersection', 'Difference', 'Venn diagrams'],
                priority: 3,
                activities: '20 operation problems',
                resources: 'Venn diagram templates',
                completed: false
            },
            {
                time: '12:45 - 14:15',
                course: 'SEN203',
                topic: 'Power Sets',
                subtopics: ['Definition', '|P(A)| = 2ⁿ', 'Listing subsets'],
                priority: 3,
                activities: 'List subsets for 10 sets',
                resources: 'Power set formula',
                completed: false
            },
            {
                time: '14:30 - 16:00',
                course: 'SEN203',
                topic: 'Relations',
                subtopics: ['Properties', 'Reflexive', 'Symmetric', 'Transitive', 'Equivalence'],
                priority: 3,
                activities: 'Identify properties in 15 relations',
                resources: 'Property checklist',
                completed: false
            },
            {
                time: '16:00 - 17:00',
                course: 'SEN203',
                topic: 'Functions',
                subtopics: ['Domain and codomain', 'Injective', 'Surjective', 'Bijective'],
                priority: 2,
                activities: '20 function classifications',
                resources: 'Function chart',
                completed: false
            }
        ]
    },
    
    // DAY 16 - Mar 9 (SEN203 Focus)
    {
        day: 16,
        date: '2025-03-09',
        totalHours: 10,
        topics: [
            {
                time: '09:00 - 10:30',
                course: 'SEN203',
                topic: 'Sequences',
                subtopics: ['Arithmetic', 'Geometric', 'Recurrence relations'],
                priority: 2,
                activities: '15 sequence problems',
                resources: 'Sequence formulas',
                completed: false
            },
            {
                time: '10:45 - 12:15',
                course: 'SEN203',
                topic: 'Logic',
                subtopics: ['Propositional logic', 'Predicate logic', 'Truth tables', 'Logical equivalences'],
                priority: 3,
                activities: '20 truth table problems',
                resources: 'Logic rules',
                completed: false
            },
            {
                time: '12:45 - 14:15',
                course: 'SEN203',
                topic: 'Proof Techniques',
                subtopics: ['Direct proof', 'Proof by contradiction', 'Induction'],
                priority: 2,
                activities: 'Practice 5 proofs',
                resources: 'Proof templates',
                completed: false
            },
            {
                time: '14:30 - 16:00',
                course: 'SEN203',
                topic: 'Number Theory',
                subtopics: ['Divisibility', 'Modular arithmetic', 'GCD', 'Primes'],
                priority: 2,
                activities: '15 number theory problems',
                resources: 'Number theory notes',
                completed: false
            },
            {
                time: '16:00 - 17:00',
                course: 'SEN203',
                topic: 'Applications',
                subtopics: ['Search engines', 'Cybersecurity', 'OS scheduling', 'Database queries'],
                priority: 1,
                activities: 'Read and understand applications',
                resources: 'Application examples',
                completed: false
            }
        ]
    },
    
    // DAY 17 - Mar 10 (SEN203 Exam + CSE201)
    {
        day: 17,
        date: '2025-03-10',
        totalHours: 5,
        topics: [
            {
                time: '06:00 - 08:00',
                course: 'SEN203',
                topic: 'Final Review',
                subtopics: ['All key concepts', 'Formulas', 'Set operations', 'Functions'],
                priority: 3,
                activities: 'Review cram sheet',
                resources: 'Cram sheet',
                completed: false
            },
            {
                time: '09:00 - 12:00',
                course: 'SEN203',
                topic: 'EXAM',
                subtopics: ['SEN203 Examination'],
                priority: 3,
                activities: 'Take exam',
                resources: 'Exam',
                completed: false
            },
            {
                time: '14:00 - 16:00',
                course: 'CSE201',
                topic: 'Introduction to Software Construction',
                subtopics: ['Definition', 'Scope', 'Core principles'],
                priority: 1,
                activities: 'Read and take notes',
                resources: 'CSE201 notes',
                completed: false
            }
        ]
    },
    
    // DAY 18 - Mar 11 (CSE201 Focus)
    {
        day: 18,
        date: '2025-03-11',
        totalHours: 10,
        topics: [
            {
                time: '09:00 - 10:30',
                course: 'CSE201',
                topic: 'Design Principles',
                subtopics: ['Modularity', 'Abstraction', 'Encapsulation', 'High-level vs Detailed'],
                priority: 3,
                activities: 'Create diagrams for each principle',
                resources: 'Design notes',
                completed: false
            },
            {
                time: '10:45 - 12:15',
                course: 'CSE201',
                topic: 'Cohesion',
                subtopics: ['Definition', '7 types (worst to best)', 'Examples'],
                priority: 3,
                activities: 'MEMORIZE all 7 types in order',
                resources: 'Cohesion mnemonic',
                completed: false
            },
            {
                time: '12:45 - 14:15',
                course: 'CSE201',
                topic: 'Coupling',
                subtopics: ['Tight coupling', 'Loose coupling', 'Cohesion + Coupling relationship'],
                priority: 3,
                activities: 'Identify coupling in 10 examples',
                resources: 'Coupling chart',
                completed: false
            },
            {
                time: '14:30 - 16:00',
                course: 'CSE201',
                topic: 'Coding Standards',
                subtopics: ['Naming conventions', 'PEP 8', 'Google Java Style', 'Commenting rules'],
                priority: 2,
                activities: 'Refactor 5 bad code examples',
                resources: 'Standards reference',
                completed: false
            },
            {
                time: '16:00 - 17:00',
                course: 'CSE201',
                topic: 'Defensive Programming',
                subtopics: ['Input validation', 'Error handling', 'Assertions'],
                priority: 2,
                activities: 'Write defensive code for 5 scenarios',
                resources: 'Defensive programming examples',
                completed: false
            }
        ]
    },
    
    // DAY 19 - Mar 12 (CSE201 Focus)
    {
        day: 19,
        date: '2025-03-12',
        totalHours: 10,
        topics: [
            {
                time: '09:00 - 10:30',
                course: 'CSE201',
                topic: 'Testing',
                subtopics: ['Levels: Unit, Integration, System, Acceptance', 'Types: Functional, Non-functional', 'Manual vs Automated'],
                priority: 3,
                activities: 'Create testing hierarchy',
                resources: 'Testing levels mnemonic',
                completed: false
            },
            {
                time: '10:45 - 12:15',
                course: 'CSE201',
                topic: 'Debugging',
                subtopics: ['Testing vs Debugging', 'Techniques', 'Tools', 'Common bugs'],
                priority: 3,
                activities: 'Debug 5 code examples',
                resources: 'Debugging flowchart',
                completed: false
            },
            {
                time: '12:45 - 14:15',
                course: 'CSE201',
                topic: 'Development Tools',
                subtopics: ['Code editors', 'IDEs', 'Version Control', 'Build tools', 'Debuggers'],
                priority: 2,
                activities: 'Match tools to purposes',
                resources: 'Tool category chart',
                completed: false
            },
            {
                time: '14:30 - 16:00',
                course: 'CSE201',
                topic: 'Documentation & Quality',
                subtopics: ['Types', 'Code smells', 'Static analysis'],
                priority: 2,
                activities: 'Identify code smells in examples',
                resources: 'Quality notes',
                completed: false
            },
            {
                time: '16:00 - 17:00',
                course: 'CSE201',
                topic: 'Ethics',
                subtopics: ['ACM Code', 'IEEE Code', 'Professional responsibility'],
                priority: 1,
                activities: 'Review ethical scenarios',
                resources: 'Ethics summary',
                completed: false
            }
        ]
    },
    
    // DAY 20 - Mar 13 (CSE201 Exam)
    {
        day: 20,
        date: '2025-03-13',
        totalHours: 3,
        topics: [
            {
                time: '06:00 - 08:00',
                course: 'CSE201',
                topic: 'Final Review',
                subtopics: ['Cohesion types (7 in order!)', 'Coupling', 'Testing levels', 'Key principles'],
                priority: 3,
                activities: 'Review cram sheet',
                resources: 'Cram sheet',
                completed: false
            },
            {
                time: '09:00 - 12:00',
                course: 'CSE201',
                topic: 'EXAM',
                subtopics: ['CSE201 Examination'],
                priority: 3,
                activities: 'Take exam',
                resources: 'Exam',
                completed: false
            }
        ]
    }
];

// ===== MOTIVATIONAL QUOTES =====
const MOTIVATIONAL_QUOTES = [
    "The secret of getting ahead is getting started.",
    "It always seems impossible until it's done.",
    "Small steps every day lead to big results.",
    "Your only limit is your mind.",
    "The expert in anything was once a beginner.",
    "Believe you can and you're halfway there.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "Don't watch the clock; do what it does. Keep going.",
    "The future depends on what you do today.",
    "You don't have to be great to start, but you have to start to be great.",
    "Discipline is choosing what you want most over what you want now.",
    "Study now, sleep later. Sleep later, celebrate forever.",
    "The pain of studying is temporary, but the regret of failing lasts forever.",
    "Your grades are a reflection of your effort.",
    "One day, all your hard work will pay off."
];

// ===== STUDY TIPS =====
const STUDY_TIPS = [
    "Take a 5-10 minute break every 50 minutes",
    "Stay hydrated - water improves brain function",
    "Teach concepts to someone else to reinforce learning",
    "Use active recall instead of passive reading",
    "Practice problems > re-reading notes",
    "Get 7-8 hours of sleep - memory consolidates during sleep",
    "Review material within 24 hours of learning it",
    "Create mind maps for complex topics",
    "Use the Pomodoro technique: 25 min work, 5 min break",
    "Explain concepts out loud as if teaching",
    "Test yourself frequently, not just before exams",
    "Connect new information to what you already know",
    "Take handwritten notes - better retention than typing",
    "Study in a quiet, organized environment",
    "Reward yourself after completing difficult topics"
];