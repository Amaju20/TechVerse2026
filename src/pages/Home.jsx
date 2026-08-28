import EventHero from "../components/EventHero";
import ScheduleGrid from "../components/ScheduleGrid";

export default function Home() {
  return (
    <div className="min-h-screen">
      <EventHero />
      <ScheduleGrid />
    </div>
  )
}
