import { truncateSync } from 'fs'
import beltOffIcon from '../assets/icons/belt-off-icon.svg'
import bootOffIcon from '../assets/icons/boot-off-icon.svg'
import camOffIcon from '../assets/icons/cam-off-icon.svg'
import flagOffIcon from '../assets/icons/flag-off-icon.svg'
import flyingSpaceshipOffIcon from '../assets/icons/flying-spaceship-off-icon.svg'
import meteorOffIcon from '../assets/icons/meteor-off-icon.svg'
import ovniOffIcon from '../assets/icons/ovni-off-icon.svg'
import spaceshipOffIcon from '../assets/icons/spaceship-off-icon.svg'

export const incompleteAchievements = [
  {
    id: 1,
    image: bootOffIcon,
    title: 'Um pequeno passo',
    description: 'Cadastre-se e passe pelas boas-vindas',
    completeLink: false,
  },
  {
    id: 2,
    image: camOffIcon,
    title: 'Diga Xis',
    description: 'Complete seu perfil com uma foto',
    completeLink: false,
  },
  {
    id: 3,
    image: beltOffIcon,
    title: 'Aperte os cintos',
    description: 'Inscreva-se na sua primeira aventura',
    completeLink: false,
  },
  {
    id: 4,
    image: spaceshipOffIcon,
    title: '3...2...1...',
    description: 'Seja aceito(a) na primeira missão de voluntariado',
    completeLink: false,
  },
  {
    id: 5,
    image: flagOffIcon,
    title: 'No comando',
    description: 'Seja Comandante pela primeira vez',
    completeLink: false,
  },
  {
    id: 6,
    image: flyingSpaceshipOffIcon,
    title: 'Pisando fundo',
    description: 'Seja Piloto(a) pela primeira vez',
    completeLink: false,
  },
  {
    id: 7,
    image: ovniOffIcon,
    title: 'Coletando amostras',
    description: 'Seja Especialista pela primeira vez',
    completeLink: false,
  },
  {
    id: 8,
    image: meteorOffIcon,
    title: 'Reajustando as coordenadas',
    description: 'Complete sua primeira missão',
    completeLink: false,
  },
  {
    id: 9,
    image: bootOffIcon,
    title: 'Um pequeno passo',
    description: 'Cadastrou-se e passou pelas boas-vindas',
    completeLink: false,
  },
  {
    id: 10,
    image: flagOffIcon,
    title: 'Supernova!',
    description: 'Complete as informações da Organização',
    completeLink: true,
  },
  {
    id: 11,
    image: meteorOffIcon,
    title: 'Mestre das galáxias',
    description: 'Complete os dados sobre as áreas da organização',
    completeLink: false,
  },
  {
    id: 12,
    image: beltOffIcon,
    title: 'Aperte os cintos',
    description: 'Inscreva-se na sua primeira aventura',
    completeLink: false,
  },
  {
    id: 13,
    image: spaceshipOffIcon,
    title: '3...2...1...',
    description: 'Sua organização foi aceita em uma missão de voluntariado',
    completeLink: false,
  },
  {
    id: 14,
    image: flyingSpaceshipOffIcon,
    title: 'Reajustando coordenadas',
    description: 'Complete sua primeira missão',
    completeLink: false,
  },
]
