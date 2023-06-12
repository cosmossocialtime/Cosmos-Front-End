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




export default function Painel() {
    const [user, setUser] = useState<userProps | null>(null)
    const [achievements, setAchievements] = useState<| null>(null)
    const [programs, setPrograms] = useState<programsProps | null>(null)

    useEffect(() => {
        api.get("/dashboard")
            .then(response => {
                setUser(response.data.user)
                setAchievements(response.data.achievements)
                setPrograms(response.data.programs)
            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    if (!user || !achievements || !programs) {
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

                    <CurrentMissionsArea
                        programs={programs}
                    />

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

                    <AchievementsArea achievements={achievements} />
                </div>
            </main>
        </div>
    )
}
