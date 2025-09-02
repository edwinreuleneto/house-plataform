"use client"

// Dependencies
import dayjs from "dayjs"
import { useAuth } from "@/context/auth"

// Components
import { FadeIn } from "@/components/Animated"
import GraphUsersQuestion from "./_components/GraphUsersQuestion"
import Stats from "./_components/Stats"
import PopularTopics from "./_components/PopularTopics"


const DashboardPage = () => {
  const { user } = useAuth()

  const getGreeting = () => {
    const hour = dayjs().hour()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  return (
    <>
      <FadeIn>
        <div className="grid grid-cols-[auto_auto] justify-between">
          <header className="flex flex-col gap-2 mb-12">
            <h1 className="text-2xl font-medium text-neutral-600">
              {getGreeting()}, {user?.user?.name?.split(" ")[0] || user?.user?.email || 'User'} 👋
            </h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 -mt-2">
              Track the main indicators and alerts.
            </p>
          </header>
        </div>
        <div className="-mt-20">
          <GraphUsersQuestion />
          <Stats />
        </div>
        <div className="mt-20">
          <PopularTopics />
        </div>
      </FadeIn>
    </>
  );
};

export default DashboardPage;
