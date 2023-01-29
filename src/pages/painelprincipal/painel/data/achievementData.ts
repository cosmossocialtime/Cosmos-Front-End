import beltOnIcon from '../assets/icons/belt-on-icon.svg';
import beltOffIcon from '../assets/icons/belt-off-icon.svg';

import bootOnIcon from '../assets/icons/boot-on-icon.svg';
import bootOffIcon from '../assets/icons/boot-off-icon.svg';

import camOnIcon from '../assets/icons/cam-on-icon.svg';
import camOffIcon from '../assets/icons/cam-off-icon.svg';

import flagOnIcon from '../assets/icons/flag-on-icon.svg';
import flagOffIcon from '../assets/icons/flag-off-icon.svg';

import flyingSpaceshipOnIcon from '../assets/icons/flying-spaceship-on-icon.svg';
import flyingSpaceshipOffIcon from '../assets/icons/flying-spaceship-off-icon.svg';

import meteorOnIcon from '../assets/icons/meteor-on-icon.svg';
import meteorOffIcon from '../assets/icons/meteor-off-icon.svg';

import ovniOnIcon from '../assets/icons/ovni-on-icon.svg';
import ovniOffIcon from '../assets/icons/ovni-off-icon.svg';

import spaceshipOnIcon from '../assets/icons/spaceship-on-icon.svg';
import spaceshipOffIcon from '../assets/icons/spaceship-off-icon.svg';

export const achievementsData = [
    {
        id: 1,
        imageOn: bootOnIcon,
        imageOff: bootOffIcon,
        title: "Um pequeno passo",
        description: "Cadastrou-se e passou pelas boas-vindas ",
        status: true,
    }, 
    {
        id: 2,
        imageOn: camOnIcon,
        imageOff: camOffIcon,
        title: "Diga Xis",
        description: "Completou seu perfil com uma foto",
        status: true,
    }, 
    {
        id: 3,
        imageOn: beltOnIcon,
        imageOff: beltOffIcon,
        title: "Aperte os cintos",
        description: "Inscreveu-se na sua primeira aventura",
        status: true,
    },
    {
        id: 4,
        imageOn: spaceshipOnIcon,
        imageOff: spaceshipOffIcon,
        title: "3...2...1...",
        description: "Foi aceito(a) na primeira missão de voluntariado",
        status: true,
    },
    {
        id: 5,
        imageOn: flagOnIcon,
        imageOff: flagOffIcon,
        title: "No comando",
        description: "Foi Comandante pela primeira vez",
        status: false,
    },    
    {
        id: 6,
        imageOn: flyingSpaceshipOnIcon,
        imageOff: flyingSpaceshipOffIcon,
        title: "Pisando fundo",
        description: "Foi Piloto(a) pela primeira vez",
        status: false,
    },    
    {
        id: 7,
        imageOn: ovniOnIcon,
        imageOff: ovniOffIcon,
        title: "Coletando amostras",
        description: "Foi Especialista pela primeira vez",
        status: false,
    }, 
    {
        id: 8,
        imageOn: meteorOnIcon,
        imageOff: meteorOffIcon,
        title: "Reajustando as coordenadas",
        description: "Completou sua primeira missão",
        status: false,
    },    
]