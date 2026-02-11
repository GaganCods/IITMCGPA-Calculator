import { Subject, CGPAData, DegreeProgram, ScoreComponents, CourseFormula } from './types';
import { GRADING_SYSTEMS } from './constants';

export const getGradePoints = (grade: string, program: DegreeProgram): number => {
  const system = GRADING_SYSTEMS[program];
  const gradeDef = system.grades.find(g => g.grade === grade);
  return gradeDef ? gradeDef.points : 0;
};

export const shouldExcludeFromCGPA = (grade: string, program: DegreeProgram): boolean => {
  const system = GRADING_SYSTEMS[program];
  return system.excludeFromCGPA.includes(grade);
};

export const calculateCGPA = (subjects: Subject[], program: DegreeProgram): CGPAData => {
  let totalCredits = 0;
  let totalGradePoints = 0;
  let validSubjectCount = 0;

  subjects.forEach(subject => {
    // If the grade should be excluded (like 'P'), skip it for calculation
    if (!shouldExcludeFromCGPA(subject.grade, program)) {
      const points = getGradePoints(subject.grade, program);
      totalCredits += subject.credits;
      totalGradePoints += (points * subject.credits);
      validSubjectCount++;
    }
  });

  const cgpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;

  return {
    totalCredits,
    totalGradePoints,
    cgpa,
    subjectCount: validSubjectCount
  };
};

export const calculateCourseScore = (formula: CourseFormula, comps: ScoreComponents): number => {
  // Default values to 0 if undefined
  const q1 = comps.quiz1 || 0;
  const q2 = comps.quiz2 || 0;
  const q3 = comps.quiz3 || 0;
  const f = comps.final || 0;
  const op1 = comps.oppe1 || 0;
  const op2 = comps.oppe2 || 0;
  const gaa = comps.gaa || 0;
  const bonus = comps.bonus || 0;
  const proj = comps.project || 0;
  const misc = comps.misc || 0;
  const viva = comps.viva || 0;
  
  // ES Specifics
  const grpa = comps.grpa || 0;
  const bpta = comps.bpta || 0;
  const vmt = comps.vmt || 0;
  const nppe = comps.nppe || 0;
  const lab_exp = comps.lab_exp || 0; // WE or Online Lab or Attendance in some cases
  const lab_exam = comps.lab_exam || 0; // ID or In-campus or Exp/Viva
  const design = comps.design || 0;

  let score = 0;

  switch (formula) {
    // --- FOUNDATION ---
    case 'python_foundation':
      // T = 0.15Qz1 + 0.4F + 0.25max(PE1, PE2) + 0.2min(PE1, PE2)
      score = (0.15 * q1) + (0.4 * f) + (0.25 * Math.max(op1, op2)) + (0.2 * Math.min(op1, op2));
      break;

    case 'standard_foundation':
      // T = max(0.6F + 0.3max(Qz1, Qz2), 0.45F + 0.25Qz1 + 0.3Qz2)
      score = Math.max(
        (0.6 * f) + (0.3 * Math.max(q1, q2)),
        (0.45 * f) + (0.25 * q1) + (0.3 * q2)
      );
      break;

    case 'stats_foundation':
      // T = Standard Formula + Bonus (capped at 5)
      const baseStats = Math.max(
        (0.6 * f) + (0.3 * Math.max(q1, q2)),
        (0.45 * f) + (0.25 * q1) + (0.3 * q2)
      );
      score = baseStats + Math.min(bonus, 5);
      break;

    case 'math2_foundation':
      // T = Standard Formula + Bonus (capped at 100 total)
      const baseMath2 = Math.max(
        (0.6 * f) + (0.3 * Math.max(q1, q2)),
        (0.45 * f) + (0.25 * q1) + (0.3 * q2)
      );
      score = Math.min(baseMath2 + bonus, 100);
      break;

    // --- ES FOUNDATION ---
    case 'es_c_prog':
      // T = 0.25Qz1 + 0.45F + max(0.15 OPPE1 + 0.15 OPPE2, 0.20 max(OPPE1,OPPE2))
      score = (0.25 * q1) + (0.45 * f) + Math.max(
          (0.15 * op1) + (0.15 * op2),
          (0.20 * Math.max(op1, op2))
      );
      break;
    
    case 'es_linux':
      // T = 0.25 Qz1 + 0.25 OPE + 0.35 F + 0.05 BPTA + 0.05 VMT + 0.05 NPPE
      score = (0.25 * q1) + (0.25 * op1) + (0.35 * f) + (0.05 * bpta) + (0.05 * vmt) + (0.05 * nppe);
      break;

    case 'es_embedded_c':
      // T = 0.1 GRPA + max ((0.5F + 0.3max(Qz1, Qz2)), (0.4F + 0.25Qz1 + 0.25Qz2))
      score = (0.1 * grpa) + Math.max(
          (0.5 * f) + (0.3 * Math.max(q1, q2)),
          (0.4 * f) + (0.25 * q1) + (0.25 * q2)
      );
      break;

    case 'es_lab_50_50':
        // T = 0.5 A + 0.5 B
        score = (0.5 * lab_exp) + (0.5 * lab_exam);
        break;
    
    case 'es_lab_40_60':
        // T = 0.4 A + 0.6 B
        score = (0.4 * lab_exp) + (0.6 * lab_exam);
        break;

    case 'es_lab_20_80':
        // T = 0.2 A + 0.8 B
        score = (0.2 * lab_exp) + (0.8 * lab_exam);
        break;

    // --- DIPLOMA ---
    case 'diploma_mlf_mlt':
      // T = 0.05 GAA + max (0.6F + 0.25max(Qz1, Qz2), 0.4F + 0.25Qz1 + 0.3Qz2)
      score = (0.05 * gaa) + Math.max(
        (0.6 * f) + (0.25 * Math.max(q1, q2)),
        (0.4 * f) + (0.25 * q1) + (0.3 * q2)
      );
      break;

    case 'diploma_mlp':
      // T = 0.1 GAA + 0.30 F + 0.20 OPPE1 + 0.20 OPPE2 + 0.20 KA(misc)
      score = (0.1 * gaa) + (0.3 * f) + (0.2 * op1) + (0.2 * op2) + (0.2 * misc);
      break;

    case 'diploma_bdm':
      // T = GA + Qz1 + Qz2 + F
      score = gaa + q1 + q2 + f;
      break;

    case 'diploma_ba':
      // T = Qz + A + F. Qz = 0.7*Max(Qz1, Qz2) + 0.3*Min(Qz1, Qz2)
      const qz_ba = (0.7 * Math.max(q1, q2)) + (0.3 * Math.min(q1, q2)); 
      score = qz_ba + gaa + f;
      break;

    case 'diploma_tds':
      // T = 0.2 GAA + 0.2 ROE(misc) + 0.2 P1(op1) + 0.2 P2(op2) + 0.2 F
      score = (0.2 * gaa) + (0.2 * misc) + (0.2 * op1) + (0.2 * op2) + (0.2 * f);
      break;

    case 'diploma_pdsa_dbms_java':
      // T = 0.05GAA + 0.2OP + 0.45F + max (0.2max(Qz1, Qz2), (0.10Qz1+0.20Qz2 ))
      const op_max = Math.max(op1, op2);
      const q_comp = Math.max(0.2 * Math.max(q1, q2), (0.1 * q1) + (0.2 * q2));
      score = (0.05 * gaa) + (0.2 * op_max) + (0.45 * f) + q_comp;
      break;

    case 'diploma_appdev1_2':
      // T = 0.05 GLA(gaa) + max (0.6F + 0.25max(Qz1, Qz2), 0.4F + 0.25Qz1 + 0.3Qz2)
      score = (0.05 * gaa) + Math.max(
        (0.6 * f) + (0.25 * Math.max(q1, q2)),
        (0.4 * f) + (0.25 * q1) + (0.3 * q2)
      );
      break;

    case 'diploma_sys_cmd':
       // T = 0.05 GAA + 0.25 Qz1 + 0.3 OPPE(op1) + 0.3F + 0.1 BPTA(misc)
       score = (0.05 * gaa) + (0.25 * q1) + (0.3 * op1) + (0.3 * f) + (0.1 * misc);
       break;

    case 'diploma_dl_genai':
       // T = 0.1 GAA + 0.2 Qz1 + 0.2 Qz2 + 0.25 F + 0.1 NPPE1(op1) + 0.15 NPPE2(op2)
       score = (0.1 * gaa) + (0.2 * q1) + (0.2 * q2) + (0.25 * f) + (0.1 * op1) + (0.15 * op2);
       break;

    // --- ES DIPLOMA ---
    case 'es_signals':
       // T = 0.05GAA + max (0.5F + 0.25max(Qz1, Qz2), 0.45F + 0.2Qz1 + 0.2Qz2) + 0.1 GrPA
       score = (0.05 * gaa) + (0.1 * grpa) + Math.max(
           (0.5 * f) + (0.25 * Math.max(q1, q2)),
           (0.45 * f) + (0.2 * q1) + (0.2 * q2)
       );
       break;

    case 'es_python':
       // T = 0.05 GAA (Obj) + 0.05 GAA (Prog) + 0.15Qz1+ 0.45F+ 0.25 max(PE1, PE2) + 0.15 min(PE1, PE2)
       // gaa input is 100, we treat it as sum of both or avg? Doc says gaa1 + gaa2. 
       // Simplification: 0.1 * gaa total.
       score = (0.1 * gaa) + (0.15 * q1) + (0.45 * f) + (0.25 * Math.max(op1, op2)) + (0.15 * Math.min(op1, op2));
       break;

    case 'es_analog_sensors':
       // T = 0.05GAA + max(0.6F + 0.25 max(Qz1, Qz2), 0.4F +0.25Qz1 + 0.3Qz2)
       // Also used for Digital System Design, Comp Org, Testing (some variations in max, using most common)
       // DSD: max(0.6F + 0.25max(Qz1,Qz2), 0.5F + 0.2Qz1 + 0.25Qz2) - wait, doc says "0.5F, 0.2Qz1+0.25Qz2".
       // Let's stick to the generic one found in Analog/Sensors which covers most.
       score = (0.05 * gaa) + Math.max(
           (0.6 * f) + (0.25 * Math.max(q1, q2)),
           (0.4 * f) + (0.25 * q1) + (0.3 * q2)
       );
       break;

    case 'es_dsp':
       // T=0.05GAA + 0.1LE + 0.05OLEx + max(0.55F + 0.15max(Qz1, Qz2), 0.5F + 0.15Qz1 + 0.15Qz2)
       score = (0.05 * gaa) + (0.1 * lab_exp) + (0.05 * lab_exam) + Math.max(
           (0.55 * f) + (0.15 * Math.max(q1, q2)),
           (0.5 * f) + (0.15 * q1) + (0.15 * q2)
       );
       break;

    // --- DEGREE ---
    case 'degree_standard_quiz_final':
      // T = 0.1GAA + 0.4F + 0.25Qz1 + 0.25Qz2
      score = (0.1 * gaa) + (0.4 * f) + (0.25 * q1) + (0.25 * q2);
      if (bonus) score += bonus; // AI Search has bonus
      break;

    case 'degree_soft_eng':
      // T = 0.05GAA + 0.2Qz2 + 0.4F+ 0.1GP1 + 0.1GP2 + 0.1PP + 0.05CP
      // GP1+GP2+PP mapped to 'project', CP mapped to 'misc'
      score = (0.05 * gaa) + (0.2 * q2) + (0.4 * f) + (0.3 * proj) + (0.05 * misc);
      break;
    
    case 'degree_deep_learning':
      // T = 0.05GAA + 0.25Qz1 + 0.25Qz2 + 0.45F + Bonus
      score = (0.05 * gaa) + (0.25 * q1) + (0.25 * q2) + (0.45 * f) + bonus;
      break;

    case 'degree_spg':
      // T = 0.15*GAA + 0.25*GP(proj) + 0.25*Qz2 + 0.35*F
      score = (0.15 * gaa) + (0.25 * proj) + (0.25 * q2) + (0.35 * f);
      break;

    case 'degree_big_data':
      // T = 0.1 GAA + 0.3 F + 0.2 OPPE1 + 0.4 OPPE2 + Bonus
      score = (0.1 * gaa) + (0.3 * f) + (0.2 * op1) + (0.4 * op2) + bonus;
      break;

    case 'degree_c_prog':
      // T = 0.10GAA + 0.20Qz1 + 0.20 OPPE1 + 0.20 OPPE2 + 0.30F
      score = (0.1 * gaa) + (0.2 * q1) + (0.2 * op1) + (0.2 * op2) + (0.3 * f);
      break;

    case 'degree_dl_cv':
      // T = 0.1GAA + 0.4F + 0.25Qz1 + 0.25Qz2
      score = (0.1 * gaa) + (0.4 * f) + (0.25 * q1) + (0.25 * q2);
      break;

    case 'degree_llm':
      // T = 0.05GAA + 0.35F + 0.3Qz1 + 0.3Qz2 + Bonus
      score = (0.05 * gaa) + (0.35 * f) + (0.3 * q1) + (0.3 * q2) + bonus;
      break;

    case 'degree_dl_practice':
      // T = 0.05 GA + 0.15 Quiz 1 + 0.15 Quiz 2 + 0.15 Quiz 3 + 0.25 *((NPPE1+NPPE2+NPPE3)/3) + 0.25 Viva
      score = (0.05 * gaa) + (0.15 * q1) + (0.15 * q2) + (0.15 * q3) + (0.25 * misc) + (0.25 * viva);
      break;

    case 'degree_industry_4':
      score = q1 + q2 + misc + gaa + f + proj;
      break;

    case 'degree_rl':
       score = (0.05 * gaa) + (0.25 * misc) + (0.2 * q1) + (0.2 * q2) + (0.3 * f) + bonus;
       break;

    case 'degree_corp_fin':
       score = (0.1 * gaa) + (0.4 * f) + (0.2 * q1) + (0.3 * q2);
       break;

    case 'degree_comp_net':
       score = (0.1 * gaa) + (0.3 * f) + (0.25 * q1) + (0.25 * q2) + (0.1 * misc);
       break;

    case 'degree_ds_ai_lab':
       score = (0.05 * gaa) + (0.25 * q2) + (0.4 * proj) + (0.3 * viva) + bonus;
       break;

    case 'degree_app_dev_lab':
       score = (0.2 * q2) + (0.3 * gaa) + (0.5 * viva);
       break;

    case 'degree_bio_algo':
       score = (0.075 * gaa) + (0.025 * misc) + (0.25 * q1) + (0.25 * q2) + (0.4 * f);
       break;

    case 'degree_market_research':
       score = (0.1 * gaa) + (0.2 * q1) + (0.2 * q2) + (0.25 * proj) + (0.25 * f);
       break;

    case 'degree_man_econ':
       score = (0.15 * gaa) + Math.max(
          (0.2 * q1) + (0.2 * q2) + (0.45 * f),
          (0.5 * f) + (0.25 * Math.max(q1, q2))
       );
       break;

    case 'degree_speech':
       score = (0.15 * gaa) + (0.15 * viva) + (0.3 * f) + (0.2 * q1) + (0.2 * q2);
       break;
    
    case 'degree_mlops':
       score = (0.2 * gaa) + (0.3 * f) + (0.25 * op1) + (0.25 * op2) + bonus;
       break;

    case 'degree_math_genai':
       score = (0.05 * gaa) + (0.35 * f) + (0.2 * q1) + (0.2 * q2) + (0.2 * op1);
       break;

    // --- ES DEGREE ---
    case 'es_control_eng':
        // T = 0.1GAA + 0.45F + 0.2Qz1 + 0.2Qz2+0.05 D
        score = (0.1 * gaa) + (0.45 * f) + (0.2 * q1) + (0.2 * q2) + (0.05 * design);
        break;

    case 'es_product_design':
        // T= 0.3*GAA+ 0.2*(Qz1+Qz2) + 0.3*F. (Inputs assumed 0-100)
        score = (0.3 * gaa) + (0.2 * q1) + (0.2 * q2) + (0.3 * f);
        break;

    case 'es_digital_ic':
        // T = 0.1GAA + max (0.6F + 0.2max(Qz1, Qz2),  0.4F + 0.2Qz1 + 0.3Qz2)
        score = (0.1 * gaa) + Math.max(
            (0.6 * f) + (0.2 * Math.max(q1, q2)),
            (0.4 * f) + (0.2 * q1) + (0.3 * q2)
        );
        break;
  }

  return Math.min(Math.max(score, 0), 100);
};

export const getGradeFromScore = (score: number): string => {
  // Standard Absolute Grading assumption for calculator
  if (score >= 90) return 'S';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  if (score >= 40) return 'E';
  return 'F';
};

// Local Storage Helpers
const STORAGE_KEY = 'namdapha_cgpa_data_v1';

export const saveToStorage = (subjects: Subject[], program: DegreeProgram) => {
  try {
    const data = {
      subjects,
      program,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage', error);
  }
};

export const loadFromStorage = (): { subjects: Subject[], program: DegreeProgram } | null => {
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    if (!item) return null;
    const parsed = JSON.parse(item);
    // basic validation
    if (parsed && Array.isArray(parsed.subjects)) {
        return { subjects: parsed.subjects, program: parsed.program || DegreeProgram.DATA_SCIENCE };
    }
    return null;
  } catch (error) {
    console.error('Failed to load from localStorage', error);
    return null;
  }
};