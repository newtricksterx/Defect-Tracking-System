import { IssuesTablePage } from "@/components/list-issue/table-page";
import { ProjectsTablePage } from "@/components/list-project/table-page";
import StatusChart from "@/components/StatusChart";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";


function DashboardPage(){

    return (
        <main className="h-full grid gap-2 grid-cols-2 grid-rows-2 p-2 text-sm">
            <Card className="flex flex-col h-full">
                <CardHeader className="p-3">
                    <CardTitle>
                        Status of Issues
                    </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="m-0 p-0 flex-grow">
                    <StatusChart />
                </CardContent>
            </Card>
            <Card className="flex flex-col h-full">
                <CardHeader className="p-3">
                    <CardTitle>
                        Assigned To Me
                    </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="m-0 overflow-y-auto flex-grow">
                    <IssuesTablePage />
                </CardContent>
            </Card>
            <Card className="flex flex-col h-full">
                <CardHeader className="p-3">
                    <CardTitle>
                        Projects
                    </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="m-0 overflow-y-auto flex-grow">
                    <ProjectsTablePage />
                </CardContent>
            </Card>
            <Card className="flex flex-col h-full">
                <CardHeader className="p-3">
                    <CardTitle>
                        Assigned To Me
                    </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="m-0 overflow-y-auto flex-grow">
                    <IssuesTablePage />
                </CardContent>
            </Card>
        </main>
    );

}

/*
            <div className="border-black border-2 rounded shadow-md">
                <h2 className="bg-black text-white p-1 pl-2">
                    Assigned To Me
                </h2>
                <IssuesTablePage />
            </div>
*/

export default DashboardPage;