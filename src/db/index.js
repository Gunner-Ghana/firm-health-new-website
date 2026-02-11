import Dexie from 'dexie'

export const db = new Dexie('HealthNGODatabase')

db.version(8).stores({
  volunteers: '++id, email, firstName, lastName, createdAt, status, profileImage, showOnWebsite, biography',
  blogs: '++id, title, slug, createdAt, updatedAt, published',
  events: '++id, title, date, createdAt, updatedAt, published, type',
  interventions: '++id, title, slug, createdAt, updatedAt, published, order',
  photos: '++id, title, category, createdAt, published, order',
  members: '++id, name, type, createdAt, updatedAt, published, order'
})

db.version(9).stores({
  volunteers: '++id, email, firstName, lastName, createdAt, status, profileImage, showOnWebsite, biography',
  blogs: '++id, title, slug, createdAt, updatedAt, published',
  events: '++id, title, date, createdAt, updatedAt, published, type',
  interventions: '++id, title, slug, createdAt, updatedAt, published, order',
  photos: '++id, title, category, createdAt, published, order',
  members: '++id, name, type, createdAt, updatedAt, published, order',
  sponsors: '++id, name, createdAt, updatedAt, published, order'
})

// Version 10: Add board member images from firmhealthghana.com
db.version(10).stores({
  volunteers: '++id, email, firstName, lastName, createdAt, status, profileImage, showOnWebsite, biography',
  blogs: '++id, title, slug, createdAt, updatedAt, published',
  events: '++id, title, date, createdAt, updatedAt, published, type',
  interventions: '++id, title, slug, createdAt, updatedAt, published, order',
  photos: '++id, title, category, createdAt, published, order',
  members: '++id, name, type, createdAt, updatedAt, published, order',
  sponsors: '++id, name, createdAt, updatedAt, published, order'
}).upgrade(async tx => {
  const boardImageMap = {
    'Prof. Jerry S. Y. Kuma': {
      image: '/images/board/prof1.png',
      email: 'j.kumafirmhealth@gmail.com',
      position: 'Board Chairman',
      shortBio: 'Former Vice Chancellor of University of Mines and Technology (2012-2020) and Professor of Environmental Hydrogeology.',
      fullBio: 'Former Vice Chancellor of University of Mines and Technology (2012-2020) and recently Rector of Perez University College. Professor of Environmental Hydrogeology and Geophysics holding degrees from University of Ghana (BSc, 1985), ITC Netherlands (PG Dip and MSc, 1990-1991), and University of Newcastle (PhD, 2002). Recipient of Queens Anniversary Prize (2005), Nobles International Award (2013), Africa Education Leadership Award (2015), and ESQR Gold Award (2016). Fellow of multiple professional institutions including Ghana Institution of Geoscientists.'
    },
    'Engr. Dr. Sylvester Akpah': {
      image: '/images/board/member1.jpg',
      email: 's.akpahfirmhealth@gmail.com',
      role: 'Board Member',
      position: 'Chief Executive Officer',
      shortBio: 'CEO with six years NGO management experience and 2018 Mandela Washington Fellow.',
      fullBio: 'Chief Executive Officer with six years NGO management experience leading 15 staff. Lecturer at UMaT in Computer Science specializing in network infrastructure deployment, wireless security, software engineering, and web technologies. Holds MSc and BSc in Information Technology. 2018 Mandela Washington Fellow and Western Regional Coordinator for Operation Smile Ghana.'
    },
    'Mrs. Florence Ansere-Bioh': {
      image: '/images/board/florence.jpg',
      email: 'f.anserefirmhealth@gmail.com',
      position: 'Community Affairs and Public Relations Manager',
      shortBio: 'Community Affairs and Public Relations Manager at Gold Fields Tarkwa Mine with 12+ years experience.',
      fullBio: 'Community Affairs and Public Relations Manager at Gold Fields, Tarkwa Mine with 12+ years mining industry experience across multiple companies. Former Rural Sociologist at CSIR Crops Research Institute. Masters of Philosophy and Bachelor of Arts in Sociology from University of Ghana. Expertise in community relations and communication, exploring local people\'s perspectives, land access and use.'
    },
    'Mr. K.T. Oppong-Kyekyeku': {
      image: '/images/board/oppongk.jpg',
      email: 'k.twumasifirmhealth@gmail.com',
      position: 'Mining Industry Lawyer',
      shortBio: 'Mining industry lawyer with 7+ years at Ghana\'s Minerals Commission.',
      fullBio: 'Mining industry lawyer with 7+ years at Ghana\'s Minerals Commission. Involved in formulating key mining legislation including Ghana Integrated Aluminium Development Corporation Act (2018) and Minerals and Mining Regulations (2018-2020). Served on mining-focused committees and taught Environmental Law as adjunct lecturer at Lancaster University Ghana (2019-2020).'
    },
    'Mr. Kwabena Barning': {
      image: '/images/board/barning.jpg',
      email: 'k.barningfirmhealth@gmail.com',
      position: 'Chief Technical Officer',
      shortBio: 'Chief Technical Officer with 28 years corporate experience across sub-Saharan Africa.',
      fullBio: 'Chief Technical Officer overseeing Business Development and Research. Brings 28 years corporate experience across sub-Saharan Africa with SGS, including Vice President role (2018-19). Managed regional operations in French West Africa and Tropical Southern Africa. Holds MBA from University of Leicester (2008) and BSc Chemistry with Geology from University of Ghana (1992).'
    },
    'Dr. Joseph Darko': {
      image: '/images/board/darko.png',
      email: 'j.darkofirmhealth@gmail.com',
      position: 'Director of Medical Services',
      shortBio: 'Director of Medical Services and Medical Superintendent of Government Hospital, Bogoso.',
      fullBio: 'Director of Medical Services for Firm Health Ghana Foundation and Medical Superintendent of Government Hospital, Bogoso. MBChB from University of Ghana Medical School and MPH from University of Liverpool. Awarded Grand Medal by Ghana for COVID-19 emergency response leadership. Led management of Ghana\'s first Marburg Virus Disease survivor in 2022.'
    },
    'Mr. Michael Fynn Hammond': {
      image: '/images/board/michael.jpg',
      email: 'm.hammondfirmhealth@gmail.com',
      position: 'Assistant Registrar, UMaT',
      shortBio: 'Assistant Registrar at UMaT and YALI Fellow selected from over 2,000 applicants.',
      fullBio: 'Assistant Registrar at UMaT holding MBA (HRM) and Bachelor of Education (Management) from University of Cape Coast. Selected among 119 participants from 2,000+ applicants for YALI\'s fifth cohort (2016). Member of Weducate Initiative focused on empowering northern Ghana communities.'
    }
  }

  await tx.table('members').toCollection().modify(member => {
    if (member.type === 'board' && boardImageMap[member.name]) {
      const updates = boardImageMap[member.name]
      Object.assign(member, updates)
    }
  })
})

// Version 11: Add team member and volunteer images from firmhealthghana.com
db.version(11).stores({
  volunteers: '++id, email, firstName, lastName, createdAt, status, profileImage, showOnWebsite, biography',
  blogs: '++id, title, slug, createdAt, updatedAt, published',
  events: '++id, title, date, createdAt, updatedAt, published, type',
  interventions: '++id, title, slug, createdAt, updatedAt, published, order',
  photos: '++id, title, category, createdAt, published, order',
  members: '++id, name, type, createdAt, updatedAt, published, order',
  sponsors: '++id, name, createdAt, updatedAt, published, order'
}).upgrade(async tx => {
  // Team member images
  const teamImageMap = {
    'Dr. Sylvester Akpah': '/images/team/sly1.jpg',
    'Dr. Joseph Darko': '/images/team/DR.-JOSEPH-DARKO-DIRECTOR-MEDICAL-SERVICES-720x1024.jpg',
    'Emmanuel Smith Yeboah': '/images/team/MR.-EMMANUEL-SMITH-YEBOAH-DIRECTOR-AUDITOR-1-720x1024.jpg',
    'Michael Fynn Hammond': '/images/team/MR.-MICHEAL-HAMMOND-HEAD-LOGISTICS-720x1024.jpg',
    'Gladys Mawusi Fummey': '/images/team/MS.-GLADYS-MAWUSI-FUMMEY-NURSE-IN-CHARGE-1-720x1024.jpg',
    'Prince Charles Ababio': '/images/team/MR.-PRINCE-CHARLES-ABABIO-PHYSICIAN-ASSISTANT-1-720x1024.jpg',
    'Chrysantus A. Yuorkuu': '/images/team/MR.-CHRYSANTUS-YUORKUU-ACCOUNTANT-1-720x1024.jpg',
    'Samuel Kumah': '/images/team/MR.-SAMUEL-KUMAH-COMMUNITY-HEALTH-NURSE-1-720x1024.jpg',
    'Ernest Armoo': '/images/team/MR.-ERNEST-ARMOO-COMMUNITY-HEALTH-NURSE-1-720x1024.jpg',
    'Kwabena Agyemang Yankyera': '/images/team/MR.-KWABENA-AGYEMANG-PHYSICIAN-ASSISTANT-1-720x1024.jpg',
    'Vondee Selasie': '/images/team/NewS.png',
    'Karen Donkor': '/images/team/MS.-KAREN-DONKOR-COMMUNITY-HEALTH-NURSE-1-720x1024.jpg',
    'Nana Afia Serwaah Boadu': '/images/team/NANA-AFIA-SERWAAH-BOADU-PHYSICIAN-ASSISTANT-1-683x1024.jpg',
    'Kornyo Bertha Esinam': '/images/team/bertha.png',
    'Padmore Fosu Amankwah': '/images/team/amankwah.png',
    'Thomas Tetteh': '/images/team/thomas.png'
  }

  // Volunteer images by email
  const volunteerImageMap = {
    'Theophilus': { profileImage: '/images/volunteers/nana.jpg', email: 'theophilusnana17@gmail.com' },
    'Esther': { profileImage: '/images/volunteers/ess2.jpg', email: 'esthermawutor1@gmail.com' },
    'Gideon': { profileImage: '/images/volunteers/gideon.jpg', email: 'gideonabrokwa100@gmail.com' },
    'Abena': { profileImage: '/images/volunteers/abena.jpg', email: 'koramah001@gmail.com' },
    'Bismark': { profileImage: '/images/volunteers/kobby.jpg', email: 'bismarkarthur223@gmail.com' },
    'Rahinatu': { profileImage: '/images/volunteers/rahina.jpg', email: 'rahinayakubu834@gmail.com' },
    'Kwabena': { profileImage: '/images/volunteers/kwabena.jpg', email: 'knyantakyi15@gmail.com' }
  }

  // Update team members
  await tx.table('members').toCollection().modify(member => {
    if (member.type === 'team' && teamImageMap[member.name]) {
      member.image = teamImageMap[member.name]
    }
  })

  // Update volunteers
  await tx.table('volunteers').toCollection().modify(volunteer => {
    if (volunteerImageMap[volunteer.firstName]) {
      const updates = volunteerImageMap[volunteer.firstName]
      Object.assign(volunteer, updates)
    }
  })
})

// Version 12: Update board member emails and bios from firmhealthghana.com/board.html
db.version(12).stores({
  volunteers: '++id, email, firstName, lastName, createdAt, status, profileImage, showOnWebsite, biography',
  blogs: '++id, title, slug, createdAt, updatedAt, published',
  events: '++id, title, date, createdAt, updatedAt, published, type',
  interventions: '++id, title, slug, createdAt, updatedAt, published, order',
  photos: '++id, title, category, createdAt, published, order',
  members: '++id, name, type, createdAt, updatedAt, published, order',
  sponsors: '++id, name, createdAt, updatedAt, published, order'
}).upgrade(async tx => {
  const boardUpdates = {
    'Prof. Jerry S. Y. Kuma': {
      email: 'j.kumafirmhealth@gmail.com',
      shortBio: 'Former Vice Chancellor of University of Mines and Technology (2012-2020) and Professor of Environmental Hydrogeology.',
      fullBio: 'Former Vice Chancellor of University of Mines and Technology (2012-2020) and recently Rector of Perez University College. Professor of Environmental Hydrogeology and Geophysics holding degrees from University of Ghana (BSc, 1985), ITC Netherlands (PG Dip and MSc, 1990-1991), and University of Newcastle (PhD, 2002). Recipient of Queens Anniversary Prize (2005), Nobles International Award (2013), Africa Education Leadership Award (2015), and ESQR Gold Award (2016). Fellow of multiple professional institutions including Ghana Institution of Geoscientists.'
    },
    'Engr. Dr. Sylvester Akpah': {
      email: 's.akpahfirmhealth@gmail.com',
      role: 'Board Member',
      shortBio: 'CEO with six years NGO management experience and 2018 Mandela Washington Fellow.',
      fullBio: 'Chief Executive Officer with six years NGO management experience leading 15 staff. Lecturer at UMaT in Computer Science specializing in network infrastructure deployment, wireless security, software engineering, and web technologies. Holds MSc and BSc in Information Technology. 2018 Mandela Washington Fellow and Western Regional Coordinator for Operation Smile Ghana.'
    },
    'Mrs. Florence Ansere-Bioh': {
      email: 'f.anserefirmhealth@gmail.com',
      shortBio: 'Community Affairs and Public Relations Manager at Gold Fields Tarkwa Mine with 12+ years experience.',
      fullBio: 'Community Affairs and Public Relations Manager at Gold Fields, Tarkwa Mine with 12+ years mining industry experience across multiple companies. Former Rural Sociologist at CSIR Crops Research Institute. Masters of Philosophy and Bachelor of Arts in Sociology from University of Ghana. Expertise in community relations and communication, exploring local people\'s perspectives, land access and use.'
    },
    'Mr. K.T. Oppong-Kyekyeku': {
      email: 'k.twumasifirmhealth@gmail.com',
      shortBio: 'Mining industry lawyer with 7+ years at Ghana\'s Minerals Commission.',
      fullBio: 'Mining industry lawyer with 7+ years at Ghana\'s Minerals Commission. Involved in formulating key mining legislation including Ghana Integrated Aluminium Development Corporation Act (2018) and Minerals and Mining Regulations (2018-2020). Served on mining-focused committees and taught Environmental Law as adjunct lecturer at Lancaster University Ghana (2019-2020).'
    },
    'Mr. Kwabena Barning': {
      email: 'k.barningfirmhealth@gmail.com',
      shortBio: 'Chief Technical Officer with 28 years corporate experience across sub-Saharan Africa.',
      fullBio: 'Chief Technical Officer overseeing Business Development and Research. Brings 28 years corporate experience across sub-Saharan Africa with SGS, including Vice President role (2018-19). Managed regional operations in French West Africa and Tropical Southern Africa. Holds MBA from University of Leicester (2008) and BSc Chemistry with Geology from University of Ghana (1992).'
    },
    'Dr. Joseph Darko': {
      email: 'j.darkofirmhealth@gmail.com',
      shortBio: 'Director of Medical Services and Medical Superintendent of Government Hospital, Bogoso.',
      fullBio: 'Director of Medical Services for Firm Health Ghana Foundation and Medical Superintendent of Government Hospital, Bogoso. MBChB from University of Ghana Medical School and MPH from University of Liverpool. Awarded Grand Medal by Ghana for COVID-19 emergency response leadership. Led management of Ghana\'s first Marburg Virus Disease survivor in 2022.'
    },
    'Mr. Michael Fynn Hammond': {
      email: 'm.hammondfirmhealth@gmail.com',
      shortBio: 'Assistant Registrar at UMaT and YALI Fellow selected from over 2,000 applicants.',
      fullBio: 'Assistant Registrar at UMaT holding MBA (HRM) and Bachelor of Education (Management) from University of Cape Coast. Selected among 119 participants from 2,000+ applicants for YALI\'s fifth cohort (2016). Member of Weducate Initiative focused on empowering northern Ghana communities.'
    }
  }

  await tx.table('members').toCollection().modify(member => {
    if (member.type === 'board' && boardUpdates[member.name]) {
      Object.assign(member, boardUpdates[member.name])
    }
  })
})

// Version 13: Seed intervention programmes
db.version(13).stores({
  volunteers: '++id, email, firstName, lastName, createdAt, status, profileImage, showOnWebsite, biography',
  blogs: '++id, title, slug, createdAt, updatedAt, published',
  events: '++id, title, date, createdAt, updatedAt, published, type',
  interventions: '++id, title, slug, createdAt, updatedAt, published, order',
  photos: '++id, title, category, createdAt, published, order',
  members: '++id, name, type, createdAt, updatedAt, published, order',
  sponsors: '++id, name, createdAt, updatedAt, published, order'
}).upgrade(async tx => {
  const now = new Date().toISOString()
  const interventions = [
    {
      title: 'ICA Programmes',
      slug: 'ica-programmes',
      description: 'A 9-day integrated volunteer programme combining health screening, maternal & child health, medical outreach, and community health worker training in underserved communities.',
      color: '#10b981',
      order: 1,
      published: true,
      createdAt: now,
      updatedAt: now
    },
    {
      title: 'Community Medical Screening',
      slug: 'medical-screening',
      description: 'Free health screenings bringing preventive healthcare directly to communities, with over 13,000 individuals screened across 20+ communities for blood pressure, blood sugar, vision, and more.',
      color: '#3b82f6',
      order: 2,
      published: true,
      createdAt: now,
      updatedAt: now
    },
    {
      title: 'Quarterly Blood Donation Drive',
      slug: 'blood-donation',
      description: 'Saving lives one donation at a time through regular community blood donation drives, addressing the critical shortage of blood supplies in local healthcare facilities.',
      color: '#ef4444',
      order: 3,
      published: true,
      createdAt: now,
      updatedAt: now
    },
    {
      title: 'Feed the Aged & Medical Outreach',
      slug: 'feed-the-aged',
      description: 'Honoring our elders through nutrition, care, and comprehensive medical support — ensuring elderly community members receive nutritious meals and health monitoring.',
      color: '#f59e0b',
      order: 4,
      published: true,
      createdAt: now,
      updatedAt: now
    },
    {
      title: 'Community Interventions',
      slug: 'community-interventions',
      description: 'Transforming lives through diverse health and wellness initiatives including weekly public health radio programmes, health walks, and community awareness campaigns across Ghana.',
      color: '#8b5cf6',
      order: 5,
      published: true,
      createdAt: now,
      updatedAt: now
    }
  ]

  const existing = await tx.table('interventions').count()
  if (existing === 0) {
    await tx.table('interventions').bulkAdd(interventions)
  }
})

export default db
