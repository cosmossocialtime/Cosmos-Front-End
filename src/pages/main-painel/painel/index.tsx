import Header from "../../../components/main-painel/Header";

import PerfilArea from "../../../components/main-painel/painel/PerfilArea";
import CurrentAchievement from "../../../components/main-painel/painel/CurrentAchievement";
import CurrentMissionsArea from "../../../components/main-painel/painel/CurrentMissionsArea";
import AdventureArea from "../../../components/main-painel/painel/AdventureArea";
import AchievementsArea from "../../../components/main-painel/painel/AchievementsArea";
import missionsData from "../../../data/missionsData";

export default function Painel() {
    return (
        <div className="max-w-[100vw] flex flex-col h-screen">
            <Header />

            <main className="px-16 py-5 bg-gray-800 flex-1 flex gap-6">
                <div className="flex flex-col gap-6 flex-1 w-4/6">
                    <CurrentAchievement />

                    {missionsData.length !== 0 &&
                        <CurrentMissionsArea />
                    }

                    <AdventureArea />
                </div>

                <div className="flex flex-col gap-6 w-1/3">
                    <PerfilArea />

                    <AchievementsArea openMission={"example"} />
                </div>
            </main>
        </div>
    )
}