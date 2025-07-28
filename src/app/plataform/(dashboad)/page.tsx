"use client";

// Dependencies
import { useAuth } from "@/context/auth";
import dayjs from "dayjs";

// Components
import { FadeIn } from "@/components/Animated";
import Stats from "./_components/Stats";
import PopularTopics from "./_components/PopularTopics";
import GraphUsersQuestion from "./_components/GraphUsersQuestions";

const DashboardPage = () => {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = dayjs().hour();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  return (
    <>
      <FadeIn>
        <div className="grid grid-cols-[auto_auto] justify-between">
          <header className="flex flex-col gap-2 mb-12">
            <h1 className="text-2xl font-medium text-neutral-600">
              {getGreeting()}, {user?.user.name?.split(" ")[0]} 👋
            </h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 -mt-2">
              Acompanhe os principais indicadores e alertas.
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
