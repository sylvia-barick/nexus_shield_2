"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, Loader2, ShieldCheck, AlertCircle, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card, CardContent, CardDescription,
    CardFooter, CardHeader, CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Message {
    id: string
    role: "assistant" | "user"
    content: string
}

export function ContractAnalysisChatbot() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "Hello! I'm your AI contract analysis assistant. Upload a contract or ask me questions about contract analysis.",
        }
    ])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [ollamaStatus, setOllamaStatus] = useState<"online" | "offline">("offline")
    const scrollAreaRef = useRef<HTMLDivElement>(null)

    /* ---------------- CHECK OLLAMA STATUS ---------------- */
    useEffect(() => {
        const checkOllama = async () => {
            try {
                const response = await fetch("http://localhost:11434/api/tags")
                if (response.ok) {
                    setOllamaStatus("online")
                } else {
                    setOllamaStatus("offline")
                }
            } catch {
                setOllamaStatus("offline")
            }
        }

        checkOllama()
        const interval = setInterval(checkOllama, 10000)
        return () => clearInterval(interval)
    }, [])

    /* ---------------- AUTO-SCROLL ---------------- */
    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
        }
    }, [messages])

    /* ---------------- SIMPLE OLLAMA CALL ---------------- */
    const callOllama = async (question: string): Promise<string> => {
        try {
            const response = await fetch("http://localhost:11434/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "mistral",
                    prompt: question,
                    stream: false,
                    options: {
                        temperature: 0.7,
                        num_predict: 200,
                    },
                }),
            })

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`)
            }

            const data = await response.json()
            return data?.response || "No response received"

        } catch (error: any) {
            throw new Error(`Cannot connect to Ollama: ${error.message}`)
        }
    }

    /* ---------------- SEND MESSAGE ---------------- */
    const handleSend = async () => {
        if (!input.trim() || isLoading) return

        const question = input.trim()
        setInput("")
        setIsLoading(true)

        // Add user message
        setMessages(prev => [
            ...prev,
            {
                id: Date.now().toString(),
                role: "user",
                content: question
            },
        ])

        try {
            if (ollamaStatus === "offline") {
                throw new Error("Ollama is not running. Please start Ollama first.")
            }

            const reply = await callOllama(question)

            // Add assistant response
            setMessages(prev => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: reply,
                },
            ])

        } catch (error: any) {
            // Add error message
            setMessages(prev => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: error.message,
                },
            ])
        }

        setIsLoading(false)
    }

    /* ---------------- TEST CONNECTION ---------------- */
    const testConnection = async () => {
        setIsLoading(true)
        try {
            const response = await fetch("http://localhost:11434/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "mistral",
                    prompt: "Say hello in one word",
                    stream: false,
                }),
            })

            if (response.ok) {
                const data = await response.json()
                setMessages(prev => [
                    ...prev,
                    {
                        id: Date.now().toString(),
                        role: "assistant",
                        content: `✅ Connection successful! Ollama is working. Response: "${data?.response?.trim()}"`,
                    },
                ])
            } else {
                throw new Error(`HTTP ${response.status}`)
            }
        } catch (error: any) {
            setMessages(prev => [
                ...prev,
                {
                    id: Date.now().toString(),
                    role: "assistant",
                    content: `❌ Connection failed: ${error.message}`,
                },
            ])
        }
        setIsLoading(false)
    }

    /* ---------------- CLEAR CHAT ---------------- */
    const clearChat = () => {
        setMessages([{
            id: "1",
            role: "assistant",
            content: "Hello! I'm your AI contract analysis assistant. What would you like to analyze?",
        }])
    }

    /* ---------------- UI ---------------- */
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
            {/* Sidebar */}
            <Card className="lg:col-span-1 flex flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5" /> Contract Intelligence
                    </CardTitle>
                    <CardDescription>
                        <div className="flex items-center gap-2">
                            <span>Ollama AI</span>
                            <Badge variant="outline" className={
                                ollamaStatus === "online"
                                    ? "bg-green-500/10 text-green-500 border-green-200"
                                    : "bg-red-500/10 text-red-500 border-red-200"
                            }>
                                {ollamaStatus === "online" ? "Online" : "Offline"}
                            </Badge>
                        </div>
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                    {/* Status Alert */}
                    {ollamaStatus === "offline" && (
                        <Alert variant="destructive" className="border-red-200 bg-red-50">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription className="text-sm">
                                Ollama is not running. Open terminal and run: <code className="ml-1 px-1 bg-red-100 rounded">ollama serve</code>
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Document Info */}
                    <div className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                <span className="font-medium">Active Document</span>
                            </div>
                            <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                                <ShieldCheck className="h-3 w-3 mr-1" /> Ready
                            </Badge>
                        </div>
                        <div className="text-sm font-mono bg-gray-50 p-2 rounded border">
                            Global_Trade_Agreement_v2.pdf
                        </div>
                    </div>

                    {/* Quick Start */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium">Quick Start</h4>
                        <div className="text-xs text-gray-600 space-y-1">
                            <p>1. Open terminal</p>
                            <p>2. Run: <code className="bg-gray-100 px-1 rounded">ollama serve</code></p>
                            <p>3. (First time) Run: <code className="bg-gray-100 px-1 rounded">ollama pull mistral</code></p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={testConnection}
                            disabled={isLoading}
                            className="w-full"
                        >
                            Test Connection
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearChat}
                            className="w-full text-gray-500 hover:text-gray-700"
                        >
                            Clear Chat
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Chat Area */}
            <Card className="lg:col-span-2 flex flex-col">
                <div
                    className="flex-1 overflow-y-auto p-4 space-y-4"
                    ref={scrollAreaRef}
                >
                    {messages.map(m => (
                        <div
                            key={m.id}
                            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`max-w-[80%] rounded-lg p-3 ${m.role === "user"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 border"
                                }`}>
                                <div className="whitespace-pre-wrap text-sm">
                                    {m.content}
                                </div>
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex items-center gap-2 text-gray-500">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm">Thinking...</span>
                        </div>
                    )}
                </div>

                <CardFooter className="border-t pt-4">
                    <form
                        className="flex gap-2 w-full"
                        onSubmit={e => {
                            e.preventDefault();
                            handleSend();
                        }}
                    >
                        <Input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Ask about contract analysis..."
                            disabled={isLoading || ollamaStatus === "offline"}
                        />
                        <Button
                            type="submit"
                            size="icon"
                            disabled={isLoading || !input.trim() || ollamaStatus === "offline"}
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}