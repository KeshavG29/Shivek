// src/lib/dummy-data.ts
import type { Supplier, Taxonomy, FilterOptions } from './types';

export const taxonomy: Taxonomy = {
  "Electronic Components & Embedded Systems": {
    "Passive Components": ["Resistors", "Capacitors", "Inductors / Chokes", "EMI / EMC Filters"],
    "Active Components": ["Discrete Semiconductors", "Power Devices (MOSFETs, IGBTs)", "Diodes & Rectifiers"],
    "Integrated Circuits (ICs)": ["Analog ICs", "Power Management ICs", "Interface & Logic ICs", "Custom / ASIC ICs"],
    "Embedded Computing": ["Microcontrollers", "Microprocessors", "FPGAs / SoCs", "Single Board Computers (SBCs)"],
    "Memory & Storage": ["Flash Memory", "SRAM / DRAM", "Secure / Industrial Memory"],
    "Electronics Design & Development": ["Circuit Design", "PCB Design & Layout", "Firmware / BSP Development"],
  },
  "Power, Energy & Power Conditioning": {
    "Power Conversion": ["DC–DC Converters", "AC–DC Power Supplies", "Inverters"],
    "Power Distribution": ["Power Distribution Units (PDUs)", "Power Control Modules"],
    "Energy Storage": ["Batteries (Li-ion, Ni-Cd, etc.)", "Backup Power Modules"],
    "Power Conditioning & Protection": ["EMI Filters", "Surge Protection", "Voltage Regulators"],
    "Custom Power Solutions": ["Application-specific power design", "Ruggedized power units"],
  },
  "Interconnects, Cabling & Harnessing": {
    "Connectors": ["Circular Connectors", "Rectangular Connectors", "Board-to-Board / Wire-to-Board"],
    "RF Interconnects": ["RF Connectors", "Coaxial Assemblies", "Microwave Cables"],
    "Cable Assemblies": ["Signal Cables", "Power Cables", "Custom Cable Assemblies"],
    "Wiring Harnesses": ["Aircraft Harnesses", "Naval Harnesses", "Land System Harnesses"],
    "Termination & Accessories": ["Backshells", "Contacts", "Cable Protection & Shielding"],
  },
  "Displays, HMI & Control Interfaces": {
    "Rugged Displays": ["LCD Displays", "OLED Displays", "Sunlight-Readable Displays"],
    "Display Modules": ["Display Control Units (DCUs)", "Integrated Display Assemblies", "Complete Display Assemblies"],
    "Touch & Input Interfaces": ["Touch Panels", "Keypads", "Switch Panels"],
    "Optical Bonding & Enhancement": ["Optical Bonding", "Anti-Reflective / Anti-Glare Treatments"],
    "Human–Machine Interfaces (HMI)": ["Control Panels", "Operator Consoles", "Custom HMI Design"],
  },
  "Manufacturing, Testing & Qualification Services": {
    "PCB Manufacturing & Assembly": ["PCB Fabrication", "PCB Assembly (Class 3)", "Conformal Coating"],
    "Environmental Testing": ["Vibration & Shock", "Temperature & Humidity", "Thermal Cycling"],
    "EMI / EMC Testing": ["MIL-STD-461", "DO-160", "Pre-compliance Testing"],
    "Qualification & Screening": ["ESS", "Burn-in Testing", "Reliability Testing"],
    "Special Processes": ["Optical Bonding", "Potting & Encapsulation", "Ruggedization Services"],
  }
};

// Helper to get major category from a subcategory
export function getMajorCategory(subcategory: string): string | null {
  for (const major in taxonomy) {
    if (Object.keys(taxonomy[major]).includes(subcategory)) {
      return major;
    }
  }
  return null;
}

// Helper to get all subcategories of a major category
export function getSubcategoriesOfMajor(majorCategory: string): string[] {
    if (taxonomy[majorCategory]) {
      return Object.keys(taxonomy[majorCategory]);
    }
    return [];
}

export const filterOptions: FilterOptions = {
    certifications: ["AS9100", "ISO 9001", "MIL-STD-810G", "DO-160", "NADCAP", "ITAR", "MIL-STD-461", "CEMILAC", "NABL"],
    industries: ["Aerospace", "Defense", "Naval", "Space", "Homeland Security"],
    locations: ["Bengaluru", "Hyderabad", "Delhi-NCR", "Pune", "Chennai", "Coimbatore"],
    supplierTypes: ["Manufacturer", "Distributor", "Service Provider", "Design House", "MRO", "EMS Provider", "System Integrator"],
    verificationStatus: ["RakshaBase Verified", "Self-Declared"],
};

export const suppliers: Supplier[] = [
  {
    id: 'sup-001',
    companyName: 'Vector Micro Systems Pvt. Ltd.',
    description: 'Design and development of industrial and defense-grade microcontrollers for embedded systems applications.',
    overview: 'Founded in 2008, Vector Micro Systems specializes in the design and development of high-reliability microcontrollers and firmware for mission-critical embedded systems. Our products are engineered for performance in harsh environments and are deployed in various defense and aerospace platforms.',
    subcategories: ['Microcontrollers', 'Firmware / BSP Development', 'Embedded Computing'],
    capabilities: {
      "Microcontrollers": ["8-bit, 16-bit, and 32-bit MCU design", "Low-power and real-time architectures", "Custom IP core integration"],
      "Firmware / BSP Development": ["Board Support Package (BSP) for custom hardware", "RTOS integration (FreeRTOS, Zephyr)", "Device driver development for peripherals"]
    },
    certifications: ['ISO 9001:2015', 'AS9100D'],
    industries: ['Defense', 'Aerospace', 'Homeland Security'],
    location: 'Bengaluru, Karnataka, India',
    verified: true,
    type: 'Design House',
    yearFounded: 2008,
    infrastructure: ["Advanced VLSI design tools", "FPGA prototyping platforms", "In-house validation and testing lab"],
    quality: ["Stringent code review and version control (Git)", "Static analysis and formal verification", "DO-178C compliance for airborne software"],
  },
  {
    id: 'sup-002',
    companyName: 'Aegis Power Solutions',
    description: 'Design and manufacturing of rugged DC-DC and AC-DC power conversion units for military and naval platforms.',
    overview: 'Since 1998, Aegis Power Solutions has been a trusted manufacturer of high-density, rugged power supplies for the defense sector. We offer a portfolio of COTS, MOTS, and custom power solutions designed to meet stringent MIL-STD requirements for performance and reliability.',
    subcategories: ['DC–DC Converters', 'AC–DC Power Supplies', 'Custom Power Solutions'],
    capabilities: {
        "DC–DC Converters": ["High-efficiency brick converters", "Isolated and non-isolated topologies", "Wide input voltage ranges (MIL-STD-1275)"],
        "AC–DC Power Supplies": ["Single-phase and three-phase input", "Power Factor Correction (PFC)", "MIL-STD-461 compliant EMI filtering"],
        "Custom Power Solutions": ["Application-specific power supply design", "Build-to-print manufacturing", "Ruggedization for shock and vibration"]
    },
    certifications: ['AS9100D', 'ISO 9001:2015', 'MIL-STD-461', 'MIL-STD-810G'],
    industries: ['Defense', 'Naval', 'Ground Vehicles'],
    location: 'Pune, Maharashtra, India',
    verified: true,
    type: 'Manufacturer',
    yearFounded: 1998,
    infrastructure: ["SMT assembly lines", "Automated optical inspection (AOI)", "In-house EMI/EMC pre-compliance test facility", "Environmental chambers for burn-in and thermal cycling"],
    quality: ["IPC-A-610 Class 3 workmanship standards", "Full traceability of components", "100% functional testing of all units"],
  },
  {
    id: 'sup-003',
    companyName: 'Astra Interconnect Technologies',
    description: 'Manufacturer of MIL-spec circular connectors and custom cable harness assemblies for aerospace applications.',
    overview: 'Astra Interconnect is a leading supplier of high-performance connectors and cable assemblies for the aerospace and defense markets. We specialize in custom-engineered solutions for harsh environments, ensuring signal integrity and reliability.',
    subcategories: ['Circular Connectors', 'Custom Cable Assemblies', 'Aircraft Harnesses'],
    capabilities: {
        "Circular Connectors": ["MIL-DTL-38999 Series I, II, III", "Push-pull and bayonet coupling mechanisms", "Hermetically sealed and filtered connectors"],
        "Aircraft Harnesses": ["Complex harness design and routing", "Laser wire marking", "Automated continuity and hipot testing"]
    },
    certifications: ['ISO 9001:2015', 'AS9100D'],
    industries: ['Aerospace', 'Space', 'Defense'],
    location: 'Hyderabad, Telangana, India',
    verified: false,
    type: 'Manufacturer',
    yearFounded: 2005,
    infrastructure: ["CNC machining for connector shells", "Automated crimping and termination tools", "3D CAD modeling for harness design"],
    quality: ["AS9102 First Article Inspection reports", "Full dimensional and electrical testing", "Material certification and traceability"],
  },
  {
    id: 'sup-004',
    companyName: 'Spectra Display Systems',
    description: 'Manufacturer of ruggedized, sunlight-readable LCD display units for airborne and naval cockpits.',
    overview: 'Spectra Display Systems provides state-of-the-art rugged display solutions for demanding applications. Our expertise lies in optical bonding, LED backlight design, and custom HMI integration for defense cockpits, consoles, and vehicle-mounted systems.',
    subcategories: ['Rugged Displays', 'Complete Display Assemblies', 'Optical Bonding'],
    capabilities: {
        "Rugged Displays": ["Sunlight-readable high-brightness displays", "NVIS-compatible displays", "Wide operating temperature range"],
        "Optical Bonding": ["Index-matched bonding for improved contrast", "Vibration and shock-resistant bonding process", "Cleanroom environment (ISO 7)"]
    },
    certifications: ['AS9100D', 'DO-160G', 'CEMILAC'],
    industries: ['Aerospace', 'Naval', 'Defense'],
    location: 'Bengaluru, Karnataka, India',
    verified: true,
    type: 'System Integrator',
    yearFounded: 2002,
    infrastructure: ["Class 10,000 cleanroom for optical bonding", "Automated display measurement and calibration system", "Goniophotometer for viewing angle analysis"],
    quality: ["Zero-defect pixel policy", "Luminance and chromaticity testing", "HASS/HALT for reliability validation"],
  },
  {
    id: 'sup-005',
    companyName: 'QualiTest Defence Services',
    description: 'NABL accredited lab providing environmental (MIL-STD-810G) and EMI/EMC (MIL-STD-461) testing services.',
    overview: 'QualiTest is an independent, NABL-accredited laboratory offering a comprehensive suite of qualification testing services for the defense and aerospace industries. We help manufacturers ensure their products meet the stringent performance and reliability standards required for deployment.',
    subcategories: ['EMI / EMC Testing', 'Environmental Testing', 'Qualification & Screening'],
    capabilities: {
        "EMI / EMC Testing": ["MIL-STD-461 (RE102, RS103, CS114, etc.)", "DO-160 Section 15-22 testing", "Anechoic and semi-anechoic chambers"],
        "Environmental Testing": ["MIL-STD-810G/H testing", "Vibration (random, sine, shock)", "Thermal cycling and humidity testing", "Altitude and explosive atmosphere testing"]
    },
    certifications: ['ISO/IEC 17025 (NABL)', 'ISO 9001:2015'],
    industries: ['Defense', 'Aerospace', 'Naval'],
    location: 'Chennai, Tamil Nadu, India',
    verified: true,
    type: 'Service Provider',
    yearFounded: 2010,
    infrastructure: ["10m anechoic chamber", "High-G shock test machines", "Combined temperature, humidity, and altitude chambers"],
    quality: ["Calibration of all equipment traceable to national standards", "Detailed, certified test reports", "Root cause analysis support"],
  },
  {
    id: 'sup-006',
    companyName: 'Cynosure Manufacturing',
    description: 'High-reliability PCB assembly services (Class 3) including SMT, THT, and conformal coating for defense.',
    overview: 'Cynosure Manufacturing provides end-to-end electronics manufacturing services (EMS) for the defense sector, specializing in high-reliability PCB assemblies. Our processes are tailored for the stringent requirements of mission-critical aerospace and defense hardware.',
    subcategories: ['PCB Assembly (Class 3)', 'Conformal Coating'],
    capabilities: {
        "PCB Assembly (Class 3)": ["Fine-pitch SMT and BGA assembly", "Through-hole technology (THT) assembly", "X-ray inspection for BGA and complex packages"],
        "Conformal Coating": ["Acrylic, polyurethane, and silicone coatings", "Automated selective coating process", "UV inspection for coating coverage"]
    },
    certifications: ['ISO 9001:2015', 'AS9100D'],
    industries: ['Defense', 'Aerospace'],
    location: 'Delhi-NCR, India',
    verified: true,
    type: 'EMS Provider',
    yearFounded: 2011,
    infrastructure: ["Multiple SMT lines with high-speed pick-and-place machines", "Vapor phase reflow ovens", "Automated Optical Inspection (AOI) systems"],
    quality: ["IPC-A-610 Class 3 and J-STD-001 certified operators", "Material traceability and counterfeit parts prevention program", "Configuration management and ECO control"],
  }
];

export function getSupplierById(id: string): Supplier | undefined {
  return suppliers.find(supplier => supplier.id === id);
}
