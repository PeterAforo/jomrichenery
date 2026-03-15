export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  image?: string;
  excerpt: string;
  bio: string[];
  expertise?: string[];
  qualifications?: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    slug: "isaac-abanga",
    name: "Isaac Abanga",
    role: "Chief Executive Officer",
    excerpt:
      "Executive leader, Petroleum Economist, and entrepreneur with over 21 years of progressive experience in Ghana\u2019s downstream petroleum industry.",
    bio: [
      "Isaac Abanga is an executive leader, Petroleum Economist, and entrepreneur with over 21 years of progressive experience in Ghana\u2019s downstream petroleum industry and West Africa\u2019s energy trading environment. He has risen through leadership ranks to serve as General Manager across three Oil Marketing Companies (OMCs) and has also led regional trading operations within a multinational petroleum and petrochemical context.",
      "Across his career, Isaac has demonstrated strong capability in business restructuring, commercial strategy, petroleum pricing, operational governance, retail network expansion, and regulatory engagement. He is known for building high-performing teams, instituting systems and controls, and delivering growth within complex and highly regulated operating environments.",
      "Building on this corporate foundation, Isaac is the Founder and Chief Executive Officer of DOXA Agro and Trading Limited\u2014an impact-driven agribusiness focused on food security, sustainable agriculture, and scalable poultry value-chain development. His work reflects a commitment to national development, youth empowerment, and sustainable enterprise building.",
      "In addition to his corporate and entrepreneurial leadership, Isaac serves in governance and institutional development roles within the Assemblies of God Church in Ghana. He is the Board Secretary of the Assemblies of God Professionals Network (AGPN) and currently serves as Acting National Coordinator of the Network (since 2023). He is also a Board Member in charge of Finance and Administration at the Assemblies of God Printing Press (AGPP), one of Ghana\u2019s oldest printing presses.",
    ],
    expertise: [
      "Downstream Petroleum Operations (Retail, B2B, Depots & Distribution)",
      "Petroleum Pricing, Platts/Argus Referencing & Premium Setting",
      "International Trade (Crude & Refined Products)",
      "Business Turnaround, Restructuring & Governance Systems",
      "Financial Oversight, P&L Management & Budgeting",
      "Corporate Governance, Board Secretariat & Administration",
      "Agribusiness Strategy, Poultry Value Chain & Food Security",
    ],
    qualifications: [
      "Fellow Chartered Economist (FCh.E.)",
      "Chartered Petroleum Economist (Ch.PE.)",
      "Chartered Corporate Governance & Leadership Professional (CCGL)",
      "MBA (Finance), Academic City University (SMU Certification)",
      "BSc (Accounting), KNUST",
      "HND (Accountancy), Tamale Polytechnic",
    ],
    social: {
      linkedin: "https://linkedin.com/in/isaac-abanga",
      email: "isaac.abanga@jomrichenergy.com",
    },
  },
  {
    slug: "richard-owusu",
    name: "Richard Owusu",
    role: "Chief Operations Officer",
    excerpt:
      "Oversees all operational activities, ensuring efficiency and excellence across all stations and distribution networks.",
    bio: [
      "Richard oversees all operational activities at Jom Rich Energy, ensuring efficiency and excellence across all stations and distribution networks. With extensive experience in downstream petroleum operations, he brings a hands-on approach to operational management.",
      "His leadership ensures that every Jom Rich station meets the highest standards of service delivery, safety compliance, and operational performance. Richard is instrumental in driving the company\u2019s expansion strategy while maintaining quality across all touchpoints.",
    ],
    expertise: [
      "Operational Management & Strategy",
      "Station Network Development",
      "Safety & Compliance Oversight",
      "Team Leadership & Development",
    ],
    social: {
      linkedin: "https://linkedin.com/in/richard-owusu",
      email: "richard.owusu@jomrichenergy.com",
    },
  },
  {
    slug: "grace-adjei",
    name: "Grace Adjei",
    role: "Head of Finance",
    excerpt:
      "Brings financial expertise and strategic planning to drive the company\u2019s fiscal health and ensure sustainable growth.",
    bio: [
      "Grace brings financial expertise and strategic planning to drive Jom Rich Energy\u2019s fiscal health and ensure sustainable growth. She oversees all financial operations, budgeting, and reporting across the organization.",
      "Her meticulous approach to financial management and forward-thinking investment strategies have been pivotal in positioning Jom Rich Energy for long-term success in Ghana\u2019s competitive energy market.",
    ],
    expertise: [
      "Financial Planning & Analysis",
      "Budgeting & Forecasting",
      "Corporate Finance & Treasury",
      "Regulatory Compliance & Reporting",
    ],
    social: {
      linkedin: "https://linkedin.com/in/grace-adjei",
      email: "grace.adjei@jomrichenergy.com",
    },
  },
  {
    slug: "kwadwo-boateng",
    name: "Kwadwo Boateng",
    role: "Head of Distribution",
    excerpt:
      "Manages the nationwide distribution network, ensuring timely fuel delivery across Ghana with operational excellence.",
    bio: [
      "Kwadwo manages the nationwide distribution network at Jom Rich Energy, ensuring timely fuel delivery across Ghana with operational excellence. His logistics expertise ensures that every delivery meets the company\u2019s exacting standards.",
      "Under his leadership, Jom Rich Energy\u2019s distribution arm has consistently met and exceeded delivery targets, supporting the company\u2019s reputation as a dependable energy partner across the nation.",
    ],
    expertise: [
      "Logistics & Supply Chain Management",
      "Fleet Management & Optimization",
      "Distribution Network Planning",
      "Vendor & Partner Relations",
    ],
    social: {
      linkedin: "https://linkedin.com/in/kwadwo-boateng",
      email: "kwadwo.boateng@jomrichenergy.com",
    },
  },
];
