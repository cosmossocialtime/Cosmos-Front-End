
import Main from '../../components/Main'
import { PageTitle } from '../../components/TitlesAndLinks/PageTitles'
import { LoginLink } from '../../components/TitlesAndLinks/LinkLogin'
import { CaretRight, User, UsersThree } from 'phosphor-react'
import router from 'next/router'
import { SelectableButton } from '../../components/Button/SelectableButton'


export default function SelectRoleOnboarding() {

    return (
        <div>
            <div className="flex h-screen">
                <Main />
                <main className="flex w-full flex-col items-center justify-center gap-2">
                    <PageTitle text='Crie sua conta na Cosmos'></PageTitle>
                    <form
                        className="mt-4 flex w-1/2 flex-col gap-2"
                    >
                        <div className="w-full max-w-[448px] space-y-4">
                            <SelectableButton
                                text=" Quero me voluntariar em um projeto"
                                icon={<User size={20} />}
                                onClick={() => router.push("/user/register")}
                                arrow={<CaretRight size={20} />}
                            />
                            <div className="pt-[20px]">
                                <SelectableButton
                                    text="Quero conectar minha Organização Social a pessoas voluntárias"
                                    icon={<UsersThree size={20} />}
                                    onClick={() => router.push("/institutions/onboarding/register")}
                                    arrow={<CaretRight size={20} />}
                                />
                            </div>
                        </div>
                    </form>
                    <LoginLink></LoginLink>
                </main>
            </div>
        </div>
    )
};
