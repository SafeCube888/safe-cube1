import type { TrainingProgram } from '@/types/content';

export const trainingPrograms: TrainingProgram[] = [
  // GENERAL SAFETY
  { id: 'workplace-safety-awareness', title: 'Workplace Safety Awareness', category: 'General Safety', description: 'Core awareness training for employees on identifying hazards and following controls.', deliveryFormats: ['On-site', 'Online'] },
  { id: 'hazard-identification', title: 'Hazard Identification', category: 'General Safety', description: 'Training on recognising, reporting, and controlling workplace hazards.', deliveryFormats: ['On-site', 'Online'] },
  { id: 'risk-assessment-basics', title: 'Risk Assessment Basics', category: 'General Safety', description: 'Introduction to identifying hazards, evaluating risk, and applying controls.', deliveryFormats: ['On-site', 'Online'] },
  { id: 'ppe-awareness', title: 'PPE Awareness', category: 'General Safety', description: 'Selection, use, care, and limitations of personal protective equipment.', deliveryFormats: ['On-site', 'Online'] },
  { id: 'housekeeping-for-safety', title: 'Housekeeping for Safety', category: 'General Safety', description: 'How good housekeeping prevents accidents and supports operational efficiency.', deliveryFormats: ['On-site'] },

  // EMERGENCY AND FIRE
  { id: 'fire-safety-awareness', title: 'Fire Safety Awareness', category: 'Emergency and Fire', description: 'Fire prevention, detection, response, and evacuation principles.', deliveryFormats: ['On-site', 'Online'] },
  { id: 'emergency-response', title: 'Emergency Response', category: 'Emergency and Fire', description: 'Practical training on responding to workplace emergencies.', deliveryFormats: ['On-site'] },
  { id: 'fire-extinguisher-use', title: 'Fire Extinguisher Use', category: 'Emergency and Fire', description: 'Hands-on training in selecting and using fire extinguishers correctly.', deliveryFormats: ['On-site'] },
  { id: 'evacuation-drills', title: 'Evacuation Drills', category: 'Emergency and Fire', description: 'Planning, conducting, and evaluating workplace evacuation drills.', deliveryFormats: ['On-site'] },
  { id: 'first-aid-awareness', title: 'First Aid Awareness', category: 'Emergency and Fire', description: 'Basic first aid principles and initial response to common workplace injuries.', deliveryFormats: ['On-site', 'Online'] },

  // OPERATIONAL SAFETY
  { id: 'manual-handling', title: 'Manual Handling', category: 'Operational Safety', description: 'Safe lifting, carrying, and material handling techniques.', deliveryFormats: ['On-site'] },
  { id: 'working-at-height', title: 'Working at Height', category: 'Operational Safety', description: 'Hazards, controls, and safe practices for work at height.', deliveryFormats: ['On-site'] },
  { id: 'electrical-safety', title: 'Electrical Safety', category: 'Operational Safety', description: 'Electrical hazards, safe practices, and equipment condition awareness.', deliveryFormats: ['On-site', 'Online'] },
  { id: 'machinery-safety', title: 'Machinery Safety', category: 'Operational Safety', description: 'Machinery guarding, lockout, and safe operating procedures.', deliveryFormats: ['On-site'] },
  { id: 'chemical-safety', title: 'Chemical Safety', category: 'Operational Safety', description: 'Safe storage, handling, labelling, and use of workplace chemicals.', deliveryFormats: ['On-site', 'Online'] },
  { id: 'confined-space-awareness', title: 'Confined Space Awareness', category: 'Operational Safety', description: 'Hazards, entry controls, and rescue planning for confined spaces.', deliveryFormats: ['On-site'] },

  // OCCUPATIONAL HEALTH
  { id: 'occupational-health-awareness', title: 'Occupational Health Awareness', category: 'Occupational Health', description: 'Workplace health risks, exposure, and employee wellbeing.', deliveryFormats: ['On-site', 'Online'] },
  { id: 'ergonomics', title: 'Ergonomics', category: 'Occupational Health', description: 'Workstation design, posture, and musculoskeletal risk prevention.', deliveryFormats: ['On-site', 'Online'] },
  { id: 'heat-stress-awareness', title: 'Heat Stress Awareness', category: 'Occupational Health', description: 'Recognising and preventing heat-related illness in workplace environments.', deliveryFormats: ['On-site', 'Online'] },
  { id: 'noise-and-vibration', title: 'Noise and Vibration', category: 'Occupational Health', description: 'Health risks from noise and vibration exposure and available controls.', deliveryFormats: ['On-site', 'Online'] },

  // ENVIRONMENT
  { id: 'environmental-awareness', title: 'Environmental Awareness', category: 'Environment', description: 'Workplace environmental responsibilities, waste, and pollution prevention.', deliveryFormats: ['On-site', 'Online'] },
  { id: 'waste-management', title: 'Waste Management', category: 'Environment', description: 'Segregation, storage, disposal, and record-keeping for workplace waste.', deliveryFormats: ['On-site'] },
  { id: 'spill-response', title: 'Spill Response', category: 'Environment', description: 'Preventing and responding to chemical spills in the workplace.', deliveryFormats: ['On-site'] },

  // QUALITY AND COMPLIANCE
  { id: 'quality-awareness', title: 'Quality Awareness', category: 'Quality and Compliance', description: 'Understanding quality principles, consistency, and customer expectations.', deliveryFormats: ['On-site', 'Online'] },
  { id: 'incident-reporting', title: 'Incident Reporting', category: 'Quality and Compliance', description: 'How to report incidents, near-misses, and corrective actions effectively.', deliveryFormats: ['On-site', 'Online'] },
  { id: 'compliance-awareness', title: 'Compliance Awareness', category: 'Quality and Compliance', description: 'Understanding workplace obligations, records, and regulatory readiness.', deliveryFormats: ['On-site', 'Online'] },

  // ISO AND MANAGEMENT SYSTEMS
  { id: 'iso-9001-awareness', title: 'ISO 9001 Awareness', category: 'ISO and Management Systems', description: 'Introduction to quality management system principles and ISO 9001 alignment.', deliveryFormats: ['On-site', 'Online'] },
  { id: 'iso-14001-awareness', title: 'ISO 14001 Awareness', category: 'ISO and Management Systems', description: 'Introduction to environmental management system principles and ISO 14001 alignment.', deliveryFormats: ['On-site', 'Online'] },
  { id: 'iso-45001-awareness', title: 'ISO 45001 Awareness', category: 'ISO and Management Systems', description: 'Introduction to occupational health and safety management and ISO 45001 alignment.', deliveryFormats: ['On-site', 'Online'] },

  // LEADERSHIP AND CUSTOM PROGRAMS
  { id: 'supervisor-safety-leadership', title: 'Supervisor Safety Leadership', category: 'Leadership and Custom Programs', description: 'Role-based training for supervisors on safety leadership and team management.', deliveryFormats: ['On-site', 'Online'] },
  { id: 'management-awareness', title: 'Management Awareness', category: 'Leadership and Custom Programs', description: 'Executive and management-level awareness on QHSE responsibilities and oversight.', deliveryFormats: ['On-site', 'Online'] },
  { id: 'toolbox-talks', title: 'Toolbox Talks', category: 'Leadership and Custom Programs', description: 'Short, focused safety discussions for daily and weekly workplace use.', deliveryFormats: ['On-site'] },
  { id: 'custom-training-programs', title: 'Custom Training Programs', category: 'Leadership and Custom Programs', description: 'Tailored training programs designed around specific workplace needs and risks.', deliveryFormats: ['On-site', 'Online'] },
];
