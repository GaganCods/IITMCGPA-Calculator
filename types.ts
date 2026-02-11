export enum DegreeProgram {
  DATA_SCIENCE = 'data_science',
  ELECTRONIC_SYSTEMS = 'electronic_systems'
}

export enum SubjectType {
  COMPLETED = 'completed',
  ONGOING = 'ongoing',
  PLANNED = 'planned'
}

export enum CourseLevel {
  FOUNDATION = 'Foundation',
  DIPLOMA = 'Diploma',
  DEGREE = 'Degree (BSc/BS)'
}

export interface Subject {
  id: string;
  name: string;
  credits: number;
  grade: string;
  type: SubjectType;
}

export interface GradeDefinition {
  grade: string;
  points: number;
  description: string;
}

export interface GradingSystem {
  grades: GradeDefinition[];
  excludeFromCGPA: string[];
}

export interface CGPAData {
  totalCredits: number;
  totalGradePoints: number;
  cgpa: number;
  subjectCount: number;
}

export interface StorageData {
  subjects: Subject[];
  program: DegreeProgram;
  lastUpdated: string;
}

export type CourseFormula = 
  | 'standard_foundation' 
  | 'stats_foundation' 
  | 'math2_foundation' 
  | 'python_foundation'
  | 'diploma_mlf_mlt'
  | 'diploma_mlp'
  | 'diploma_bdm'
  | 'diploma_ba'
  | 'diploma_tds'
  | 'diploma_pdsa_dbms_java'
  | 'diploma_appdev1_2'
  | 'diploma_sys_cmd'
  | 'diploma_dl_genai'
  | 'degree_standard_quiz_final' 
  | 'degree_soft_eng'
  | 'degree_deep_learning' 
  | 'degree_spg'
  | 'degree_big_data'
  | 'degree_c_prog'
  | 'degree_dl_cv'
  | 'degree_llm'
  | 'degree_dl_practice'
  | 'degree_industry_4'
  | 'degree_rl'
  | 'degree_corp_fin'
  | 'degree_comp_net'
  | 'degree_ds_ai_lab'
  | 'degree_app_dev_lab'
  | 'degree_bio_algo'
  | 'degree_market_research'
  | 'degree_man_econ'
  | 'degree_speech'
  | 'degree_mlops'
  | 'degree_math_genai'
  | 'manual'
  // Electronic Systems Specific
  | 'es_c_prog'
  | 'es_linux'
  | 'es_embedded_c'
  | 'es_signals'
  | 'es_python'
  | 'es_dsp'
  | 'es_analog_sensors' // Analog, Sensors, Digital Systems (similar to standard but slightly diff weights sometimes or strict subset)
  | 'es_lab_50_50'
  | 'es_lab_40_60'
  | 'es_lab_20_80'
  | 'es_product_design'
  | 'es_control_eng'
  | 'es_digital_ic';

export interface ScoreComponents {
  quiz1?: number;
  quiz2?: number;
  quiz3?: number;
  final?: number;
  oppe1?: number;
  oppe2?: number;
  gaa?: number; // Graded Assignment Average
  project?: number;
  viva?: number;
  bonus?: number;
  misc?: number; // Catch-all for KA, etc.
  
  // ES Specific
  grpa?: number; // Graded Programming Assign
  bpta?: number; // Biweekly Prog Test
  vmt?: number; // VM Tasks
  nppe?: number; // Non-proctored Prog Exam
  lab_exp?: number; // Lab Experiments / Online Lab
  lab_exam?: number; // Online/In-person Lab Exam/Demo
  design?: number; // Design Assignment
}

export interface InputConfig {
  key: keyof ScoreComponents;
  label: string;
  max: number;
}

export interface CoursePreset {
  id: string;
  name: string;
  credits: number;
  level: CourseLevel;
  formula: CourseFormula;
  inputs: InputConfig[];
  programs: DegreeProgram[];
}