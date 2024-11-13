import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CircleCheck, CircleAlert, Loader } from 'lucide-react';
import { MessageProps } from "@/lib/types";

function ResultMessage({result, title, message} : MessageProps) {
    if(result == undefined){
        return(
            <Alert variant='default'>
                <Loader className="h-4 w-4" />
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>
                    Loading...
                </AlertDescription>
            </Alert> 
        )
    }
    
    return (
        <Alert variant={result ? 'success' : 'destructive'}>
            {result ? <CircleCheck className="h-4 w-4" /> : <CircleAlert className="h-4 w-4" />}
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                {message}
            </AlertDescription>
        </Alert> 
    )
}

export default ResultMessage
