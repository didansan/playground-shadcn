import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {
  AlertTriangleIcon,
  BadgeCheckIcon, PartyPopperIcon,
  UserCheckIcon,
  UserIcon,
  UserRoundXIcon
} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export default function EmployeesStats() {
  const totalEmployees = 100;
  const employeesPresent = 80;
  const employeesPresentPercent = employeesPresent / totalEmployees * 100;

  const successPercentSpan = () => (
    <span className="text-xs text-green-500 flex items-center gap-2">
      <BadgeCheckIcon/>
      {employeesPresentPercent}% of employees are present
    </span>
  );

  const failedPercentSpan = () => (
    <span className="text-xs text-pink-500 flex items-center gap-2">
      <AlertTriangleIcon/>
      Only {employeesPresentPercent}% of employees are present
    </span>
  );

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader><CardTitle>Total employees</CardTitle></CardHeader>
        <CardContent className="flex justify-between items-center">
          <div className="flex gap-2">
            <UserIcon/>
            <span className="text-4xl font-bold">{totalEmployees}</span>
          </div>
          <div>
            <Button size="xs" asChild><Link href="/dashboard/employees">View All</Link></Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Employees present</CardTitle></CardHeader>
        <CardContent className="flex justify-between items-center">
          <div className="flex gap-2">
            {employeesPresentPercent > 75 ? <UserCheckIcon/> : <UserRoundXIcon/>}
            <span className="text-4xl font-bold">{employeesPresent}</span>
          </div>
        </CardContent>
        <CardFooter>
          {employeesPresentPercent > 75 ? successPercentSpan() : failedPercentSpan()}
        </CardFooter>
      </Card>
      <Card className="border-pink-500 border-1 flex flex-col">
        <CardHeader><CardTitle>Employee of the month</CardTitle></CardHeader>
        <CardContent className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage src="/images/cm.jpg" alt="Employee of the month" />
            <AvatarFallback>CM</AvatarFallback>
          </Avatar>
          <span className="text-2xl">Coco May!</span>
        </CardContent>
        <CardFooter className="flex gap-2 items-center text-xs text-muted-foreground mt-auto">
          <PartyPopperIcon className="text-pink-500" />
          Congratulations, Coco
        </CardFooter>
      </Card>
    </div>
  );
}
