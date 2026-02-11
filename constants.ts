import { DegreeProgram, GradingSystem, CoursePreset, CourseLevel, InputConfig } from './types';

export const GRADING_SYSTEMS: Record<DegreeProgram, GradingSystem> = {
  [DegreeProgram.DATA_SCIENCE]: {
    grades: [
      { grade: 'S', points: 10, description: 'Outstanding' },
      { grade: 'A', points: 9, description: 'Excellent' },
      { grade: 'B', points: 8, description: 'Very Good' },
      { grade: 'C', points: 7, description: 'Good' },
      { grade: 'D', points: 6, description: 'Satisfactory' },
      { grade: 'E', points: 5, description: 'Pass' },
      { grade: 'F', points: 0, description: 'Fail' }, 
      { grade: 'P', points: 0, description: 'Pass (No Points)' }, 
    ],
    excludeFromCGPA: ['P', 'U', 'W', 'I']
  },
  [DegreeProgram.ELECTRONIC_SYSTEMS]: {
    grades: [
      { grade: 'S', points: 10, description: 'Outstanding' },
      { grade: 'A', points: 9, description: 'Excellent' },
      { grade: 'B', points: 8, description: 'Very Good' },
      { grade: 'C', points: 7, description: 'Good' },
      { grade: 'D', points: 6, description: 'Satisfactory' },
      { grade: 'E', points: 4, description: 'Pass' }, // Note: E is 4 in ES document
      { grade: 'F', points: 0, description: 'Fail' }, // U is fail, mapping F to U concept or 0
      { grade: 'U', points: 0, description: 'Fail' },
      { grade: 'P', points: 0, description: 'Pass (No Points)' },
    ],
    excludeFromCGPA: ['P', 'U', 'W', 'I', 'WA', 'WQ'] // U is 0 points in ES, so included? "T < 40 Fail U 0". Usually Fail counts.
    // Document says "To summarize, S,A,B,C,D,E - Pass grade; U- Fail grade".
    // If it acts like F, it should be calculated.
    // In DS, F is 0 and included. In ES, U is 0 and included.
    // We will treat U as 0 points. excludeFromCGPA should only have non-counting grades.
    // The previous exclusion list had U, but U usually drops average.
    // Let's assume U counts as 0.
  }
};

export const PROGRAM_INFO = {
  [DegreeProgram.DATA_SCIENCE]: {
    name: 'BS in Data Science',
    icon: 'Database',
  },
  [DegreeProgram.ELECTRONIC_SYSTEMS]: {
    name: 'BS in Electronic Systems',
    icon: 'Cpu',
  }
};

const STANDARD_INPUTS: InputConfig[] = [
  { key: 'quiz1', label: 'Quiz 1', max: 100 },
  { key: 'quiz2', label: 'Quiz 2', max: 100 },
  { key: 'final', label: 'End Term', max: 100 }
];

const DIPLOMA_STANDARD_INPUTS: InputConfig[] = [
  { key: 'gaa', label: 'GAA (Assignments)', max: 100 },
  { key: 'quiz1', label: 'Quiz 1', max: 100 },
  { key: 'quiz2', label: 'Quiz 2', max: 100 },
  { key: 'final', label: 'End Term', max: 100 }
];

export const ALL_COURSES: CoursePreset[] = [
  // --- DATA SCIENCE FOUNDATION ---
  { 
    id: 'math1', name: 'Mathematics for Data Science 1', credits: 4, level: CourseLevel.FOUNDATION, 
    formula: 'standard_foundation', inputs: STANDARD_INPUTS, programs: [DegreeProgram.DATA_SCIENCE] 
  },
  { 
    id: 'ct', name: 'Computational Thinking', credits: 4, level: CourseLevel.FOUNDATION, 
    formula: 'standard_foundation', inputs: STANDARD_INPUTS, programs: [DegreeProgram.DATA_SCIENCE] 
  },
  { 
    id: 'stats1', name: 'Statistics for Data Science 1', credits: 4, level: CourseLevel.FOUNDATION, 
    formula: 'stats_foundation', inputs: [...STANDARD_INPUTS, { key: 'bonus', label: 'Bonus (Max 5)', max: 5 }], programs: [DegreeProgram.DATA_SCIENCE] 
  },
  { 
    id: 'math2', name: 'Mathematics for Data Science 2', credits: 4, level: CourseLevel.FOUNDATION, 
    formula: 'math2_foundation', inputs: [...STANDARD_INPUTS, { key: 'bonus', label: 'Bonus (Max 6)', max: 6 }], programs: [DegreeProgram.DATA_SCIENCE] 
  },
  { 
    id: 'python_ds', name: 'Intro to Python Programming (DS)', credits: 4, level: CourseLevel.FOUNDATION, 
    formula: 'python_foundation', inputs: [
      { key: 'quiz1', label: 'Quiz 1', max: 100 },
      { key: 'final', label: 'End Term', max: 100 },
      { key: 'oppe1', label: 'OPPE 1', max: 100 },
      { key: 'oppe2', label: 'OPPE 2', max: 100 }
    ], programs: [DegreeProgram.DATA_SCIENCE]
  },
  { 
    id: 'stats2', name: 'Statistics for Data Science 2', credits: 4, level: CourseLevel.FOUNDATION, 
    formula: 'stats_foundation', inputs: [...STANDARD_INPUTS, { key: 'bonus', label: 'Bonus (Max 5)', max: 5 }], programs: [DegreeProgram.DATA_SCIENCE] 
  },

  // --- SHARED FOUNDATION ---
  { 
    id: 'eng1', name: 'English 1', credits: 4, level: CourseLevel.FOUNDATION, 
    formula: 'standard_foundation', inputs: STANDARD_INPUTS, programs: [DegreeProgram.DATA_SCIENCE, DegreeProgram.ELECTRONIC_SYSTEMS] 
  },
  { 
    id: 'eng2', name: 'English 2', credits: 4, level: CourseLevel.FOUNDATION, 
    formula: 'standard_foundation', inputs: STANDARD_INPUTS, programs: [DegreeProgram.DATA_SCIENCE, DegreeProgram.ELECTRONIC_SYSTEMS] 
  },

  // --- ELECTRONIC SYSTEMS FOUNDATION ---
  {
    id: 'es_math1', name: 'Math for Electronics I', credits: 4, level: CourseLevel.FOUNDATION,
    formula: 'standard_foundation', inputs: STANDARD_INPUTS, programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'es_estc', name: 'Electronic Systems Thinking (ESTC)', credits: 4, level: CourseLevel.FOUNDATION,
    formula: 'standard_foundation', inputs: STANDARD_INPUTS, programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'es_estc_lab', name: 'ESTC Lab', credits: 1, level: CourseLevel.FOUNDATION,
    formula: 'es_lab_50_50', inputs: [
        { key: 'lab_exp', label: 'Experiment', max: 100 },
        { key: 'lab_exam', label: 'Report/Att', max: 100 }
    ], programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'es_c_prog', name: 'Intro to C Programming', credits: 4, level: CourseLevel.FOUNDATION,
    formula: 'es_c_prog', inputs: [
        { key: 'quiz1', label: 'Quiz 1', max: 100 },
        { key: 'final', label: 'End Term', max: 100 },
        { key: 'oppe1', label: 'OPPE 1', max: 100 },
        { key: 'oppe2', label: 'OPPE 2', max: 100 }
    ], programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'es_c_lab', name: 'C Programming Lab', credits: 1, level: CourseLevel.FOUNDATION,
    formula: 'es_lab_50_50', inputs: [
        { key: 'lab_exp', label: 'Timed Lab (TLA)', max: 100 },
        { key: 'lab_exam', label: 'In-Campus (IL)', max: 100 }
    ], programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'es_linux', name: 'Intro to Linux Programming', credits: 4, level: CourseLevel.FOUNDATION,
    formula: 'es_linux', inputs: [
        { key: 'quiz1', label: 'Quiz 1', max: 100 },
        { key: 'final', label: 'End Term', max: 100 },
        { key: 'oppe1', label: 'OPPE', max: 100 },
        { key: 'bpta', label: 'BPTA', max: 100 },
        { key: 'vmt', label: 'VM Tasks', max: 100 },
        { key: 'nppe', label: 'NPPE', max: 100 }
    ], programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'es_linux_lab', name: 'Linux Shell Lab', credits: 1, level: CourseLevel.FOUNDATION,
    formula: 'es_lab_50_50', inputs: [
        { key: 'lab_exp', label: 'Online Lab', max: 100 },
        { key: 'lab_exam', label: 'In-Campus', max: 100 }
    ], programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'es_digital', name: 'Digital Systems', credits: 4, level: CourseLevel.FOUNDATION,
    formula: 'standard_foundation', inputs: STANDARD_INPUTS, programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'es_eec', name: 'Electrical & Electronic Circuits', credits: 4, level: CourseLevel.FOUNDATION,
    formula: 'standard_foundation', inputs: [...STANDARD_INPUTS, { key: 'bonus', label: 'Tut Bonus (3)', max: 3 }], programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'es_elec_lab', name: 'Electronics Lab', credits: 3, level: CourseLevel.FOUNDATION,
    formula: 'es_lab_40_60', inputs: [
        { key: 'lab_exp', label: 'Weekly Exp (WE)', max: 100 },
        { key: 'lab_exam', label: 'In-Person (ID)', max: 100 }
    ], programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'es_emb_c', name: 'Embedded C Programming', credits: 4, level: CourseLevel.FOUNDATION,
    formula: 'es_embedded_c', inputs: [
        { key: 'grpa', label: 'GrPA', max: 100 },
        { key: 'quiz1', label: 'Quiz 1', max: 100 },
        { key: 'quiz2', label: 'Quiz 2', max: 100 },
        { key: 'final', label: 'End Term', max: 100 }
    ], programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'es_emb_lab', name: 'Embedded C Lab', credits: 1, level: CourseLevel.FOUNDATION,
    formula: 'es_lab_20_80', inputs: [
        { key: 'lab_exp', label: 'Attendance', max: 100 },
        { key: 'lab_exam', label: 'Exp & Viva', max: 100 }
    ], programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },

  // --- DATA SCIENCE DIPLOMA ---
  {
    id: 'mlf', name: 'Machine Learning Foundations', credits: 4, level: CourseLevel.DIPLOMA,
    formula: 'diploma_mlf_mlt', inputs: DIPLOMA_STANDARD_INPUTS, programs: [DegreeProgram.DATA_SCIENCE, DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'mlt', name: 'Machine Learning Techniques', credits: 4, level: CourseLevel.DIPLOMA,
    formula: 'diploma_mlf_mlt', inputs: DIPLOMA_STANDARD_INPUTS, programs: [DegreeProgram.DATA_SCIENCE, DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'mlp', name: 'Machine Learning Practice', credits: 4, level: CourseLevel.DIPLOMA,
    formula: 'diploma_mlp', inputs: [
      { key: 'gaa', label: 'GAA', max: 100 },
      { key: 'final', label: 'End Term', max: 100 },
      { key: 'oppe1', label: 'OPPE 1', max: 100 },
      { key: 'oppe2', label: 'OPPE 2', max: 100 },
      { key: 'misc', label: 'Kaggle Avg', max: 100 }
    ], programs: [DegreeProgram.DATA_SCIENCE, DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'bdm', name: 'Business Data Management', credits: 4, level: CourseLevel.DIPLOMA,
    formula: 'diploma_bdm', inputs: [
      { key: 'gaa', label: 'Graded Assign (10)', max: 10 },
      { key: 'quiz1', label: 'Quiz 1 (20)', max: 20 },
      { key: 'quiz2', label: 'Quiz 2 (20)', max: 20 },
      { key: 'final', label: 'End Term (50)', max: 50 }
    ], programs: [DegreeProgram.DATA_SCIENCE, DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'ba', name: 'Business Analytics', credits: 4, level: CourseLevel.DIPLOMA,
    formula: 'diploma_ba', inputs: [
      { key: 'quiz1', label: 'Quiz 1', max: 100 },
      { key: 'quiz2', label: 'Quiz 2', max: 100 },
      { key: 'gaa', label: 'Assignments (20)', max: 20 },
      { key: 'final', label: 'End Term (40)', max: 40 }
    ], programs: [DegreeProgram.DATA_SCIENCE]
  },
  {
    id: 'tds', name: 'Tools in Data Science', credits: 4, level: CourseLevel.DIPLOMA,
    formula: 'diploma_tds', inputs: [
      { key: 'gaa', label: 'GAA', max: 100 },
      { key: 'misc', label: 'ROE', max: 100 },
      { key: 'oppe1', label: 'Project 1', max: 100 },
      { key: 'oppe2', label: 'Project 2', max: 100 },
      { key: 'final', label: 'End Term', max: 100 }
    ], programs: [DegreeProgram.DATA_SCIENCE]
  },
  {
    id: 'pdsa', name: 'PDSA using Python', credits: 4, level: CourseLevel.DIPLOMA,
    formula: 'diploma_pdsa_dbms_java', inputs: [
      { key: 'gaa', label: 'GAA', max: 100 },
      { key: 'quiz1', label: 'Quiz 1', max: 100 },
      { key: 'quiz2', label: 'Quiz 2', max: 100 },
      { key: 'oppe1', label: 'OPPE/OPE', max: 100 },
      { key: 'final', label: 'End Term', max: 100 }
    ], programs: [DegreeProgram.DATA_SCIENCE, DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'dbms', name: 'Database Management Systems', credits: 4, level: CourseLevel.DIPLOMA,
    formula: 'diploma_pdsa_dbms_java', inputs: [
      { key: 'gaa', label: 'GAA (SQL+Py)', max: 100 },
      { key: 'quiz1', label: 'Quiz 1', max: 100 },
      { key: 'quiz2', label: 'Quiz 2', max: 100 },
      { key: 'oppe1', label: 'OPPE', max: 100 },
      { key: 'final', label: 'End Term', max: 100 }
    ], programs: [DegreeProgram.DATA_SCIENCE, DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'appdev1', name: 'Application Development 1', credits: 4, level: CourseLevel.DIPLOMA,
    formula: 'diploma_appdev1_2', inputs: [
      { key: 'gaa', label: 'GLA (Lab)', max: 100 },
      { key: 'quiz1', label: 'Quiz 1', max: 100 },
      { key: 'quiz2', label: 'Quiz 2', max: 100 },
      { key: 'final', label: 'End Term', max: 100 }
    ], programs: [DegreeProgram.DATA_SCIENCE, DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'java', name: 'Programming Concepts using Java', credits: 4, level: CourseLevel.DIPLOMA,
    formula: 'diploma_pdsa_dbms_java', inputs: [
      { key: 'gaa', label: 'GAA', max: 100 },
      { key: 'quiz1', label: 'Quiz 1', max: 100 },
      { key: 'quiz2', label: 'Quiz 2', max: 100 },
      { key: 'oppe1', label: 'OPPE 1', max: 100 },
      { key: 'oppe2', label: 'OPPE 2', max: 100 },
      { key: 'final', label: 'End Term', max: 100 }
    ], programs: [DegreeProgram.DATA_SCIENCE, DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'sys_cmd', name: 'System Commands', credits: 4, level: CourseLevel.DIPLOMA,
    formula: 'diploma_sys_cmd', inputs: [
      { key: 'gaa', label: 'GAA', max: 100 },
      { key: 'quiz1', label: 'Quiz 1', max: 100 },
      { key: 'oppe1', label: 'OPPE', max: 100 },
      { key: 'misc', label: 'BPT Avg', max: 100 },
      { key: 'final', label: 'End Term', max: 100 }
    ], programs: [DegreeProgram.DATA_SCIENCE]
  },
  {
    id: 'appdev2', name: 'Application Development 2', credits: 4, level: CourseLevel.DIPLOMA,
    formula: 'diploma_appdev1_2', inputs: [
      { key: 'gaa', label: 'GAA (Prog)', max: 100 },
      { key: 'quiz1', label: 'Quiz 1', max: 100 },
      { key: 'quiz2', label: 'Quiz 2', max: 100 },
      { key: 'final', label: 'End Term', max: 100 }
    ], programs: [DegreeProgram.DATA_SCIENCE, DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'dl_genai', name: 'Intro to DL & GenAI', credits: 4, level: CourseLevel.DIPLOMA,
    formula: 'diploma_dl_genai', inputs: [
      { key: 'gaa', label: 'GAA', max: 100 },
      { key: 'quiz1', label: 'Quiz 1', max: 100 },
      { key: 'quiz2', label: 'Quiz 2', max: 100 },
      { key: 'final', label: 'End Term', max: 100 },
      { key: 'oppe1', label: 'NPPE 1', max: 100 },
      { key: 'oppe2', label: 'NPPE 2', max: 100 }
    ], programs: [DegreeProgram.DATA_SCIENCE]
  },

  // --- ELECTRONIC SYSTEMS DIPLOMA ---
  {
    id: 'es_signals', name: 'Signals and Systems', credits: 4, level: CourseLevel.DIPLOMA,
    formula: 'es_signals', inputs: [
        { key: 'gaa', label: 'GAA', max: 100 },
        { key: 'quiz1', label: 'Quiz 1', max: 100 },
        { key: 'quiz2', label: 'Quiz 2', max: 100 },
        { key: 'final', label: 'End Term', max: 100 },
        { key: 'grpa', label: 'GrPA', max: 100 }
    ], programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'es_python', name: 'Python Programming (ES)', credits: 4, level: CourseLevel.DIPLOMA,
    formula: 'es_python', inputs: [
        { key: 'gaa', label: 'GAA (Obj + Prog)', max: 100 },
        { key: 'quiz1', label: 'Quiz 1', max: 100 },
        { key: 'final', label: 'End Term', max: 100 },
        { key: 'oppe1', label: 'OPPE 1', max: 100 },
        { key: 'oppe2', label: 'OPPE 2', max: 100 }
    ], programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'es_analog', name: 'Analog Electronic Systems', credits: 4, level: CourseLevel.DIPLOMA,
    formula: 'es_analog_sensors', inputs: DIPLOMA_STANDARD_INPUTS, programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'es_analog_lab', name: 'Analog Electronics Lab', credits: 3, level: CourseLevel.DIPLOMA,
    formula: 'es_lab_40_60', inputs: [
        { key: 'lab_exp', label: 'Weekly Exp (WE)', max: 100 },
        { key: 'lab_exam', label: 'In-Person (ID)', max: 100 }
    ], programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'es_dsp', name: 'Digital Signal Processing', credits: 4, level: CourseLevel.DIPLOMA,
    formula: 'es_dsp', inputs: [
        { key: 'gaa', label: 'GAA', max: 100 },
        { key: 'lab_exp', label: 'Lab Exp (LE)', max: 100 },
        { key: 'lab_exam', label: 'Online Lab (OLEx)', max: 100 },
        { key: 'quiz1', label: 'Quiz 1', max: 100 },
        { key: 'quiz2', label: 'Quiz 2', max: 100 },
        { key: 'final', label: 'End Term', max: 100 }
    ], programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'es_sensors', name: 'Sensors and Applications', credits: 4, level: CourseLevel.DIPLOMA,
    formula: 'es_analog_sensors', inputs: DIPLOMA_STANDARD_INPUTS, programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'es_sensors_lab', name: 'Sensors Lab', credits: 3, level: CourseLevel.DIPLOMA,
    formula: 'es_lab_40_60', inputs: [
        { key: 'lab_exp', label: 'Weekly Exp (WE)', max: 100 },
        { key: 'lab_exam', label: 'In-Person (ID)', max: 100 }
    ], programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'es_dsd', name: 'Digital System Design', credits: 4, level: CourseLevel.DIPLOMA,
    formula: 'es_analog_sensors', inputs: DIPLOMA_STANDARD_INPUTS, programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'es_dsd_lab', name: 'DSD Lab', credits: 1, level: CourseLevel.DIPLOMA,
    formula: 'es_lab_40_60', inputs: [
        { key: 'lab_exp', label: 'Weekly Exp (WE)', max: 100 },
        { key: 'lab_exam', label: 'In-Person (ID)', max: 100 }
    ], programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'es_comp_org', name: 'Computer Organization', credits: 4, level: CourseLevel.DIPLOMA,
    formula: 'es_analog_sensors', inputs: DIPLOMA_STANDARD_INPUTS, programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'es_testing', name: 'Electronic Testing & Msmt', credits: 4, level: CourseLevel.DIPLOMA,
    formula: 'es_analog_sensors', inputs: DIPLOMA_STANDARD_INPUTS, programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },

  // --- DEGREE ---
  {
    id: 'soft_test', name: 'Software Testing', credits: 4, level: CourseLevel.DEGREE,
    formula: 'degree_standard_quiz_final', inputs: DIPLOMA_STANDARD_INPUTS, programs: [DegreeProgram.DATA_SCIENCE]
  },
  {
    id: 'soft_eng', name: 'Software Engineering', credits: 4, level: CourseLevel.DEGREE,
    formula: 'degree_soft_eng', inputs: [
      { key: 'gaa', label: 'GAA', max: 100 },
      { key: 'quiz2', label: 'Quiz 2', max: 100 },
      { key: 'final', label: 'End Term', max: 100 },
      { key: 'project', label: 'GP1 + GP2 + PP', max: 100 },
      { key: 'misc', label: 'Course Partic. (CP)', max: 100 }
    ], programs: [DegreeProgram.DATA_SCIENCE]
  },
  {
    id: 'dl', name: 'Deep Learning', credits: 4, level: CourseLevel.DEGREE,
    formula: 'degree_deep_learning', inputs: [...DIPLOMA_STANDARD_INPUTS, { key: 'bonus', label: 'Bonus', max: 5 }], programs: [DegreeProgram.DATA_SCIENCE, DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'ai_search', name: 'AI: Search Methods', credits: 4, level: CourseLevel.DEGREE,
    formula: 'degree_standard_quiz_final', inputs: [...DIPLOMA_STANDARD_INPUTS, { key: 'bonus', label: 'Bonus (Prog)', max: 5 }], programs: [DegreeProgram.DATA_SCIENCE]
  },
  {
    id: 'spg', name: 'Strategies for Prof. Growth', credits: 4, level: CourseLevel.DEGREE,
    formula: 'degree_spg', inputs: [
      { key: 'gaa', label: 'GAA', max: 100 },
      { key: 'project', label: 'Group Project', max: 100 },
      { key: 'quiz2', label: 'Quiz 2', max: 100 },
      { key: 'final', label: 'End Term', max: 100 }
    ], programs: [DegreeProgram.DATA_SCIENCE, DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'big_data', name: 'Intro to Big Data', credits: 4, level: CourseLevel.DEGREE,
    formula: 'degree_big_data', inputs: [
      { key: 'gaa', label: 'GAA', max: 100 },
      { key: 'final', label: 'End Term', max: 100 },
      { key: 'oppe1', label: 'OPPE 1', max: 100 },
      { key: 'oppe2', label: 'OPPE 2', max: 100 },
      { key: 'bonus', label: 'Bonus (Live)', max: 5 }
    ], programs: [DegreeProgram.DATA_SCIENCE]
  },
  {
    id: 'c_prog', name: 'Programming in C (BS)', credits: 4, level: CourseLevel.DEGREE,
    formula: 'degree_c_prog', inputs: [
      { key: 'gaa', label: 'GAA', max: 100 },
      { key: 'quiz1', label: 'Quiz 1', max: 100 },
      { key: 'oppe1', label: 'OPPE 1', max: 100 },
      { key: 'oppe2', label: 'OPPE 2', max: 100 },
      { key: 'final', label: 'End Term', max: 100 }
    ], programs: [DegreeProgram.DATA_SCIENCE]
  },
  {
    id: 'dl_cv', name: 'Deep Learning for CV', credits: 4, level: CourseLevel.DEGREE,
    formula: 'degree_dl_cv', inputs: DIPLOMA_STANDARD_INPUTS, programs: [DegreeProgram.DATA_SCIENCE, DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'llm', name: 'Large Language Models', credits: 4, level: CourseLevel.DEGREE,
    formula: 'degree_llm', inputs: [...DIPLOMA_STANDARD_INPUTS, { key: 'bonus', label: 'Bonus', max: 5 }], programs: [DegreeProgram.DATA_SCIENCE]
  },
  {
    id: 'dl_practice', name: 'Deep Learning Practice', credits: 4, level: CourseLevel.DEGREE,
    formula: 'degree_dl_practice', inputs: [
      { key: 'gaa', label: 'GAA', max: 100 },
      { key: 'quiz1', label: 'Quiz 1', max: 100 },
      { key: 'quiz2', label: 'Quiz 2', max: 100 },
      { key: 'quiz3', label: 'Quiz 3', max: 100 },
      { key: 'misc', label: 'NPPE Avg', max: 100 },
      { key: 'viva', label: 'Viva', max: 100 }
    ], programs: [DegreeProgram.DATA_SCIENCE, DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'industry_4', name: 'Industry 4.0', credits: 4, level: CourseLevel.DEGREE,
    formula: 'degree_industry_4', inputs: [
      { key: 'quiz1', label: 'Quiz 1 (7.5)', max: 7.5 },
      { key: 'quiz2', label: 'Quiz 2 (7.5)', max: 7.5 },
      { key: 'misc', label: 'Game (5)', max: 5 },
      { key: 'gaa', label: 'Assignments (40)', max: 40 },
      { key: 'final', label: 'End Term (30)', max: 30 },
      { key: 'project', label: 'Project (10)', max: 10 }
    ], programs: [DegreeProgram.DATA_SCIENCE, DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'os', name: 'Operating Systems', credits: 4, level: CourseLevel.DEGREE,
    formula: 'degree_standard_quiz_final', inputs: DIPLOMA_STANDARD_INPUTS, programs: [DegreeProgram.DATA_SCIENCE]
  },
  {
    id: 'rl', name: 'Reinforcement Learning', credits: 4, level: CourseLevel.DEGREE,
    formula: 'degree_rl', inputs: [
      { key: 'gaa', label: 'GAA', max: 100 },
      { key: 'misc', label: 'GPA', max: 100 },
      { key: 'quiz1', label: 'Quiz 1', max: 100 },
      { key: 'quiz2', label: 'Quiz 2', max: 100 },
      { key: 'final', label: 'End Term', max: 100 },
      { key: 'bonus', label: 'Bonus', max: 5 }
    ], programs: [DegreeProgram.DATA_SCIENCE]
  },
  {
    id: 'corp_fin', name: 'Corporate Finance', credits: 4, level: CourseLevel.DEGREE,
    formula: 'degree_corp_fin', inputs: DIPLOMA_STANDARD_INPUTS, programs: [DegreeProgram.DATA_SCIENCE, DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'comp_net', name: 'Computer Networks', credits: 4, level: CourseLevel.DEGREE,
    formula: 'degree_comp_net', inputs: [...DIPLOMA_STANDARD_INPUTS, { key: 'misc', label: 'Prog Assign', max: 100 }], programs: [DegreeProgram.DATA_SCIENCE]
  },
  {
    id: 'ds_ai_lab', name: 'Data Science & AI Lab', credits: 4, level: CourseLevel.DEGREE,
    formula: 'degree_ds_ai_lab', inputs: [
      { key: 'gaa', label: 'GAA', max: 100 },
      { key: 'quiz2', label: 'Quiz 2', max: 100 },
      { key: 'project', label: 'Project', max: 100 },
      { key: 'viva', label: 'Viva', max: 100 },
      { key: 'bonus', label: 'Bonus', max: 5 }
    ], programs: [DegreeProgram.DATA_SCIENCE]
  },
  {
    id: 'app_dev_lab', name: 'App Dev Lab', credits: 4, level: CourseLevel.DEGREE,
    formula: 'degree_app_dev_lab', inputs: [
      { key: 'quiz2', label: 'Quiz 2', max: 100 },
      { key: 'gaa', label: 'Lab Assign', max: 100 },
      { key: 'viva', label: 'Project Viva', max: 100 }
    ], programs: [DegreeProgram.DATA_SCIENCE]
  },
  {
    id: 'bio_algo', name: 'Algorithmic Thinking in Bio', credits: 4, level: CourseLevel.DEGREE,
    formula: 'degree_bio_algo', inputs: [...DIPLOMA_STANDARD_INPUTS, { key: 'misc', label: 'GRPa', max: 100 }], programs: [DegreeProgram.DATA_SCIENCE]
  },
  {
    id: 'bio_net', name: 'Big Data & Bio Networks', credits: 4, level: CourseLevel.DEGREE,
    formula: 'degree_standard_quiz_final', inputs: DIPLOMA_STANDARD_INPUTS, programs: [DegreeProgram.DATA_SCIENCE]
  },
  {
    id: 'market_res', name: 'Market Research', credits: 4, level: CourseLevel.DEGREE,
    formula: 'degree_market_research', inputs: [...DIPLOMA_STANDARD_INPUTS, { key: 'project', label: 'Project', max: 100 }], programs: [DegreeProgram.DATA_SCIENCE, DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'stat_comp', name: 'Statistical Computing', credits: 4, level: CourseLevel.DEGREE,
    formula: 'degree_standard_quiz_final', inputs: DIPLOMA_STANDARD_INPUTS, programs: [DegreeProgram.DATA_SCIENCE]
  },
  {
    id: 'adv_algo', name: 'Advanced Algorithms', credits: 4, level: CourseLevel.DEGREE,
    formula: 'degree_standard_quiz_final', inputs: DIPLOMA_STANDARD_INPUTS, programs: [DegreeProgram.DATA_SCIENCE]
  },
  {
    id: 'man_econ', name: 'Managerial Economics', credits: 4, level: CourseLevel.DEGREE,
    formula: 'degree_man_econ', inputs: DIPLOMA_STANDARD_INPUTS, programs: [DegreeProgram.DATA_SCIENCE, DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'speech', name: 'Speech Technology', credits: 4, level: CourseLevel.DEGREE,
    formula: 'degree_speech', inputs: [...DIPLOMA_STANDARD_INPUTS, { key: 'viva', label: 'Viva', max: 100 }], programs: [DegreeProgram.DATA_SCIENCE, DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'mlops', name: 'MLOps', credits: 4, level: CourseLevel.DEGREE,
    formula: 'degree_mlops', inputs: [
      { key: 'gaa', label: 'GAA', max: 100 },
      { key: 'final', label: 'End Term', max: 100 },
      { key: 'oppe1', label: 'OPPE 1', max: 100 },
      { key: 'oppe2', label: 'OPPE 2', max: 100 },
      { key: 'bonus', label: 'Bonus', max: 5 }
    ], programs: [DegreeProgram.DATA_SCIENCE]
  },
  {
    id: 'math_genai', name: 'Math Foundations of GenAI', credits: 4, level: CourseLevel.DEGREE,
    formula: 'degree_math_genai', inputs: [
      { key: 'gaa', label: 'GAA', max: 100 },
      { key: 'quiz1', label: 'Quiz 1', max: 100 },
      { key: 'quiz2', label: 'Quiz 2', max: 100 },
      { key: 'final', label: 'End Term', max: 100 },
      { key: 'oppe1', label: 'NPPE', max: 100 }
    ], programs: [DegreeProgram.DATA_SCIENCE]
  },
  {
    id: 'theory_comp', name: 'Theory of Computation', credits: 4, level: CourseLevel.DEGREE,
    formula: 'degree_standard_quiz_final', inputs: DIPLOMA_STANDARD_INPUTS, programs: [DegreeProgram.DATA_SCIENCE]
  },

  // --- ES DEGREE & ELECTIVES ---
  {
    id: 'es_control', name: 'Control Engineering', credits: 4, level: CourseLevel.DEGREE,
    formula: 'es_control_eng', inputs: [
        { key: 'gaa', label: 'GAA', max: 100 },
        { key: 'quiz1', label: 'Quiz 1', max: 100 },
        { key: 'quiz2', label: 'Quiz 2', max: 100 },
        { key: 'final', label: 'End Term', max: 100 },
        { key: 'design', label: 'Design Assgn', max: 100 }
    ], programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'es_em_fields', name: 'Electromag. Fields & TL', credits: 4, level: CourseLevel.DEGREE,
    formula: 'es_analog_sensors', inputs: DIPLOMA_STANDARD_INPUTS, programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'es_prod_design', name: 'Electronic Product Design', credits: 4, level: CourseLevel.DEGREE,
    formula: 'es_product_design', inputs: DIPLOMA_STANDARD_INPUTS, programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'es_emb_linux', name: 'Embedded Linux & FPGAs', credits: 4, level: CourseLevel.DEGREE,
    formula: 'es_analog_sensors', inputs: DIPLOMA_STANDARD_INPUTS, programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'es_emb_linux_lab', name: 'Embedded Linux Lab', credits: 1, level: CourseLevel.DEGREE,
    formula: 'es_lab_20_80', inputs: [
        { key: 'lab_exp', label: 'Attendance', max: 100 },
        { key: 'lab_exam', label: 'Exp & Viva', max: 100 }
    ], programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'es_dig_ic', name: 'Digital IC Design', credits: 4, level: CourseLevel.DEGREE,
    formula: 'es_digital_ic', inputs: DIPLOMA_STANDARD_INPUTS, programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  },
  {
    id: 'es_prob_stats', name: 'Probability & Statistics', credits: 4, level: CourseLevel.DEGREE,
    formula: 'es_digital_ic', inputs: DIPLOMA_STANDARD_INPUTS, programs: [DegreeProgram.ELECTRONIC_SYSTEMS]
  }
];