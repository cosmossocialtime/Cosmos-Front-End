import Header from "../../../components/main-painel/Header";

import PerfilArea from "../../../components/main-painel/painel/PerfilArea";
import CurrentAchievement from "../../../components/main-painel/painel/CurrentAchievement";
import CurrentMissionsArea from "../../../components/main-painel/painel/CurrentMissionsArea";
import AdventureArea from "../../../components/main-painel/painel/AdventureArea";
import AchievementsArea from "../../../components/main-painel/painel/AchievementsArea";
import { api } from "../../../services/api";
import { useEffect, useState } from "react";
import { userProps } from "../../../types/user";
import { programsProps } from "../../../types/programs";
import { achievementsProps } from "../../../types/achievements";
import { desaturate } from "polished";
import { Description } from "@radix-ui/react-dialog";




export default function Painel() {
    const date = new Date();
    const [user, setUser] = useState<userProps | null>(null)
    const [achievements, setAchievements] = useState<achievementsProps>([])
    const [programs, setPrograms] = useState<programsProps>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        api.get("/dashboard")
            .then(response => {
                setUser(response.data.user)
                setAchievements(response.data.achievements)
                setPrograms(response.data.programs)
                setIsLoading(false)
            })
            .catch(error => {
                setIsLoading(false)
                console.error(error)
            })
    }, [])

    if (!user || !achievements) {
        return;
    }
    return (
        <div className="max-w-[100vw] flex flex-col h-screen">
            <Header />

            <main className="px-16 py-5 bg-gray-800 flex-1 flex gap-6">
                <div className="flex flex-col gap-6 flex-1 w-4/6">
                    <CurrentAchievement
                        achievements={achievements}
                    />

                    {programs.length !== 0 &&
                        <CurrentMissionsArea
                            programs={programs}
                        />
                    }

                    <AdventureArea
                        programs={programs}
                    />
                </div>

                <div className="flex flex-col gap-6 w-1/3">
                    <PerfilArea
                        bannerPicture={user.banner}
                        profilePicture={user.profilePicture}
                        name={user.byname}
                    />

                    <div className={`${programs.length === 0 ? "h-[17rem]" : "h-[36rem]"} flex flex-col relative p-6 bg-[#1E2543] rounded-lg`}>
                        <div className="mb-2 flex justify-between">
                            <span className="text-gray-500">Minhas conquistas:</span>
                            <span className="text-sm text-gray-500">
                                <strong className="text-gray-200">{achievements.filter(achievement => achievement.completed).length}</strong> de 8
                            </span>
                        </div>

                        <AchievementsArea achievements={achievements} />
                        
                        <div className="absolute box-border left-0 right-4 bottom-0 m-6 h-12 bg-gradient-to-t from-[#1E2543]"></div>
                    </div>
                </div>
            </main>
        </div>
    )
}
