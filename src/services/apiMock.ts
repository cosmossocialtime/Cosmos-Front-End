import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { CompanyProps } from '../types/company'
import { AchievementProps } from '../types/achievement'
import { MentorshipProps } from '../types/mentorship'
import { ProgramProps } from '../types/program'
import { UserProps } from '../types/user'

const axiosInstance = axios.create()

const mock = new MockAdapter(axiosInstance)

const achievements: AchievementProps[] = [
  { id: 1, achievement: 'finished_onboarding', completed: true },
  { id: 2, achievement: 'has_profile_picture', completed: true },
  { id: 3, achievement: 'first_application', completed: false },
  { id: 4, achievement: 'first_volunteering', completed: false },
  { id: 5, achievement: 'been_leader', completed: false },
  { id: 6, achievement: 'been_pilot', completed: false },
  { id: 7, achievement: 'been_specialist', completed: false },
  { id: 8, achievement: 'completed_mission', completed: false },
]
const company: CompanyProps = {
  id: 1,
  logo: 'https://cosmos-social-bucket.s3.us-east-2.amazonaws.com/company/1/logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAZIEUSTA4M57YAQM3%2F20230720%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20230720T155336Z&X-Amz-Expires=86400&X-Amz-Signature=f72f8e9740b52b99320d9b7e47dbef862666675753e38b3b16da3d2ea9356801&X-Amz-SignedHeaders=host&x-id=GetObject',
  name: 'Eitau',
}
const mentorships: MentorshipProps[] = [
  {
    currentStepId: 1,
    description: 'Programa Social Eitau',
    endDate: new Date('2024-05-28T00:00:00.000Z'),
    logo: null,
    mentorshipId: 1,
    name: 'Programa Social Eitau para Meio Ambiente',
    programId: 1,
    socialOrganizationId: 13,
    startDate: new Date('2023-07-28T00:00:00.000Z'),
    steps: [
      {
        stepId: 1,
        step: 'Introdução',
        startDate: new Date('2023-06-30'),
        endDate: new Date('2023-07-30'),
        status: true,
        video: null,
      },
      {
        stepId: 2,
        step: 'Imagens de Satélite',
        startDate: new Date('2023-06-30'),
        endDate: new Date('2023-07-15'),
        status: true,
        video: 'ew1RDp_bY2w',
      },
      {
        stepId: 3,
        step: 'Encontro da Tripulação',
        startDate: new Date('2023-07-16'),
        endDate: new Date('2023-08-28'),
        status: true,
        video: 'MTocA7ZrW60',
      },
      {
        stepId: 4,
        step: 'Encontro com a Estrela',
        startDate: new Date('2023-06-30'),
        endDate: new Date('2023-09-28'),
        status: true,
        video: 'mMB0zFEPDQo',
      },
      {
        stepId: 5,
        step: 'O Mapa de Navegação',
        startDate: new Date('2023-10-30'),
        endDate: new Date('2023-11-27'),
        status: false,
        video: 'uLeey20XQrE',
      },
      {
        stepId: 6,
        step: 'Executando a Missão',
        startDate: new Date('2023-11-30'),
        endDate: new Date('2023-10-15'),
        status: false,
        video: 'RMPX_vgqQnM',
      },
      {
        stepId: 7,
        step: 'Encontro Final',
        startDate: new Date('2023-10-20'),
        endDate: new Date('2023-11-20'),
        status: false,
        video: 'hCeNSPM3zeA',
      },
    ],
    weeklyHours: 4,
  },
]

const programs: ProgramProps[] = [
  {
    id: 1,
    name: 'Programa Social Eitau para Meio Ambiente',
    description: 'Programa Social Eitau',
    applied: false,
    completed: false,
    weeklyHours: 4,
    companyName: 'Itaú',
    createdAt: new Date('2023-06-02T01:23:44.000Z'),
    startDate: new Date('2023-07-22T00:00:00.000Z'),
    endDate: new Date('2024-05-28T00:00:00.000Z'),
    disclosureDate: new Date('2023-07-24T00:00:00.000Z'),
    updatedAt: new Date('2023-06-02T01:23:44.000Z'),
    volunteerApplicationId: 6,
  },
]

const user: UserProps = {
  id: 5,
  fullName: 'Eitau user',
  byname: 'Eitau três',
  email: 'eitau3@cosmossocial.com',
  gender: 'Âgenero',
  birthdate: new Date('2005-02-10T00:00:00.000Z'),
  country: true,
  state: 'GO',
  city: 'Abadia de Goiás',
  company: 'Itau',
  companyId: 1,
  socialOrganizationId: null,
  completedOnboarding: false,
  professionalExperience: 1,
  professionalSector: 'Front-end',
  professionalRole: 'ueeee',
  availableTime: 2,
  linkedinUrl: 'linkedin.com',
  professionalPreviousExperiences:
    'nao tenho experiências profissionais nao tenho experiências profissionais nao tenho experiências profissionais',
  mainCompetencies:
    'nao tenho muitas competências, mas sou bom programando react entre outras coisas, mas na vdd so to enrrolar',
  reasonToJoin:
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  previousMentorship: null,
  banner:
    'https://cosmos-social-bucket.s3.us-east-2.amazonaws.com/user/5/banner.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAZIEUSTA4M57YAQM3%2F20230720%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20230720T155336Z&X-Amz-Expires=86400&X-Amz-Signature=cd8321fc6bb6670acd9233622f0bf37d8f421484077c239dcdd4352584a9d603&X-Amz-SignedHeaders=host&x-id=GetObject',
  profilePicture:
    'https://cosmos-social-bucket.s3.us-east-2.amazonaws.com/user/5/profile.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAZIEUSTA4M57YAQM3%2F20230720%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20230720T155336Z&X-Amz-Expires=86400&X-Amz-Signature=7fe28a029f22b6d5a1c41660e0b57a0669b3545cad43976e46224e6d175e73d3&X-Amz-SignedHeaders=host&x-id=GetObject',
  roleId: 4,
  role: {
    id: 1,
    role: 'commander',
  },
  isVerified: true,
}

mock.onGet('/dashboard').reply(200, {
  achievements,
  company,
  mentorships,
  programs,
  user,
})

mock.onGet('/mentorships').reply(200, {
  mentorships,
})

export default axiosInstance
