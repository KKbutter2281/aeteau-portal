export const applicationQuestions = [
  {
    id: "fullName",
    label: "Full Name",
    type: "text",
    required: true,
  },
  {
    id: "email",
    label: "Email Address",
    type: "email",
    required: true,
  },
  {
    id: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
    required: true,
  },
  {
    id: "program",
    label: "Desired Program of Study",
    type: "select",
    options: ["Computer Science", "Business Administration", "Engineering", "Liberal Arts"],
    required: true,
  },
  {
    id: "personalStatement",
    label: "Personal Statement",
    type: "textarea",
    required: true,
  },
  {
    id: "academicAchievements",
    label: "Academic Achievements",
    type: "textarea",
    required: false,
  },
]

