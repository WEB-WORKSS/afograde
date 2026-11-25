// DEMO · SAMPLE DATA. Original practice questions written for the Afograde demo (not past JAMB questions).
export const QUESTIONS = {
  MTH: [
    { id: "DEMO-Q-M1", topic: "alg", q: "Solve for x: 3x − 7 = 11.", options: ["4", "6", "18/3 + 1", "−6"], answer: 1, why: "Add 7 to both sides: 3x = 18, so x = 6." },
    { id: "DEMO-Q-M2", topic: "alg", q: "Factorise x² − 9.", options: ["(x − 3)²", "(x + 9)(x − 1)", "(x − 3)(x + 3)", "x(x − 9)"], answer: 2, why: "Difference of two squares: a² − b² = (a − b)(a + b)." },
    { id: "DEMO-Q-M3", topic: "num", q: "Express 0.000452 in standard form.", options: ["4.52 × 10⁻⁴", "45.2 × 10⁻⁵", "4.52 × 10⁻³", "4.52 × 10⁴"], answer: 0, why: "Move the decimal point 4 places right: 4.52 × 10⁻⁴." },
    { id: "DEMO-Q-M4", topic: "num", q: "Convert 1011₂ to base ten.", options: ["9", "10", "11", "13"], answer: 2, why: "1×8 + 0×4 + 1×2 + 1×1 = 11." },
    { id: "DEMO-Q-M5", topic: "geo", q: "The interior angles of a triangle are 2y, 3y and 4y. Find y.", options: ["10°", "20°", "30°", "40°"], answer: 1, why: "2y + 3y + 4y = 180°, so 9y = 180° and y = 20°." },
    { id: "DEMO-Q-M6", topic: "geo", q: "What is sin 30°?", options: ["1", "√3/2", "1/2", "√2/2"], answer: 2, why: "sin 30° = 1/2." },
    { id: "DEMO-Q-M7", topic: "stat", q: "Find the mean of 4, 7, 9, 10 and 15.", options: ["8", "9", "10", "11"], answer: 1, why: "Sum = 45; 45 ÷ 5 = 9." },
    { id: "DEMO-Q-M8", topic: "calc", q: "Differentiate y = 5x³ with respect to x.", options: ["15x²", "5x²", "15x³", "x⁴"], answer: 0, why: "d/dx(axⁿ) = naxⁿ⁻¹, so 3 × 5x² = 15x²." },
  ],
  ENG: [
    { id: "DEMO-Q-E1", topic: "lexis", q: "Choose the word nearest in meaning to the underlined word: The manager was *candid* about the losses.", options: ["Secretive", "Frank", "Angry", "Careless"], answer: 1, why: "Candid means open and honest — frank." },
    { id: "DEMO-Q-E2", topic: "lexis", q: "Choose the option opposite in meaning: The rules were *rigid*.", options: ["Strict", "Flexible", "Fixed", "Harsh"], answer: 1, why: "Rigid means unbending; the opposite is flexible." },
    { id: "DEMO-Q-E3", topic: "lexis", q: "Fill the gap: Neither the students nor the teacher ___ aware of the change.", options: ["were", "are", "was", "have been"], answer: 2, why: "With neither…nor, the verb agrees with the nearer subject: 'the teacher was'." },
    { id: "DEMO-Q-E4", topic: "oral", q: "Which word has a different vowel sound from the others?", options: ["seat", "feet", "meat", "sit"], answer: 3, why: "'Sit' has the short /ɪ/ sound; the others have long /iː/." },
    { id: "DEMO-Q-E5", topic: "oral", q: "Choose the word with stress on the second syllable.", options: ["TAble", "beGIN", "WAter", "HAPpy"], answer: 1, why: "be-GIN is stressed on the second syllable." },
    { id: "DEMO-Q-E6", topic: "comp", q: "'The harvest was poor, so prices rose.' What is the relationship between the two clauses?", options: ["Contrast", "Cause and effect", "Time sequence", "Comparison"], answer: 1, why: "A poor harvest caused prices to rise." },
    { id: "DEMO-Q-E7", topic: "comp", q: "In a passage, a writer 'implies' something when they:", options: ["State it directly", "Suggest it without stating it", "Deny it", "Repeat it"], answer: 1, why: "To imply is to suggest indirectly." },
    { id: "DEMO-Q-E8", topic: "summ", q: "Which sentence best summarises: 'Regular practice, rest and feedback together improve exam performance.'", options: ["Rest is important.", "Practice alone guarantees success.", "Practice, rest and feedback combine to raise scores.", "Exams are difficult."], answer: 2, why: "It keeps all three factors and the effect." },
  ],
};
