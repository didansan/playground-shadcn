import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ListChecksIcon, PieChartIcon, StarIcon, UsersIcon } from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import TeamDistributionPie from "@/components/teams/team-distribution-pie";
import ResolvedTicketsChart from "@/components/teams/resolved-tickets-chart";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const leaders = ["CM", "TP", "LF", "RL", "KJ", "TJ", "AA", "TF", "JJ"];

export default function TeamsStats() {
  const totalTeams = 8;

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle>Total teams</CardTitle></CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="flex gap-2">
              <UsersIcon/>
              <span className="text-4xl font-bold">{totalTeams}</span>
            </div>
            <div>
              <Button size="xs" asChild><Link href="/teams">View All</Link></Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Team leaders</span>
              <StarIcon className="text-yellow-500"/>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {leaders.map(leader => (
              <Tooltip key={leader}>
                <TooltipTrigger asChild>
                  <Avatar>
                    <AvatarImage src={`/images/${leader.toLowerCase()}.jpg`} alt={`${leader} avatar`}/>
                    <AvatarFallback>{leader}</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{leader}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Team distribution</span>
              <PieChartIcon/>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2 items-center">
            <TeamDistributionPie/>
          </CardContent>
        </Card>
      </div>
      <Card className="my-4">
        <CardTitle className="flex items-center gap-2 text-lg pl-4">
          <ListChecksIcon/>
          <span>Support tickets resolved</span>
        </CardTitle>
        <CardContent>
          <ResolvedTicketsChart/>
        </CardContent>
      </Card>
    </>
  );
}
