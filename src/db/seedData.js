import db from './index'

/**
 * Idempotent seed function - only populates data if tables are empty.
 * Seeds board members, team members, volunteers, events, and blog posts
 * with real content from firmhealthghana.com.
 */
export async function seedDatabase() {
  const [memberCount, volunteerCount, eventCount, blogCount, photoCount, interventionCount] = await Promise.all([
    db.members.count(),
    db.volunteers.count(),
    db.events.count(),
    db.blogs.count(),
    db.photos.count(),
    db.interventions.count()
  ])

  const promises = []

  if (memberCount === 0) {
    promises.push(seedMembers())
  }
  if (volunteerCount === 0) {
    promises.push(seedVolunteers())
  }
  if (eventCount === 0) {
    promises.push(seedEvents())
  }
  if (blogCount === 0) {
    promises.push(seedBlogs())
  }
  if (photoCount === 0) {
    promises.push(seedPhotos())
  }
  if (interventionCount === 0) {
    promises.push(seedInterventions())
  }

  if (promises.length > 0) {
    await Promise.all(promises)
  }
}

async function seedMembers() {
  const now = new Date().toISOString()

  const boardMembers = [
    {
      name: 'Prof. Jerry S. Y. Kuma',
      role: 'Board Chairman',
      position: 'Board Chairman',
      type: 'board',
      image: '/images/board/prof1.png',
      email: 'j.kumafirmhealth@gmail.com',
      shortBio: 'Former Vice Chancellor of University of Mines and Technology (2012-2020) and Professor of Environmental Hydrogeology.',
      fullBio: 'Former Vice Chancellor of University of Mines and Technology (2012-2020) and recently Rector of Perez University College. Professor of Environmental Hydrogeology and Geophysics holding degrees from University of Ghana (BSc, 1985), ITC Netherlands (PG Dip and MSc, 1990-1991), and University of Newcastle (PhD, 2002). Recipient of Queens Anniversary Prize (2005), Nobles International Award (2013), Africa Education Leadership Award (2015), and ESQR Gold Award (2016). Fellow of multiple professional institutions including Ghana Institution of Geoscientists.',
      published: true,
      order: 0,
      createdAt: now,
      updatedAt: now
    },
    {
      name: 'Engr. Dr. Sylvester Akpah',
      role: 'Board Member',
      position: 'Chief Executive Officer',
      type: 'board',
      image: '/images/board/member1.jpg',
      email: 's.akpahfirmhealth@gmail.com',
      shortBio: 'CEO with six years NGO management experience and 2018 Mandela Washington Fellow.',
      fullBio: 'Chief Executive Officer with six years NGO management experience leading 15 staff. Lecturer at UMaT in Computer Science specializing in network infrastructure deployment, wireless security, software engineering, and web technologies. Holds MSc and BSc in Information Technology. 2018 Mandela Washington Fellow and Western Regional Coordinator for Operation Smile Ghana.',
      published: true,
      order: 1,
      createdAt: now,
      updatedAt: now
    },
    {
      name: 'Mrs. Florence Ansere-Bioh',
      role: 'Board Member',
      position: 'Community Affairs and Public Relations Manager',
      type: 'board',
      image: '/images/board/florence.jpg',
      email: 'f.anserefirmhealth@gmail.com',
      shortBio: 'Community Affairs and Public Relations Manager at Gold Fields Tarkwa Mine with 12+ years experience.',
      fullBio: 'Community Affairs and Public Relations Manager at Gold Fields, Tarkwa Mine with 12+ years mining industry experience across multiple companies. Former Rural Sociologist at CSIR Crops Research Institute. Masters of Philosophy and Bachelor of Arts in Sociology from University of Ghana. Expertise in community relations and communication, exploring local people\'s perspectives, land access and use.',
      published: true,
      order: 2,
      createdAt: now,
      updatedAt: now
    },
    {
      name: 'Mr. K.T. Oppong-Kyekyeku',
      role: 'Board Member',
      position: 'Mining Industry Lawyer',
      type: 'board',
      image: '/images/board/oppongk.jpg',
      email: 'k.twumasifirmhealth@gmail.com',
      shortBio: 'Mining industry lawyer with 7+ years at Ghana\'s Minerals Commission.',
      fullBio: 'Mining industry lawyer with 7+ years at Ghana\'s Minerals Commission. Involved in formulating key mining legislation including Ghana Integrated Aluminium Development Corporation Act (2018) and Minerals and Mining Regulations (2018-2020). Served on mining-focused committees and taught Environmental Law as adjunct lecturer at Lancaster University Ghana (2019-2020).',
      published: true,
      order: 3,
      createdAt: now,
      updatedAt: now
    },
    {
      name: 'Mr. Kwabena Barning',
      role: 'Board Member',
      position: 'Chief Technical Officer',
      type: 'board',
      image: '/images/board/barning.jpg',
      email: 'k.barningfirmhealth@gmail.com',
      shortBio: 'Chief Technical Officer with 28 years corporate experience across sub-Saharan Africa.',
      fullBio: 'Chief Technical Officer overseeing Business Development and Research. Brings 28 years corporate experience across sub-Saharan Africa with SGS, including Vice President role (2018-19). Managed regional operations in French West Africa and Tropical Southern Africa. Holds MBA from University of Leicester (2008) and BSc Chemistry with Geology from University of Ghana (1992).',
      published: true,
      order: 4,
      createdAt: now,
      updatedAt: now
    },
    {
      name: 'Dr. Joseph Darko',
      role: 'Board Member',
      position: 'Director of Medical Services',
      type: 'board',
      image: '/images/board/darko.png',
      email: 'j.darkofirmhealth@gmail.com',
      shortBio: 'Director of Medical Services and Medical Superintendent of Government Hospital, Bogoso.',
      fullBio: 'Director of Medical Services for Firm Health Ghana Foundation and Medical Superintendent of Government Hospital, Bogoso. MBChB from University of Ghana Medical School and MPH from University of Liverpool. Awarded Grand Medal by Ghana for COVID-19 emergency response leadership. Led management of Ghana\'s first Marburg Virus Disease survivor in 2022.',
      published: true,
      order: 5,
      createdAt: now,
      updatedAt: now
    },
    {
      name: 'Mr. Michael Fynn Hammond',
      role: 'Secretary',
      position: 'Assistant Registrar, UMaT',
      type: 'board',
      image: '/images/board/michael.jpg',
      email: 'm.hammondfirmhealth@gmail.com',
      shortBio: 'Assistant Registrar at UMaT and YALI Fellow selected from over 2,000 applicants.',
      fullBio: 'Assistant Registrar at UMaT holding MBA (HRM) and Bachelor of Education (Management) from University of Cape Coast. Selected among 119 participants from 2,000+ applicants for YALI\'s fifth cohort (2016). Member of Weducate Initiative focused on empowering northern Ghana communities.',
      published: true,
      order: 6,
      createdAt: now,
      updatedAt: now
    }
  ]

  const teamMembers = [
    {
      name: 'Dr. Sylvester Akpah',
      role: 'Executive Director',
      position: 'Executive Director',
      type: 'team',
      image: '/images/team/sly1.jpg',
      shortBio: 'Over 6 years NGO management experience, leading a 15-person team.',
      fullBio: 'Dr. Sylvester Akpah serves as the Executive Director with over 6 years of NGO management experience, leading a 15-person team. He is a lecturer in Computer Science at the University of Mines and Technology and a 2018 Mandela Washington Fellow. Under his leadership, the foundation has expanded its reach and impact across multiple communities in Ghana.',
      published: true,
      order: 0,
      createdAt: now,
      updatedAt: now
    },
    {
      name: 'Dr. Joseph Darko',
      role: 'Director-Health Services',
      position: 'Director-Health Services',
      type: 'team',
      image: '/images/team/DR.-JOSEPH-DARKO-DIRECTOR-MEDICAL-SERVICES-720x1024.jpg',
      shortBio: 'Medical Superintendent at Government Hospital in Bogoso.',
      fullBio: 'Dr. Joseph Darko is the Director of Health Services and Medical Superintendent at the Government Hospital in Bogoso. He holds an MBChB from the University of Ghana Medical School and an MPH from the University of Liverpool. He led Ghana\'s first emergency Caesarean section on a COVID-19 pregnant patient, demonstrating his commitment to frontline healthcare delivery.',
      published: true,
      order: 1,
      createdAt: now,
      updatedAt: now
    },
    {
      name: 'Emmanuel Smith Yeboah',
      role: 'Director-Audit',
      position: 'Director-Audit',
      type: 'team',
      image: '/images/team/MR.-EMMANUEL-SMITH-YEBOAH-DIRECTOR-AUDITOR-1-720x1024.jpg',
      shortBio: 'Chartered Accountant and Head of Quality Assurance at UMaT.',
      fullBio: 'Emmanuel Smith Yeboah is the Director of Audit and a Chartered Accountant, member of the Institute of Chartered Accountants Ghana. He holds a Commonwealth Executive MBA and an MBA in Accounting. He serves as Head of Quality Assurance at the University of Mines and Technology, ensuring the foundation maintains the highest standards of financial transparency and accountability.',
      published: true,
      order: 2,
      createdAt: now,
      updatedAt: now
    },
    {
      name: 'Michael Fynn Hammond',
      role: 'Head-Logistics',
      position: 'Head-Logistics',
      type: 'team',
      image: '/images/team/MR.-MICHEAL-HAMMOND-HEAD-LOGISTICS-720x1024.jpg',
      shortBio: 'Assistant Registrar at UMaT with MBA (HRM) and Bachelor of Education.',
      fullBio: 'Michael Fynn Hammond is the Head of Logistics, holding an MBA in Human Resource Management and a Bachelor of Education in Management. He is an Assistant Registrar at the University of Mines and Technology and a participant of the YALI Accra Regional Leadership Centre (2016). He ensures smooth operational execution of all foundation programs and events.',
      published: true,
      order: 3,
      createdAt: now,
      updatedAt: now
    },
    {
      name: 'Gladys Mawusi Fummey',
      role: 'Head Nurse',
      position: 'Head Nurse',
      type: 'team',
      image: '/images/team/MS.-GLADYS-MAWUSI-FUMMEY-NURSE-IN-CHARGE-1-720x1024.jpg',
      shortBio: 'Nurse in charge of children\'s ward at Apinto Government Hospital.',
      fullBio: 'Gladys Mawusi Fummey is the Head Nurse and nurse in charge of the children\'s ward at Apinto Government Hospital. She holds a BSc in Nursing and a certificate in Paediatric Nursing. A foundation member since 2015, she has been instrumental in delivering quality healthcare services during medical outreach programs.',
      published: true,
      order: 4,
      createdAt: now,
      updatedAt: now
    },
    {
      name: 'Prince Charles Ababio',
      role: 'Anaesthetist',
      position: 'Anaesthetist',
      type: 'team',
      image: '/images/team/MR.-PRINCE-CHARLES-ABABIO-PHYSICIAN-ASSISTANT-1-720x1024.jpg',
      shortBio: 'Certified Registered Anaesthetist at Apinto and Tarkwa Community Hospitals.',
      fullBio: 'Prince Charles Ababio is a Certified Registered Anaesthetist at Apinto and Tarkwa Community Hospitals. He graduated from the Nursing and Midwifery Training College Sekondi and holds a degree in Anaesthesia from the University for Development Studies. His specialized skills are critical to the foundation\'s medical screening and surgical outreach programs.',
      published: true,
      order: 5,
      createdAt: now,
      updatedAt: now
    },
    {
      name: 'Chrysantus A. Yuorkuu',
      role: 'Accountant',
      position: 'Accountant',
      type: 'team',
      image: '/images/team/MR.-CHRYSANTUS-YUORKUU-ACCOUNTANT-1-720x1024.jpg',
      shortBio: 'Chartered Accountant with over 20 years financial management experience.',
      fullBio: 'Chrysantus A. Yuorkuu is a Chartered Accountant certified by ICAG with a Masters in Business Technology Management from UMaT. With over 20 years of financial management experience, he ensures the foundation\'s resources are managed with the highest standards of financial integrity and efficiency.',
      published: true,
      order: 6,
      createdAt: now,
      updatedAt: now
    },
    {
      name: 'Samuel Kumah',
      role: 'Lab Technician',
      position: 'Lab Technician',
      type: 'team',
      image: '/images/team/MR.-SAMUEL-KUMAH-COMMUNITY-HEALTH-NURSE-1-720x1024.jpg',
      shortBio: 'Community health nurse at Ampain Refugee Camp with 5+ years experience.',
      fullBio: 'Samuel Kumah is a Lab Technician and community health nurse at the Ampain Refugee Camp in the Ellembelle district. He completed his training at the Nursing and Midwifery College Esiama and has over 5 years of community mobilization experience. His grassroots health experience strengthens the foundation\'s community outreach efforts.',
      published: true,
      order: 7,
      createdAt: now,
      updatedAt: now
    },
    {
      name: 'Ernest Armoo',
      role: 'Lab Technician',
      position: 'Lab Technician',
      type: 'team',
      image: '/images/team/MR.-ERNEST-ARMOO-COMMUNITY-HEALTH-NURSE-1-720x1024.jpg',
      shortBio: 'Nurse in charge of Dorcas CHPS, Amenfi West District.',
      fullBio: 'Ernest Armoo is a Lab Technician and nurse in charge of Dorcas CHPS in the Amenfi West District. He also serves as Sub-District Supervisor for Mass Drug Administration. He joined the foundation in 2015 and has contributed significantly to the foundation\'s diagnostic and laboratory services during health screening events.',
      published: true,
      order: 8,
      createdAt: now,
      updatedAt: now
    },
    {
      name: 'Kwabena Agyemang Yankyera',
      role: 'Physician Assistant',
      position: 'Physician Assistant',
      type: 'team',
      image: '/images/team/MR.-KWABENA-AGYEMANG-PHYSICIAN-ASSISTANT-1-720x1024.jpg',
      shortBio: 'Works at Apinto Government Hospital and Tarkwa Community Hospital.',
      fullBio: 'Kwabena Agyemang Yankyera is a Physician Assistant working at Apinto Government Hospital and Tarkwa Community Hospital. He holds an Advanced Diploma and BSc in Physician Assistantship from Narh Bita College with over 4 years of community health experience. His clinical expertise enhances the foundation\'s capacity to deliver quality healthcare at outreach events.',
      published: true,
      order: 9,
      createdAt: now,
      updatedAt: now
    },
    {
      name: 'Vondee Selasie',
      role: 'Software Engineer',
      position: 'Software Engineer',
      type: 'team',
      image: '/images/team/NewS.png',
      shortBio: 'Web and mobile development specialist with BSc in Computer Science from UMaT.',
      fullBio: 'Vondee Selasie is a Software Engineer specializing in web and mobile development. He holds a BSc in Computer Science and Engineering from UMaT with over 4 years of website and software development experience. He leads the foundation\'s digital transformation efforts, building tools that enhance operational efficiency and public engagement.',
      published: true,
      order: 10,
      createdAt: now,
      updatedAt: now
    },
    {
      name: 'Karen Donkor',
      role: 'Community Nurse',
      position: 'Community Nurse',
      type: 'team',
      image: '/images/team/MS.-KAREN-DONKOR-COMMUNITY-HEALTH-NURSE-1-720x1024.jpg',
      shortBio: 'Community health nurse at Anaji East CHPS with 4 years nursing experience.',
      fullBio: 'Karen Donkor is a Community Nurse and community health nurse at Anaji East CHPS in the Effia-Kwesimintsim District. She is the coordinator for the Adolescent Club and Iron Folate Supplementation program with 4 years of nursing experience. Her community health expertise strengthens the foundation\'s preventive healthcare and youth health programs.',
      published: true,
      order: 11,
      createdAt: now,
      updatedAt: now
    },
    {
      name: 'Nana Afia Serwaah Boadu',
      role: 'Volunteer-Medical Student',
      position: 'Volunteer-Medical Student',
      type: 'team',
      image: '/images/team/NANA-AFIA-SERWAAH-BOADU-PHYSICIAN-ASSISTANT-1-683x1024.jpg',
      shortBio: 'Third-year medical student at University of Cape Coast.',
      fullBio: 'Nana Afia Serwaah Boadu is a Volunteer-Medical Student and third-year medical student at the University of Cape Coast. She holds a Bachelor\'s degree in Physician Assistantship from Central University. She is dedicated to serving underprivileged communities and contributes her growing medical knowledge to the foundation\'s health programs.',
      published: true,
      order: 12,
      createdAt: now,
      updatedAt: now
    },
    {
      name: 'Kornyo Bertha Esinam',
      role: 'Public Health Nurse',
      position: 'Public Health Nurse',
      type: 'team',
      image: '/images/team/bertha.png',
      shortBio: 'BSc in Public Health Nursing, works at Tarkwa Nsuaem Municipal Health Directorate.',
      fullBio: 'Kornyo Bertha Esinam is a Public Health Nurse with a BSc in Public Health Nursing from the University of Health and Allied Sciences. She works at the Tarkwa Nsuaem Municipal Health Directorate as the Adolescent Health focal person and fitness coach. Her public health expertise supports the foundation\'s community health education and wellness initiatives.',
      published: true,
      order: 13,
      createdAt: now,
      updatedAt: now
    },
    {
      name: 'Padmore Fosu Amankwah',
      role: 'International Relations',
      position: 'International Relations',
      type: 'team',
      image: '/images/team/amankwah.png',
      shortBio: 'Metallurgist with 9+ years mining and energy industry experience.',
      fullBio: 'Padmore Fosu Amankwah is the International Relations lead, a metallurgist with over 9 years of mining and energy industry experience. He holds a BSc in Mineral Engineering and PMP certification, and is a first-year master\'s student in Metallurgical Engineering at Montana Tech. He facilitates the foundation\'s international partnerships and collaborative programs.',
      published: true,
      order: 14,
      createdAt: now,
      updatedAt: now
    },
    {
      name: 'Thomas Tetteh',
      role: 'Broadcast Journalist',
      position: 'Broadcast Journalist',
      type: 'team',
      image: '/images/team/thomas.png',
      shortBio: 'Over 16 years radio broadcasting and online journalism experience.',
      fullBio: 'Thomas Tetteh is a Broadcast Journalist with over 16 years of radio broadcasting and online journalism experience. He is the Morning Show Host and News Editor at Dynamite FM-UMaT and has received multiple awards including the MTN Media Awards 2022. He serves as the Western Regional Correspondent for GhanaWeb. His media expertise amplifies the foundation\'s message and community health awareness campaigns.',
      published: true,
      order: 15,
      createdAt: now,
      updatedAt: now
    }
  ]

  await db.members.bulkAdd([...boardMembers, ...teamMembers])
}

/**
 * Reseed members table with fresh data from firmhealthghana.com
 * This clears existing members and reseeds with updated content.
 */
export async function reseedMembers() {
  await db.members.clear()
  await seedMembers()
}

async function seedVolunteers() {
  const now = new Date().toISOString()

  const volunteers = [
    {
      firstName: 'Theophilus',
      lastName: 'Nanabayin',
      email: 'theophilusnana17@gmail.com',
      occupation: 'Database Administrator',
      skills: ['Java', 'HTML', 'CSS', 'JavaScript', 'C++', 'Database Management'],
      availability: 'weekends',
      experience: 'IT professional specializing in database management.',
      motivation: 'Contributing technical skills to optimize workflows for the foundation.',
      biography: 'Theophilus Nanabayin is an IT professional specializing in database management with expertise in Java, HTML, CSS, JavaScript, and C++. His proactive problem-solving approach, coupled with effective communication skills, positions him as a valuable asset in optimizing workflows for the foundation.',
      profileImage: '/images/volunteers/nana.jpg',
      status: 'approved',
      showOnWebsite: true,
      createdAt: now
    },
    {
      firstName: 'Esther',
      lastName: 'Mawutor',
      email: 'esthermawutor1@gmail.com',
      occupation: 'Digital Engineer',
      skills: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'Microsoft Office', 'PowerPoint'],
      availability: 'weekends',
      experience: 'Web developer skilled in HTML, CSS, JavaScript, and WordPress.',
      motivation: 'Supporting the foundation through digital engineering and web development.',
      biography: 'Esther N.A Mawutor is a Digital Engineer and web developer skilled in HTML, CSS, JavaScript, and WordPress. She is adept at Microsoft Office Suite, particularly PowerPoint, and has contributed to projects including the Ghana Mine Repository website.',
      profileImage: '/images/volunteers/ess2.jpg',
      status: 'approved',
      showOnWebsite: true,
      createdAt: now
    },
    {
      firstName: 'Gideon',
      lastName: 'Abrokwa',
      email: 'gideonabrokwa100@gmail.com',
      occupation: 'Software Engineer',
      skills: ['Web Development', 'App Development', 'Computer Science'],
      availability: 'weekends',
      experience: 'Two years of industry experience in web and app development.',
      motivation: 'Crafting efficient and user-centric solutions for the foundation.',
      biography: 'Gideon Abrokwa is a Software Engineer with two years of industry experience in web and app development and a Computer Science degree. His dedication to crafting efficient and user-centric solutions is evident in his work ethic.',
      profileImage: '/images/volunteers/gideon.jpg',
      status: 'approved',
      showOnWebsite: true,
      createdAt: now
    },
    {
      firstName: 'Abena',
      lastName: 'Asiedu',
      email: 'koramah001@gmail.com',
      occupation: 'Data Analyst',
      skills: ['Data Analysis', 'Business Intelligence', 'Data Visualization', 'SAR Technology'],
      availability: 'weekends',
      experience: 'Data specialist who improved data quality by 50% and pioneered SAR technology integration.',
      motivation: 'Leveraging data analytics to support the foundation\'s impact measurement.',
      biography: 'Abena Koramah Asiedu is a Data Analyst and data specialist who improved data quality by 50% and pioneered Synthetic Aperture Radar (SAR) technology integration for mining monitoring. She is proficient in business intelligence and data visualization tools.',
      profileImage: '/images/volunteers/abena.jpg',
      status: 'approved',
      showOnWebsite: true,
      createdAt: now
    },
    {
      firstName: 'Bismark',
      lastName: 'Arthur',
      email: 'bismarkarthur223@gmail.com',
      occupation: 'Technology Officer',
      skills: ['Web App Design', 'Telematics', 'Enterprise Resource Planning', 'Metallurgical Engineering'],
      availability: 'weekends',
      experience: 'Metallurgical Engineering graduate with expertise in web app design and ERP.',
      motivation: 'Applying adaptability, expertise, and excellence to support the foundation.',
      biography: 'Bismark Arthur is a Technology Officer and Metallurgical Engineering graduate with expertise in web app design, telematics, and enterprise resource planning. He is known for his adaptability, expertise, and excellence in supporting the foundation\'s technology needs.',
      profileImage: '/images/volunteers/kobby.jpg',
      status: 'approved',
      showOnWebsite: true,
      createdAt: now
    },
    {
      firstName: 'Rahinatu',
      lastName: 'Yakubu',
      email: 'rahinayakubu834@gmail.com',
      occupation: 'Designer',
      skills: ['Microsoft Office', 'UI/UX Design', 'Graphic Design', 'Communication'],
      availability: 'weekends',
      experience: 'Professional excelling in communication and analytical problem-solving.',
      motivation: 'Creating impactful graphic designs and visual content for the foundation.',
      biography: 'Rahinatu Yakubu is a Designer and professional excelling in communication and analytical problem-solving. Proficient in Microsoft Office Suite and UI/UX design tools, she creates graphic designs for the foundation that communicate its mission effectively.',
      profileImage: '/images/volunteers/rahina.jpg',
      status: 'approved',
      showOnWebsite: true,
      createdAt: now
    },
    {
      firstName: 'Kwabena',
      lastName: 'Nyantakyi',
      email: 'knyantakyi15@gmail.com',
      occupation: 'System Administrator',
      skills: ['Website Hosting', 'Virtual Machine Management', 'Python', 'HTML', 'CSS', 'JavaScript', 'Proxmox'],
      availability: 'weekends',
      experience: 'Mining operations expert with Electrical/Electronic Engineering degree.',
      motivation: 'Managing the foundation\'s IT infrastructure and systems.',
      biography: 'Kwabena Nyantakyi is a System Administrator and mining operations expert with an Electrical/Electronic Engineering degree. He is skilled in website hosting, virtual machine management, Python, HTML, CSS, JavaScript, and Proxmox systems.',
      profileImage: '/images/volunteers/kwabena.jpg',
      status: 'approved',
      showOnWebsite: true,
      createdAt: now
    }
  ]

  await db.volunteers.bulkAdd(volunteers)
}

async function seedEvents() {
  const now = new Date().toISOString()

  const events = [
    {
      title: 'Dine With the Aged and Medical Outreach',
      date: '2024-12-24',
      time: '8:30 AM - 4:30 PM',
      location: 'Frontage of Gas Processing Plant, Atuabo',
      description: 'A partnership with Ghana Gas providing care, nourishment, and smiles to our elderly community members. This event combines a festive meal with comprehensive medical screening services for the aged in the Atuabo community.',
      image: '/images/events/feed-aged-event.jpg',
      type: 'feeding',
      published: true,
      createdAt: now,
      updatedAt: now
    },
    {
      title: 'Quarterly Blood Donation Drive',
      date: '2018-09-10',
      time: '10:30 AM - 3:30 PM',
      location: 'St. Catholic Church, Bogoso',
      description: 'Community blood donation event partnering with the local church to save lives. This quarterly initiative brings together community members to donate blood and support local hospitals\' blood bank reserves.',
      image: '/images/events/blood-donation-event.jpg',
      type: 'donation',
      published: true,
      createdAt: now,
      updatedAt: now
    },
    {
      title: 'Blood Donation Drive - Tarkwa 2023',
      date: '2023-09-29',
      time: '10:30 AM - 3:30 PM',
      location: 'Tarkwa',
      description: 'A major blood donation event partnered with local hospitals and media associations, targeting the collection of 1,000 pints of blood. Supported by Goldfields Ghana Foundation and Rotary Club of Tarkwa.',
      image: '/images/events/blood-donation-event.jpg',
      type: 'donation',
      published: true,
      createdAt: now,
      updatedAt: now
    },
    {
      title: '2024 3rd Quarter Blood Donation',
      date: '2024-07-15',
      time: '10:30 AM - 3:30 PM',
      location: 'Nzulezo, Western Region',
      description: 'Third quarter blood donation drive supported by Ghana Gas in Nzulezo. This event continues the foundation\'s mission to ensure adequate blood supply for hospitals in the Western Region.',
      image: '/images/events/blood-donation-event.jpg',
      type: 'donation',
      published: true,
      createdAt: now,
      updatedAt: now
    },
    {
      title: 'Drexel ICA Program 2024',
      date: '2024-03-24',
      time: '10:30 AM - 3:30 PM',
      location: 'Tarkwa, Western Region',
      description: 'The Health and Research Summer Internship Program (HRSIP) offering hands-on experience in diverse fields, from medicine to public health. Students gain clinical experience at Tarkwa Municipal Hospital and Apinto Government Hospital.',
      image: '/images/events/training-event.jpg',
      type: 'training',
      published: true,
      createdAt: now,
      updatedAt: now
    },
    {
      title: 'Community Medical Screening Outreach',
      date: '2024-05-18',
      time: '8:00 AM - 4:00 PM',
      location: 'Various Communities, Western Region',
      description: 'Free comprehensive medical screening program that has served over 13,000 individuals across 20+ communities since 2016. Services include blood pressure checks, blood sugar testing, BMI assessment, and health education.',
      image: '/images/events/medical-screening-event.jpg',
      type: 'screening',
      published: true,
      createdAt: now,
      updatedAt: now
    }
  ]

  await db.events.bulkAdd(events)
}

async function seedBlogs() {
  const blogs = [
    {
      title: 'Support - Intertek Ghana Limited',
      slug: 'support-intertek-ghana-limited',
      content: 'We appreciate Intertek Ghana Limited for their generous support ahead of the 2nd quarter blood donation drive. Their commitment to community health and corporate social responsibility exemplifies the kind of partnership that makes our work possible. With their support, we are able to expand our blood donation outreach and save more lives in the Western Region.\n\nIntertek Ghana Limited has been a valued partner in our mission to ensure adequate blood supply for hospitals. Their contribution helps us cover logistics, medical supplies, and community mobilization efforts that are essential for successful blood donation campaigns.\n\nWe call on other corporate organizations to join us in this life-saving mission. Together, we can build a healthier community and ensure that no patient suffers due to inadequate blood supply.',
      author: 'Admin',
      published: 1,
      createdAt: '2024-06-22T10:00:00.000Z',
      updatedAt: '2024-06-22T10:00:00.000Z'
    },
    {
      title: 'Mental Health Across the World',
      slug: 'mental-health-across-the-world',
      content: 'Behavioral health counselling student explores mental health across the world. Mental health remains one of the most pressing global health challenges, affecting millions of people regardless of age, gender, or socioeconomic status.\n\nIn Ghana, mental health awareness has been growing steadily, but significant challenges remain in terms of access to care, stigma reduction, and resource allocation. The Firm Health Ghana Foundation is committed to integrating mental health awareness into our community health programs.\n\nThrough our partnerships with international institutions like Drexel University, we are working to bridge the gap between global mental health research and local community needs. Our radio programs regularly feature mental health topics to educate and destigmatize mental health issues in our communities.',
      author: 'Rebecca Burke',
      published: 1,
      createdAt: '2023-09-10T10:00:00.000Z',
      updatedAt: '2023-09-10T10:00:00.000Z'
    },
    {
      title: 'Drexel and Ghana Mental Health',
      slug: 'drexel-and-ghana-mental-health',
      content: 'First-of-its-kind course pairs Drexel with Ghana and mental health with community. This groundbreaking collaboration between Drexel University and Firm Health Ghana Foundation represents a new model for international health education and community engagement.\n\nThe program brings together students from diverse backgrounds to explore the intersection of mental health and community development in Ghana\'s Western Region. Participants gain firsthand experience in community health settings while contributing to local mental health awareness efforts.\n\nThis partnership has opened doors for cultural exchange, knowledge sharing, and the development of context-appropriate mental health interventions. Students work alongside local health professionals to understand the unique challenges and opportunities in Ghana\'s mental health landscape.',
      author: 'Alissa Falcone',
      published: 1,
      createdAt: '2023-09-10T12:00:00.000Z',
      updatedAt: '2023-09-10T12:00:00.000Z'
    }
  ]

  await db.blogs.bulkAdd(blogs)
}

async function seedPhotos() {
  const now = new Date().toISOString()

  const photos = [
    // Medical Outreach
    { title: 'Medical Screening Session', category: 'Medical Outreach', image: '/images/gallery/g9.jpg', published: true, order: 0, createdAt: now },
    { title: 'Community Health Check', category: 'Medical Outreach', image: '/images/gallery/g6.jpg', published: true, order: 1, createdAt: now },
    { title: 'Blood Pressure Screening', category: 'Medical Outreach', image: '/images/gallery/g14.jpg', published: true, order: 2, createdAt: now },
    { title: 'Health Education Session', category: 'Medical Outreach', image: '/images/gallery/cause-2.jpg', published: true, order: 3, createdAt: now },
    { title: 'Eye Testing', category: 'Medical Outreach', image: '/images/gallery/g16.jpg', published: true, order: 4, createdAt: now },

    // Blood Donation
    { title: 'Blood Donation Drive', category: 'Blood Donation', image: '/images/gallery/cause-3.jpg', published: true, order: 5, createdAt: now },
    { title: 'Volunteer Blood Donors', category: 'Blood Donation', image: '/images/gallery/cause-4.jpg', published: true, order: 6, createdAt: now },
    { title: 'Blood Collection', category: 'Blood Donation', image: '/images/gallery/cause-5.jpg', published: true, order: 7, createdAt: now },

    // Community Events
    { title: 'Community Gathering', category: 'Community Events', image: '/images/gallery/g13.jpg', published: true, order: 8, createdAt: now },
    { title: 'Health Awareness Program', category: 'Community Events', image: '/images/gallery/g8.jpg', published: true, order: 9, createdAt: now },
    { title: 'Radio Program Recording', category: 'Community Events', image: '/images/gallery/g3.jpg', published: true, order: 10, createdAt: now },
    { title: 'Community Engagement', category: 'Community Events', image: '/images/gallery/g19.jpg', published: true, order: 11, createdAt: now },
    { title: 'Feed the Aged Event', category: 'Community Events', image: '/images/gallery/cause-6.jpg', published: true, order: 12, createdAt: now },

    // Team Activities
    { title: 'Team Meeting', category: 'Team Activities', image: '/images/gallery/p1.jpg', published: true, order: 13, createdAt: now },
    { title: 'Foundation Activities', category: 'Team Activities', image: '/images/gallery/image_1.jpg', published: true, order: 14, createdAt: now },
    { title: 'Team Collaboration', category: 'Team Activities', image: '/images/gallery/image_2.jpg', published: true, order: 15, createdAt: now },
    { title: 'Outreach Planning', category: 'Team Activities', image: '/images/gallery/p16.jpg', published: true, order: 16, createdAt: now },
    { title: 'Team Training', category: 'Team Activities', image: '/images/gallery/p17.jpg', published: true, order: 17, createdAt: now },

    // Field Work
    { title: 'Field Visit 1', category: 'Field Work', image: '/images/gallery/p11.jpg', published: true, order: 18, createdAt: now },
    { title: 'Field Visit 2', category: 'Field Work', image: '/images/gallery/p10.jpg', published: true, order: 19, createdAt: now },
    { title: 'Community Visit', category: 'Field Work', image: '/images/gallery/p15.jpg', published: true, order: 20, createdAt: now },
    { title: 'Health Camp Setup', category: 'Field Work', image: '/images/gallery/p14.jpg', published: true, order: 21, createdAt: now },
    { title: 'Screening Camp', category: 'Field Work', image: '/images/gallery/p13.jpg', published: true, order: 22, createdAt: now },
    { title: 'Rural Outreach', category: 'Field Work', image: '/images/gallery/p12.jpg', published: true, order: 23, createdAt: now },

    // Programs
    { title: 'ICA Program Session', category: 'Programs', image: '/images/gallery/p2.jpg', published: true, order: 24, createdAt: now },
    { title: 'Student Training', category: 'Programs', image: '/images/gallery/p3.jpg', published: true, order: 25, createdAt: now },
    { title: 'Clinical Exposure', category: 'Programs', image: '/images/gallery/p4.jpg', published: true, order: 26, createdAt: now },
    { title: 'Research Activities', category: 'Programs', image: '/images/gallery/p5.jpg', published: true, order: 27, createdAt: now },
    { title: 'Health Walk Event', category: 'Programs', image: '/images/gallery/p6.jpg', published: true, order: 28, createdAt: now },
    { title: 'Aerobics Session', category: 'Programs', image: '/images/gallery/p7.jpg', published: true, order: 29, createdAt: now },
    { title: 'Community Fitness', category: 'Programs', image: '/images/gallery/p8.jpg', published: true, order: 30, createdAt: now }
  ]

  await db.photos.bulkAdd(photos)
}

async function seedInterventions() {
  const now = new Date().toISOString()

  const interventions = [
    {
      title: 'Weekly Public Health Radio Program',
      slug: 'weekly-public-health-radio-program',
      description: 'An initiative by the Firm Health Ghana Foundation to educate the public on essential health topics through radio broadcasting.',
      image: '/images/interventions/cause11.png',
      objective: 'Raise awareness on public health issues via interactive discussions with healthcare experts.',
      implementation: 'Airs weekly on Dynamite (88.9) FM, Tuesdays 8:30-9:15 AM with doctors and nutritionists; includes Q&A sessions with listeners.',
      impact: 'Provides credible health education and strengthens community health awareness across the Western Region.',
      year: 2025,
      published: true,
      order: 0,
      createdAt: now,
      updatedAt: now
    },
    {
      title: 'Quarterly Blood Donation Drive',
      slug: 'quarterly-blood-donation-drive',
      description: 'Collects voluntary blood donations for healthcare facilities in Tarkwa and Bogoso Municipalities to ensure stable blood supply.',
      image: '/images/interventions/cause-5.jpg',
      objective: 'Ensure stable blood supply for medical emergencies and treatments in local hospitals.',
      implementation: 'Quarterly events collaborating with hospitals, medical professionals, and volunteers with awareness campaigns.',
      impact: 'Saves lives by providing sustainable blood sources and raises donation awareness in the community.',
      year: 2023,
      published: true,
      order: 1,
      createdAt: now,
      updatedAt: now
    },
    {
      title: 'Community Medical Screening Program',
      slug: 'community-medical-screening-program',
      description: 'Free medical screenings across 20+ communities, having screened over 13,000 individuals since 2016.',
      image: '/images/interventions/event-1.jpg',
      objective: 'Improve community health through early disease detection and prevention.',
      implementation: 'Regular screening camps with healthcare professionals covering BP, blood sugar, urinalysis, BMI, and eye tests.',
      impact: 'Early disease detection, increased health awareness, and promotion of healthier lifestyles.',
      year: 2016,
      published: true,
      order: 2,
      createdAt: now,
      updatedAt: now
    },
    {
      title: '5KM Health Walk and Aerobics Session',
      slug: '5km-health-walk-and-aerobics',
      description: 'Monthly fitness initiative held on the last Saturday of each month to promote physical activity and community engagement.',
      image: '/images/interventions/healthwalk.png',
      objective: 'Promote physical activity, healthy living, and community engagement through accessible fitness programs.',
      implementation: 'Organized 5KM walks with designated routes followed by qualified aerobics instruction.',
      impact: 'Contributes to improved health, social cohesion, and overall community well-being.',
      year: 2018,
      published: true,
      order: 3,
      createdAt: now,
      updatedAt: now
    },
    {
      title: 'Feed the Aged and Medical Outreach',
      slug: 'feed-the-aged-and-medical-outreach',
      description: 'Combines nutritional support for the elderly with comprehensive medical screenings in rural communities.',
      image: '/images/interventions/feedtheaged.png',
      objective: 'Address elderly population needs through nutrition support and medical check-ups.',
      implementation: 'Regular feeding programs with comprehensive medical screenings via healthcare providers in communities like Beyin.',
      impact: 'Improved elderly well-being, early health issue detection, and increased social engagement for seniors.',
      year: 2020,
      published: true,
      order: 4,
      createdAt: now,
      updatedAt: now
    }
  ]

  await db.interventions.bulkAdd(interventions)
}

export default seedDatabase
