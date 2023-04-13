import Header from "../components/Header";
import AchievementsArea from "./AchievementsArea";
import AdventureArea from "./AdventureArea";
import CurrentAchievement from "./CurrentAchievement";
import CurrentMissionsArea from "./CurrentMissionsArea";
import missionsData from "./data/missionsData";
import PerfilArea from "./PerfilArea";

export default function Painel() {
    return (
        <div className="max-w-[100vw] flex flex-col h-screen">
            <Header />

            <main className="px-16 py-5 bg-gray-800 flex-1 flex gap-6">
                <div className="flex flex-col gap-6 flex-1">
                    <CurrentAchievement />

                    {missionsData.length !== 0 &&
                        <CurrentMissionsArea />
                    }

                    <AdventureArea />
                </div>

                <div className="flex flex-col gap-6">
                    <PerfilArea />

                    <AchievementsArea openMission={"example"} />
                </div>
            </main>
        </div>
    )
}