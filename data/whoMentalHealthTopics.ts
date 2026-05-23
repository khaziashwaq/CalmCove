export interface MentalHealthTopic {
  id: number;
  title: string;
  description: string;
  keyFacts: string[];
  symptoms: string[];
  treatments: string[];
  selfCare: string[];
  source: string;
  category: string;
  icon: string;
}

export const whoMentalHealthTopics: MentalHealthTopic[] = [
  {
    id: 1,
    title: "Depression",
    description:
      "Depressive disorder is a common mental disorder involving a depressed mood or loss of pleasure or interest in activities for long periods of time. It is different from regular mood changes and feelings about everyday life and can affect all aspects of life.",
    keyFacts: [
      "An estimated 4% of the global population experiences depression, including 5.7% of adults.",
      "More women are affected by depression than men (6.9% vs 4.6%).",
      "Depression can lead to suicide — 727,000 people lost their lives to suicide in 2021.",
      "In high-income countries, only about one third of people with depression receive treatment.",
      "Approximately 332 million people in the world have depression.",
    ],
    symptoms: [
      "Depressed mood (feeling sad, irritable, empty)",
      "Loss of pleasure or interest in activities",
      "Poor concentration",
      "Feelings of excessive guilt or low self-worth",
      "Hopelessness about the future",
      "Thoughts about dying or suicide",
      "Disrupted sleep",
      "Changes in appetite or weight",
      "Feeling very tired or low in energy",
    ],
    treatments: [
      "Behavioural activation",
      "Cognitive behavioural therapy (CBT)",
      "Interpersonal psychotherapy",
      "Problem-solving therapy",
      "Antidepressant medications such as SSRIs (for moderate/severe cases)",
    ],
    selfCare: [
      "Try to keep doing activities you used to enjoy",
      "Stay connected to friends and family",
      "Exercise regularly, even if it's just a short walk",
      "Stick to regular eating and sleeping habits",
      "Avoid or cut down on alcohol and don't use illicit drugs",
      "Talk to someone you trust about your feelings",
    ],
    source: "https://www.who.int/news-room/fact-sheets/detail/depression",
    category: "Mood Disorders",
    icon: "🌧️",
  },
  {
    id: 2,
    title: "Anxiety Disorders",
    description:
      "Anxiety disorders are the world's most common mental disorders, characterised by excessive fear and worry and related behavioural disturbances. Symptoms are severe enough to result in significant distress or impairment in functioning.",
    keyFacts: [
      "359 million people were living with anxiety disorders in 2021, including 72 million children.",
      "Anxiety disorders are the most common mental disorders worldwide.",
      "More women are affected than men.",
      "Symptoms often begin during childhood or adolescence.",
      "Only about 1 in 4 people with anxiety disorders receive treatment.",
    ],
    symptoms: [
      "Excessive fear and worry",
      "Trouble concentrating or making decisions",
      "Feeling irritable, tense or restless",
      "Nausea or abdominal distress",
      "Heart palpitations",
      "Sweating, trembling or shaking",
      "Trouble sleeping",
      "Sense of impending danger, panic or doom",
    ],
    treatments: [
      "Cognitive behavioural therapy (CBT)",
      "Exposure therapy",
      "Stress management and relaxation skills training",
      "Mindfulness-based interventions",
      "Antidepressant medications (SSRIs) for adults",
    ],
    selfCare: [
      "Avoid or cut down on alcohol and don't use illicit drugs",
      "Exercise regularly, even if it's just a short walk",
      "Stick to regular eating and sleeping habits",
      "Learn relaxation techniques like slow breathing and progressive muscle relaxation",
      "Develop a habit of mindfulness meditation",
    ],
    source:
      "https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders",
    category: "Anxiety Disorders",
    icon: "🌊",
  },
  {
    id: 3,
    title: "Bipolar Disorder",
    description:
      "People with bipolar disorder experience alternating depressive episodes with periods of manic symptoms. Manic symptoms may include euphoria or irritability, increased activity or energy, racing thoughts, and impulsive reckless behaviour.",
    keyFacts: [
      "37 million people experienced bipolar disorder in 2021.",
      "Includes 3.8 million adolescents aged 10–19 years.",
      "People with bipolar disorder are at an increased risk of suicide.",
      "Effective treatment options exist including psychoeducation and medication.",
    ],
    symptoms: [
      "Depressive episodes: sad, irritable, empty mood",
      "Manic episodes: euphoria or irritability",
      "Increased activity or energy",
      "Increased talkativeness and racing thoughts",
      "Increased self-esteem",
      "Decreased need for sleep",
      "Distractibility",
      "Impulsive reckless behaviour",
    ],
    treatments: [
      "Psychoeducation",
      "Reduction of stress",
      "Strengthening social functioning",
      "Mood stabiliser medications",
    ],
    selfCare: [
      "Maintain a regular daily routine",
      "Track your mood patterns",
      "Get adequate sleep each night",
      "Stay connected to your support network",
      "Avoid alcohol and substances",
    ],
    source:
      "https://www.who.int/news-room/fact-sheets/detail/mental-disorders",
    category: "Mood Disorders",
    icon: "⚡",
  },
  {
    id: 4,
    title: "Post-Traumatic Stress Disorder (PTSD)",
    description:
      "PTSD may develop following exposure to an extremely threatening or horrific event or series of events. It is characterised by re-experiencing the traumatic event, avoidance of reminders, and persistent perceptions of heightened current threat.",
    keyFacts: [
      "PTSD develops after exposure to extremely threatening or horrific events.",
      "Symptoms must persist for at least several weeks for diagnosis.",
      "PTSD causes significant impairment in functioning.",
      "Effective psychological treatment exists.",
    ],
    symptoms: [
      "Intrusive memories, flashbacks, or nightmares of the traumatic event",
      "Avoidance of thoughts and memories of the event",
      "Avoidance of activities, situations, or people reminiscent of the event",
      "Persistent perceptions of heightened current threat",
      "Being easily startled",
      "Difficulty concentrating",
    ],
    treatments: [
      "Trauma-focused cognitive behavioural therapy",
      "Eye Movement Desensitisation and Reprocessing (EMDR)",
      "Stress management techniques",
      "Psychological first aid",
    ],
    selfCare: [
      "Establish a sense of safety in your daily life",
      "Practice grounding techniques when experiencing flashbacks",
      "Maintain connections with supportive people",
      "Engage in physical activity",
      "Be patient with your recovery process",
    ],
    source:
      "https://www.who.int/news-room/fact-sheets/detail/post-traumatic-stress-disorder",
    category: "Trauma-Related Disorders",
    icon: "🔥",
  },
  {
    id: 5,
    title: "Schizophrenia",
    description:
      "Schizophrenia is characterised by significant impairments in perception and changes in behaviour. Symptoms may include persistent delusions, hallucinations, disorganised thinking, or extreme agitation.",
    keyFacts: [
      "Affects approximately 23 million people worldwide (1 in 345 people).",
      "People with schizophrenia have a life expectancy nine years below the general population.",
      "Causes persistent difficulties with cognitive functioning.",
      "A range of effective treatment options exist.",
    ],
    symptoms: [
      "Persistent delusions",
      "Hallucinations",
      "Disorganised thinking",
      "Highly disorganised behaviour",
      "Extreme agitation",
      "Persistent cognitive difficulties",
    ],
    treatments: [
      "Antipsychotic medication",
      "Psychoeducation",
      "Family interventions",
      "Psychosocial rehabilitation",
    ],
    selfCare: [
      "Take medications as prescribed",
      "Attend regular follow-up appointments",
      "Maintain a structured daily routine",
      "Stay connected with support groups",
      "Practice stress reduction techniques",
    ],
    source: "https://www.who.int/news-room/fact-sheets/detail/schizophrenia",
    category: "Psychotic Disorders",
    icon: "🧠",
  },
  {
    id: 6,
    title: "Eating Disorders",
    description:
      "Eating disorders such as anorexia nervosa and bulimia nervosa involve abnormal eating and preoccupation with food as well as prominent body weight and shape concerns. The symptoms result in significant risk or damage to health.",
    keyFacts: [
      "16 million people experienced eating disorders in 2021.",
      "Almost 3.4 million children and adolescents are affected.",
      "Anorexia nervosa is associated with premature death due to medical complications or suicide.",
      "Individuals with bulimia nervosa are at increased risk for substance use and suicidality.",
    ],
    symptoms: [
      "Abnormal eating patterns",
      "Preoccupation with food",
      "Prominent body weight and shape concerns",
      "Restrictive eating (anorexia)",
      "Binge eating followed by purging (bulimia)",
      "Significant distress about eating behaviours",
    ],
    treatments: [
      "Family-based treatment",
      "Cognitive-based therapy",
      "Nutritional counselling",
      "Medical monitoring",
    ],
    selfCare: [
      "Challenge negative thoughts about body image",
      "Eat regular, balanced meals",
      "Avoid comparing yourself to others",
      "Seek support from trusted friends or family",
      "Practice self-compassion",
    ],
    source:
      "https://www.who.int/news-room/fact-sheets/detail/mental-disorders",
    category: "Eating Disorders",
    icon: "🍃",
  },
  {
    id: 7,
    title: "Suicide Prevention",
    description:
      "More than 720,000 people die due to suicide every year. Suicide is a serious public health problem, but with timely, evidence-based and often low-cost interventions, suicides can be prevented.",
    keyFacts: [
      "More than 720,000 people die due to suicide every year.",
      "Suicide is the third leading cause of death among 15–29-year-olds.",
      "73% of global suicides occur in low- and middle-income countries.",
      "A prior suicide attempt is an important risk factor.",
      "With timely interventions, suicides can be prevented.",
    ],
    symptoms: [
      "Talking about wanting to die or feeling hopeless",
      "Withdrawing from social contact",
      "Mood swings or emotional changes",
      "Giving away possessions",
      "Increased use of alcohol or drugs",
      "Sleeping too much or too little",
    ],
    treatments: [
      "Limiting access to means of suicide",
      "Responsible media reporting of suicide",
      "Fostering socio-emotional life skills in adolescents",
      "Early identification, assessment and follow-up",
      "Crisis intervention and counselling",
    ],
    selfCare: [
      "Talk to someone you trust about how you feel",
      "Remember you are not alone — many have found help",
      "Contact a health worker, doctor or counsellor",
      "Join a support group",
      "If in immediate danger, contact emergency services or a crisis line",
    ],
    source: "https://www.who.int/news-room/fact-sheets/detail/suicide",
    category: "Crisis Support",
    icon: "💙",
  },
  {
    id: 8,
    title: "ADHD (Attention Deficit Hyperactivity Disorder)",
    description:
      "ADHD is a neurodevelopmental disorder characterised by a persistent pattern of inattention and/or hyperactivity-impulsivity that has a direct negative impact on academic, occupational, or social functioning.",
    keyFacts: [
      "ADHD is one of the most common neurodevelopmental disorders.",
      "Symptoms typically appear during childhood.",
      "ADHD affects academic, occupational, and social functioning.",
      "Effective treatment options exist including behavioural interventions and medication.",
    ],
    symptoms: [
      "Persistent inattention",
      "Hyperactivity",
      "Impulsivity",
      "Difficulty sustaining attention in tasks",
      "Frequently losing things",
      "Difficulty organising tasks and activities",
    ],
    treatments: [
      "Psychosocial interventions",
      "Behavioural interventions",
      "Occupational therapy",
      "Medication (for certain age groups)",
    ],
    selfCare: [
      "Use organisational tools and checklists",
      "Break large tasks into smaller steps",
      "Maintain a structured daily routine",
      "Exercise regularly",
      "Minimise distractions in your environment",
    ],
    source:
      "https://www.who.int/news-room/fact-sheets/detail/mental-disorders",
    category: "Neurodevelopmental Disorders",
    icon: "🎯",
  },
  {
    id: 9,
    title: "Autism Spectrum Disorder (ASD)",
    description:
      "Autism spectrum disorder constitutes a diverse group of conditions characterised by some degree of difficulty with social communication and reciprocal social interaction, as well as persistent restricted, repetitive patterns of behaviour, interests, or activities.",
    keyFacts: [
      "ASD is a neurodevelopmental condition present from early childhood.",
      "It involves difficulty with social communication and interaction.",
      "Restricted, repetitive patterns of behaviour are characteristic.",
      "Effective support options include speech therapy and occupational therapy.",
    ],
    symptoms: [
      "Difficulty with social communication",
      "Challenges with reciprocal social interaction",
      "Restricted, repetitive patterns of behaviour",
      "Inflexible patterns of interests or activities",
      "Sensory sensitivities",
    ],
    treatments: [
      "Psychosocial interventions",
      "Behavioural interventions",
      "Occupational therapy",
      "Speech therapy",
    ],
    selfCare: [
      "Create a supportive and predictable environment",
      "Use visual schedules and clear communication",
      "Connect with autism support communities",
      "Identify and work with individual strengths",
      "Practice self-advocacy",
    ],
    source:
      "https://www.who.int/news-room/fact-sheets/detail/autism-spectrum-disorders",
    category: "Neurodevelopmental Disorders",
    icon: "🧩",
  },
  {
    id: 10,
    title: "Stress Management",
    description:
      "Stress is a natural response to challenges, but chronic stress can harm mental and physical health. WHO recommends evidence-based approaches including relaxation techniques, problem-solving therapy, and maintaining social connections.",
    keyFacts: [
      "Chronic stress is a risk factor for depression, anxiety, and cardiovascular disease.",
      "Stress affects physical health through the nervous system and immune function.",
      "Effective stress management can prevent the onset of mental disorders.",
      "Community and social support are key protective factors.",
    ],
    symptoms: [
      "Feeling overwhelmed or unable to cope",
      "Physical tension and headaches",
      "Difficulty sleeping",
      "Irritability and mood changes",
      "Difficulty concentrating",
      "Changes in appetite",
    ],
    treatments: [
      "Problem Management Plus (PM+)",
      "Cognitive behavioural approaches",
      "Social support strengthening",
      "Relaxation and mindfulness training",
    ],
    selfCare: [
      "Practice slow breathing and progressive muscle relaxation",
      "Exercise regularly",
      "Maintain regular eating and sleeping habits",
      "Stay connected with friends and family",
      "Limit alcohol and avoid substances",
      "Practice mindfulness meditation daily",
    ],
    source:
      "https://www.who.int/publications/i/item/9789240003927",
    category: "Wellbeing",
    icon: "🌿",
  },
];
