import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import EmployeesStats from "@/components/employees-stats";

export default function Page() {
  return (
    <Tabs defaultValue="employees">
      <TabsList className="mb-4">
        <TabsTrigger value="employees">Employee stats</TabsTrigger>
        <TabsTrigger value="teams">Teams stats</TabsTrigger>
      </TabsList>
      <TabsContent value="employees">
        <EmployeesStats />
      </TabsContent>
      <TabsContent value="teams">
        Teams stats view
      </TabsContent>
    </Tabs>
  );
}
