"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Hash, ExternalLink, ShieldCheck, Clock, FileText, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BlockchainAuditTrail() {
    const transactions = [
        {
            id: 1,
            action: "Contract Verified",
            timestamp: "2 mins ago",
            hash: "8f14e45f...9d2a",
            status: "Confirmed",
            details: "Hash match confirmed with on-chain record",
            icon: ShieldCheck,
            color: "text-green-500",
        },
        {
            id: 2,
            action: "Risk Analysis Logged",
            timestamp: "15 mins ago",
            hash: "2c8d...56ef",
            status: "Confirmed",
            details: "AI Risk Report #442 anchored to ledger",
            icon: FileText,
            color: "text-blue-500",
        },
        {
            id: 3,
            action: "Summary Generated",
            timestamp: "1 hour ago",
            hash: "7f3a...91bc",
            status: "Confirmed",
            details: "Document summary snapshot recorded",
            icon: FileText,
            color: "text-blue-500",
        },
        {
            id: 4,
            action: "Contract Uploaded",
            timestamp: "2 hours ago",
            hash: "a1b2...c3d4",
            status: "Confirmed",
            details: "Initial document upload - Global_Trade_Agreement_v2.pdf",
            icon: Clock,
            color: "text-orange-500",
        },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Blockchain Verification</h2>
                <p className="text-muted-foreground">
                    Immutable audit trail of all contract lifecycle events, anchored on the Stellar network.
                </p>
            </div>

            <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />

                <div className="space-y-8">
                    {transactions.map((tx) => (
                        <div key={tx.id} className="relative pl-20 group">
                            {/* Timeline Dot */}
                            <div className={`absolute left-6 -translate-x-1/2 mt-1.5 w-4 h-4 rounded-full border-2 border-background ${tx.status === 'Confirmed' ? 'bg-green-500' : 'bg-muted'}`} />

                            <Card className="transition-all hover:shadow-md hover:border-primary/50">
                                <CardHeader className="py-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className={`p-2 rounded-full bg-muted/50 ${tx.color}`}>
                                                <tx.icon className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-base">{tx.action}</CardTitle>
                                                <CardDescription>{tx.timestamp}</CardDescription>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="gap-1 bg-muted/50 font-mono">
                                            <Hash className="h-3 w-3 text-muted-foreground" />
                                            {tx.hash}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="pb-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">{tx.details}</span>
                                        <Button variant="ghost" size="sm" className="h-8 gap-1 text-primary hover:text-primary/80">
                                            View on Explorer <ExternalLink className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
