const svgNS = "http://www.w3.org/2000/svg";

const plot = document.querySelector("#plot");
const caseSelect = document.querySelector("#caseSelect");
const xPoint = document.querySelector("#xPoint");
const xPointNumber = document.querySelector("#xPointNumber");
const intervalA = document.querySelector("#intervalA");
const intervalB = document.querySelector("#intervalB");
const languageSelect = document.querySelector("#languageSelect");
const solutionToggle = document.querySelector("#solutionToggle");
const solutionPanel = document.querySelector("#solutionPanel");
const domainWarning = document.querySelector("#domainWarning");
const quizOptions = document.querySelector("#quizOptions");
const quizFeedback = document.querySelector("#quizFeedback");
const reflectionText = document.querySelector("#reflectionText");
const guidedStepsNav = document.querySelector("#guidedStepsNav");
const guidedResponse = document.querySelector("#guidedResponse");
const guidedChecklist = document.querySelector("#guidedChecklist");
const guidedSummary = document.querySelector("#guidedSummary");
const guidedSummaryText = document.querySelector("#guidedSummaryText");

const controls = {
  showF: document.querySelector("#showF"),
  showD1: document.querySelector("#showD1"),
  showD2: document.querySelector("#showD2"),
  showTangent: document.querySelector("#showTangent"),
  showArea: document.querySelector("#showArea"),
  showPoints: document.querySelector("#showPoints")
};

const viewport = {
  width: 920,
  height: 540,
  padLeft: 58,
  padRight: 24,
  padTop: 24,
  padBottom: 46
};

const cases = [
  {
    id: "cubica",
    name: "Cúbica con extremos locales",
    focus: "Relacionar el signo de la derivada con crecimiento, decrecimiento y extremos.",
    formula: "f(x) = x<sup>3</sup> - 3x + 1",
    derivative: "f'(x) = 3x<sup>2</sup> - 3",
    secondDerivative: "f''(x) = 6x",
    domainText: "Dominio: todos los números reales. La dificultad está en leer el cambio de signo de f' y no confundir extremo con corte.",
    xMin: -3,
    xMax: 3,
    yMin: -6,
    yMax: 6,
    defaultX: 0.6,
    defaultA: -1,
    defaultB: 1.4,
    domain: () => true,
    f: x => x ** 3 - 3 * x + 1,
    d1: x => 3 * x ** 2 - 3,
    d2: x => 6 * x,
    points: [
      { x: -1, label: "máx. local" },
      { x: 1, label: "mín. local" },
      { x: 0, label: "inflexión" }
    ],
    tasks: [
      "Predice los intervalos de crecimiento sin mirar la gráfica de f; usa solo f'(x).",
      "Comprueba si x = -1 y x = 1 son extremos y clasifícalos.",
      "Explica por qué el punto de inflexión no es necesariamente un extremo."
    ],
    errors: [
      "Decir que f' negativa significa que la gráfica está debajo del eje x.",
      "Clasificar un extremo sin estudiar el cambio de signo de f'.",
      "Identificar cualquier f''(x) = 0 como punto de inflexión sin comprobar cambio de curvatura."
    ],
    solution: [
      "f'(x) = 3(x - 1)(x + 1). Es positiva en (-∞, -1), negativa en (-1, 1) y positiva en (1, ∞).",
      "En x = -1 hay máximo local porque f' pasa de positiva a negativa. En x = 1 hay mínimo local porque f' pasa de negativa a positiva.",
      "f''(x) = 6x cambia de signo en x = 0, por eso hay inflexión. No es extremo porque f'(0) = -3."
    ]
  },
  {
    id: "racional",
    name: "Racional con asíntotas",
    focus: "Distinguir dominio, asíntota vertical, asíntota horizontal y monotonicidad.",
    formula: "f(x) = (x + 1) / (x - 1)",
    derivative: "f'(x) = -2 / (x - 1)<sup>2</sup>",
    secondDerivative: "f''(x) = 4 / (x - 1)<sup>3</sup>",
    domainText: "Dominio: todos los reales salvo x = 1. Ese valor no se puede tratar como un punto de la gráfica.",
    xMin: -5,
    xMax: 5,
    yMin: -6,
    yMax: 6,
    defaultX: -1,
    defaultA: -3,
    defaultB: 0.5,
    singularities: [{ x: 1, type: "vertical", label: "x = 1" }],
    asymptotes: [
      { type: "vertical", value: 1, label: "x = 1" },
      { type: "horizontal", value: 1, label: "y = 1" }
    ],
    domain: x => Math.abs(x - 1) > 1e-8,
    f: x => (x + 1) / (x - 1),
    d1: x => -2 / ((x - 1) ** 2),
    d2: x => 4 / ((x - 1) ** 3),
    points: [
      { x: -1, label: "corte eje x" }
    ],
    tasks: [
      "Escribe el dominio antes de mover la lectura local.",
      "Usa límites laterales para justificar la asíntota vertical x = 1.",
      "Explica por qué la función decrece en cada rama aunque tenga una discontinuidad."
    ],
    errors: [
      "Unir visualmente las dos ramas a través de la asíntota.",
      "Sustituir x = 1 como si perteneciera al dominio.",
      "Concluir que decrece en todo R sin separar los intervalos del dominio."
    ],
    solution: [
      "El dominio es R - {1}. Al acercarse a x = 1 los valores se hacen no acotados, con distinto comportamiento lateral.",
      "La asíntota horizontal es y = 1 porque f(x) = 1 + 2/(x - 1) y el segundo término tiende a 0.",
      "f'(x) < 0 para todo x del dominio. La función decrece en (-∞, 1) y en (1, ∞), no en un único intervalo que atraviese x = 1."
    ]
  },
  {
    id: "raiz",
    name: "Raíz cuadrada y extremo de dominio",
    focus: "Interpretar un dominio cerrado por la izquierda y una tangente vertical.",
    formula: "f(x) = √(x + 2)",
    derivative: "f'(x) = 1 / (2√(x + 2))",
    secondDerivative: "f''(x) = -1 / (4(x + 2)<sup>3/2</sup>)",
    domainText: "Dominio: x ≥ -2. La función existe en x = -2, pero su derivada no es finita en ese extremo.",
    xMin: -3,
    xMax: 8,
    yMin: -1,
    yMax: 4,
    defaultX: 1,
    defaultA: -2,
    defaultB: 4,
    singularities: [{ x: -2, type: "endpoint", label: "x = -2" }],
    domain: x => x >= -2,
    f: x => Math.sqrt(x + 2),
    d1: x => 1 / (2 * Math.sqrt(x + 2)),
    d2: x => -1 / (4 * ((x + 2) ** 1.5)),
    points: [
      { x: -2, label: "inicio dominio" },
      { x: 2, label: "pendiente menor" }
    ],
    tasks: [
      "Indica qué ocurre al acercarse a x = -2 desde la derecha.",
      "Compara la pendiente cerca de x = -2 y para valores grandes de x.",
      "Decide si la función es cóncava hacia arriba o hacia abajo en su dominio."
    ],
    errors: [
      "Hablar de límite por la izquierda en un punto donde no hay dominio.",
      "Suponer que toda función continua es derivable en el extremo del dominio.",
      "Confundir crecimiento con curvatura: crecer no implica ser cóncava hacia arriba."
    ],
    solution: [
      "La función empieza en (-2, 0). Solo tiene sentido estudiar el límite por la derecha dentro del dominio.",
      "f'(x) es positiva, así que la función crece, pero disminuye al aumentar x.",
      "f''(x) < 0 para x > -2, por lo que la gráfica es cóncava hacia abajo en su dominio interior."
    ]
  },
  {
    id: "logaritmica",
    name: "Logarítmica desplazada",
    focus: "Conectar dominio, asíntota vertical, crecimiento lento y concavidad.",
    formula: "f(x) = ln(x + 2) - 1",
    derivative: "f'(x) = 1 / (x + 2)",
    secondDerivative: "f''(x) = -1 / (x + 2)<sup>2</sup>",
    domainText: "Dominio: x > -2. La asíntota x = -2 no pertenece a la función.",
    xMin: -4,
    xMax: 8,
    yMin: -5,
    yMax: 3,
    defaultX: 1,
    defaultA: -1,
    defaultB: 4,
    singularities: [{ x: -2, type: "vertical", label: "x = -2" }],
    asymptotes: [{ type: "vertical", value: -2, label: "x = -2" }],
    domain: x => x > -2,
    f: x => Math.log(x + 2) - 1,
    d1: x => 1 / (x + 2),
    d2: x => -1 / ((x + 2) ** 2),
    points: [
      { x: Math.E - 2, label: "corte eje x" },
      { x: -1, label: "f(-1) = -1" }
    ],
    tasks: [
      "Justifica el dominio a partir del argumento del logaritmo.",
      "Determina si crece siempre y si la pendiente aumenta o disminuye.",
      "Interpreta por qué la gráfica se acerca a x = -2 sin tocarla."
    ],
    errors: [
      "Permitir x = -2 porque aparece dentro de la raíz visual de la curva.",
      "Pensar que crecer siempre exige crecer cada vez más rápido.",
      "Confundir la asíntota vertical con un corte del eje y."
    ],
    solution: [
      "Debe cumplirse x + 2 > 0, luego x > -2.",
      "f'(x) > 0 en todo el dominio, así que crece. Como f''(x) < 0, la pendiente va disminuyendo.",
      "Al acercarse a -2 por la derecha, ln(x + 2) tiende a -∞. Por eso x = -2 es asíntota vertical."
    ]
  },
  {
    id: "absoluta",
    name: "Valor absoluto y no derivabilidad",
    focus: "Detectar una esquina: continuidad no equivale a derivabilidad.",
    formula: "f(x) = |x - 1| + 0.5x",
    derivative: "f'(x) = -0.5 si x < 1; 1.5 si x > 1",
    secondDerivative: "f''(x) = 0 en cada tramo; no definida en x = 1",
    domainText: "Dominio: todos los reales. En x = 1 la función es continua, pero la pendiente lateral no coincide.",
    xMin: -4,
    xMax: 6,
    yMin: -1,
    yMax: 7,
    defaultX: 0,
    defaultA: -1,
    defaultB: 3,
    singularities: [{ x: 1, type: "corner", label: "x = 1" }],
    domain: () => true,
    f: x => Math.abs(x - 1) + 0.5 * x,
    d1: x => {
      if (Math.abs(x - 1) < 1e-8) return NaN;
      return x < 1 ? -0.5 : 1.5;
    },
    d2: x => {
      if (Math.abs(x - 1) < 1e-8) return NaN;
      return 0;
    },
    points: [
      { x: 1, label: "no derivable" }
    ],
    tasks: [
      "Calcula la pendiente de cada tramo lineal.",
      "Decide si existe f'(1) comparando pendientes laterales.",
      "Explica por qué hay mínimo aunque la derivada en ese punto no exista."
    ],
    errors: [
      "Derivar |x - 1| como si fuera x - 1 en todo el dominio.",
      "Afirmar que si hay mínimo entonces f'(x) = 0 obligatoriamente.",
      "Usar f'' = 0 para concluir que no puede cambiar la monotonía."
    ],
    solution: [
      "Para x < 1, f(x) = 1 - x + 0.5x = 1 - 0.5x. Para x > 1, f(x) = x - 1 + 0.5x = 1.5x - 1.",
      "Las pendientes laterales son -0.5 y 1.5. Como no coinciden, f'(1) no existe.",
      "La función decrece antes de x = 1 y crece después, por eso x = 1 da un mínimo local aunque no haya tangente única."
    ]
  }
];

let state = {
  caseId: cases[0].id,
  x: cases[0].defaultX,
  a: cases[0].defaultA,
  b: cases[0].defaultB,
  lang: "es",
  quizIndex: 0,
  selectedAnswer: null,
  quizFeedback: null,
  quizHintShown: false,
  quizCorrect: {},
  guidedStep: 0,
  guidedWork: {},
  guidedSummaryVisible: false
};

const uiText = {
  es: {
    appTitle: "Laboratorio visual de funciones",
    appSubtitle: "Análisis guiado para 2º de Bachillerato",
    topbarNote: "Dominio, derivada, curvatura, tangente e integral en una misma lectura.",
    languageLabel: "Idioma",
    caseStudy: "Caso de estudio",
    layers: "Capas matemáticas",
    tangentLayer: "tangente",
    integralLayer: "integral",
    keyPointsLayer: "puntos clave",
    localReadingInline: "Lectura local",
    interval: "Intervalo [a, b]",
    resetCase: "Restablecer caso",
    localReading: "Lectura local",
    localTableCaption: "Tabla alrededor del punto",
    dynamicReportTitle: "Informe dinámico",
    analysisGuide: "Guía de análisis",
    errorsTitle: "Errores a vigilar",
    criteriaTitle: "Criterios de éxito",
    showSolution: "Mostrar solución orientativa",
    hideSolution: "Ocultar solución orientativa",
    notExists: "no existe",
    outsideDomain: "fuera del dominio",
    quizTitle: "Cuestionario adaptado",
    quizIntro: "Responde después de observar la función. La corrección explica qué deberías mirar.",
    hint: "Pista",
    check: "Corregir",
    next: "Siguiente",
    restart: "Reiniciar",
    progress: "Pregunta",
    chooseAnswer: "Elige una respuesta antes de corregir.",
    correct: "Correcto.",
    review: "Revisa.",
    thinkNow: "Qué pensar ahora:",
    reflectionLabel: "Antes de cerrar, escribe una frase matemática que justifique tu respuesta.",
    guidedTitle: "Ciclo guiado de aprendizaje",
    guidedIntro: "Sigue los pasos en orden: primero piensa, después observa y finalmente justifica.",
    guidedStep: "Paso",
    guidedResponseLabel: "Respuesta del alumno",
    guidedChecklistTitle: "Antes de avanzar, comprueba",
    guidedPrev: "Anterior",
    guidedNext: "Siguiente",
    guidedClearStep: "Limpiar paso",
    guidedBuildSummary: "Preparar informe",
    guidedCopySummary: "Copiar",
    guidedCopied: "Copiado",
    guidedSummaryTitle: "Informe del ciclo",
    guidedSummaryIntro: "Resumen editable para revisar, copiar o entregar.",
    guidedEmpty: "Sin respuesta todavía.",
    guidedChecklistDone: "Comprobaciones marcadas",
    guidedReportCase: "Caso",
    guidedReportFormula: "Función",
    guidedQuizStatus: "Cuestionario",
    guidedQuizNoData: "sin corregir todavía",
    guidedQuizCorrect: "última corrección registrada como correcta",
    guidedQuizWrong: "última corrección registrada como revisable",
    criteria: [
      "Explicita el dominio antes de interpretar la gráfica.",
      "Relaciona el signo de f' con intervalos de crecimiento o decrecimiento.",
      "Distingue extremo local, punto de inflexión y asíntota.",
      "Justifica la conclusión con al menos dos representaciones."
    ],
    noLocalReport: "No hay informe local porque el valor elegido queda fuera del dominio o en una discontinuidad.",
    noFiniteDerivative: "No hay una tangente única con pendiente finita.",
    noSecondDerivative: "La segunda derivada no permite clasificar la curvatura en esta lectura.",
    intervalDiscontinuity: "El intervalo atraviesa una discontinuidad o asíntota; no se debe interpretar como una integral ordinaria.",
    intervalOutsideDomain: "Algún punto del intervalo queda fuera del dominio de la función.",
    signedAreaDiff: "La diferencia entre integral neta y área geométrica indica que hay regiones con signo distinto.",
    signedAreaSame: "Integral neta y área geométrica son casi iguales en este intervalo.",
    domainWarning: "El valor local seleccionado no pertenece al dominio o cae en un punto no derivable para la capa que estás leyendo."
  },
  eu: {
    appTitle: "Funtzioen ikus-laborategia",
    appSubtitle: "Batxilergoko 2. mailarako analisi gidatua",
    topbarNote: "Domeinua, deribatua, kurbadura, ukitzailea eta integrala irakurketa berean.",
    languageLabel: "Hizkuntza",
    caseStudy: "Azterketa-kasua",
    layers: "Geruza matematikoak",
    tangentLayer: "ukitzailea",
    integralLayer: "integrala",
    keyPointsLayer: "puntu gakoak",
    localReadingInline: "Irakurketa lokala",
    interval: "Tartea [a, b]",
    resetCase: "Kasua berrezarri",
    localReading: "Irakurketa lokala",
    localTableCaption: "Puntuaren inguruko taula",
    dynamicReportTitle: "Txosten dinamikoa",
    analysisGuide: "Analisi-gida",
    errorsTitle: "Kontuan hartu beharreko akatsak",
    criteriaTitle: "Arrakasta-irizpideak",
    showSolution: "Erakutsi orientaziozko ebazpena",
    hideSolution: "Ezkutatu orientaziozko ebazpena",
    notExists: "ez da existitzen",
    outsideDomain: "domeinutik kanpo",
    quizTitle: "Galdetegi egokitua",
    quizIntro: "Erantzun funtzioa behatu ondoren. Zuzenketak zer begiratu behar duzun azaltzen du.",
    hint: "Pista",
    check: "Zuzendu",
    next: "Hurrengoa",
    restart: "Berrabiarazi",
    progress: "Galdera",
    chooseAnswer: "Aukeratu erantzun bat zuzendu aurretik.",
    correct: "Zuzena.",
    review: "Berrikusi.",
    thinkNow: "Orain pentsatu beharrekoa:",
    reflectionLabel: "Amaitu aurretik, idatzi zure erantzuna justifikatzen duen esaldi matematiko bat.",
    guidedTitle: "Ikaskuntza-ziklo gidatua",
    guidedIntro: "Jarraitu urratsak ordenean: lehenik pentsatu, gero behatu eta amaieran justifikatu.",
    guidedStep: "Urratsa",
    guidedResponseLabel: "Ikaslearen erantzuna",
    guidedChecklistTitle: "Aurrera egin aurretik, egiaztatu",
    guidedPrev: "Aurrekoa",
    guidedNext: "Hurrengoa",
    guidedClearStep: "Garbitu urratsa",
    guidedBuildSummary: "Prestatu txostena",
    guidedCopySummary: "Kopiatu",
    guidedCopied: "Kopiatuta",
    guidedSummaryTitle: "Zikloaren txostena",
    guidedSummaryIntro: "Berrikusteko, kopiatzeko edo entregatzeko laburpen editagarria.",
    guidedEmpty: "Oraindik erantzunik ez.",
    guidedChecklistDone: "Markatutako egiaztapenak",
    guidedReportCase: "Kasua",
    guidedReportFormula: "Funtzioa",
    guidedQuizStatus: "Galdetegia",
    guidedQuizNoData: "oraindik zuzendu gabe",
    guidedQuizCorrect: "azken zuzenketa zuzentzat erregistratu da",
    guidedQuizWrong: "azken zuzenketa berrikustekotzat erregistratu da",
    criteria: [
      "Domeinua esplizitatu grafikoa interpretatu aurretik.",
      "Lotu f'-ren zeinua hazkunde- edo beherakada-tarteekin.",
      "Bereizi mutur lokala, inflexio-puntua eta asintota.",
      "Justifikatu ondorioa gutxienez bi adierazpen erabiliz."
    ],
    noLocalReport: "Ez dago txosten lokalik, aukeratutako balioa domeinutik kanpo edo etengune batean dagoelako.",
    noFiniteDerivative: "Ez dago malda finituko ukitzaile bakarrik.",
    noSecondDerivative: "Bigarren deribatuak ez du puntu honetako kurbadura sailkatzen uzten.",
    intervalDiscontinuity: "Tarteak etengune edo asintota bat zeharkatzen du; ezin da integral arrunt gisa interpretatu.",
    intervalOutsideDomain: "Tarteko punturen bat funtzioaren domeinutik kanpo dago.",
    signedAreaDiff: "Integral netoaren eta azalera geometrikoaren arteko aldeak zeinu desberdineko eremuak daudela adierazten du.",
    signedAreaSame: "Integral netoa eta azalera geometrikoa ia berdinak dira tarte honetan.",
    domainWarning: "Aukeratutako balio lokala ez dago domeinuan edo ez-deribagarria da irakurtzen ari zaren geruzarako."
  }
};

const caseText = {
  cubica: {
    eu: {
      name: "Mutur lokalak dituen kubikoa",
      focus: "Deribatuaren zeinua hazkundearekin, beherakadarekin eta muturrekin lotzea.",
      domainText: "Domeinua: zenbaki erreal guztiak. Zailtasuna f'-ren zeinu-aldaketa irakurtzean eta muturra ebakidurarekin ez nahastean dago.",
      points: ["max. lokala", "min. lokala", "inflexioa"],
      tasks: [
        "Aurreikusi hazkunde-tarteak f-ren grafikoa begiratu gabe; erabili soilik f'(x).",
        "Egiaztatu x = -1 eta x = 1 muturrak diren, eta sailkatu.",
        "Azaldu zergatik inflexio-puntua ez den nahitaez mutur bat."
      ],
      errors: [
        "f' negatiboa izateak grafikoa x ardatzaren azpian dagoela esatea.",
        "Mutur bat sailkatzea f'-ren zeinu-aldaketa aztertu gabe.",
        "f''(x) = 0 den edozein puntu inflexio-puntu dela esatea kurbadura-aldaketa egiaztatu gabe."
      ],
      solution: [
        "f'(x) = 3(x - 1)(x + 1). Positiboa da (-∞, -1) tartean, negatiboa (-1, 1) tartean eta positiboa (1, ∞) tartean.",
        "x = -1 puntuan maximo lokala dago, f' positibotik negatibora pasatzen delako. x = 1 puntuan minimo lokala dago, f' negatibotik positibora pasatzen delako.",
        "f''(x) = 6x zeinuz aldatzen da x = 0 puntuan; horregatik dago inflexioa. Ez da muturra, f'(0) = -3 delako."
      ]
    }
  },
  racional: {
    eu: {
      name: "Asintotak dituen arrazionala",
      focus: "Domeinua, asintota bertikala, asintota horizontala eta monotonia bereiztea.",
      domainText: "Domeinua: erreal guztiak x = 1 izan ezik. Balio hori ezin da grafikoaren puntu gisa hartu.",
      points: ["x ardatzarekiko ebakidura"],
      tasks: [
        "Idatzi domeinua irakurketa lokala mugitu aurretik.",
        "Erabili albo-limiteak x = 1 asintota bertikala justifikatzeko.",
        "Azaldu zergatik den funtzioa beherakorra adar bakoitzean, nahiz eta etengunea izan."
      ],
      errors: [
        "Bi adarrak asintotaren bidez ikusiz lotzea.",
        "x = 1 domeinukoa balitz bezala ordezkatzea.",
        "Funtzioa R osoan beherakorra dela ondorioztatzea domeinuko tarteak banandu gabe."
      ],
      solution: [
        "Domeinua R - {1} da. x = 1era hurbiltzean balioak mugagabe bihurtzen dira, albo bakoitzean portaera desberdinarekin.",
        "Asintota horizontala y = 1 da, f(x) = 1 + 2/(x - 1) delako eta bigarren gaia 0ra jotzen duelako.",
        "f'(x) < 0 domeinu osoan. Funtzioa beherakorra da (-∞, 1) eta (1, ∞) tarteetan, ez x = 1 zeharkatzen duen tarte bakar batean."
      ]
    }
  },
  raiz: {
    eu: {
      name: "Erro karratua eta domeinuaren muturra",
      focus: "Ezkerretik itxitako domeinua eta ukitzaile bertikala interpretatzea.",
      domainText: "Domeinua: x ≥ -2. Funtzioa x = -2 puntuan existitzen da, baina deribatua ez da finitua mutur horretan.",
      points: ["domeinuaren hasiera", "malda txikiagoa"],
      tasks: [
        "Adierazi zer gertatzen den x = -2 puntura eskuinetik hurbiltzean.",
        "Konparatu malda x = -2 inguruan eta x balio handietan.",
        "Erabaki funtzioa ahurra gorantz ala beherantz den bere domeinuan."
      ],
      errors: [
        "Ezkerreko limiteaz hitz egitea alde horretan domeinurik ez dagoenean.",
        "Funtzio jarraitu oro domeinuaren muturrean deribagarria dela pentsatzea.",
        "Hazkundea eta kurbadura nahastea: hazteak ez du esan nahi ahurra gorantz denik."
      ],
      solution: [
        "Funtzioa (-2, 0) puntuan hasten da. Domeinuaren barruan eskuineko limitea aztertzea bakarrik du zentzua.",
        "f'(x) positiboa da; beraz, funtzioa hazten da, baina x handitzean malda txikitzen da.",
        "f''(x) < 0 da x > -2 denean; beraz, grafikoa ahurra beherantz da domeinuaren barnealdean."
      ]
    }
  },
  logaritmica: {
    eu: {
      name: "Logaritmikoa desplazatuta",
      focus: "Domeinua, asintota bertikala, hazkunde motela eta ahurtasuna lotzea.",
      domainText: "Domeinua: x > -2. x = -2 asintota ez da funtzioaren puntua.",
      points: ["x ardatzarekiko ebakidura", "f(-1) = -1"],
      tasks: [
        "Justifikatu domeinua logaritmoaren argumentutik abiatuta.",
        "Erabaki beti hazten den eta malda handitzen ala txikitzen den.",
        "Interpretatu zergatik hurbiltzen den grafikoa x = -2ra ukitu gabe."
      ],
      errors: [
        "x = -2 onartzea kurba bisualki han hasten dela dirudielako.",
        "Beti hazteak gero eta azkarrago haztea esan nahi duela pentsatzea.",
        "Asintota bertikala y ardatzarekiko ebakidurarekin nahastea."
      ],
      solution: [
        "x + 2 > 0 bete behar da; beraz, x > -2.",
        "f'(x) > 0 da domeinu osoan; beraz, hazten da. f''(x) < 0 denez, malda txikitzen doa.",
        "-2ra eskuinetik hurbiltzean, ln(x + 2) -∞ra doa. Horregatik x = -2 asintota bertikala da."
      ]
    }
  },
  absoluta: {
    eu: {
      name: "Balio absolutua eta ez-deribagarritasuna",
      focus: "Izkin bat hautematea: jarraitutasuna ez da deribagarritasuna.",
      derivative: "f'(x) = -0.5 x < 1 bada; 1.5 x > 1 bada",
      secondDerivative: "f''(x) = 0 tarte bakoitzean; ez dago definituta x = 1 puntuan",
      domainText: "Domeinua: erreal guztiak. x = 1 puntuan funtzioa jarraitua da, baina alboetako maldak ez datoz bat.",
      points: ["ez-deribagarria"],
      tasks: [
        "Kalkulatu zuzen-zati bakoitzaren malda.",
        "Erabaki f'(1) existitzen den alboetako maldak konparatuz.",
        "Azaldu zergatik dagoen minimoa puntu horretan deribatua existitzen ez bada ere."
      ],
      errors: [
        "|x - 1| funtzioa domeinu osoan x - 1 balitz bezala deribatzea.",
        "Minimoa badago, derrigor f'(x) = 0 izan behar dela baieztatzea.",
        "f'' = 0 erabiliz monotonia ezin dela aldatu ondorioztatzea."
      ],
      solution: [
        "x < 1 bada, f(x) = 1 - x + 0.5x = 1 - 0.5x. x > 1 bada, f(x) = x - 1 + 0.5x = 1.5x - 1.",
        "Alboetako maldak -0.5 eta 1.5 dira. Ez datoz bat; beraz, f'(1) ez da existitzen.",
        "Funtzioa beherakorra da x = 1 baino lehen eta hazkorra ondoren; horregatik x = 1 puntuan minimo lokala dago, ukitzaile bakarra ez badago ere."
      ]
    }
  }
};

const quizzes = {
  cubica: [
    {
      question: {
        es: "Para f(x) = x^3 - 3x + 1, ¿qué información te da f'(x) = 3x^2 - 3?",
        eu: "f(x) = x^3 - 3x + 1 bada, zer informazio ematen du f'(x) = 3x^2 - 3 adierazpenak?"
      },
      options: [
        { es: "La altura exacta de la gráfica en cada x.", eu: "Grafikoaren altuera zehatza x bakoitzean." },
        { es: "Si la función crece o decrece en cada intervalo.", eu: "Funtzioa tarte bakoitzean hazten edo jaisten den." },
        { es: "El área acumulada bajo la curva.", eu: "Kurbaren azpiko azalera metatua." }
      ],
      answer: 1,
      hint: {
        es: "Mira el signo de f', no si f está arriba o abajo del eje.",
        eu: "Begiratu f'-ren zeinua, ez f grafikoa ardatzaren gainetik edo azpitik dagoen."
      },
      correct: {
        es: "Exacto: f' positiva indica crecimiento y f' negativa indica decrecimiento.",
        eu: "Hori da: f' positiboak hazkundea adierazten du eta f' negatiboak beherakada."
      },
      wrong: {
        es: "La derivada no da la altura ni el área. Te dice la pendiente local y, por tanto, el crecimiento.",
        eu: "Deribatuak ez du altuera ez azalera ematen. Malda lokala ematen du, eta hortik hazkundea."
      },
      next: {
        es: "Localiza ahora dónde cambia de signo f'.",
        eu: "Orain kokatu non aldatzen den f'-ren zeinua."
      }
    },
    {
      question: {
        es: "Si f''(0) = 0 en esta cúbica, ¿qué debes comprobar antes de afirmar que hay inflexión?",
        eu: "Kubiko honetan f''(0) = 0 bada, zer egiaztatu behar duzu inflexioa dagoela esan aurretik?"
      },
      options: [
        { es: "Que f'' cambie de signo alrededor de x = 0.", eu: "f''-k zeinua aldatzen duela x = 0 inguruan." },
        { es: "Que f(0) sea positivo.", eu: "f(0) positiboa dela." },
        { es: "Que f'(0) valga cero.", eu: "f'(0) zero dela." }
      ],
      answer: 0,
      hint: {
        es: "Un cero de f'' es candidato; la curvatura debe cambiar.",
        eu: "f''-ren zeroa hautagaia da; kurbadurak aldatu behar du."
      },
      correct: {
        es: "Bien: la condición relevante es el cambio de curvatura.",
        eu: "Ondo: baldintza garrantzitsua kurbadura-aldaketa da."
      },
      wrong: {
        es: "No basta con f'' = 0. La pregunta matemática es si la concavidad cambia.",
        eu: "Ez da nahikoa f'' = 0 izatea. Galdera matematikoa ahurtasuna aldatzen den da."
      },
      next: {
        es: "Contrasta la respuesta activando la capa f''.",
        eu: "Kontrastatu erantzuna f'' geruza aktibatuz."
      }
    }
  ],
  racional: [
    {
      question: {
        es: "¿Por qué no se debe decir que esta función decrece en todo R?",
        eu: "Zergatik ezin da esan funtzio hau R osoan beherakorra dela?"
      },
      options: [
        { es: "Porque f'(x) a veces es positiva.", eu: "Batzuetan f'(x) positiboa delako." },
        { es: "Porque x = 1 no pertenece al dominio y separa dos ramas.", eu: "x = 1 ez delako domeinukoa eta bi adar bereizten dituelako." },
        { es: "Porque tiene una asíntota horizontal.", eu: "Asintota horizontala duelako." }
      ],
      answer: 1,
      hint: {
        es: "El signo de f' se interpreta dentro de cada intervalo del dominio.",
        eu: "f'-ren zeinua domeinuko tarte bakoitzaren barruan interpretatzen da."
      },
      correct: {
        es: "Correcto: decrece en (-∞, 1) y en (1, ∞), pero no se atraviesa x = 1.",
        eu: "Zuzena: beherakorra da (-∞, 1) eta (1, ∞) tarteetan, baina x = 1 ezin da zeharkatu."
      },
      wrong: {
        es: "El obstáculo no es la asíntota horizontal, sino la ruptura del dominio en x = 1.",
        eu: "Oztopoa ez da asintota horizontala; domeinua x = 1 puntuan hausten dela baizik."
      },
      next: {
        es: "Escribe siempre los intervalos separados por la discontinuidad.",
        eu: "Idatzi beti etenguneak bereizten dituen tarteak."
      }
    },
    {
      question: {
        es: "Si el intervalo de integral cruza x = 1, ¿qué debería hacer el alumno?",
        eu: "Integralaren tarteak x = 1 zeharkatzen badu, zer egin beharko luke ikasleak?"
      },
      options: [
        { es: "Calcular el área como si la curva fuera continua.", eu: "Azalera kalkulatu kurba jarraitua balitz bezala." },
        { es: "Parar y revisar el dominio antes de interpretar el área.", eu: "Gelditu eta domeinua berrikusi azalera interpretatu aurretik." },
        { es: "Cambiar la escala vertical y continuar.", eu: "Eskala bertikala aldatu eta jarraitu." }
      ],
      answer: 1,
      hint: {
        es: "Una integral definida ordinaria exige que la función esté bien definida en el intervalo.",
        eu: "Integral definitu arruntak funtzioa tartean ondo definituta egotea eskatzen du."
      },
      correct: {
        es: "Eso es: una discontinuidad dentro del intervalo cambia el problema.",
        eu: "Hori da: tarte barruko etengune batek arazoa aldatzen du."
      },
      wrong: {
        es: "Antes de calcular hay que decidir si el intervalo pertenece al dominio de la función.",
        eu: "Kalkulatu aurretik erabaki behar da tartea funtzioaren domeinuan dagoen."
      },
      next: {
        es: "Prueba un intervalo que no cruce x = 1 y compara la lectura.",
        eu: "Probatu x = 1 zeharkatzen ez duen tarte bat eta konparatu irakurketa."
      }
    }
  ],
  raiz: [
    {
      question: {
        es: "En x = -2, ¿qué afirmación es la más precisa?",
        eu: "x = -2 puntuan, zein baieztapen da zehatzena?"
      },
      options: [
        { es: "La función no existe.", eu: "Funtzioa ez da existitzen." },
        { es: "La función existe, pero no hay derivada finita en el extremo.", eu: "Funtzioa existitzen da, baina muturrean ez dago deribatu finiturik." },
        { es: "La función tiene un máximo local.", eu: "Funtzioak maximo lokala du." }
      ],
      answer: 1,
      hint: {
        es: "Distingue valor de la función y derivabilidad.",
        eu: "Bereizi funtzioaren balioa eta deribagarritasuna."
      },
      correct: {
        es: "Bien: f(-2) existe, pero la lectura de la pendiente se vuelve no finita.",
        eu: "Ondo: f(-2) existitzen da, baina maldaren irakurketa ez da finitua."
      },
      wrong: {
        es: "El punto pertenece al dominio; lo delicado es la derivada en el extremo.",
        eu: "Puntua domeinukoa da; kontu delikatua muturreko deribatua da."
      },
      next: {
        es: "Mueve x cerca de -2 por la derecha y observa f'.",
        eu: "Mugitu x -2ren eskuinetik gertu eta behatu f'."
      }
    }
  ],
  logaritmica: [
    {
      question: {
        es: "¿De dónde sale el dominio x > -2?",
        eu: "Nondik dator x > -2 domeinua?"
      },
      options: [
        { es: "Del argumento del logaritmo: x + 2 debe ser positivo.", eu: "Logaritmoaren argumentutik: x + 2 positiboa izan behar da." },
        { es: "De que f'(x) sea positiva.", eu: "f'(x) positiboa izatetik." },
        { es: "De que la gráfica corte al eje x.", eu: "Grafikoak x ardatza moztetik." }
      ],
      answer: 0,
      hint: {
        es: "Antes de derivar, pregunta dónde existe el logaritmo.",
        eu: "Deribatu aurretik, galdetu non existitzen den logaritmoa."
      },
      correct: {
        es: "Exacto: el argumento del logaritmo debe ser mayor que cero.",
        eu: "Hori da: logaritmoaren argumentuak zero baino handiagoa izan behar du."
      },
      wrong: {
        es: "El dominio no sale de la derivada ni del corte, sino de la condición del logaritmo.",
        eu: "Domeinua ez dator deribatutik ez ebakiduratik, logaritmoaren baldintzatik baizik."
      },
      next: {
        es: "Relaciona ahora x = -2 con la asíntota vertical.",
        eu: "Lotu orain x = -2 asintota bertikalarekin."
      }
    }
  ],
  absoluta: [
    {
      question: {
        es: "¿Por qué puede haber mínimo en x = 1 aunque f'(1) no exista?",
        eu: "Zergatik egon daiteke minimoa x = 1 puntuan f'(1) existitzen ez bada ere?"
      },
      options: [
        { es: "Porque la función decrece antes y crece después.", eu: "Funtzioa lehen beherakorra eta ondoren hazkorra delako." },
        { es: "Porque f''(1) es positiva.", eu: "f''(1) positiboa delako." },
        { es: "Porque toda función con valor absoluto tiene máximo.", eu: "Balio absolutua duen funtzio orok maximoa duelako." }
      ],
      answer: 0,
      hint: {
        es: "Compara las pendientes laterales y la monotonía a ambos lados.",
        eu: "Konparatu alboetako maldak eta monotonia bi aldeetan."
      },
      correct: {
        es: "Bien: un mínimo no siempre exige f'(x) = 0; puede aparecer en un punto no derivable.",
        eu: "Ondo: minimo batek ez du beti f'(x) = 0 eskatzen; puntu ez-deribagarri batean ager daiteke."
      },
      wrong: {
        es: "Aquí la clave no es f'', sino el cambio de decrecer a crecer en una esquina.",
        eu: "Hemen gakoa ez da f'', baizik eta izkin batean beherakortik hazkorrera pasatzea."
      },
      next: {
        es: "Activa los puntos clave y observa la esquina en x = 1.",
        eu: "Aktibatu puntu gakoak eta behatu x = 1eko izkina."
      }
    }
  ]
};

const guidedSteps = [
  {
    id: "predict",
    title: { es: "Predigo", eu: "Aurreikusten dut" },
    prompt: {
      es: "Antes de usar la gráfica como prueba, escribe qué esperas que ocurra con el dominio, los puntos problemáticos y el comportamiento de la función.",
      eu: "Grafikoa froga gisa erabili aurretik, idatzi zer espero duzun domeinuaz, puntu problematikoez eta funtzioaren portaeraz."
    },
    support: [
      { es: "Empieza por el dominio: ¿hay denominadores, raíces, logaritmos o tramos?", eu: "Hasi domeinutik: izendatzailerik, errorik, logaritmorik edo zatirik ba al dago?" },
      { es: "Haz una conjetura: crecimiento, extremos, asíntotas, curvatura o no derivabilidad.", eu: "Egin aieru bat: hazkundea, muturrak, asintotak, kurbadura edo ez-deribagarritasuna." }
    ],
    checks: [
      { es: "He escrito el dominio antes de interpretar la gráfica.", eu: "Domeinua idatzi dut grafikoa interpretatu aurretik." },
      { es: "He señalado al menos un punto o intervalo importante.", eu: "Gutxienez puntu edo tarte garrantzitsu bat adierazi dut." },
      { es: "He formulado una predicción que se puede comprobar.", eu: "Egiazta daitekeen aurreikuspen bat egin dut." }
    ]
  },
  {
    id: "observe",
    title: { es: "Observo", eu: "Behatu egiten dut" },
    prompt: {
      es: "Activa las capas necesarias y contrasta tu predicción. No escribas solo lo que ves: nombra la evidencia matemática.",
      eu: "Aktibatu behar diren geruzak eta kontrastatu zure aurreikuspena. Ez idatzi bakarrik ikusten duzuna: izendatu ebidentzia matematikoa."
    },
    support: [
      { es: "Compara f con f': el signo de f' explica crecimiento o decrecimiento.", eu: "Konparatu f eta f': f'-ren zeinuak hazkundea edo beherakada azaltzen du." },
      { es: "Usa f'' solo para curvatura; no la confundas con crecimiento.", eu: "Erabili f'' kurbadurarako bakarrik; ez nahastu hazkundearekin." }
    ],
    checks: [
      { es: "He mirado la gráfica de f y una capa de apoyo.", eu: "f-ren grafikoa eta laguntza-geruza bat begiratu ditut." },
      { es: "He comprobado si mi predicción inicial se mantiene o debe corregirse.", eu: "Hasierako aurreikuspena mantentzen den edo zuzendu behar den egiaztatu dut." },
      { es: "He separado intervalos cuando el dominio se rompe.", eu: "Domeinua hausten denean tarteak bereizi ditut." }
    ]
  },
  {
    id: "answer",
    title: { es: "Respondo", eu: "Erantzuten dut" },
    prompt: {
      es: "Responde al cuestionario del caso. Antes de corregir, escribe por qué eliges esa opción y por qué descartas al menos otra.",
      eu: "Erantzun kasuaren galdetegiari. Zuzendu aurretik, idatzi zergatik aukeratu duzun aukera hori eta zergatik baztertu duzun gutxienez beste bat."
    },
    support: [
      { es: "La respuesta debe apoyarse en dominio, signo de derivada, curvatura o discontinuidad.", eu: "Erantzunak domeinuan, deribatuaren zeinuan, kurbaduran edo etengunean oinarritu behar du." },
      { es: "Si dudas, vuelve a la guía de análisis del caso.", eu: "Zalantza baduzu, itzuli kasuaren analisi-gidara." }
    ],
    checks: [
      { es: "He respondido el cuestionario adaptado.", eu: "Galdetegi egokitua erantzun dut." },
      { es: "He justificado mi opción antes de mirar la corrección.", eu: "Aukera justifikatu dut zuzenketa begiratu aurretik." },
      { es: "He descartado una opción con una razón matemática.", eu: "Aukera bat arrazoi matematiko batekin baztertu dut." }
    ]
  },
  {
    id: "correct",
    title: { es: "Corrijo", eu: "Zuzentzen dut" },
    prompt: {
      es: "Lee la retroalimentación. Si tu idea inicial era incompleta o falsa, escribe exactamente qué debes cambiar en tu razonamiento.",
      eu: "Irakurri feedbacka. Zure hasierako ideia osatugabea edo okerra bazen, idatzi zehazki zer aldatu behar duzun arrazoibidean."
    },
    support: [
      { es: "Nombra el error: dominio, f frente a f', curvatura, asíntota, integral o derivabilidad.", eu: "Izendatu akatsa: domeinua, f eta f', kurbadura, asintota, integrala edo deribagarritasuna." },
      { es: "Corregir no es cambiar la respuesta: es cambiar el motivo.", eu: "Zuzentzea ez da erantzuna aldatzea: arrazoia aldatzea da." }
    ],
    checks: [
      { es: "He leído la pista o la corrección.", eu: "Pista edo zuzenketa irakurri dut." },
      { es: "He identificado el tipo de error o la idea clave.", eu: "Akats mota edo ideia gakoa identifikatu dut." },
      { es: "He escrito una versión corregida de mi razonamiento.", eu: "Nire arrazoibidearen bertsio zuzendua idatzi dut." }
    ]
  },
  {
    id: "justify",
    title: { es: "Justifico", eu: "Justifikatzen dut" },
    prompt: {
      es: "Redacta una conclusión breve y rigurosa. Debe incluir dominio, comportamiento y una evidencia tomada de la herramienta.",
      eu: "Idatzi ondorio labur eta zorrotz bat. Domeinua, portaera eta tresnatik hartutako ebidentzia bat jaso behar ditu."
    },
    support: [
      { es: "Una buena frase usa conectores: porque, por tanto, sin embargo, en cada rama.", eu: "Esaldi on batek lokailuak erabiltzen ditu: delako, beraz, hala ere, adar bakoitzean." },
      { es: "Evita 'se ve que...' si no dices qué dato lo justifica.", eu: "Saihestu 'ikusten da...' esatea, justifikatzen duen datua aipatu gabe." }
    ],
    checks: [
      { es: "He mencionado el dominio o sus restricciones.", eu: "Domeinua edo bere murrizketak aipatu ditut." },
      { es: "He usado f' o f'' con significado, no solo como cálculo.", eu: "f' edo f'' esanahiarekin erabili dut, ez kalkulu huts gisa." },
      { es: "Mi conclusión se puede leer sin mirar la pantalla.", eu: "Nire ondorioa pantaila begiratu gabe uler daiteke." }
    ]
  },
  {
    id: "transfer",
    title: { es: "Transfiero", eu: "Transferitzen dut" },
    prompt: {
      es: "Cierra con una transferencia: plantea una función parecida, cambia una condición o escribe qué mirarías primero en un ejercicio nuevo.",
      eu: "Amaitzeko, transferentzia egin: proposatu antzeko funtzio bat, aldatu baldintza bat edo idatzi ariketa berri batean zer begiratuko zenukeen lehenik."
    },
    support: [
      { es: "La transferencia demuestra que no solo has reconocido este dibujo concreto.", eu: "Transferentziak erakusten du ez duzula marrazki zehatz hau bakarrik ezagutu." },
      { es: "Puedes proponer una pregunta espejo para otro compañero.", eu: "Beste ikaskide batentzat galdera ispilu bat proposa dezakezu." }
    ],
    checks: [
      { es: "He planteado una situación nueva pero relacionada.", eu: "Egoera berri baina lotu bat planteatu dut." },
      { es: "He explicado qué concepto se conserva.", eu: "Zein kontzeptu mantentzen den azaldu dut." },
      { es: "He escrito qué comprobaría primero.", eu: "Lehenik zer egiaztatuko nukeen idatzi dut." }
    ]
  }
];

function el(name, attrs = {}, text = "") {
  const node = document.createElementNS(svgNS, name);
  for (const [key, value] of Object.entries(attrs)) {
    node.setAttribute(key, value);
  }
  if (text) node.textContent = text;
  return node;
}

function html(id, value) {
  document.querySelector(id).innerHTML = value;
}

function text(id, value) {
  document.querySelector(id).textContent = value;
}

function tr(key) {
  return uiText[state.lang]?.[key] ?? uiText.es[key] ?? key;
}

function localized(value) {
  if (typeof value === "string") return value;
  return value?.[state.lang] ?? value?.es ?? "";
}

function caseField(item, key) {
  return caseText[item.id]?.[state.lang]?.[key] ?? item[key];
}

function caseList(item, key) {
  return caseText[item.id]?.[state.lang]?.[key] ?? item[key] ?? [];
}

function pointLabel(item, point, index) {
  return caseText[item.id]?.[state.lang]?.points?.[index] ?? point.label;
}

function setSolutionButtonText() {
  solutionToggle.textContent = solutionPanel.hidden ? tr("showSolution") : tr("hideSolution");
}

function renderStaticText() {
  document.documentElement.lang = state.lang;
  document.title = tr("appTitle");
  document.querySelectorAll("[data-i18n]").forEach(node => {
    node.textContent = tr(node.dataset.i18n);
  });
  text("#quizTitle", tr("quizTitle"));
  text("#quizIntro", tr("quizIntro"));
  text("#hintButton", tr("hint"));
  text("#checkAnswer", tr("check"));
  text("#nextQuestion", tr("next"));
  text("#restartQuiz", tr("restart"));
  text("#reflectionLabel", tr("reflectionLabel"));
  setSolutionButtonText();
}

function renderCaseOptions() {
  caseSelect.innerHTML = "";
  for (const item of cases) {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = caseField(item, "name");
    caseSelect.append(option);
  }
  caseSelect.value = state.caseId;
}

function currentCase() {
  return cases.find(item => item.id === state.caseId) || cases[0];
}

function finite(value) {
  return Number.isFinite(value) ? value : null;
}

function evaluate(fn, x) {
  try {
    return finite(fn(x));
  } catch {
    return null;
  }
}

function isInDomain(item, x) {
  return item.domain(x);
}

function formatNumber(value, digits = 3) {
  if (!Number.isFinite(value)) return tr("notExists");
  if (Math.abs(value) < 0.0005) return "0";
  if (Math.abs(value) >= 10000) return value.toExponential(2);
  return Number(value.toFixed(digits)).toLocaleString("es-ES", {
    maximumFractionDigits: digits
  });
}

function signedConstant(value) {
  if (!Number.isFinite(value)) return "";
  if (Math.abs(value) < 0.0005) return "";
  const sign = value < 0 ? "-" : "+";
  return `${sign} ${formatNumber(Math.abs(value))}`;
}

function tangentEquation(slope, x0, y0) {
  const pointTerm = x0 < 0
    ? `(x + ${formatNumber(Math.abs(x0))})`
    : `(x - ${formatNumber(x0)})`;
  const constant = signedConstant(y0);
  return `y = ${formatNumber(slope)}${pointTerm}${constant ? ` ${constant}` : ""}`;
}

function mapping(item) {
  const innerW = viewport.width - viewport.padLeft - viewport.padRight;
  const innerH = viewport.height - viewport.padTop - viewport.padBottom;
  return {
    toX: x => viewport.padLeft + ((x - item.xMin) / (item.xMax - item.xMin)) * innerW,
    toY: y => viewport.padTop + ((item.yMax - y) / (item.yMax - item.yMin)) * innerH,
    fromX: sx => item.xMin + ((sx - viewport.padLeft) / innerW) * (item.xMax - item.xMin)
  };
}

function niceStep(span, targetTicks = 8) {
  const raw = Math.abs(span) / targetTicks;
  const power = 10 ** Math.floor(Math.log10(raw || 1));
  const ratio = raw / power;
  if (ratio >= 5) return 5 * power;
  if (ratio >= 2) return 2 * power;
  return power;
}

function ticks(min, max, targetTicks = 8) {
  const step = niceStep(max - min, targetTicks);
  const start = Math.ceil(min / step) * step;
  const values = [];
  for (let value = start; value <= max + step * 0.2; value += step) {
    values.push(Number(value.toFixed(10)));
  }
  return values;
}

function crossesSingularity(item, x1, x2) {
  const singularities = item.singularities || [];
  return singularities.some(point => {
    if (point.type === "endpoint") return false;
    const min = Math.min(x1, x2);
    const max = Math.max(x1, x2);
    return point.x > min && point.x < max;
  });
}

function pathFor(item, fn, options = {}) {
  const map = mapping(item);
  const samples = options.samples || 900;
  const maxJump = (viewport.height - viewport.padTop - viewport.padBottom) * 1.2;
  let path = "";
  let previous = null;
  for (let i = 0; i <= samples; i += 1) {
    const x = item.xMin + ((item.xMax - item.xMin) * i) / samples;
    const y = evaluate(fn, x);
    const valid = y !== null && isInDomain(item, x) && Math.abs(y) < 1e5;
    if (!valid) {
      previous = null;
      continue;
    }
    const sx = map.toX(x);
    const sy = map.toY(y);
    const jump = previous ? Math.abs(sy - previous.sy) : 0;
    const shouldMove = !previous || jump > maxJump || crossesSingularity(item, previous.x, x);
    path += `${shouldMove ? "M" : "L"} ${sx.toFixed(2)} ${sy.toFixed(2)} `;
    previous = { x, sx, sy };
  }
  return path.trim();
}

function drawGrid(item, root, map) {
  const plotW = viewport.width - viewport.padLeft - viewport.padRight;
  const plotH = viewport.height - viewport.padTop - viewport.padBottom;
  const grid = el("g", {});

  for (const x of ticks(item.xMin, item.xMax)) {
    const sx = map.toX(x);
    grid.append(
      el("line", {
        x1: sx,
        y1: viewport.padTop,
        x2: sx,
        y2: viewport.height - viewport.padBottom,
        class: "grid-line"
      }),
      el("text", {
        x: sx,
        y: viewport.height - 18,
        "text-anchor": "middle",
        class: "tick-label"
      }, formatNumber(x, 2))
    );
  }

  for (const y of ticks(item.yMin, item.yMax)) {
    const sy = map.toY(y);
    grid.append(
      el("line", {
        x1: viewport.padLeft,
        y1: sy,
        x2: viewport.width - viewport.padRight,
        y2: sy,
        class: "grid-line"
      }),
      el("text", {
        x: viewport.padLeft - 10,
        y: sy + 4,
        "text-anchor": "end",
        class: "tick-label"
      }, formatNumber(y, 2))
    );
  }

  const xAxisY = item.yMin <= 0 && item.yMax >= 0 ? map.toY(0) : viewport.height - viewport.padBottom;
  const yAxisX = item.xMin <= 0 && item.xMax >= 0 ? map.toX(0) : viewport.padLeft;

  grid.append(
    el("line", {
      x1: viewport.padLeft,
      y1: xAxisY,
      x2: viewport.width - viewport.padRight,
      y2: xAxisY,
      class: "axis"
    }),
    el("line", {
      x1: yAxisX,
      y1: viewport.padTop,
      x2: yAxisX,
      y2: viewport.height - viewport.padBottom,
      class: "axis"
    }),
    el("rect", {
      x: viewport.padLeft,
      y: viewport.padTop,
      width: plotW,
      height: plotH,
      fill: "none",
      stroke: "#b9c7cf",
      "stroke-width": 1
    })
  );

  root.append(grid);
}

function drawAsymptotes(item, root, map) {
  const asymptotes = item.asymptotes || [];
  for (const asymptote of asymptotes) {
    if (asymptote.type === "vertical") {
      const sx = map.toX(asymptote.value);
      root.append(
        el("line", {
          x1: sx,
          y1: viewport.padTop,
          x2: sx,
          y2: viewport.height - viewport.padBottom,
          class: "asymptote"
        }),
        el("text", {
          x: sx + 7,
          y: viewport.padTop + 18,
          class: "asymptote-label"
        }, asymptote.label)
      );
    }
    if (asymptote.type === "horizontal") {
      const sy = map.toY(asymptote.value);
      root.append(
        el("line", {
          x1: viewport.padLeft,
          y1: sy,
          x2: viewport.width - viewport.padRight,
          y2: sy,
          class: "asymptote"
        }),
        el("text", {
          x: viewport.width - viewport.padRight - 48,
          y: sy - 7,
          class: "asymptote-label"
        }, asymptote.label)
      );
    }
  }
}

function drawCurves(item, root) {
  const clipGroup = el("g", { "clip-path": "url(#plotClip)" });
  if (controls.showArea.checked) {
    for (const polygon of areaPolygons(item)) {
      clipGroup.append(el("path", { d: polygon, class: "area-fill" }));
    }
  }
  if (controls.showF.checked) {
    clipGroup.append(el("path", { d: pathFor(item, item.f), class: "curve-f" }));
  }
  if (controls.showD1.checked) {
    clipGroup.append(el("path", { d: pathFor(item, item.d1), class: "curve-d1" }));
  }
  if (controls.showD2.checked) {
    clipGroup.append(el("path", { d: pathFor(item, item.d2), class: "curve-d2" }));
  }
  if (controls.showTangent.checked) {
    const tangent = tangentPath(item, state.x);
    if (tangent) {
      clipGroup.append(el("path", { d: tangent, class: "tangent-line" }));
    }
  }
  root.append(clipGroup);
}

function tangentPath(item, x0) {
  const y0 = evaluate(item.f, x0);
  const slope = evaluate(item.d1, x0);
  if (y0 === null || slope === null || !isInDomain(item, x0)) return "";
  const map = mapping(item);
  const x1 = item.xMin;
  const x2 = item.xMax;
  const y1 = y0 + slope * (x1 - x0);
  const y2 = y0 + slope * (x2 - x0);
  return `M ${map.toX(x1).toFixed(2)} ${map.toY(y1).toFixed(2)} L ${map.toX(x2).toFixed(2)} ${map.toY(y2).toFixed(2)}`;
}

function areaPolygons(item) {
  const map = mapping(item);
  const a = Math.min(state.a, state.b);
  const b = Math.max(state.a, state.b);
  const samples = 240;
  const dx = (b - a) / samples;
  const polygons = [];
  let segment = [];
  let lastX = null;

  for (let i = 0; i <= samples; i += 1) {
    const x = a + i * dx;
    const y = evaluate(item.f, x);
    const valid = y !== null && isInDomain(item, x) && !crossesSingularity(item, lastX ?? x, x);
    if (!valid) {
      if (segment.length > 1) polygons.push(closeAreaPath(segment, map));
      segment = [];
      lastX = x;
      continue;
    }
    segment.push({ x, y });
    lastX = x;
  }
  if (segment.length > 1) polygons.push(closeAreaPath(segment, map));
  return polygons.filter(Boolean);
}

function closeAreaPath(segment, map) {
  const first = segment[0];
  const last = segment[segment.length - 1];
  let path = `M ${map.toX(first.x).toFixed(2)} ${map.toY(0).toFixed(2)} `;
  for (const point of segment) {
    path += `L ${map.toX(point.x).toFixed(2)} ${map.toY(point.y).toFixed(2)} `;
  }
  path += `L ${map.toX(last.x).toFixed(2)} ${map.toY(0).toFixed(2)} Z`;
  return path;
}

function drawPoints(item, root, map) {
  if (!controls.showPoints.checked) return;
  const points = item.points || [];
  points.forEach((point, index) => {
    const y = evaluate(item.f, point.x);
    if (y === null) return;
    const sx = map.toX(point.x);
    const sy = map.toY(y);
    root.append(
      el("circle", { cx: sx, cy: sy, r: 5, class: "point-marker" }),
      el("text", { x: sx + 8, y: sy - 8, class: "point-label" }, pointLabel(item, point, index))
    );
  });
}

function drawActivePoint(item, root, map) {
  const y = evaluate(item.f, state.x);
  if (y === null || !isInDomain(item, state.x)) return;
  root.append(
    el("circle", { cx: map.toX(state.x), cy: map.toY(y), r: 6, class: "active-point" })
  );
}

function renderPlot() {
  const item = currentCase();
  const map = mapping(item);
  plot.setAttribute("viewBox", `0 0 ${viewport.width} ${viewport.height}`);
  plot.innerHTML = "";
  const defs = el("defs");
  defs.append(
    el("clipPath", { id: "plotClip" })
  );
  defs.querySelector("clipPath").append(
    el("rect", {
      x: viewport.padLeft,
      y: viewport.padTop,
      width: viewport.width - viewport.padLeft - viewport.padRight,
      height: viewport.height - viewport.padTop - viewport.padBottom
    })
  );
  plot.append(defs);
  drawGrid(item, plot, map);
  drawAsymptotes(item, plot, map);
  drawCurves(item, plot);
  drawPoints(item, plot, map);
  drawActivePoint(item, plot, map);
}

function integrate(item, a, b) {
  const left = Math.min(a, b);
  const right = Math.max(a, b);
  const singularityInside = (item.singularities || []).some(point => {
    if (point.type === "endpoint" || point.type === "corner") return false;
    return point.x > left && point.x < right;
  });
  if (singularityInside) {
    return { valid: false, reason: tr("intervalDiscontinuity") };
  }

  const samples = 1000;
  const dx = (right - left) / samples;
  let signed = 0;
  let geometric = 0;
  for (let i = 0; i < samples; i += 1) {
    const x1 = left + i * dx;
    const x2 = x1 + dx;
    const y1 = evaluate(item.f, x1);
    const y2 = evaluate(item.f, x2);
    if (y1 === null || y2 === null || !isInDomain(item, x1) || !isInDomain(item, x2)) {
      return { valid: false, reason: tr("intervalOutsideDomain") };
    }
    signed += ((y1 + y2) / 2) * dx;
    geometric += ((Math.abs(y1) + Math.abs(y2)) / 2) * dx;
  }
  return { valid: true, signed, geometric };
}

function interpretation(item, x) {
  const y = evaluate(item.f, x);
  const d1 = evaluate(item.d1, x);
  const d2 = evaluate(item.d2, x);
  if (y === null || !isInDomain(item, x)) {
    return state.lang === "eu"
      ? "Aukeratutako puntua ez dago domeinuan. Hazkundea, ukitzailea edo azalera interpretatu aurretik, irakurketa lokala zuzendu behar da."
      : "El punto elegido no pertenece al dominio. Antes de interpretar crecimiento, tangente o área, hay que corregir la lectura local.";
  }

  const growth = d1 === null
    ? { es: "no hay derivada finita en este punto", eu: "puntu honetan ez dago deribatu finiturik" }
    : Math.abs(d1) < 0.005
      ? { es: "la tangente es horizontal o casi horizontal", eu: "ukitzailea horizontala edo ia horizontala da" }
      : d1 > 0
        ? { es: "la función crece localmente", eu: "funtzioa lokalki hazten da" }
        : { es: "la función decrece localmente", eu: "funtzioa lokalki beheratzen da" };

  const curvature = d2 === null
    ? { es: "la segunda derivada no está definida aquí", eu: "bigarren deribatua ez dago hemen definituta" }
    : Math.abs(d2) < 0.005
      ? { es: "la curvatura es casi nula en esta lectura", eu: "kurbadura ia nulua da irakurketa honetan" }
      : d2 > 0
        ? { es: "la curvatura es cóncava hacia arriba", eu: "kurbadura ahurra gorantz da" }
        : { es: "la curvatura es cóncava hacia abajo", eu: "kurbadura ahurra beherantz da" };

  if (state.lang === "eu") {
    return `x = ${formatNumber(x, 2)} puntuan, ${growth.eu}; gainera, ${curvature.eu}.`;
  }
  return `En x = ${formatNumber(x, 2)}, ${growth.es}; además, ${curvature.es}.`;
}

function dynamicReport(item) {
  const x = state.x;
  const y = evaluate(item.f, x);
  const d1 = evaluate(item.d1, x);
  const d2 = evaluate(item.d2, x);
  if (y === null || !isInDomain(item, x)) {
    return tr("noLocalReport");
  }
  const tangent = d1 === null
    ? tr("noFiniteDerivative")
    : state.lang === "eu"
      ? `Puntu horretako ukitzailea honela idatz daiteke: ${tangentEquation(d1, x, y)}.`
      : `La recta tangente en ese punto puede escribirse como ${tangentEquation(d1, x, y)}.`;
  const second = d2 === null
    ? tr("noSecondDerivative")
    : state.lang === "eu"
      ? `f''(x) = ${formatNumber(d2)} balioak behatutako kurbadura kontrastatzen laguntzen du.`
      : `El valor f''(x) = ${formatNumber(d2)} ayuda a contrastar la curvatura observada.`;
  if (state.lang === "eu") {
    return `f(${formatNumber(x)}) = ${formatNumber(y)} eta f'(${formatNumber(x)}) = ${formatNumber(d1)}. ${tangent} ${second}`;
  }
  return `f(${formatNumber(x)}) = ${formatNumber(y)} y f'(${formatNumber(x)}) = ${formatNumber(d1)}. ${tangent} ${second}`;
}

function renderLocalTable(item) {
  const tbody = document.querySelector("#localTable");
  tbody.innerHTML = "";
  const step = Math.max((item.xMax - item.xMin) / 24, 0.25);
  const values = [state.x - step, state.x, state.x + step];
  for (const x of values) {
    const y = evaluate(item.f, x);
    const tr = document.createElement("tr");
    const xCell = document.createElement("td");
    const yCell = document.createElement("td");
    xCell.textContent = formatNumber(x, 2);
    yCell.textContent = y === null || !isInDomain(item, x) ? tr("outsideDomain") : formatNumber(y);
    tr.append(xCell, yCell);
    tbody.append(tr);
  }
}

function renderAnalysis() {
  const item = currentCase();
  const f = evaluate(item.f, state.x);
  const d1 = evaluate(item.d1, state.x);
  const d2 = evaluate(item.d2, state.x);

  text("#valueF", f === null || !isInDomain(item, state.x) ? tr("notExists") : formatNumber(f));
  text("#valueD1", d1 === null || !isInDomain(item, state.x) ? tr("notExists") : formatNumber(d1));
  text("#valueD2", d2 === null || !isInDomain(item, state.x) ? tr("notExists") : formatNumber(d2));
  text("#localInterpretation", interpretation(item, state.x));
  text("#dynamicReport", dynamicReport(item));

  const integral = integrate(item, state.a, state.b);
  if (integral.valid) {
    const diff = Math.abs(integral.signed - integral.geometric);
    const note = diff > 0.05 ? tr("signedAreaDiff") : tr("signedAreaSame");
    const left = formatNumber(Math.min(state.a, state.b), 2);
    const right = formatNumber(Math.max(state.a, state.b), 2);
    const signed = formatNumber(integral.signed);
    const geometric = formatNumber(integral.geometric);
    const report = state.lang === "eu"
      ? `[${left}, ${right}] tartean, integral netoa ≈ ${signed} eta azalera geometrikoa ≈ ${geometric}. ${note}`
      : `En [${left}, ${right}], integral neta ≈ ${signed} y área geométrica ≈ ${geometric}. ${note}`;
    text("#integralReport", report);
  } else {
    text("#integralReport", integral.reason);
  }

  renderLocalTable(item);
  const warning = f === null || !isInDomain(item, state.x)
    ? tr("domainWarning")
    : "";
  domainWarning.hidden = !warning;
  domainWarning.textContent = warning;
}

function renderGuide() {
  const item = currentCase();
  text("#caseName", caseField(item, "name"));
  text("#caseFocus", caseField(item, "focus"));
  text("#graphTitle", caseField(item, "name"));
  html("#formulaLine", `${item.formula}; ${caseField(item, "derivative")}; ${caseField(item, "secondDerivative")}`);
  text("#domainText", caseField(item, "domainText"));

  const taskList = document.querySelector("#taskList");
  taskList.innerHTML = "";
  for (const task of caseList(item, "tasks")) {
    const li = document.createElement("li");
    li.textContent = task;
    taskList.append(li);
  }

  const errorList = document.querySelector("#errorList");
  errorList.innerHTML = "";
  for (const error of caseList(item, "errors")) {
    const li = document.createElement("li");
    li.textContent = error;
    errorList.append(li);
  }

  const criteriaList = document.querySelector("#criteriaList");
  criteriaList.innerHTML = "";
  for (const criterion of tr("criteria")) {
    const li = document.createElement("li");
    li.textContent = criterion;
    criteriaList.append(li);
  }

  solutionPanel.innerHTML = caseList(item, "solution").map(line => `<p>${line}</p>`).join("");
}

function currentQuiz() {
  return quizzes[state.caseId] || [];
}

function currentQuestion() {
  const quiz = currentQuiz();
  return quiz[state.quizIndex] || quiz[0] || null;
}

function resetQuizState(clearReflection = true) {
  state.quizIndex = 0;
  state.selectedAnswer = null;
  state.quizFeedback = null;
  state.quizHintShown = false;
  if (clearReflection) reflectionText.value = "";
}

function renderQuizFeedback() {
  quizFeedback.className = "quiz-feedback";
  if (!state.quizFeedback) {
    quizFeedback.hidden = true;
    quizFeedback.innerHTML = "";
    return;
  }
  quizFeedback.hidden = false;
  quizFeedback.classList.add(state.quizFeedback.type);
  quizFeedback.innerHTML = state.quizFeedback.lines.map(line => `<p>${line}</p>`).join("");
}

function renderQuiz() {
  const quiz = currentQuiz();
  const question = currentQuestion();
  if (!question) {
    text("#quizProgress", "");
    text("#quizQuestion", "");
    quizOptions.innerHTML = "";
    renderQuizFeedback();
    return;
  }

  text("#quizTitle", tr("quizTitle"));
  text("#quizIntro", tr("quizIntro"));
  text("#quizProgress", `${tr("progress")} ${state.quizIndex + 1}/${quiz.length}`);
  text("#quizQuestion", localized(question.question));
  quizOptions.innerHTML = "";

  question.options.forEach((option, index) => {
    const label = document.createElement("label");
    label.className = "quiz-option";
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "quizOption";
    input.value = String(index);
    input.checked = state.selectedAnswer === index;
    const span = document.createElement("span");
    span.textContent = localized(option);
    label.append(input, span);
    quizOptions.append(label);
  });

  renderQuizFeedback();
}

function showQuizHint() {
  const question = currentQuestion();
  if (!question) return;
  state.quizHintShown = true;
  state.quizFeedback = {
    type: "hint",
    lines: [localized(question.hint)]
  };
  renderQuiz();
}

function checkQuizAnswer() {
  const question = currentQuestion();
  if (!question) return;
  if (state.selectedAnswer === null) {
    state.quizFeedback = {
      type: "hint",
      lines: [tr("chooseAnswer")]
    };
    renderQuiz();
    return;
  }

  const isCorrect = state.selectedAnswer === question.answer;
  const key = `${state.caseId}:${state.quizIndex}`;
  state.quizCorrect[key] = isCorrect;
  state.quizFeedback = {
    type: isCorrect ? "correct" : "wrong",
    lines: [
      isCorrect ? tr("correct") : tr("review"),
      isCorrect ? localized(question.correct) : localized(question.wrong),
      `${tr("thinkNow")} ${localized(question.next)}`
    ]
  };
  renderQuiz();
}

function nextQuizQuestion() {
  const quiz = currentQuiz();
  if (!quiz.length) return;
  state.quizIndex = (state.quizIndex + 1) % quiz.length;
  state.selectedAnswer = null;
  state.quizFeedback = null;
  state.quizHintShown = false;
  renderQuiz();
}

function guidedStorageKey() {
  return "laboratorioFunciones.guidedWork.v1";
}

function loadGuidedWork() {
  try {
    const saved = window.localStorage.getItem(guidedStorageKey());
    state.guidedWork = saved ? JSON.parse(saved) : {};
  } catch {
    state.guidedWork = {};
  }
}

function saveGuidedWork() {
  try {
    window.localStorage.setItem(guidedStorageKey(), JSON.stringify(state.guidedWork));
  } catch {
    // El guardado local es una ayuda; la herramienta sigue funcionando sin él.
  }
}

function currentGuidedData() {
  if (!state.guidedWork[state.caseId]) {
    state.guidedWork[state.caseId] = { answers: {}, checks: {} };
  }
  return state.guidedWork[state.caseId];
}

function currentGuidedStep() {
  return guidedSteps[state.guidedStep] || guidedSteps[0];
}

function guidedStepIsDone(step) {
  const data = currentGuidedData();
  const answer = data.answers[step.id]?.trim();
  const checks = data.checks[step.id] || [];
  return Boolean(answer) || checks.some(Boolean);
}

function stripHtml(value) {
  const withPowers = value.replace(/<sup>(.*?)<\/sup>/g, "^$1");
  const node = document.createElement("div");
  node.innerHTML = withPowers;
  return node.textContent || node.innerText || "";
}

function renderGuidedCycle() {
  const item = currentCase();
  const step = currentGuidedStep();
  const data = currentGuidedData();
  const answer = data.answers[step.id] || "";
  const checks = data.checks[step.id] || [];

  text("#guidedTitle", tr("guidedTitle"));
  text("#guidedIntro", tr("guidedIntro"));
  text("#guidedProgress", `${tr("guidedStep")} ${state.guidedStep + 1}/${guidedSteps.length}`);
  text("#guidedStepTag", `${tr("guidedStep")} ${state.guidedStep + 1}`);
  text("#guidedStepTitle", localized(step.title));
  text("#guidedStepPrompt", `${localized(step.prompt)} ${caseField(item, "name")}: ${caseField(item, "focus")}`);
  text("#guidedResponseLabel", tr("guidedResponseLabel"));
  text("#guidedChecklistTitle", tr("guidedChecklistTitle"));
  text("#guidedPrev", tr("guidedPrev"));
  text("#guidedNext", tr("guidedNext"));
  text("#guidedClearStep", tr("guidedClearStep"));
  text("#guidedBuildSummary", tr("guidedBuildSummary"));
  text("#guidedCopySummary", tr("guidedCopySummary"));
  text("#guidedSummaryTitle", tr("guidedSummaryTitle"));
  text("#guidedSummaryIntro", tr("guidedSummaryIntro"));
  guidedResponse.value = answer;

  const supportList = document.querySelector("#guidedSupportList");
  supportList.innerHTML = "";
  step.support.forEach(itemText => {
    const li = document.createElement("li");
    li.textContent = localized(itemText);
    supportList.append(li);
  });

  guidedStepsNav.innerHTML = "";
  guidedSteps.forEach((entry, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "guided-step-button";
    if (index === state.guidedStep) button.classList.add("active");
    if (guidedStepIsDone(entry)) button.classList.add("done");
    button.dataset.step = String(index);
    button.textContent = localized(entry.title);
    guidedStepsNav.append(button);
  });

  guidedChecklist.innerHTML = "";
  step.checks.forEach((check, index) => {
    const label = document.createElement("label");
    label.className = "guided-check";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.dataset.check = String(index);
    input.checked = Boolean(checks[index]);
    const span = document.createElement("span");
    span.textContent = localized(check);
    label.append(input, span);
    guidedChecklist.append(label);
  });

  if (state.guidedSummaryVisible) {
    guidedSummary.hidden = false;
    guidedSummaryText.value = buildGuidedSummary();
  } else {
    guidedSummary.hidden = true;
  }
}

function updateGuidedAnswer(value) {
  const data = currentGuidedData();
  const step = currentGuidedStep();
  data.answers[step.id] = value;
  saveGuidedWork();
  renderGuidedCycle();
}

function updateGuidedCheck(index, checked) {
  const data = currentGuidedData();
  const step = currentGuidedStep();
  if (!data.checks[step.id]) data.checks[step.id] = [];
  data.checks[step.id][index] = checked;
  saveGuidedWork();
  renderGuidedCycle();
}

function setGuidedStep(index) {
  state.guidedStep = clamp(index, 0, guidedSteps.length - 1);
  renderGuidedCycle();
}

function clearGuidedStep() {
  const data = currentGuidedData();
  const step = currentGuidedStep();
  data.answers[step.id] = "";
  data.checks[step.id] = [];
  state.guidedSummaryVisible = false;
  saveGuidedWork();
  renderGuidedCycle();
}

function quizStatusForSummary() {
  const caseKeys = Object.keys(state.quizCorrect).filter(key => key.startsWith(`${state.caseId}:`));
  if (!caseKeys.length) return tr("guidedQuizNoData");
  const latestKey = caseKeys[caseKeys.length - 1];
  return state.quizCorrect[latestKey] ? tr("guidedQuizCorrect") : tr("guidedQuizWrong");
}

function buildGuidedSummary() {
  const item = currentCase();
  const data = currentGuidedData();
  const lines = [
    `${tr("guidedSummaryTitle")}`,
    `${tr("guidedReportCase")}: ${caseField(item, "name")}`,
    `${tr("guidedReportFormula")}: ${stripHtml(item.formula)}`,
    `${tr("guidedQuizStatus")}: ${quizStatusForSummary()}`,
    ""
  ];

  guidedSteps.forEach((step, index) => {
    const answer = data.answers[step.id]?.trim() || tr("guidedEmpty");
    const checked = (data.checks[step.id] || [])
      .map((isChecked, checkIndex) => isChecked ? localized(step.checks[checkIndex]) : null)
      .filter(Boolean);
    lines.push(`${index + 1}. ${localized(step.title)}`);
    lines.push(answer);
    if (checked.length) {
      lines.push(`${tr("guidedChecklistDone")}: ${checked.join(" | ")}`);
    }
    lines.push("");
  });

  return lines.join("\n");
}

async function copyGuidedSummary() {
  state.guidedSummaryVisible = true;
  guidedSummary.hidden = false;
  guidedSummaryText.value = buildGuidedSummary();
  try {
    await navigator.clipboard.writeText(guidedSummaryText.value);
    text("#guidedCopySummary", tr("guidedCopied"));
    setTimeout(() => text("#guidedCopySummary", tr("guidedCopySummary")), 1200);
  } catch {
    guidedSummaryText.focus();
    guidedSummaryText.select();
  }
}

function syncControlsFromCase() {
  const item = currentCase();
  xPoint.min = item.xMin;
  xPoint.max = item.xMax;
  xPoint.value = state.x;
  xPointNumber.min = item.xMin;
  xPointNumber.max = item.xMax;
  xPointNumber.value = state.x;
  intervalA.min = item.xMin;
  intervalA.max = item.xMax;
  intervalB.min = item.xMin;
  intervalB.max = item.xMax;
  intervalA.value = state.a;
  intervalB.value = state.b;
  text("#xPointLabel", formatNumber(state.x, 2));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function setX(value) {
  const item = currentCase();
  state.x = clamp(Number(value), item.xMin, item.xMax);
  syncControlsFromCase();
  render();
}

function setInterval() {
  const item = currentCase();
  state.a = clamp(Number(intervalA.value), item.xMin, item.xMax);
  state.b = clamp(Number(intervalB.value), item.xMin, item.xMax);
  intervalA.value = state.a;
  intervalB.value = state.b;
  render();
}

function resetCurrentCase() {
  const item = currentCase();
  state.x = item.defaultX;
  state.a = item.defaultA;
  state.b = item.defaultB;
  syncControlsFromCase();
  render();
}

function render() {
  renderStaticText();
  renderGuide();
  renderPlot();
  renderAnalysis();
  renderGuidedCycle();
  renderQuiz();
}

function init() {
  loadGuidedWork();
  languageSelect.value = state.lang;
  renderCaseOptions();
  caseSelect.value = state.caseId;
  syncControlsFromCase();
  render();
}

caseSelect.addEventListener("change", event => {
  const item = cases.find(entry => entry.id === event.target.value);
  state.caseId = item.id;
  state.x = item.defaultX;
  state.a = item.defaultA;
  state.b = item.defaultB;
  solutionPanel.hidden = true;
  resetQuizState();
  state.guidedStep = 0;
  state.guidedSummaryVisible = false;
  setSolutionButtonText();
  syncControlsFromCase();
  render();
});

languageSelect.addEventListener("change", event => {
  state.lang = event.target.value;
  renderCaseOptions();
  render();
});

xPoint.addEventListener("input", event => setX(event.target.value));
xPointNumber.addEventListener("change", event => setX(event.target.value));
intervalA.addEventListener("change", setInterval);
intervalB.addEventListener("change", setInterval);
document.querySelector("#resetCase").addEventListener("click", resetCurrentCase);

for (const input of Object.values(controls)) {
  input.addEventListener("change", render);
}

solutionToggle.addEventListener("click", () => {
  solutionPanel.hidden = !solutionPanel.hidden;
  setSolutionButtonText();
});

quizOptions.addEventListener("change", event => {
  state.selectedAnswer = Number(event.target.value);
  state.quizFeedback = null;
  renderQuiz();
});

document.querySelector("#hintButton").addEventListener("click", showQuizHint);
document.querySelector("#checkAnswer").addEventListener("click", checkQuizAnswer);
document.querySelector("#nextQuestion").addEventListener("click", nextQuizQuestion);
document.querySelector("#restartQuiz").addEventListener("click", () => {
  resetQuizState();
  renderQuiz();
});

guidedStepsNav.addEventListener("click", event => {
  const button = event.target.closest("[data-step]");
  if (!button) return;
  setGuidedStep(Number(button.dataset.step));
});

guidedResponse.addEventListener("input", event => {
  updateGuidedAnswer(event.target.value);
});

guidedChecklist.addEventListener("change", event => {
  if (!event.target.matches("[data-check]")) return;
  updateGuidedCheck(Number(event.target.dataset.check), event.target.checked);
});

document.querySelector("#guidedPrev").addEventListener("click", () => {
  setGuidedStep(state.guidedStep - 1);
});

document.querySelector("#guidedNext").addEventListener("click", () => {
  setGuidedStep(state.guidedStep + 1);
});

document.querySelector("#guidedClearStep").addEventListener("click", clearGuidedStep);
document.querySelector("#guidedBuildSummary").addEventListener("click", () => {
  state.guidedSummaryVisible = true;
  renderGuidedCycle();
});
document.querySelector("#guidedCopySummary").addEventListener("click", copyGuidedSummary);

plot.addEventListener("click", event => {
  const item = currentCase();
  const rect = plot.getBoundingClientRect();
  const sx = ((event.clientX - rect.left) / rect.width) * viewport.width;
  if (sx < viewport.padLeft || sx > viewport.width - viewport.padRight) return;
  const x = mapping(item).fromX(sx);
  setX(x);
});

init();
