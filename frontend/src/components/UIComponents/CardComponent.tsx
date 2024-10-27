import React, { ReactNode } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


function CardComponent( { children }: {children: ReactNode}) {
    return (
        <Card>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}

export default CardComponent
